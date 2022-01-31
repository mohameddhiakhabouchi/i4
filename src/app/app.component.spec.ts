import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';

function myCustomTester(object1: any, object2: any) {
  for (const i in object1)
    if (!object2.hasOwnProperty(i))
      return false;
  return true;

}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, HttpClientModule, ReactiveFormsModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    jasmine.addCustomEqualityTester(myCustomTester);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('app');
  });


  it('retrieves all the cars', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const obj = [{
      total: 5,
      count: 4,
      Data: [
        { 'admin': 'yes' }, { 'user': 'no' }
      ]
    }]
    return app.getObs().toPromise().then((result) => {
      expect(result).toEqual(obj);
    })
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('app app is running!');
  });
});

