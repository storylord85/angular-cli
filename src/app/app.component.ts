import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import '@cds/core/icon/register.js';
import { ConnectionPositionPair } from '@angular/cdk/overlay';
import dataJSON from '../assets/data.json';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  show = false;
  panel1Expanded = true;


  modalHidden = true;
  users = dataJSON;
  userFiltered = dataJSON;
  setMode = false;
  isOpen = false;
  inputValue = "";
  inputSearchValue= "";

  positionPairs: ConnectionPositionPair[] = [
    {
      offsetX: -70,
      offsetY: 30,
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'bottom',
      panelClass: undefined,
    },
  ];


  form: FormGroup;
  formValue: Observable<{}>;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: [''],
      select: ['Option One'],
      datalist: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      search: ['', Validators.minLength(5)],
      time: [''],
      inputGroupProtocol: ['http://'],
      inputGroupPort: [''],
      range: [75],
      checkboxGroup1: [true],
      checkboxGroup2: [''],
      checkboxGroup3: [''],
      radioGroup: ['south-america'],
      toggle1: [true],
      toggle2: [''],
      file: [''],
      selectMultiple: [''],
      textarea: ['hello world'],

    });

    this.userFiltered = this.users;
    this.formValue = this.form.valueChanges.pipe(startWith(this.form.value));
  }

  get nameInvalid() {
    return this.form.controls.name.touched && this.form.controls.name.hasError('required');
  }

  get passwordRequired() {
    return this.form.controls.password.touched && this.form.controls.password.hasError('required');
  }

  get passwordMinLength() {
    return this.form.controls.password.touched && this.form.controls.password.hasError('minlength');
  }

  expandedChange(event: Event): void {
    this.panel1Expanded = (event as CustomEvent).detail;
  }

  submit() {
    console.log(this.form.value);
  }

  onChangeToggle() {
    this.setMode = !this.setMode;
    if (this.setMode) {
      document.body.setAttribute('cds-theme', 'dark');
    } else {
      document.body.removeAttribute('cds-theme');
    }

    console.log("toggle")
  }

  inputChanged() {
    console.log("inputSearchChanged")
    this.userFiltered = this.users.filter(f => f.name.includes(this.inputValue) || f.pokemon.includes(this.inputValue));
    console.log(this.userFiltered);
    if (this.inputValue === "Igor") {
      this.isOpen = true;
      setTimeout(() => {
        this.inputValue = "";
      }, 600);
    } else this.isOpen = false;
  }

  inputSearchChanged() {
    console.log("inputSearchChanged")
    this.userFiltered = this.users.filter(f => f.name.indexOf(this.inputSearchValue) != 0);
  }
}
