import { ToastService } from './toast.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {

  @Input() color: TypeColorsToast = 'SUCCESS';

  notification: Toast = this.service.notification;


  colors: Colors = {
    SUCCESS: '#59E98E',
    ERROR: '#F57F8D',
    WARNING: '#FE9E59',
    INFO: '#5BBDF1',
  }
  icons: Colors = {
    SUCCESS: 'check_circle',
    ERROR: 'cancel',
    WARNING: 'warning',
    INFO: 'info',
  }

  constructor(
    private readonly service: ToastService
  ) {
    setTimeout(() => {
      this.service.closeToast();
    }, 3000);

  }

}
export interface Toast {
  message: string;
  type: TypeColorsToast,
}

type TypeColorsToast = 'SUCCESS' | 'ERROR' | 'WARNING' | 'INFO';

type Colors = {
  [key in TypeColorsToast]: string;
}