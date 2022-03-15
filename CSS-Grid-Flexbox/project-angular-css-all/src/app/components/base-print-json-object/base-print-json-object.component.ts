import { Component, Input, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "st-base-print-json-object",
  styleUrls: ["./base-print-json-object.component.scss"],
  template: '<pre><code [innerHTML]="formatted(json) | html"></code></pre>',
  encapsulation: ViewEncapsulation.None,
})
export class BasePrintJsonObjectComponent {
  @Input()
  json: Object;

  constructor() {}

  /**
   * Pretty Print JSON Objects.
   *
   * @return {string} html string of the formatted JS object
   * @example :  var obj = {"foo":"bar"};  obj.prettyPrint();
   */
  formatted(data: Object): string {
    const jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/gm;
    const replacer = function (
      match: string,
      pIndent: string,
      pKey: string,
      pVal: string,
      pEnd: string
    ) {
      let key = '<span class="json-key">',
        val = '<span class="json-value">',
        str = '<span class="json-string">',
        r = pIndent || "";
      if (pKey) r = r + key + pKey.replace(/[": ]/g, "") + "</span>: ";
      if (pVal) r = r + (pVal[0] == '"' ? str : val) + pVal + "</span>";
      return r + (pEnd || "");
    };

    return JSON.stringify(data, null, 2)
      .replace(/&/g, "&amp;")
      .replace(/\\"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(jsonLine, replacer);
  }
}
