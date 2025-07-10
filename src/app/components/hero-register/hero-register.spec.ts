import { ComponentFixture, TestBed } from '@angular/core/testing';
import HeroRegister from './hero-register';
import { Router } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { of } from 'rxjs';
import { LoadingService } from '../../services/loading.service';
import { HttpClientModule } from '@angular/common/http';

describe('HeroRegister', () => {
    let component: HeroRegister;
    let fixture: ComponentFixture<HeroRegister>;
    let mockHeroService: any;
    let mockRouter: any;

    beforeEach(async () => {
        mockHeroService = {
            addHero: jasmine.createSpy('addHero').and.returnValue(of(true))
        };

        mockRouter = {
            navigate: jasmine.createSpy('navigate')
        };

        await TestBed.configureTestingModule({
            imports: [HeroRegister,HttpClientModule],
            providers: [
                { provide: HeroesService, useValue: mockHeroService },
                { provide: Router, useValue: mockRouter },
                LoadingService
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(HeroRegister);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call addHero and navigate on valid form', () => {
        component.heroForm.setValue({
            id: '1',
            name: 'Iron Man',
            power: 'Ingeniería',
            city: 'New York'
        });
        component.registerHero();
        expect(mockHeroService.addHero).toHaveBeenCalledWith({
            id: 1,
            name: 'Iron Man',
            power: 'Ingeniería',
            city: 'New York'
        });
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);

    });

    it('should not call addHero if form is invalid', () => {
        component.heroForm.setValue({
            id: '',
            name: '',
            power: 'Volar',
            city: 'Mendoza'
        });

        component.registerHero();

        expect(mockHeroService.addHero).not.toHaveBeenCalled();
        expect(mockRouter.navigate).not.toHaveBeenCalled();
    });

    it('should navigate to root on cancel', () => {
        component.cancel();

        expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
    });

    it('should render the page title and section title', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('h1')?.textContent).toContain('Registro de heroe');
        expect(compiled.querySelector('mat-card-title')?.textContent).toContain('Datos del heroe');
    });

    it('should display the hero image with correct src and alt', () => {
        const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
        expect(img).toBeTruthy();
        expect(img.src).toContain('encrypted-tbn0.gstatic.com/images');
        expect(img.alt).toBe('register-hero-photo');
    });

    it('should have a form bound to heroForm', () => {
        const formEl = fixture.nativeElement.querySelector('form');
        expect(formEl).toBeTruthy();
        expect(component.heroForm).toBeTruthy();
    });

    it('should render form fields for name, power and city', () => {
        const compiled = fixture.nativeElement;
        const inputs = compiled.querySelectorAll('input[matInput]');
        expect(inputs.length).toBe(3);

        expect(compiled.querySelector('mat-label')?.textContent).toContain('Nombre del heroe');
    });

    it('should call registerHero on "Registrar" click', () => {
        spyOn(component, 'registerHero');
        const button = fixture.nativeElement.querySelector('button:nth-of-type(1)');
        button.click();
        expect(component.registerHero).toHaveBeenCalled();
    });

    it('should call cancel on "Cancelar" click', () => {
        spyOn(component, 'cancel');
        const buttons = fixture.nativeElement.querySelectorAll('button');
        const cancelButton = buttons[1];
        cancelButton.click();
        fixture.detectChanges();
        expect(component.cancel).toHaveBeenCalled()
    });

    it('should return required error', () => {
        component.heroForm.get('name')?.setErrors({ required: true });
        expect(component.getfieldError('name')).toBe('El campo es requerido');
    });

    it('should return pattern error', () => {
        component.heroForm.get('name')?.setErrors({ pattern: true });
        expect(component.getfieldError('name')).toBe('El campo no cumple con el formato');
    });

    it('should return unknown error', () => {
        component.heroForm.get('name')?.setErrors({ custom: true });
        expect(component.getfieldError('name')).toBe('Error desconocido');
    });

    it('should return null if control not found', () => {
        expect(component.getfieldError('notAField')).toBeNull();
    });
});