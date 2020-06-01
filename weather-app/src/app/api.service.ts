import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import { city } from "./city";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  //https://cors-anywhere.herokuapp.com/
  private cityUrl = "https://www.metaweather.com/api/location/search/?query=";
  private weatherUrl = "https://www.metaweather.com/api/location/";
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

  getCityInfo(name: string): Observable<city[]> {
    return this.http.get<city[]>(`${this.cityUrl}${name}`).pipe(
      tap((_) => console.log("fetched CityInfo")),
      catchError(this.handleError<city[]>("getCityInfo", []))
    );
  }
  getWeather(id: Number) {
    return this.http.get(`${this.weatherUrl}${id}`).pipe(
      tap((_) => console.log("fetched Weather data")),
      catchError(this.handleError("getWeather", []))
    );
  }
}
