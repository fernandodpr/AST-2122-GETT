import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Game} from '../models/game';
import {Sale} from '../models/sale';
@Injectable({
  providedIn: 'root'
})
export class SaleconnnectService {
  constructor(private http: HttpClient){}
  URL_API = 'http://localhost:3002/api/products';
  URL_CATEGORY = 'http://localhost:3001/api/category';
  URL_ID = 'http://localhost:3001/api/_id';

  selectedSale: Sale = {
    _id: "",
    id_usuario: "",
    id_producto: "",
    cantidad: 0,
    comprador: "",
    direccion: "",
  };

  sales: Sale[] = [];


  sumidero: string = "";
  sumidero2: string = "";

  getProducts(){
    return this.http.get<Game[]>('http://localhost:3002/api/products');
  }

  getSales(){
    var response = this.http.get<Sale[]>('http://localhost:3002/api/order');
    console.log("Nuevo get de todos pedidos");
    console.log(response);
    return response;
  }

  getSale(id:string){
    return this.http.get<Sale>(`http://localhost:3002/api/order/${id}`);
  }

  createOrder(data: Sale, auth: string){
    delete data._id;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Auth': auth
      });
      
    return this.http.post('http://localhost:3002/api/order', data,{ headers,responseType: 'text'});
  
  }

  updateOrder(data: Sale, auth: string){
    console.log("Editando pedido")
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Auth': auth
      });
    return this.http.post(`http://localhost:3002/api/order/${data._id}`, data,{ headers,responseType: 'text'});

  }

  deleteOrder(_id:string,auth:string){
  
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Auth': auth
      });
    return this.http.delete(`http://localhost:3002/api/order/${_id}`,{ headers,responseType: 'text'});
  
  }

}
