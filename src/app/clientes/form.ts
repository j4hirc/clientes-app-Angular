import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // 1. Añadir esta importación
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.html',
  standalone: true, 
  imports: [FormsModule]
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  public titulo: string = "Crear Cliente";

  constructor(private clienteService: ClienteService, private router: Router) { }

  ngOnInit(): void {
  }

  public create(): void {
    this.clienteService.create(this.cliente).subscribe(
      response => {
        this.router.navigate(['/clientes']);
        console.log('Cliente creado con éxito:', response);
      }
    );
  }
}