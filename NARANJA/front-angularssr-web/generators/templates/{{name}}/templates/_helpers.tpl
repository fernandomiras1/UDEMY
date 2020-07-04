\{{- define "app_chart.name" -}}
\{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
\{{- end -}}

\{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
\{{- define "app_chart.fullname" -}}
\{{- if .Values.fullnameOverride -}}
\{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" -}}
\{{- else -}}
\{{- $name := default .Chart.Name .Values.nameOverride -}}
\{{- if contains $name .Release.Name -}}
\{{- .Release.Name | trunc 63 | trimSuffix "-" -}}
\{{- else -}}
\{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" -}}
\{{- end -}}
\{{- end -}}
\{{- end -}}

\{{/*
Create chart name and version as used by the chart label.
*/}}
\{{- define "app_chart.chart" -}}
\{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" -}}
\{{- end -}}

\{{/*
Get the user defined LoadBalancerIP for this release.
Note, returns 127.0.0.1 if using ClusterIP.
*/}}
\{{- define "varnish.serviceIP" -}}
\{{- if eq .Values.varnish.serviceType "ClusterIP" -}}
127.0.0.1
\{{- else -}}
\{{- index .Values (printf "%sLoadBalancerIP" .Chart.Name) | default "" -}}
\{{- end -}}
\{{- end -}}

\{{/*
Gets the host to be used for this application.
If not using ClusterIP, or if a host or LoadBalancerIP is not defined, the value will be empty.
*/}}
\{{- define "varnish.host" -}}
\{{- $host := index .Values (printf "%sHost" .Chart.Name) | default "" -}}
\{{- default (include "varnish.serviceIP" .) $host -}}
\{{- end -}}
