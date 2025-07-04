import { ComponentFixture, TestBed } from '@angular/core/testing';

import Table from './table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeroesService } from '../../services/heroes.service';
import { Router } from '@angular/router';
import { HeroInterface } from '../../interfaces/hero.interface';

describe('Table', () => {
  let component: Table;
  let fixture: ComponentFixture<Table>;
  let heroesServiceSpy: jasmine.SpyObj<HeroesService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockHeroes: HeroInterface[] = [
    { id: 1, name: 'Batman', city: 'Gotham', power: 'Detective' },
    { id: 2, name: 'Superman', city: 'Metropolis', power: 'Flight' }
  ];



  beforeEach(async () => {
    heroesServiceSpy = jasmine.createSpyObj('HeroesService', ['getHeroes', 'deleteHero']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [Table, MatPaginatorModule, MatButtonModule, MatIconModule],
      providers: [
        { provide: HeroesService, useValue: heroesServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]

    })
    .compileComponents();

    heroesServiceSpy.getHeroes.and.returnValue(mockHeroes);

    fixture = TestBed.createComponent(Table);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load heroes', () => {
    expect(component.data().length).toBe(2);
    expect(component.dataSource.data).toEqual(mockHeroes.slice(0, 30));
  });

  it('should navigate to hero-register', () => {
    component.addHero(mockHeroes[0]);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/hero-register']);
  });

  it('should navigate to hero-update', () => {
    component.updateHero(mockHeroes[1]);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/hero-update', 2]);
  });

  it('should call delete hero from service', () => {
    component.deleteHero(1);
    expect(heroesServiceSpy.deleteHero).toHaveBeenCalledWith(1);
  });



});
