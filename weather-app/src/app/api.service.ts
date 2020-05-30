import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private apiUrl =
    "https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=";

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
    return this.http.get(`${this.apiUrl}${name}`).pipe(
      tap((_) => console.log("fetched weather")),
      catchError(this.handleError("getWeather", []))
    );
  }
}
