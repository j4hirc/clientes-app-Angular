import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Articulo } from './articulo';
import { ArticuloService } from './articulo.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { Proveedor } from '../proveedor/proveedor';
import { ProveedorService } from '../proveedor/proveedor.service';

@Component({
  selector: 'app-form-articulo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-articulo.html'
})
export class FormArticuloComponent implements OnInit {

  public articulo: Articulo = new Articulo();
  public titulo: string = "Crear Artículo";
  public proveedores: Proveedor[] = [];

  constructor(
    private articuloService: ArticuloService,
    private router: Router,
    private proveedorService: ProveedorService,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargarArticulo();
    this.cargarProveedores();
  }

  cargarProveedores(): void {
    this.proveedorService.getProveedores().subscribe(
      (proveedores) => {
        this.proveedores = proveedores;
      }
    );
  }

  cargarArticulo(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.titulo = "Editar Artículo";
        this.articuloService.getArticulo(id).subscribe(
          (articulo) => {
            this.articulo = articulo;
            
            if (this.articulo.proveedor) {
              this.articulo.proveedorId = this.articulo.proveedor.id;
            }
            // -----------------------------

            this.cdr.detectChanges();
          }
        );
      }
    });
  }

  public create(): void {
    this.articuloService.create(this.articulo).subscribe(
      () => {
        Swal.fire('Nuevo Artículo', `Artículo creado con éxito`, 'success');
        this.router.navigate(['/articulos']);
      }
    );
  }

  public update(): void {
    this.articuloService.update(this.articulo).subscribe(
      () => {
        Swal.fire('Artículo Actualizado', `Artículo actualizado con éxito`, 'success');
        this.router.navigate(['/articulos']);
      }
    );
  }
}