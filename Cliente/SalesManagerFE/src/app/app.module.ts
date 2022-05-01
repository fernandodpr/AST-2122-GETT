import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule }   from '@angular/forms';
import { AppComponent } from './app.component';
import { JuegoComponent } from './components/juego/juego.component';
import { FilterPipe } from './pipes/filter.pipe';
import { VentaComponent } from './components/venta/venta.component';

@NgModule({
  declarations: [
    AppComponent,
    JuegoComponent,
    FilterPipe,
    VentaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
