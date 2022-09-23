import { Directive, HostListener, Input } from '@angular/core';
import { alphanumericRegex } from '../utils/regex';

@Directive({
  selector: '[appNumbersOnly]',
})
export class NumbersOnlyDirective {
  @Input() onlyNumber = false;

  @HostListener('keypress', ['$event']) onKeyPress(event) {
    if (this.onlyNumber) {
      const charCode = event.which ? event.which : event.keyCode;
      if (charCode < 48 || charCode > 57) {
        event.preventDefault();
        return false;
      } else {
        return true;
      }
    } else {
      const inp = String.fromCharCode(event.keyCode);

      if (alphanumericRegex.test(inp)) {
        return true;
      } else {
        event.preventDefault();
        return false;
      }
    }
  }
}
