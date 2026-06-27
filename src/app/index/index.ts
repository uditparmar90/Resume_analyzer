import { Component, signal } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-index',
  imports: [RouterLink],
  templateUrl: './index.html',
  styleUrl: './index.css',
})
export class Index {

  protected readonly title = signal('Resume_analyzer');

}
