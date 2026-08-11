import { Injectable } from '@angular/core';
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { map, Observable, of } from 'rxjs';
import {HttpClient} from '@angular/common/http'

@Injectable ({
    providedIn: 'root'
})
export class ClienteService {


    private urlEndPoint:string = 'http://localhost:8080/api/clientes';
    private httpHeaders = {'Content-Type': 'application/json'};
    
    constructor(private http: HttpClient ) {}

    getClientes(): Observable<Cliente[]>{
        return this.http.get(this.urlEndPoint).pipe(
            map(response => response as Cliente[])
        );
    }

    create(cliente: Cliente): Observable<Cliente>{
        return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers: this.httpHeaders});
    }



}
