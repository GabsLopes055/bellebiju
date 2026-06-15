import { Component, OnDestroy } from '@angular/core';
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
  isMobile      = false;
  drawerOpen    = false;
  isCollapsed   = false;
  pageTitle     = 'Dashboard';
  userName      = '';

  private routeTitles: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/dashboard/adicionarVenda/visualizarVenda': 'Vendas',
    '/dashboard/graficos': 'Gráficos',
    '/dashboard/produtos': 'Produtos',
    '/dashboard/usuarios': 'Usuários',
    '/dashboard/categorias': 'Categorias',
  };

  private subs = new Subscription();

  constructor(
    private router: Router,
    private service: LoginService,
    private breakpointObserver: BreakpointObserver,
  ) {
    this.userName  = this.getUsernameFromToken();
    this.pageTitle = this.routeTitles[this.router.url] || 'Belle Biju';

    this.subs.add(
      this.router.events
        .pipe(filter(e => e instanceof NavigationEnd))
        .subscribe((e: any) => {
          this.pageTitle = this.routeTitles[e.urlAfterRedirects] || 'Belle Biju';
          this.drawerOpen = false;
        }),
    );

    this.subs.add(
      this.breakpointObserver
        .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
        .subscribe(result => {
          this.isMobile = result.matches;
        }),
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

  toggleDrawer()   { this.drawerOpen  = !this.drawerOpen; }
  closeDrawer()    { this.drawerOpen  = false; }
  toggleCollapse() { this.isCollapsed = !this.isCollapsed; }

  logout() {
    this.service.isLogout();
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  ngOnDestroy() { this.subs.unsubscribe(); }
}
