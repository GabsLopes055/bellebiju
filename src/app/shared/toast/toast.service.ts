import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ToastType = 'success' | 'error' | 'warning';

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
  exiting: boolean;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private _toasts$ = new BehaviorSubject<Toast[]>([]);
  readonly toasts$ = this._toasts$.asObservable();

  private nextId = 0;
  private readonly DURATION = 4000;
  private readonly EXIT_DURATION = 300;

  show(message: string, type: ToastType = 'success') {
    const id = ++this.nextId;
    this._toasts$.next([...this._toasts$.value, { id, message, type, exiting: false }]);

    setTimeout(() => this.startExit(id), this.DURATION);
  }

  private startExit(id: number) {
    this._toasts$.next(
      this._toasts$.value.map(t => t.id === id ? { ...t, exiting: true } : t)
    );
    setTimeout(() => this.remove(id), this.EXIT_DURATION);
  }

  dismiss(id: number) {
    this.startExit(id);
  }

  private remove(id: number) {
    this._toasts$.next(this._toasts$.value.filter(t => t.id !== id));
  }

  // Compatibilidade com a assinatura existente nos serviços
  showMessage(msg: string, color: string) {
    const type: ToastType =
      color === 'success' ? 'success' :
      color === 'error'   ? 'error'   : 'warning';
    this.show(msg, type);
  }
}
