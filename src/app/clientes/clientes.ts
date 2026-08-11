import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-clientes',
  standalone: false,
  templateUrl: './clientes.html',
})
export class Clientes implements OnInit {


 clientes: Cliente[] = []

  constructor(private clienteService: ClienteService) {} 

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe({
      next: (datos) => {
        console.log('¡LLEGARON LOS DATOS DEL BACKEND!', datos);
        this.clientes = datos;
      },
      error: (err) => {
        console.error('ALGO EXPLOTÓ EN LA CONEXIÓN:', err);
      }
    });
  }
}
