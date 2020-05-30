import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";

import { Observable } from "rxjs";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit {
  //city: any;
  woeid: Number;

  constructor(private api: ApiService) {}

  getCityInfo(name: string): void {
    this.api.getCityInfo(name).subscribe((data: any) => {
      console.log(data);
      this.woeid = Number(data.map((r) => r.woeid));
    });
  }

  ngOnInit(): void {}
}
