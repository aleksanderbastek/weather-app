import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SearchComponent } from "./search/search.component";
const routes: Routes = [
  {
    path: "search",
    component: SearchComponent,
    data: { title: "search" },
  },
  { path: "", redirectTo: "/search", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
