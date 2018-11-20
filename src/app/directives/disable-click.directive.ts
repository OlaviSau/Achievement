import {Directive, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[adDisableClick]'
})
export class DisableClickDirective {

  @Input('adDisableClick')
  private condition = true;

  @HostListener('mousedown', ['$event']) onEnter(event: Event) {
    if (this.condition) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
    }
  }

}
