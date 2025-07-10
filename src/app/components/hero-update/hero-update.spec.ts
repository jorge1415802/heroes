import { ComponentFixture, TestBed } from '@angular/core/testing';
import HeroUpdate from './hero-update';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { of } from 'rxjs';
import { LoadingService } from '../../services/loading.service';
import { HttpClientModule } from '@angular/common/http';

describe('HeroUpdate', () => {
    let component: HeroUpdate;
    let fixture: ComponentFixture<HeroUpdate>;
    let mockRouter: any;
    let mockHeroService: any;

    beforeEach(async () => {
        mockRouter = {
            navigate: jasmine.createSpy('navigate')
        };

        mockHeroService = {
            getHeroById: jasmine.createSpy('getHeroById').and.returnValue({
                id: 1,
                name: 'Superman',
                power: 'Volar',
                city: 'Metrópolis'
            }),
            updateHero: jasmine.createSpy('updateHero')
        };

        await TestBed.configureTestingModule({
            imports: [HeroUpdate,HttpClientModule],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        paramMap: of(new Map().set('id', '1'))
                    }
                },
                { provide: Router, useValue: mockRouter },
                { provide: HeroesService, useValue: mockHeroService },
                LoadingService
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(HeroUpdate);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should update hero and navigate on valid form', () => {
        component.heroForm.setValue({
            id: '1',
            name: 'Batman',
            power: 'Estrategia',
            city: 'Gotham'
        });

        component.updateHero();

        expect(mockHeroService.updateHero).toHaveBeenCalledWith({
            id: 1,
            name: 'Batman',
            power: 'Estrategia',
            city: 'Gotham'
        });

        expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
    });

    it('should not call updateHero if form is invalid', () => {
        component.heroForm.setValue({
            id: '',
            name: '',
            power: 'Invisibilidad',
            city: 'Bahía'
        });

        component.updateHero();

        expect(mockHeroService.updateHero).not.toHaveBeenCalled();
        expect(mockRouter.navigate).not.toHaveBeenCalled();
    });

    it('should navigate on cancel', () => {
        component.cancel();
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
    });

    it('should fill the form with hero data', () => {
        component.hero.set({
            id: 2,
            name: 'Flash',
            power: 'Velocidad',
            city: 'Central City'
        });

        component.filloutForm();

        expect(component.heroForm.value).toEqual({
            id: '2',
            name: 'Flash',
            power: 'Velocidad',
            city: 'Central City'
        });
    });

    it('should render the page title and section title', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('h1')?.textContent).toContain('Edicion de heroe');
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

    it('should call updateHero on "Actualizar" click', () => {
        spyOn(component, 'updateHero');
        const button = fixture.nativeElement.querySelector('button:nth-of-type(1)');
        button.click();
        expect(component.updateHero).toHaveBeenCalled();
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

    it('should return first error if multiple errors exist', () => {
  component.heroForm.get('name')?.setErrors({ required: true, pattern: true });
  expect(component.getfieldError('name')).toBe('El campo es requerido');
});

it('should return null if control has no errors', () => {
  component.heroForm.get('name')?.setErrors(null);
  expect(component.getfieldError('name')).toBeNull();
});

});