import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";

import { Observable } from "rxjs";
import { startWith, map } from 'rxjs/operators';

import { Weather } from "../weather";

import { City } from "../city";
import { FormControl } from '@angular/forms';


@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit {
  title: string;
  weatherTable: Weather[];

  control = new FormControl();
  CitiesNames: string[] = [];
  filteredCitiesNames: Observable<string[]>;

  constructor(private api: ApiService) { }

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
      console.log(data);
      const woeid: number = Number(data.map((r) => r.woeid));
      this.getWeather(woeid);
    });
  }
  getCitiesInfo() {
    this.api.getCitiesInfo().subscribe((data: City[]) => {
      this.CitiesNames = data.map(r => r.title);
      console.log(this.CitiesNames);
    });
  }

  filter() {
    this.filteredCitiesNames = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))

    );
  }

  ngOnInit(): void {
    this.getCitiesInfo();
    this.filter();
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.CitiesNames.filter(cityName => this._normalizeValue(cityName).includes(filterValue));
  }
  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }


}
