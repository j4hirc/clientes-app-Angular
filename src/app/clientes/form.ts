import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 1. Importar ChangeDetectorRef
import { FormsModule } from '@angular/forms'; 
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-form',
  templateUrl: './form.html',
  standalone: true, 
  imports: [FormsModule]
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  public titulo: string = "Crear Cliente";

  constructor(
    private clienteService: ClienteService, 
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef 
  ) { }

  ngOnInit(): void {
    this.cargarCliente();
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      
      if (id) {
        console.log('1. ID detectado en la ruta:', id); 

        this.clienteService.getCliente(id).subscribe({
          next: (cliente) => {
            console.log('2. ÉXITO - Datos recibidos:', cliente);
            this.cliente = cliente;
            this.titulo = "Editar Cliente"; 
            this.cdr.detectChanges(); 
          },
          error: (err) => {
            console.error('2. ERROR - Falló la petición a Spring Boot:', err);
          }
        });
      }
    });
  }

  public create(): void {
    this.clienteService.create(this.cliente).subscribe(
      response => {
        this.router.navigate(['/clientes']);
        Swal.fire('Nuevo Cliente', `Cliente ${response.nombre} creado con éxito`, 'success');
      }
    );
  }


  public update(): void {
    this.clienteService.update(this.cliente).subscribe(
      response => {
        this.router.navigate(['/clientes']);
        Swal.fire('Cliente Actualizado', `Cliente ${this.cliente.nombre} actualizado con éxito`, 'success');
      }
    );
  }
}
