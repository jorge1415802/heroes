import { Component, effect, inject, signal, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { HeroesService } from '../../services/heroes.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HeroInterface } from '../../interfaces/hero.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteMessage } from '../../shared/delete-message/delete-message';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-table',
  imports: [MatPaginatorModule,MatTableModule,MatButtonModule,MatIconModule,MatDialogModule],
  templateUrl: './table.html',
  styleUrl: './table.css'
})
export default class Table {
  
  heroesService = inject(HeroesService);
  router = inject(Router);
  dialog = inject(MatDialog)
  private loadingService = inject(LoadingService)
  
  data = signal<HeroInterface[]>([])
  dataSource = new MatTableDataSource<HeroInterface>([]);
  displayedColumns: string[] = ['id', 'name', 'city', 'power','update','delete'];

   @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    this.data.set(this.heroesService.getHeroes().slice(0, 30));
    effect(() => {
      this.dataSource.data = this.data();
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  getDataFromService = effect(() => {
    this.data.set(this.heroesService.getHeroes())
  })

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  deleteHero(id : number) {
    const dialog = this.dialog.open(DeleteMessage,{
      width: '300px',
    });
    dialog.afterClosed().subscribe(resp => {
      if(resp === 'ok') {
        this.heroesService.deleteHero(id)
        this.loadingService.sendRequest().subscribe();
      }  
    })
  }

  updateHero(hero : HeroInterface) {
    this.router.navigate(['/hero-update',hero.id])
  }


}
