import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable, Injector, Type } from '@angular/core';
import { Toast, ToastComponent } from './toast.component';

interface ComponentWithData {
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  notification!: Toast;

  private overlayRef: OverlayRef | null = null;

  constructor(
    private overlay: Overlay,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) { }

  notify(notification: Toast) {
    this.closeToast();
    this.notification = notification;
    if(this.notification) {
      this.openToast();
    }
  }

  private openToast(): ComponentRef<any> {
    // Close any existing side panel
    this.closeToast();

    // Create overlay
    this.overlayRef = this.overlay.create({
      positionStrategy: this.overlay.position().global()
    });

    // Create component portal
    const componentPortal = new ComponentPortal(ToastComponent);

    // Attach component to overlay
    const componentRef = this.overlayRef.attach(componentPortal);

    // Make sure to detach the component when overlay is detached
    this.overlayRef.detachments().subscribe(() => {
      if (componentRef) {
        componentRef.destroy();
      }
    });

    // Insert component into Angular's component tree
    this.appRef.attachView(componentRef.hostView);

    return componentRef;
  }

  closeToast() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
}
