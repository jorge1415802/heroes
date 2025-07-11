import { TitleCasePipe } from '@angular/common';
import { Component,inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { HeroesService } from '../../services/heroes.service';
import Table from '../table/table';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-home',
  imports: [MatInputModule, ReactiveFormsModule, TitleCasePipe, Table, MatButtonModule, MatGridListModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export default class Home {
  private fb = inject(FormBuilder);
  private heroService = inject(HeroesService)
  private router = inject(Router)

  inputForm = this.fb.group({
    inputSearch : ['']
  });

  searchHero() {
    this.heroService.getHeroByQuery(this.inputForm.get('inputSearch')!.value!)
  }

  registerHero() {
    this.router.navigate(['/hero-register'])
  }



}
