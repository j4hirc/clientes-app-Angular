import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Proveedor } from './proveedor';
import { environment } from '../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  private urlEndPoint: string = `${environment.apiUrl}/api/proveedores`;
  private httpHeaders = {'Content-Type': 'application/json'};

  constructor(private http: HttpClient) { }

  getProveedores(): Observable<Proveedor[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Proveedor[])
    );
  }

  create(proveedor: Proveedor): Observable<Proveedor> {
    return this.http.post<Proveedor>(this.urlEndPoint, proveedor, {headers: this.httpHeaders});
  }

  delete(id: number): Observable<Proveedor> {
    return this.http.delete<Proveedor>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders});
  }

  getProveedor(id: number): Observable<Proveedor> {
    return this.http.get<Proveedor>(`${this.urlEndPoint}/${id}`);
  }

  update(proveedor: Proveedor): Observable<Proveedor> {
    return this.http.put<Proveedor>(`${this.urlEndPoint}/${proveedor.id}`, proveedor, {headers: this.httpHeaders});
  }

  subirFoto(archivo: File, id: number): Observable<Proveedor> {
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id.toString());
    return this.http.post<Proveedor>(`${this.urlEndPoint}/upload`, formData);
  }
}