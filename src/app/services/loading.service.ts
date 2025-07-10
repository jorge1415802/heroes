import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private http = inject(HttpClient)
  private loading = signal(true);
  

  show() {
    this.loading.set(true)
  }

  hide() {
    this.loading.set(false)
  }

  getValue() {
    return this.loading();
  }

  sendRequest() {
    return this.http.get('https://catfact.ninja/fact');
  }
}
