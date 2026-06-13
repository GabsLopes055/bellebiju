import { Component } from '@angular/core';
import { LoginService } from 'src/app/login/service/login.service';
import { venda } from 'src/app/shared/models/venda';
import { VendasService } from '../../vendas/service/vendas.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  date = new Date();
  isLoadingKpis = true;

  totalVendidoHoje = 0;
  vendasHoje = 0;
  produtosVendidosHoje = 0;
  ticketMedioHoje = 0;

  userName = '';

  constructor(private service: VendasService, private loginService: LoginService) {
    this.userName = this.getUserName();
    this.carregarKpisHoje();
  }

  private getUserName(): string {
    const token = this.loginService.getToken();
    if (!token) return '';
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub || payload.username || payload.nome || '';
    } catch {
      return '';
    }
  }

  private carregarKpisHoje() {
    const today = this.getTodayStr();
    this.service.pesquisarPorVenda(today, today).subscribe({
      next: (vendas) => {
        this.calcularKpis(vendas ?? []);
        this.isLoadingKpis = false;
      },
      error: () => { this.isLoadingKpis = false; },
    });
  }

  private calcularKpis(vendas: venda[]) {
    this.vendasHoje = vendas.length;
    this.totalVendidoHoje = vendas.reduce((sum, v) => sum + (v.total || 0), 0);
    this.produtosVendidosHoje = vendas.reduce((sum, v) => sum + (v.quantidade || 0), 0);
    this.ticketMedioHoje = this.vendasHoje > 0 ? this.totalVendidoHoje / this.vendasHoje : 0;
  }

  private getTodayStr(): string {
    const d = this.date;
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  get saudacao(): string {
    const h = this.date.getHours();
    if (h < 12) return 'Bom dia';
    if (h < 18) return 'Boa tarde';
    return 'Boa noite';
  }

  get primeiroNome(): string {
    return this.userName.trim().split(/\s+/)[0] || 'usuário';
  }

  get dataFormatada(): string {
    return this.date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
