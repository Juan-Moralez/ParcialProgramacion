import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ListpaisesComponents } from "./components/listpaises/listpaises.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ListpaisesComponents],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'parcialprog5';
}
