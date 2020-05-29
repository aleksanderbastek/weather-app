import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";

import { Observable } from "rxjs";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit {
  weather;

  constructor(private api: ApiService) {}

  getWeather(name: string): void {
    this.weather = this.api.getWeather(name).subscribe((data) => {
      console.log(data);
      this.weather = data;
    });
  }

  ngOnInit(): void {}
}
