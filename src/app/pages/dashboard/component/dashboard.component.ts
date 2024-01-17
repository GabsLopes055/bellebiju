import { Component } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { VendasService } from '../../vendas/service/vendas.service';
import { venda } from 'src/app/shared/models/venda';
import { PermissionUser } from 'src/app/shared/userLogged/permissionUser.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  date = new Date();
  opened: boolean = false;
  dataSource!: venda[];
  vendasRealizadas!: number;
  totalVendido!: number;
  produtosVendidos!: number;

  constructor(
    private router: Router,
    private service: VendasService,
    private permission: PermissionUser
  ) {
    this.service
      .listAllVendas()
      .subscribe(
        (response) => (
          (this.dataSource = response),
          this.preencherModalInformacoes(),
          this.calcularTotalVendido()
        )
      );
  }

  ngOnInit() {
    if (this.permission.hasPermission('USER')) {
      this.router.navigate(['dashboard/adicionarVenda']);
    }
  }

  usuarios() {
    this.router.navigate(['dashboard/usuarios']);
  }

  preencherModalInformacoes() {
    this.vendasRealizadas = this.dataSource.length;
  }

  calcularTotalVendido() {
    this.totalVendido = 0;
    this.produtosVendidos = 0;

    for (let i = 0; i < this.dataSource.length; i++) {
      const valorTotal = this.dataSource[i].total;
      const quantidadeProdutos = this.dataSource[i].quantidade;
      this.totalVendido += valorTotal;
      this.produtosVendidos += quantidadeProdutos;
    }
  }
}
