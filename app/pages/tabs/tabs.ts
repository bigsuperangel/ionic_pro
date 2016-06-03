import {Page, NavParams} from 'ionic-angular';
import {MyFocusPage} from '../myFocus/myFocus';
import {ProjectsPage} from '../projects/projects';
import {PersonalCenterPage} from '../personalCenter/personalCenter';

@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  myFocus: any ;
  searchProject: any ;
  personalCenter: any ;
  mySelectedIndex: number;

  constructor(private navParams : NavParams) {
      this.mySelectedIndex = navParams.data.tabIndex || 0;

      // set the root pages for each tab
      this.myFocus = MyFocusPage;
      this.searchProject = ProjectsPage;
      this.personalCenter = PersonalCenterPage;
  }

}
