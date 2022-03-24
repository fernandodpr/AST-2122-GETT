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

  selectedGame: Game = {
    nombre: "",
    stock: 0,
    categoria: "",
    precio: 0,
    estudio: "",
    lanzamiento: 0,
    pegi: 0,
    plataforma: "",
    img: "",
    _id: ""
  };

  juegos: Game[] = [];

  getProducts(){
    return this.http.get<Game[]>(this.URL_API);
  }

  createProduct(game: Game){
    return this.http.post(this.URL_API, game);
  }

  updateProduct(game: Game){
    return this.http.post(`${this.URL_API}/${game._id}`, game);
  }

  deleteProduct(_id: string){
    return this.http.delete(`${this.URL_API}/${_id}`);
  }
}
