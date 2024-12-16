import { Component } from '@angular/core';

import { ButtonComponent } from '../button/button.component';
import { DividerComponent } from '../divider/divider.component';

@Component({
  selector: 'tgt-historico-usuario',
  standalone: true,
  templateUrl: './historico-usuario.component.html',
  styleUrl: './historico-usuario.component.scss',
  imports: [ButtonComponent, DividerComponent],
})
export class HistoricoUsuarioComponent {

  mostrarMais: boolean = false;

  abrirMaisInformacoes() {
    if (!this.mostrarMais) {
      this.mostrarMais = !this.mostrarMais;
    } else {
      this.mostrarMais = false;
    }
  }
}
