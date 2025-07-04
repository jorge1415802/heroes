import { Injectable, signal } from '@angular/core';
import { heroes } from '../utils/data';
import type{ HeroInterface } from '../interfaces/hero.interface';


@Injectable({providedIn: 'root'})
export class HeroesService {
    static deleteHero(deleteHero: any) {
      throw new Error('Method not implemented.');
    }
    private dataHero = signal<HeroInterface[]>(heroes)
    private initDataHero = signal<HeroInterface[]>(heroes)

    addHero(hero: HeroInterface) {
        const currentHeroes = this.dataHero();
        hero.id = currentHeroes.length + 1; // Assign a new ID
        this.dataHero.update(heroes => [...heroes, hero]);
    }

    getHeroes() {
        return this.dataHero();
    }

    deleteHero(id : number) {
        return this.dataHero.update(heroes => heroes.filter(hero => hero.id !== id))
    }

    updateHero(hero : HeroInterface) {
        this.dataHero.update(heroes => {
            return heroes.map(element => {
                if(element.id === hero.id) return hero
                else return element
            })
        })
    }

    getHeroById(id : number) {
        return this.getHeroes().find(hero => hero.id === id)
    }

    getHeroByQuery(query : string) {
        if(query.length === 0) this.dataHero.set(this.initDataHero())
        else {
            const result =  this.getHeroes().filter(hero => hero.name.toLowerCase().includes(query.toLowerCase()));
            this.dataHero.set(result)
        }
    }
}