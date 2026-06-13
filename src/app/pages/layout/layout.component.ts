import { Component, ViewChild, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, NavigationEnd } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/login/service/login.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnDestroy {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  isMobile: boolean = false;
  sidenavOpened: boolean = true;
  isCollapsed: boolean = false;
  pageTitle: string = 'Dashboard';
  userName: string = '';

  private routeTitles: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/dashboard/adicionarVenda/visualizarVenda': 'Vendas',
    '/dashboard/graficos': 'Gráficos',
    '/dashboard/produtos': 'Produtos',
    '/dashboard/usuarios': 'Usuários',
  };

  private subs = new Subscription();

  constructor(
    private router: Router,
    private service: LoginService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.userName = this.getUsernameFromToken();
    this.pageTitle = this.routeTitles[this.router.url] || 'Belle Biju';

    this.subs.add(
      this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: any) => {
        this.pageTitle = this.routeTitles[e.urlAfterRedirects] || 'Belle Biju';
        if (this.isMobile) this.sidenav?.close();
      })
    );

    this.subs.add(
      this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.TabletPortrait]).subscribe(result => {
        this.isMobile = result.matches;
        this.sidenavOpened = !result.matches;
        if (result.matches) this.isCollapsed = false;
      })
    );
  }

  get userInitials(): string {
    if (!this.userName) return '?';
    const parts = this.userName.trim().split(/\s+/);
    return parts.length > 1
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : this.userName.charAt(0).toUpperCase();
  }

  private getUsernameFromToken(): string {
    const token = this.service.getToken();
    if (!token) return '';
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub || payload.username || payload.nome || '';
    } catch {
      return '';
    }
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  logout() {
    this.service.isLogout();
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
