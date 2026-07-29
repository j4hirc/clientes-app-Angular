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

    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes
    );
    
  }
}
