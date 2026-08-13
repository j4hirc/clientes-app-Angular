import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Articulo } from '../articulos/articulo';
import { environment } from '../../environments/environment'; // Ajusta la ruta según dónde esté tu servicio

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  private urlEndPoint: string = `${environment.apiUrl}/api/articulos`;
  private httpHeaders = {'Content-Type': 'application/json'};

  constructor(private http: HttpClient) { }

  getArticulos(): Observable<Articulo[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Articulo[])
    );
  }

  buscar(termino: string): Observable<Articulo[]> {
    let params = new HttpParams().set('termino', termino);
    return this.http.get<Articulo[]>(`${this.urlEndPoint}/buscar`, { params });
  }

  getArticulo(id: number): Observable<Articulo> {
    return this.http.get<Articulo>(`${this.urlEndPoint}/${id}`);
  }

  create(articulo: Articulo): Observable<Articulo> {
    return this.http.post<Articulo>(this.urlEndPoint, articulo, {headers: this.httpHeaders});
  }

  update(articulo: Articulo): Observable<Articulo> {
    return this.http.put<Articulo>(`${this.urlEndPoint}/${articulo.id}`, articulo, {headers: this.httpHeaders});
  }

  delete(id: number): Observable<Articulo> {
    return this.http.delete<Articulo>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders});
  }
}