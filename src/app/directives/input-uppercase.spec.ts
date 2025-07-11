import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { InputUppercase } from './input-uppercase';
import { By } from '@angular/platform-browser';


@Component({
  standalone: true,
  imports: [ReactiveFormsModule, InputUppercase],
  template: `
    <form [formGroup]="form">
      <input formControlName="name" inputUppercase />
    </form>
  `
})
class TestComponent {
  form = new FormGroup({
    name: new FormControl('')
  });
}

describe('InputUppercase Directive', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent]
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should transform input value to uppercase', () => {
    const input = fixture.debugElement.query(By.css('input')).nativeElement;

    input.value = 'jorge';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.form.get('name')?.value).toBe('JORGE');
  });

  it('should preserve caret position after transformation', () => {
    const input = fixture.debugElement.query(By.css('input')).nativeElement;

    input.value = 'jorge';
    input.setSelectionRange(5, 5);
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(input.selectionStart).toBe(5);
    expect(input.selectionEnd).toBe(5);
  });

  it('should handle empty input value', () => {
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = '';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.form.get('name')?.value).toBe('');
  });

  it('should transform mixed case input to uppercase', () => {
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = 'JoRgE2024!';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.form.get('name')?.value).toBe('JORGE2024!');
  });


});