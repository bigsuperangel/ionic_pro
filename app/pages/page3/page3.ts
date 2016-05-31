import {Page,Toast,NavController} from 'ionic-angular';


@Page({
  templateUrl: 'build/pages/page3/page3.html'
})
export class Page3 {
  constructor(private nav : NavController) {

  }

  presentToast() {
    let toast = Toast.create({
      message: 'User was added successfully',
      duration: 3000
    });

    toast.onDismiss(() => {
      console.log('Dismissed toast');
    });

    this.nav.present(toast);
  }
}
