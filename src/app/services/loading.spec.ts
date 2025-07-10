import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('Loading', () => {
  let service: LoadingService;
  let httpTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(LoadingService);
    httpTestingController = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set loading to true when show() is called', () => {
    service.hide();
    service.show();
    expect(service.getValue()).toBeTrue();
  });

  it('should set loading to false when hide() is called', () => {
    service.show();
    service.hide();
    expect(service.getValue()).toBeFalse();
  });

});
