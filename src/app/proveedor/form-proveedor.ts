import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; // 1. Importar ActivatedRoute
import { Proveedor } from './proveedor';
import { ProveedorService } from './proveedor.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-proveedor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-proveedor.html'
})
export class FormProveedorComponent implements OnInit {

  public proveedor: Proveedor = new Proveedor();
  public fotoSeleccionada!: File;
  public titulo: string = "Crear Nuevo Proveedor";

  constructor(
    private proveedorService: ProveedorService, 
    private router: Router,
    private activatedRoute: ActivatedRoute, 
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargarProveedor();
  }

  cargarProveedor(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.titulo = "Editar Proveedor";
        this.proveedorService.getProveedor(id).subscribe(
          (proveedor) => {
            this.proveedor = proveedor;
            this.cdr.detectChanges();
          }
        );
      }
    });
  }

  seleccionarFoto(event: any) {
    this.fotoSeleccionada = event.target.files[0];
  }

  public create(): void {
    this.proveedorService.create(this.proveedor).subscribe(
      proveedorCreado => {
        if (this.fotoSeleccionada) {
          this.proveedorService.subirFoto(this.fotoSeleccionada, proveedorCreado.id).subscribe(
            () => {
               Swal.fire('Éxito', `Proveedor creado con foto`, 'success');
               this.router.navigate(['/proveedores']);
            }
          );
        } else {
           Swal.fire('Éxito', `Proveedor creado sin foto`, 'success');
           this.router.navigate(['/proveedores']);
        }
      }
    );
  }

  public update(): void {
    this.proveedorService.update(this.proveedor).subscribe(
      json => {
        if (this.fotoSeleccionada) {
          this.proveedorService.subirFoto(this.fotoSeleccionada, this.proveedor.id).subscribe(
            () => {
               Swal.fire('Actualizado', `Proveedor actualizado con éxito`, 'success');
               this.router.navigate(['/proveedores']);
            }
          );
        } else {
           Swal.fire('Actualizado', `Proveedor actualizado con éxito`, 'success');
           this.router.navigate(['/proveedores']);
        }
      }
    );
  }
}