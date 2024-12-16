import { Component, Input } from '@angular/core';
import { HistoricoUsuarioComponent } from "../historico-usuario/historico-usuario.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { TextareaComponent } from "../textarea/textarea.component";

@Component({
  selector: 'app-solicitacao-aprovacao',
  standalone: true,
  imports: [HistoricoUsuarioComponent, TextareaComponent, SidebarComponent],
  templateUrl: './solicitacao-aprovacao.component.html',
  styleUrl: './solicitacao-aprovacao.component.scss'
})
export class SolicitacaoAprovacaoComponent {
}
