import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // <-- Importa ChangeDetectorRef
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  standalone: false,
  templateUrl: './clientes.html',
})
export class Clientes implements OnInit {

  clientes: Cliente[] = [];

  constructor(
    private clienteService: ClienteService, 
    private cdr: ChangeDetectorRef 
  ) {} 

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe({
      next: (datos) => {
        console.log('Datos: ', datos);
        this.clientes = datos;
        
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Error de Conexión:', err);
      }
    });
  }


  delete(cliente: Cliente): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Seguro que deseas eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente);
            this.cdr.detectChanges(); 
            
            Swal.fire(
              'Eliminado!',
              `El cliente ${cliente.nombre} ha sido eliminado.`,
              'success'
            );
          }
        );
      }
    });
  }
}
