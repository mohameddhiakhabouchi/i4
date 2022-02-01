import { Component, NgZone, ViewChild } from '@angular/core';
import { ChildComponent } from './child/child.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createReducer } from '@ngrx/store';
import { from, Observable, of, share } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: any = 'app';
  @ViewChild(ChildComponent)
  child!: ChildComponent;
  data = {
    name: 'aaa',
    email: 'mdk@gmail.com'
  }
  registerForm: FormGroup;
  submitted = false;
  res: any = [];

  personnes = [
    { nom: "Alice", age: 21 },
    { nom: "Bob", age: 20 },
    { nom: "Charlie", age: 20 }
  ];
  personnesParAge: any;
  encoded: string = '';
  constructor(private zone: NgZone,
    private http: HttpClient, private formBuilder: FormBuilder, private route: ActivatedRoute) {

    this.route.queryParamMap
    const user_data: User = new User();
    user_data.Email = 'InventoryAdmin@abc.com';
    user_data.Password = '$admin@2017'
    this.http.post('https://localhost:8000/api/token/login', user_data).subscribe(res => {
      //console.log(res);
      const result: any = res;
      localStorage.setItem('token', result.token)
    })

    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });

    this.personnesParAge = this.groupBy(this.personnes, "age");

    const b: number[] = [1, -1, 3, 4, -3, 5];
    const obj = {
      total: "5",
      count: 4,
      Data: [
        { 'yes': 'no' }, { 'yes': 'yes' }
      ],
      res: {
        a: 'rrrr',
        b: 7
      }
    }
    const a = Math.max(...b);
    const c = Object.assign({}, obj); // not deep clone  Le clonage superficiel
    const d = { ...obj }; // not deep clone Le clonage superficiel
    d.Data[0].yes = "5555";
    //console.log(d);

    //console.log("fff", obj);

    var o1 = { a: 1, k: 4 };
    var o2 = { b: 2 };
    var o3 = { c: 3 };

    var obj1 = Object.assign(o1, o2, o3);

    //console.log(obj1); // { a: 1, b: 2, c: 3 }
    //console.log(o1);  // { a: 1, b: 2, c: 3 }, l'objet cible est aussi modifié
    zone.runGuarded(() => {
      //console.log("dddd");

    })


  }

  groupBy(tableauObjets: any[], propriete: string) {
    return tableauObjets.reduce((acc, obj) => {
      const cle = obj[propriete];
      if (!acc[cle]) {
        acc[cle] = [];
      }
      acc[cle].push(obj);
      return acc;
    }, {});
  }


  get f(): { [key: string]: AbstractControl; } { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    //console.log(this.registerForm.errors, this.registerForm.controls);

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  subscribe(e: any) {
    this.child.subscribeToNewsletter(this.data.email)

  }

  changeUserName() {
    const str = 'bbb';
    const bind: any = { ...this.data };
    bind.name = str;
    this.data = bind;
  }

  get(): number {
    return 5;
  }

  getObs(): Observable<any> {
    return of([{
      total: 5,
      count: 4,
      Data: [
        { 'yes': 'no' }, { 'yes': 'yes' }
      ]
    }])
  }

  post() {
    // , {
    //   headers: {
    //     "Authorization": "Bearer " + result.token
    //   }
    // }
    this.http.get("https://localhost:8000/api/Products").subscribe(data => {

      this.res = data;
    })
    //   const data = {
    //     'ProductId': 2,
    //     'Name': 'produit1',
    //     'Category': 'Category3',
    //     'Color': 'Color1',
    //     'UnitPrice': 10,
    //     'AvailableQuantity': 10,
    //   }
    //   this.http.put("https://localhost:8000/api/products/2", data).subscribe(response => {
    //     //console.log(response);
    //     this.res = response;
    //   })
  }
}
export class User {
  Email: string;
  Password: string;
  UserName: string;
  FirstName: string;
  LastName: string;
  CreatedDate: Date;
  UserId: number;
  constructor() {
    this.Email = '';
    this.Password = '';
    this.UserName = '';
    this.FirstName = '';
    this.LastName = '';
    this.CreatedDate = new Date();
    this.UserId = 0;
  }

}

export class GetReponse<T> {
  total: number;
  count: number;
  Data: any[]

  constructor() {
    this.total = 0;
    this.count = 0;
    this.Data = [];
  }
}
//second commit
export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}