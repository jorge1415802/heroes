import { ComponentFixture, TestBed } from '@angular/core/testing';

import Table from './table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeroesService } from '../../services/heroes.service';
import { Router } from '@angular/router';
import { HeroInterface } from '../../interfaces/hero.interface';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
import { LoadingService } from '../../services/loading.service';
import { HttpClientModule } from '@angular/common/http';

describe('Table', () => {
  let component: Table;
  let fixture: ComponentFixture<Table>;
  let heroesServiceSpy: jasmine.SpyObj<HeroesService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let dialogMock: jasmine.SpyObj<MatDialog>;


  const mockHeroes: HeroInterface[] = [
    { id: 1, name: 'Batman', city: 'Gotham', power: 'Detective' },
    { id: 2, name: 'Superman', city: 'Metropolis', power: 'Flight' }
  ];



  beforeEach(async () => {
    heroesServiceSpy = jasmine.createSpyObj('HeroesService', ['getHeroes', 'deleteHero']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    dialogMock = jasmine.createSpyObj('MatDialog', ['open']);


    await TestBed.configureTestingModule({
      imports: [Table, MatPaginatorModule, MatButtonModule, MatIconModule, MatDialogModule,HttpClientModule],
      providers: [
        { provide: HeroesService, useValue: heroesServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: MatDialog, useValue: dialogMock },
        LoadingService
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

  it('should call deleteHero from service if dialog confirms', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of('ok') });
    const openSpy = spyOn(component.dialog, 'open').and.returnValue(dialogRefSpyObj);
    component.deleteHero(42);
    expect(openSpy).toHaveBeenCalled();
    expect(component.heroesService.deleteHero).toHaveBeenCalledWith(42);
  });

  it('should not call deleteHero if dialog result is not ok', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of('cancel') });
    spyOn(component.dialog, 'open').and.returnValue(dialogRefSpyObj);

    component.deleteHero(99);

    expect(component.heroesService.deleteHero).not.toHaveBeenCalled();
  });

  // it('should navigate to hero-register', () => {
  //   component.addHero();
  //   expect(routerSpy.navigate).toHaveBeenCalledWith(['/hero-register']);
  // });

  it('should navigate to hero-update', () => {
    component.updateHero(mockHeroes[1]);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/hero-update', 2]);
  });

});
