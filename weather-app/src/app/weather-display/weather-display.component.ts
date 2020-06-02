import { Component, OnInit } from "@angular/core";
import { Input } from "@angular/core";

import { Weather } from "../weather";

@Component({
  selector: "app-weather-display",
  templateUrl: "./weather-display.component.html",
  styleUrls: ["./weather-display.component.css"],
})
export class WeatherDisplayComponent implements OnInit {
  @Input() title: string;
  @Input() weatherTable: Weather[];
  constructor() {}

  ngOnInit(): void {}
}
