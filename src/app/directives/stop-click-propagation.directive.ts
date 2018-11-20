import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[adStopClickPropagation]'
})
export class StopClickPropagationDirective {
  @HostListener('click', ['$event'])
  public onClick(event: Event): void {
    event.stopPropagation();
  }
}
