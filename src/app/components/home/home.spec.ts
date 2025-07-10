import { ComponentFixture, TestBed } from '@angular/core/testing';
import Home from './home';
import { HeroesService } from '../../services/heroes.service';
import { Router } from '@angular/router';
import { LoadingService } from '../../services/loading.service';
import { HttpClientModule } from '@angular/common/http';


describe('Home Component', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let mockRouter: any;
  let mockHeroService: any;

  beforeEach(async () => {
    mockHeroService = {
      getHeroes: jasmine.createSpy('getHeroes').and.returnValue([]),
      getHeroByQuery: jasmine.createSpy('getHeroByQuery').and.returnValue([]),
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      imports: [Home,HttpClientModule],
      providers: [
        { provide: HeroesService, useValue: mockHeroService },
        { provide: Router, useValue: mockRouter },
        LoadingService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the Home component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty inputSearch', () => {
    expect(component.inputForm.value).toEqual({ inputSearch: '' });
  });

  it('should call heroService.getHeroByQuery on searchHero()', () => {
    component.inputForm.get('inputSearch')?.setValue('Superman');
    component.searchHero();

    expect(mockHeroService.getHeroByQuery).toHaveBeenCalledWith('Superman');
  });

  it('should navigate to /hero-register on registerHero()', () => {
    component.registerHero();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/hero-register']);
  });

});