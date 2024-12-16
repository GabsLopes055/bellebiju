import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective {
  @Input('appTooltip') tooltipText!: string;
  tooltipElement: any;
  @Input() tooltipPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';

  showTimeout: any;
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.showTimeout = setTimeout(() => {
      this.showTooltip();
    }, 600);
  }

  @HostListener('mouseleave') onMouseLeave() {
    clearTimeout(this.showTimeout);
    this.hideTooltip();
  }

  private showTooltip() {
    this.tooltipElement = this.renderer.createElement('span');
    this.renderer.appendChild(
      this.tooltipElement,
      this.renderer.createText(this.tooltipText)
    );

    this.renderer.appendChild(this.el.nativeElement, this.tooltipElement);
    this.renderer.addClass(this.tooltipElement, 'tooltip');

    const rect = this.el.nativeElement.getBoundingClientRect();
    let top, left;

    switch (this.tooltipPosition) {
      case 'top':
        top = rect.top + window.scrollY - this.tooltipElement.offsetHeight - 10;
        left = rect.left + window.scrollX + (rect.width - this.tooltipElement.offsetWidth) / 2;
        break;
      case 'bottom':
        top = rect.top + window.scrollY + rect.height + 10;
        left = rect.left + window.scrollX + (rect.width - this.tooltipElement.offsetWidth) / 2;
        break;
      case 'left':
        top = rect.top + window.scrollY + (rect.height - this.tooltipElement.offsetHeight) / 2;
        left = rect.left + window.scrollX - this.tooltipElement.offsetWidth - 10;
        break;
      case 'right':
        top = rect.top + window.scrollY + (rect.height - this.tooltipElement.offsetHeight) / 2;
        left = rect.left + window.scrollX + rect.width + 10;
        break;
    }

    this.renderer.setStyle(this.tooltipElement, 'top', `${top}px`);
    this.renderer.setStyle(this.tooltipElement, 'left', `${left}px`);
  }

  private hideTooltip() {
    if (this.tooltipElement) {
      this.renderer.removeChild(this.el.nativeElement, this.tooltipElement);
      this.tooltipElement = null;
    }
  }

}
