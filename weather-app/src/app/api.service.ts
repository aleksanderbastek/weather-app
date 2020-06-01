import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private CityUrl =
    "https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=";
  private WeatherUrl =
    "https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/";
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }

  constructor(private http: HttpClient) {}

  getCityInfo(name: string) {
    return this.http.get(`${this.CityUrl}${name}`).pipe(
      tap((_) => console.log("fetched CityInfo")),
      catchError(this.handleError("getCityInfo", []))
    );
  }
  getWeather(id: Number) {
    return this.http.get(`${this.WeatherUrl}${id}`).pipe(
      tap((_) => console.log("fetched Weather data")),
      catchError(this.handleError("getWeather", []))
    );
  }
}
