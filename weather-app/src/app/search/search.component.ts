import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";

import { Observable } from "rxjs";

import { Weather } from "../weather";

import { City } from "../city";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit {
  title: string;
  weatherTable: Weather[];
  constructor(private api: ApiService) { }

  getWeather(id: number): void {
    this.api.getWeather(id).subscribe((data: any) => {
      console.log(data);
      this.title = data.title;
      this.weatherTable = data.consolidated_weather;
      console.log(this.weatherTable);
      console.log(this.weatherTable);

    });
  }
  getCityInfo(name: string): void {
    this.api.getCityInfo(name).subscribe((data: City[]) => {
      console.log(data);
      const woeid: number = Number(data.map((r) => r.woeid));
      this.getWeather(woeid);
    });
  }

  ngOnInit(): void { }
}
