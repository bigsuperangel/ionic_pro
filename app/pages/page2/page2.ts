import {Page,Alert,NavController} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/page2/page2.html',
})
export class Page2 {
  constructor(private nav : NavController) {

  }

  doAlert() {
    let alert = Alert.create({
      title: 'New Friend!',
      subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
      buttons: ['OK']
    });
    this.nav.present(alert);
  }
}
