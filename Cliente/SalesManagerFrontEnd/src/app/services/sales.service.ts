import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sale } from '../models/sale';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private http: HttpClient) { }
  URL_API = 'http://localhost:3002/api/order';
  
  selectedSale: Sale={
  	_id: "",
  	id_usuario: "",
  	id_producto: "",
  	cantidad: 0,
  	comprador: "",
  	direccion: "",
  }
  
  compras: Sale[] = [];
  
  getSales(){
  	return this.http.get<Sale[]>(this.URL_API);
  }
  
  getSale(id: string){
  	return this.http.get<Sale>(`${this.URL_API}/${id}`);
  }
  
  createSale(sale: Sale){
  	delete sale._id;
  	return this.http.post(this.URL_API, sale);
  }
  
  updateSale(sale: Sale){
  	return this.http.post(`${this.URL_API}/${sale._id}`, sale);
  }
  
  deleteSale(id: string){
  	return this.http.delete(`${this.URL_API}/${id}`);
  }
}
