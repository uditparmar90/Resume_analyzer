import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Index } from "./index";
import { Analyze } from "./analyze/analyze";

@Component({
  selector: 'app-root',
  imports: [Index, Analyze],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
