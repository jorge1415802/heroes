import { Component, computed, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './shared/nav/nav';
import { Loading } from './shared/loading/loading';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NavComponent,Loading],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'heroes';
  private loadingService = inject(LoadingService)
  loading = computed(() => this.loadingService.getValue())

  ngOnInit(): void {
    this.loadingService.sendRequest().subscribe();
  }
  
}
