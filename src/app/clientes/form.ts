import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // 1. Añadir esta importación
import { Cliente } from './cliente';

@Component({
  selector: 'app-form',
  templateUrl: './form.html',
  standalone: true, 
  imports: [FormsModule]
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  public titulo: string = "Crear Cliente";

  constructor() { }

  ngOnInit(): void {
  }

  public create(): void {
    console.log("ha realizado un clic");
    console.log(this.cliente);
  }
}