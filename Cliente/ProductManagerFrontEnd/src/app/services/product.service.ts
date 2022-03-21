import {Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Game} from '../models/game';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient){}
  URL_API = 'http://localhost:3001/api/product'
  
  selectedGame: Game;
  juegos: Game[] = [];


  getProducts(){
    return this.http.get<Game[]>(this.URL_API);
  }


}
