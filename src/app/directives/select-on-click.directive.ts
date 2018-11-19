import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[adSelectOnClick]'
})
export class SelectOnClickDirective {

  @Input('adSelectOnClick')
  private target: HTMLElement;

  @HostListener('click') onEnter() {
    setTimeout(() => {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(this.target);
      selection.removeAllRanges();
      selection.addRange(range);
    });
  }
}
