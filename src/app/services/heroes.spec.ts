import { TestBed } from '@angular/core/testing';
import { HeroesService } from './heroes.service';
import { HeroInterface } from '../interfaces/hero.interface';
import { heroes } from '../utils/data';

describe('Heroes Service', () => {
  let service: HeroesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroesService);
  });

  it('should be created heroes service', () => {
    expect(service).toBeTruthy();
  });
  
  it('should create a new hero', () => {
    const nuevoHeroe: HeroInterface = { id: 0, name: 'Nuevo', power: 'Invisibilidad', city:'Tucuman' };
    service.addHero(nuevoHeroe);
    const resultado = service.getHeroes().find(h => h.name === 'Nuevo');
    expect(resultado).toBeTruthy();
    expect(resultado?.id).toBeGreaterThan(0);
  });
  
  it('should return a hero by id', () => {
    const hero = service.getHeroById(1);
    expect(hero).toEqual(heroes.find(h => h.id === 1));
  });

   it('should delete a hero by id', () => {
    const idAEliminar = 1;
    service.deleteHero(idAEliminar);
    const resultado = service.getHeroById(idAEliminar);
    expect(resultado).toBeUndefined();
  });

  it('should update a hero', () => {
    const original = service.getHeroById(2);
    const actualizado: HeroInterface = { ...original!, name: 'Actualizado' };
    service.updateHero(actualizado);
    const resultado = service.getHeroById(2);
    expect(resultado?.name).toBe('Actualizado');
  });

  it('should add a new hero with generated id', () => {
    const newHero: HeroInterface = {
      id: 0,
      name: 'Green Lantern',
      power: 'Willpower',
      city: 'Sector 2814'
    };

    service.addHero(newHero);
    const result = service.getHeroes();
    const addedHero = result.find(h => h.name === 'Green Lantern');
    
    expect(addedHero).toBeTruthy();
    expect(addedHero?.id).toBeGreaterThan(0);
    expect(result.length).toBe(heroes.length + 1);
  });

  it('should return undefined for unknown hero id', () => {
    const result = service.getHeroById(999999);
    expect(result).toBeUndefined();
  });

   it('should handle case-insensitive queries', () => {
    const hero = service.getHeroes()[0];
    const term = hero.name.toUpperCase();

    service.getHeroByQuery(term);
    const result = service.getHeroes();

    expect(result.some(h => h.name === hero.name)).toBeTrue();
  });

  it('should filter heroes by name with query', () => {
    const hero = service.getHeroes()[0];
    const term = hero.name.slice(0, 3);

    service.getHeroByQuery(term);
    const result = service.getHeroes();

    expect(result.every(h => h.name.toLowerCase().includes(term.toLowerCase()))).toBeTrue();
  });




});
