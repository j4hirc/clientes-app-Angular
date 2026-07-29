import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  title = 'Cursos';

  curso: string = 'M4A';

  profesor: string = 'Carmen Tacuri';
}
