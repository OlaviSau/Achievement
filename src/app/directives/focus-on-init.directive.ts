import {AfterViewInit, Directive, ElementRef, Input, OnInit, Renderer} from '@angular/core';

@Directive({
  selector: '[adFocusOnInit]'
})

export class FocusOnInitDirective implements OnInit, AfterViewInit {

  constructor(public renderer: Renderer, public elementRef: ElementRef) {
  }

  static instances: FocusOnInitDirective[] = [];

  @Input('adFocusOnInit')
  priority = 0;

  ngOnInit(): void {
    FocusOnInitDirective.instances.push(this);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      FocusOnInitDirective.instances.splice(FocusOnInitDirective.instances.indexOf(this), 1);
    });

    if (FocusOnInitDirective.instances.every((i) => this.priority >= i.priority)) {
      this.renderer.invokeElementMethod(
        this.elementRef.nativeElement, 'focus', []);
    }
  }
}
