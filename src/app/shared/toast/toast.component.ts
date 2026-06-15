import { Component } from '@angular/core';
import { Toast, ToastService } from './toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {
  readonly toasts$ = this.toastService.toasts$;

  constructor(private toastService: ToastService) {}

  dismiss(id: number) {
    this.toastService.dismiss(id);
  }

  iconFor(type: Toast['type']): string {
    const icons: Record<Toast['type'], string> = {
      success: 'check_circle',
      error:   'error',
      warning: 'warning',
    };
    return icons[type];
  }

  trackById(_: number, t: Toast) {
    return t.id;
  }
}
