import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { HeroesService } from '../../services/heroes.service';
import { Router } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { LoadingService } from '../../services/loading.service';
import { InputUppercase } from '../../directives/input-uppercase';


@Component({
  selector: 'app-hero-register',
  imports: [MatInputModule,MatCardModule,ReactiveFormsModule,MatButtonModule,InputUppercase,MatGridListModule],
  templateUrl: './hero-register.html',
  styleUrl: './hero-register.css'
})
export default class HeroRegister {

  private fb = inject(FormBuilder);
  private heroService = inject(HeroesService)
  private router = inject(Router)
  private loadingService = inject(LoadingService)

  heroForm = this.fb.group({
    id : [''],
    name: ['', [Validators.required,Validators.pattern('^[a-zA-Z ]*$')]],
    power: ['',[Validators.required,Validators.pattern('^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?: [A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*$')]],
    city: ['', [Validators.required,Validators.pattern('^[a-zA-Z ]*$')]],
  });

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

  registerHero() {
    if(this.heroForm.invalid) return;
    const hero = {
      id : Number(this.heroForm.get('id')!.value),
      name : this.heroForm.get('name')!.value ?? '',
      power : this.heroForm.get('power')!.value ?? '',
      city : this.heroForm.get('city')!.value ?? ''
    }
    this.heroService.addHero(hero)
    this.loadingService.sendRequest().subscribe();
    this.cancel()
  }

  cancel() {
    this.router.navigate(['/'])
  }



}
