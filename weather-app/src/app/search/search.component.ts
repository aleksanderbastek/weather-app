import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";

import { Observable } from "rxjs";

import { weather } from "../weather";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit {
  title: string;
  weatherTable: weather[];
  constructor(private api: ApiService) {}

  getWeather(id: Number): void {
    this.api.getWeather(id).subscribe((data: any) => {
      console.log(data);
      this.title = data.title;
      this.weatherTable = data.consolidated_weather;
      console.log(this.weatherTable);
    });
  }

  getCityInfo(name: string): void {
    this.api.getCityInfo(name).subscribe((data: any) => {
      console.log(data);
      const woeid: Number = Number(data.map((r) => r.woeid));
      this.getWeather(woeid);
    });
  }

  ngOnInit(): void {}
}
