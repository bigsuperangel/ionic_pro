import {Page, ViewController} from 'ionic-angular';
import {NavController, NavParams,Alert} from 'ionic-angular';
import {Crowdfund} from '../../models/crowdfund';
import {SuccessPage} from '../success/success';

@Page({
    templateUrl: 'build/pages/view/view.html'
})
export class View {
    crowdfund: Crowdfund;
    constructor(params: NavParams, private viewCtrl: ViewController, private nav : NavController) {
        // userParams is an object we have in our nav-parameters
        this.crowdfund = params.get('item');
    }

    onPageWillEnter() {
        this.viewCtrl.setBackButtonText('');
    }

    follow(){
        let alert = Alert.create({
            title: '请输入跟投份数',
            inputs: [
                {
                    label: '跟投份数',
                    name: 'follow_num',
                    placeholder: '请输入跟投份数',
                    type: 'number',
                    value: '1'
                }
            ],
            buttons: [
                {
                    text: '取消',
                    role: 'cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: '确认',
                    handler: data => {
                        console.log(data.follow_num);
                        this.nav.push(SuccessPage, {
                            item: data.follow_num
                        });
                    }
                }
            ]
        });
        this.nav.present(alert);
    }
}
