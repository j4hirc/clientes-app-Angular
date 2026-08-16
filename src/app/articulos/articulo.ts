import { Proveedor } from "../proveedor/proveedor";

export class Articulo {
    id!: number;
    codigo!: string;
    nombre!: string;
    categoria!: string;
    proveedorId!: number; 
    proveedor!: Proveedor;
}