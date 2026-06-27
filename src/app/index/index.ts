import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-index',
  imports: [],
  templateUrl: './index.html',
  styleUrl: './index.css',
})
export class Index {

  protected readonly title = signal('Resume_analyzer');

}
