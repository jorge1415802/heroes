import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { LoadingService } from './services/loading.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('App Component', () => {
  let component: App;
  let fixture: ComponentFixture<App>;
  let mockLoadingService: Partial<LoadingService>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    mockLoadingService = {
      getValue: () => true,
      sendRequest: jasmine.createSpy('sendRequest').and.returnValue({
        subscribe: jasmine.createSpy('subscribe')
      }),
    };

    await TestBed.configureTestingModule({
      imports: [App, HttpClientTestingModule],
      providers: [
        { provide: LoadingService, useValue: mockLoadingService }
      ]
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the App component', () => {
    expect(component).toBeTruthy();
  });

  it('should call sendRequest() on ngOnInit()', () => {
    expect(mockLoadingService.sendRequest).toHaveBeenCalled();
  });

  it('should compute loading value from service', () => {
    expect(component.loading()).toBeTrue();
  });
});