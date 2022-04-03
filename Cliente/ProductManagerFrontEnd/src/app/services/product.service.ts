/*
  METODOS USADOS DE FORMA INDIRECTA POR LA PAGINA HTML EN JUEGOCOMPONENT
*/

import {Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Game} from '../models/game';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  constructor(private http: HttpClient){}
  URL_API = 'http://localhost:3001/api/product';
  URL_CATEGORY = 'http://localhost:3001/api/category';
  URL_ID = 'http://localhost:3001/api/_id';

  selectedGame: Game = {
    _id: "",
    nombre: "",
    stock: 0,
    categoria: "",
    precio: 0,
    estudio: "",
    lanzamiento: 0,
    pegi: 0,
    plataforma: "",
    img: "",

  };

  juegos: Game[] = [];

  sumidero: string = "";
  sumidero2: string = "";

  getProducts(){
    return this.http.get<Game[]>(this.URL_API);
  }

  getProduct(id: string){
    return this.http.get<Game>(`${this.URL_API}/${id}`);
  }

  createProduct(game: Game){
    delete game._id;
    return this.http.post(this.URL_API, game);
  }

  updateProduct(game: Game){
    return this.http.post(`${this.URL_API}/${game._id}`, game);
  }

  deleteProduct(_id: string){
    return this.http.delete(`${this.URL_API}/${_id}`);
  }

  getCategory(categoryname : string){
    return this.http.get<Game[]>(`${this.URL_CATEGORY}/${categoryname}`);
  }
}
