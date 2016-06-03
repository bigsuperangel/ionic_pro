import {Page} from 'ionic-angular';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {TabsPage} from '../../pages/tabs/tabs';


@Page({
    templateUrl: 'build/pages/success/success.html',
})
export class SuccessPage {
    followNum: number;
    constructor(params: NavParams, private nav: NavController, private viewCtrl: ViewController) {
        this.followNum = +params.get('item');
    }

    onPageWillEnter() {
        this.viewCtrl.setBackButtonText('');
    }

    back() {
        this.nav.popToRoot();
    }
}
