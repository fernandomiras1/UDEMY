# VCL version 5.0 is not supported so it should be 4.0 or 4.1 even though actually used Varnish version is 6
vcl 4.0;

import std;
import directors;

# The minimal Varnish version is 5.0
# For SSL offloading, pass the following header in your proxy server or load balancer: 'X-Forwarded-Proto: https'

backend default {
  .host = "{{ default "front-angularssr-web" .Values.varnish.varnishBackendService }}";
  .port = "{{ default "80" .Values.varnish.varnishBackendServicePort }}";
}

// TODO: por el momento no le vamos agregar un health para no llenar los logs, dado k8 hace liveness y headlines
// .probe = {
//   .request =
//     "HEAD /health HTTP/1.1"
//     "Host: front-naranja-web"
//     "Connection: close"
//     "User-Agent: Varnish Health Probe";
//   .timeout = 1s;
//   .interval = 10s;
//   .window = 10;
//   .threshold = 3;
// }

sub vcl_init {
  new app_cluster = directors.round_robin();
  app_cluster.add_backend(default);
}

acl purgers {
  "127.0.0.1";
  "192.168.1.0"/24;
}

sub vcl_recv {
  set req.backend_hint = app_cluster.backend();

  # ------------------------------------------------------------------------
  # Purge cache
  # ------------------------------------------------------------------------

  if (req.restarts == 0) {
      unset req.http.X-Purger;
  }

  if (req.method == "PURGE") {
      if (!client.ip ~ purgers) {
          return (synth(405, "Purging not allowed for " + client.ip));
      }
      return (purge);
  }

  # ------------------------------------------------------------------------
  # Avoid cache for "no-cache"
  # ------------------------------------------------------------------------
  if (req.http.Cache-Control ~ "no-cache") {
    return (pass);
  }

  # ------------------------------------------------------------------------
  # Clean up the Accept-Encoding header
  # ------------------------------------------------------------------------
  if (req.http.Accept-Encoding) {
    if (req.url ~ "\.(jpg|jpeg|png|gif|gz|tgz|bz2|tbz|mp3|ogg|swf|woff)$") {
      unset req.http.Accept-Encoding;
    } elsif (req.http.Accept-Encoding ~ "gzip") {
      set req.http.Accept-Encoding = "gzip";
    } elsif (req.http.Accept-Encoding ~ "deflate") {
      set req.http.Accept-Encoding = "deflate";
    } else {
      # unknown algorithm (aka crappy browser)
      unset req.http.Accept-Encoding;
    }
  }


  # ------------------------------------------------------------------------
  # Only deal with "normal" types
  # ------------------------------------------------------------------------

  if (req.method != "GET" &&
      req.method != "HEAD" &&
      req.method != "PUT" &&
      req.method != "POST" &&
      req.method != "TRACE" &&
      req.method != "OPTIONS" &&
      req.method != "PATCH" &&
      req.method != "DELETE") {
    return (pipe);
  }

  # ------------------------------------------------------------------------
  # Redirection 301 && 302
  # see https://www.hostingadvice.com/how-to/varnish-regex/
  # ------------------------------------------------------------------------
  # if (
  #   req.url ~ "^/news"
  # ) {
  #   return (synth(301, "/"));
  # }

  # ------------------------------------------------------------------------
  # Update some HTTP header values
  # ------------------------------------------------------------------------

  if (req.restarts == 0) {
    if (req.http.X-Forwarded-For) {
      set req.http.X-Forwarded-For = client.ip;
    }
  }

  # ------------------------------------------------------------------------
  # Remove all cookies for static files
  # ------------------------------------------------------------------------
  if (req.url ~ "^[^?]*\.(bmp|bz2|css|doc|eot|flv|gif|gz|ico|jpeg|jpg|js|less|mp[34]|pdf|png|rar|rtf|swf|tar|tgz|txt|wav|woff|xml|zip)(\?.*)?$") {
    unset req.http.Cookie;
    return (hash);
  }

  # ------------------------------------------------------------------------
  # if the header contain an Auth, it should not cache the resource
  # ------------------------------------------------------------------------
  if (req.http.Authorization) {
    # Not cacheable by default
    return (pass);
  }

  return (hash);
}

sub vcl_backend_response {
  # Parse ESI request and remove Surrogate-Control header
  if (beresp.http.Surrogate-Control ~ "ESI/1.0") {
    unset beresp.http.Surrogate-Control;
    set beresp.do_esi = true;
  }
  if (beresp.status >= 500 && beresp.status <= 599){
    return(deliver);
  }

  if (bereq.url ~ "^[^?]*\.(bmp|bz2|css|doc|eot|flv|gif|gz|ico|jpeg|jpg|js|less|mp[34]|pdf|png|rar|rtf|swf|tar|tgz|txt|wav|woff|xml|zip)(\?.*)?$") {
    unset beresp.http.set-cookie;
  }

  # ------------------------------------------------------------------------
  # Set TTL and grace period
  # ------------------------------------------------------------------------

  set beresp.ttl = 15m;
  set beresp.grace = 1h;

  if (bereq.method == "GET" && bereq.url ~ "\.(css|js|xml|gif|jpg|jpeg|swf|png|zip|ico|img|wmf|txt)$") {
    set beresp.ttl = 1d;
  }
}

sub vcl_deliver {
  # ------------------------------------------------------------------------
  # Remove unnecessary response headers
  # ------------------------------------------------------------------------
  unset resp.http.Server;
  unset resp.http.Via;
  unset resp.http.X-Powered-By;
  unset resp.http.X-Varnish;
  unset resp.http.Link;
  unset resp.http.X-Generator;
  # ------------------------------------------------------------------------
  # Set own headers
  # ------------------------------------------------------------------------
  set resp.http.Server = "Naranja";

  if (req.http.X-Purger) {
    set resp.http.X-Purger = req.http.X-Purger;
  }

  # ------------------------------------------------------------------------
  # Set a new response header to show if the cache attempt was a hit or miss
  # ------------------------------------------------------------------------
  if (obj.hits > 0) {
    set resp.http.X-Cache = "HIT";
  } else {
    set resp.http.X-Cache = "MISS";
  }
}

sub vcl_hash {
  hash_data(req.url);

  return (lookup);
}

sub vcl_synth {
    if (resp.status == 301 || resp.status == 302) {
        set resp.http.location = resp.reason;
        set resp.reason = "Moved";
        return (deliver);
    }
}

sub vcl_purge {
     set req.method = "GET";
     set req.http.X-Purger = "Purged";
    # Varnish increments the req.restarts counter
     return (restart);
 }
