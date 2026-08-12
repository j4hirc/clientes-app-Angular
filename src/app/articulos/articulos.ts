import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Articulo } from './articulo';
import { ArticuloService } from './articulo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-articulos',
  standalone: false,
  templateUrl: './articulos.html',
})
export class Articulos implements OnInit {

  articulos: Articulo[] = [];
  terminoBusqueda: string = '';

  constructor(
    private articuloService: ArticuloService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarArticulos();
  }

  cargarArticulos(): void {
    this.articuloService.getArticulos().subscribe({
      next: (datos) => {
        this.articulos = datos;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar artículos:', err)
    });
  }

  onBuscar(): void {
    if (this.terminoBusqueda.trim() === '') {
      this.cargarArticulos();
      return;
    }

    this.articuloService.buscar(this.terminoBusqueda).subscribe({
      next: (datos) => {
        this.articulos = datos;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error en la búsqueda:', err)
    });
  }

  delete(articulo: Articulo): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar el artículo ${articulo.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.articuloService.delete(articulo.id).subscribe(
          () => {
            this.articulos = this.articulos.filter(art => art !== articulo);
            this.cdr.detectChanges();
            Swal.fire('Eliminado!', `El artículo ha sido eliminado.`, 'success');
          }
        );
      }
    });
  }
}