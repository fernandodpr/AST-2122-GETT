/*
  METODOS USADOS DE FORMA INDIRECTA POR LA PAGINA HTML EN JUEGOCOMPONENT
*/

import {Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  constructor(private http: HttpClient){}
  URL_API = 'http://localhost:3003/api/user';

  selectedUser: User = {
    _id: "",
    rol: "",
    username:""
  };

  usuarios: User[] = [];

  sumidero: string = "";
  sumidero2: string = "";

  getProducts(){
    return this.http.get<User[]>(this.URL_API);
  }

  getProduct(id: string){
    return this.http.get<User>(`${this.URL_API}/${id}`);
  }

  createProduct(game: User){
    delete game._id;
    return this.http.post(this.URL_API, game);
  }

  deleteProduct(_id: string){
    return this.http.delete(`${this.URL_API}/${_id}`);
  }
}
