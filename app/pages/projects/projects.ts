import {Page} from 'ionic-angular';
import {NavController, NavParams} from 'ionic-angular';
import {View} from '../view/view';
import {Crowdfund} from '../../models/crowdfund';
import {MyfocusData} from '../../providers/myfocus-data';


@Page({
  templateUrl: 'build/pages/projects/projects.html',
  providers: [MyfocusData]
})

export class ProjectsPage {
    crowdfunds: Crowdfund[];
    errorMessage: any;
    pageNo: number;

    constructor(private nav: NavController, private myfocusData: MyfocusData) {
    }

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
        this.nav.push(View, {
            item: crowdfund
        });
    }
}
