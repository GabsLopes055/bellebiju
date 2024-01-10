import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TextTitleService {

  private texto = new BehaviorSubject<string>('Dashboard');
  textoAtual = this.texto.asObservable();

  constructor() {}

  atualizarTexto(novoTexto: string) {
    this.texto.next(novoTexto);
  }

}
