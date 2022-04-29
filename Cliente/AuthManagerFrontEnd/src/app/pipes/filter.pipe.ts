import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args: any): any {
    const resultGame = [];
    for(const juego of value){
      if(juego.nombre == undefined){}
      else if(juego.nombre.indexOf(args) > -1){
        resultGame.push(juego);
      };
    };
    return resultGame;
  }
}
