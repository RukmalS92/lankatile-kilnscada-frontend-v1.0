import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appInvDirective]'
})
export class InvDirectiveDirective {

  @HostBinding('class.text-white') private text_white : boolean = true;
  @HostBinding('style.background') private background : string = 'transparent'

  constructor() { }

}
