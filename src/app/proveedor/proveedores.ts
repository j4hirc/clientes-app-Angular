import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Proveedor } from './proveedor';
import { ProveedorService } from './proveedor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proveedores',
  standalone: false,
  templateUrl: './proveedores.html',
})
export class Proveedores implements OnInit {

  proveedores: Proveedor[] = [];

  constructor(
    private proveedorService: ProveedorService,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.proveedorService.getProveedores().subscribe({
      next: (datos) => {
        this.proveedores = datos;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar proveedores:', err)
    });
  }

  delete(proveedor: Proveedor): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar al proveedor ${proveedor.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.proveedorService.delete(proveedor.id).subscribe(
          response => {
            this.proveedores = this.proveedores.filter(prov => prov !== proveedor);
            this.cdr.detectChanges(); 
            Swal.fire('Eliminado!', `Proveedor ${proveedor.nombre} eliminado.`, 'success');
          }
        );
      }
    });
  }
}