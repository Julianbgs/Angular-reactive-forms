import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {reject} from 'q';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  answers = [{
    type: 'yes',
    text: 'Да'
  }, {
    type: 'no',
    text: 'Нет'
  }];

  form: FormGroup;
  lengthSymbols =  6;

  ngOnInit() {
      this.form = new FormGroup({
          user: new FormGroup({
              email: new FormControl('', [Validators.required, Validators.email], this.repeatEmail),
              pass: new FormControl('', [Validators.required, this.passLenght.bind(this)])
          }),
          country: new FormControl('ua'),
          answer: new FormControl('no')
      })
  }

  onSubmit() {
      console.log('Submited!', this.form);
  }

  passLenght(param: FormControl) {
      if(param.value.length <= this.lengthSymbols) {
          return {
              errorLength: true
          }
      }
      return null;
  }

  repeatEmail(control: FormControl): Promise<any>{
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (control.value === 'julian@gmail.com') {
                resolve ({
                    emailUsed: true
                })

            } else {
                resolve (null)
            }

        }, 3000)
    })
  }
}

