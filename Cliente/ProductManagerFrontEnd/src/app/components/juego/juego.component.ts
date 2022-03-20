import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {

  constructor(private ProductService: ProductService) { }

  ngOnInit(): void {
    this.ProductService.getProducts().subscribe(
      res => console.log(res),
      err => console.log(err) 
    ) 
  }

}
