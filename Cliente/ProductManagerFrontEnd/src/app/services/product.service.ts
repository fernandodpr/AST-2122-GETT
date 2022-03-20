import {Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient){}
  URL_API = 'http://localhost:3001/api/product'
  

  getProducts(){
    return this.http.get(this.URL_API);
    
  }


}
