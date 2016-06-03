 import {IonicApp,Page, Events, NavController} from 'ionic-angular';
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators, AbstractControl ,Control} from '@angular/common';
import {CONSTANT} from '../../utils/constant';
import {UserData} from '../../providers/user-data';
import {TabsPage} from '../tabs/tabs';


@Page({
    templateUrl: 'build/pages/login/login.html',
    directives: [FORM_DIRECTIVES]
})

export class LoginPage {
  data: Object;
  _url: string = CONSTANT.SERVICE_API_URL;
  imgUrl: string = this._url + "imageCode.do";

  f: ControlGroup;
  account: AbstractControl;
  pwd: AbstractControl;
  imgCode: AbstractControl;
  submitted: boolean = false;

  constructor(private userData : UserData, private nav : NavController, private events: Events, private fb: FormBuilder) {
    this.events = events;
    this.userData = userData;
    this.nav = nav;

    this.f = fb.group({
        'account': ['', Validators.compose([Validators.required, Validators.minLength(2),Validators.maxLength(20), this.checkFirstCharacterValidator])],
        'pwd': ['', Validators.compose([Validators.required, Validators.minLength(6),Validators.maxLength(16)])],
        'imgCode': ['', Validators.compose([Validators.required,Validators.minLength(4), Validators.maxLength(4)])]
    });

    this.account = this.f.controls['account'];
    this.pwd = this.f.controls['pwd'];
    this.imgCode = this.f.controls['imgCode'];
  }

  checkFirstCharacterValidator(control: Control): { [s: string]: boolean } {
    if (control.value.match(/^\d/)) {
        return { checkFirstCharacterValidator: true };
    }
  }

  doLogin(val) {
    this.submitted = true;
    if (this.f.valid) {
        console.log('Submitted value: ', val);
        this.userData.doLogin(val).then((result) => {
            if (result == "success") {
                this.nav.push(TabsPage);
            }
        });
    }
  }

  onClick($event){
    this.imgUrl = this._url + "imageCode.do?t="+new Date().getTime();
    $event.stopPropagation();
  }


}
