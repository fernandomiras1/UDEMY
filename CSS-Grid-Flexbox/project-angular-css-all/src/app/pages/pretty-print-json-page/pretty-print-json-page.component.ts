import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-pretty-print-json-page",
  templateUrl: "./pretty-print-json-page.component.html",
})
export class PrettyPrintJsonPageComponent implements OnInit {
  constructor() {}

  json = {
    test: "Fer",
    isValid: true,
    data: [
      {
        id: 2,
        name: "Críticos",
        colorRgb: "FA150A",
        total: 23500,
      },
      {
        id: 3,
        name: "Muy Altos",
        colorRgb: "E4FF00",
        total: 10800,
      },
      {
        id: 4,
        name: "Altos",
        colorRgb: "FF6100",
        total: 9500,
      },
    ],
  };

  ngOnInit() {}
}
