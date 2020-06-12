import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import { City } from "./city";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private cityUrl =
    "https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=";
  private weatherUrl =
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

  constructor(private http: HttpClient) { }

  getCityInfo(name: string): Observable<City[]> {
    return this.http.get<City[]>(`${this.cityUrl}${name}`).pipe(
      tap((_) => console.log("fetched CityInfo")),
      catchError(this.handleError<City[]>("getCityInfo", []))
    );
  }
  getWeather(id: number) {
    return this.http.get(`${this.weatherUrl}${id}`).pipe(
      tap((_) => console.log("fetched Weather data")),
      catchError(this.handleError("getWeather", []))
    );
  }
  getCitiesInfo(): Observable<City[]> {

    return this.http.get<City[]>(`${this.cityUrl}a`).pipe(
      tap(_ => console.log("fetched Cities Info")),
      catchError(this.handleError<City[]>("getCitiesInfo", []))
    );
  }
}
