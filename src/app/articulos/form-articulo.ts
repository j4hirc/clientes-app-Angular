import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Articulo } from './articulo';
import { ArticuloService } from './articulo.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-articulo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-articulo.html'
})
export class FormArticuloComponent implements OnInit {

  public articulo: Articulo = new Articulo();
  public titulo: string = "Crear Artículo";

  constructor(
    private articuloService: ArticuloService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargarArticulo();
  }

  cargarArticulo(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.titulo = "Editar Artículo";
        this.articuloService.getArticulo(id).subscribe(
          (articulo) => {
            this.articulo = articulo;
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