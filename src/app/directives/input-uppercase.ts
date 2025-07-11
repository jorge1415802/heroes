import { Directive, HostListener, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[formControlName][inputUppercase]'
})
export class InputUppercase {

  private control = inject(NgControl, {optional : true} );

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;
    const caretPos = input.selectionStart;
    const upper = input.value.toUpperCase();
    this.control?.control?.setValue(upper, { emitEvent: false });
    input.setSelectionRange(caretPos, caretPos);
  }
}
