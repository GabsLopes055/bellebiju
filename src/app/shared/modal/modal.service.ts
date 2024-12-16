import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable, Injector, Type } from '@angular/core';
import {Subject} from "rxjs";


interface ComponentWithData {
  data: any;
}


@Injectable({
  providedIn: 'root'
})

export class ModalService {
  private overlayRef: OverlayRef | null = null;

  private closeRef = new Subject();

  constructor(
    private overlay: Overlay,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) { }

  openWithData<T extends ComponentWithData>(component: Type<T>, data?: any): {
    ref: ComponentRef<T>, closed: Subject<any>
  } {
    // Close any existing side panel
    this.close();

    // Create overlay
    this.overlayRef = this.overlay.create({
      positionStrategy: this.overlay.position().global()
    });

    // Create component portal
    const componentPortal = new ComponentPortal(component);

    // Attach component to overlay
    const componentRef = this.overlayRef.attach<T>(componentPortal);

    componentRef.instance.data = data;

    // Make sure to detach the component when overlay is detached
    this.overlayRef.detachments().subscribe(() => {
      if (componentRef) {
        componentRef.destroy();
      }
    });

    // Insert component into Angular's component tree
    this.appRef.attachView(componentRef.hostView);
    this.closeRef = new Subject();
    return {ref: componentRef, closed: this.closeRef};
  }

  open(component: any): {
    ref: ComponentRef<any>, afterClosed: Subject<any>
  } {
    // Close any existing side panel
    this.close();

    // Create overlay
    this.overlayRef = this.overlay.create({
      positionStrategy: this.overlay.position().global()
    });

    // Create component portal
    const componentPortal = new ComponentPortal(component);

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
    this.closeRef = new Subject();
    return {ref: componentRef, afterClosed: this.closeRef};
  }

  close(data?: any) {
    if (data) {
      this.closeRef.next(data);
    }
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
}
