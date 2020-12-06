import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";

import { Observable } from "rxjs";

import { Weather } from "../weather";

import { City } from "../city";

// firebasse
import { AngularFireDatabase, AngularFireDatabaseModule } from "@angular/fire/database";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit {
  title: string;
  weatherTable: Weather[];

  cityValue: City;
  cityData: Observable<any[]>;
  constructor(
    private api: ApiService,
    private db: AngularFireDatabase
    ) {
      this.cityData = db.list('cityData').valueChanges();
    }

  getWeather(id: number): void {
    this.api.getWeather(id).subscribe((data: any) => {
      console.log(data);
      this.title = data.title;
      this.weatherTable = data.consolidated_weather;
      console.log(this.weatherTable);
    });
  }

  getCityInfo(name: string): void {
    this.api.getCityInfo(name).subscribe((data: City[]) => {
      console.log(data); // tu otrzymuje informacje
      const woeid: number = Number(data.map((r) => r.woeid));
      this.getWeather(woeid);
      this.cityValue = data[0];
      this.db.list("cityData").push({content: this.cityValue});
      this.cityValue = null;
    });
  }

  ngOnInit(): void {}
}
