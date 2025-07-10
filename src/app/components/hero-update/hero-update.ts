import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { HeroesService } from '../../services/heroes.service';
import { HeroInterface } from '../../interfaces/hero.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { TitleCasePipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-hero-update',
  imports: [MatInputModule,MatCardModule,ReactiveFormsModule,MatButtonModule,TitleCasePipe,MatGridListModule],
  templateUrl: './hero-update.html',
  styleUrl: './hero-update.css'
})
export default class HeroUpdate {

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute)
  private heroService = inject(HeroesService)
  private router = inject(Router)
  private loadingService = inject(LoadingService)

  heroId = toSignal(this.route.paramMap.pipe(map(params => params.get('id')))) 
  hero = signal<HeroInterface>({} as HeroInterface)

  heroForm = this.fb.group({
    id : [''],
    name: ['', [Validators.required,Validators.pattern('^[a-zA-Z ]*$')]],
    power: ['',[Validators.required,Validators.pattern('^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?: [A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*$')]],
    city: ['', [Validators.required,Validators.pattern('^[a-zA-Z ]*$')]],
  });

  getHero = effect(() => {
    console.log(this.heroId())
    this.hero.set(this.heroService.getHeroById( Number(this.heroId()) )!)
    this.filloutForm();
    console.log(this.hero())
    
  })

  filloutForm() {
    const { id, name, power, city } = this.hero()
    this.heroForm.reset({
      id : id.toString(),
      name,
      power,
      city
    })
  }

  getfieldError(field: string) : string | null {
   const control = this.heroForm.get(field);
   if (!control) return null;
   const errors = control.errors;
   for (const errorKey of Object.keys(errors || {})) {
     switch (errorKey) {
       case 'required':
         return 'El campo es requerido';
       case 'pattern':
         return 'El campo no cumple con el formato';
       default:
         return 'Error desconocido';
     }
   }
   return null
  }

  updateHero() {
    if(this.heroForm.invalid) return;
    const hero = {
      id : Number(this.heroForm.get('id')!.value),
      name : this.heroForm.get('name')!.value ?? '',
      power : this.heroForm.get('power')!.value ?? '',
      city : this.heroForm.get('city')!.value ?? ''
    }
    this.heroService.updateHero(hero)
    this.loadingService.sendRequest().subscribe();
    this.cancel();
  }

  cancel() {
    this.router.navigate(['/']);
  }



}
