import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[adBlurOnEnter]'
})
export class BlurOnEnterDirective {

  @HostListener('keydown.enter') onEnter() {
    this.elementRef.nativeElement.blur();
  }
  constructor(private elementRef: ElementRef) {}
}
