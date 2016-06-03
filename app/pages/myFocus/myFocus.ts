import {Page} from 'ionic-angular';
import {NavController, NavParams} from 'ionic-angular';
import {View} from '../view/view';
import {Crowdfund} from '../../models/crowdfund';
import {MyfocusData} from '../../providers/myfocus-data';

@Page({
  templateUrl: 'build/pages/myFocus/myFocus.html',
  providers: [MyfocusData]
})
export class MyFocusPage {
    crowdfunds: Crowdfund[];
    errorMessage: any;
    pageNo: number;

    constructor(private nav: NavController, private myfocusData: MyfocusData) {
    }

    // onPageLoaded() {
    //     this.myfocusData.queryMyFocus(1).then((json) => {
    //         if (json && json["result"] == "success") {
    //             this.crowdfunds = json["data"]["listData"];
    //             this.pageNo = json["data"]["pageNo"];
    //         }
    //     });
    // }

    onPageWillEnter() {
        this.myfocusData.queryMyFocus(1).then((json) => {
            if (json && json["result"] == "success") {
                this.crowdfunds = json["data"]["listData"];
                this.pageNo = json["data"]["pageNo"];
            }
        });
    }

    view(crowdfund) {
        //push another page onto the history stack
        //causing the nav controller to animate the new page in
        this.nav.push(View,{
            item : crowdfund
        });
    }

    doInfinite(infiniteScroll) {
        console.log('Begin async operation');
        let pageNo: number = this.pageNo + 1;
        setTimeout(() => {
            this.myfocusData.queryMyFocus(pageNo).then((json) => {
                if (json && json["result"] == "success") {
                    let list = json["data"]["listData"];
                    if (list.length > 0) {
                        this.crowdfunds = this.crowdfunds.concat(list);
                        //list.forEach((item) => this.data.push(item));
                        this.pageNo = json["data"]["pageNo"];
                    } else {
                        infiniteScroll.enable(false);
                    }
                }
            });

            console.log('Async operation has ended');
            infiniteScroll.complete();
        }, 500);
    }
}
