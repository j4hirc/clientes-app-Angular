import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.html',
  standalone: true, 
  imports: [CommonModule] 
})
export class Directiva {
  listacurso: string[] = ['TypeScript', 'JavaScript', 'C#', 'Java SE', 'PHP', 'VB.Net', 'Python'];
  listatemasTS: string[] = ['El manual de TypeScript', 'Los basicos', 'Tipos de objetos'];
  listatemasJS: string[] = ['Comprendiendo los frameworks JavaScript de lado del cliente', 'Estructuras de datos en JavaScript'];
  listatemasC: string[] = ['Creacion de un proyecto', 'Errores Sintacticos y Logicos'];
  
  habilitar: boolean = true;

  constructor() {}

  setHabilitar(): void {
    this.habilitar = (this.habilitar == true) ? false : true;
  }
  
}