import 'es6-shim';
import {App, Platform, IonicApp, Nav, Events, Loading, MenuController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {LoginPage} from './pages/login/login';
import {CONSTANT} from './utils/constant';
import {UserData} from './providers/user-data';
import {MyfocusData} from './providers/myfocus-data';
import {ViewChild} from '@angular/core';


@App({
  templateUrl: 'build/app.html',
  providers: [UserData],
  prodMode : true,
  config: {
    backButtonText: 'Go Back',
    iconMode: 'ios',
    modalEnter: 'modal-slide-in',
    modalLeave: 'modal-slide-out',
    tabbarPlacement: 'bottom',
    pageTransition: 'ios'
  },
  queries: {
      nav: new ViewChild('content')
  }
})
export class MyApp {
  rootPage: any ;
  loggedIn: boolean = false;
  appPages;
  loggedInPages;
  loggedOutPages;
  loading: Loading;

  constructor(private platform: Platform, private app: IonicApp,private userData : UserData,private events : Events) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });

    this.listenToLoginEvents();

    // decide which menu items should be hidden by current login status stored in local storage
    this.userData.hasLoggedIn().then((hasLoggedIn) => {
        this.loggedIn = (hasLoggedIn == 'true');
        this.loggedIn = true;
        console.log('is login:', this.loggedIn);
        if (this.loggedIn) {
            this.rootPage = TabsPage;
        } else {
            this.rootPage = LoginPage;
        }
    });


    // create an list of pages that can be navigated to from the left menu
    // the left menu only works after login
    // the login page disables the left menu
    this.appPages = [
        { title: '我的关注', component: TabsPage, icon: 'calendar' },
        { title: '寻找项目', component: TabsPage, index: 1, icon: 'contacts' },
        { title: '个人中心', component: TabsPage, index: 2, icon: 'map' }
    ];

    this.loggedInPages = [
        { title: '注销', component: LoginPage, icon: 'log-out' }
    ];

    this.loggedOutPages = [
        { title: '登陆', component: LoginPage, icon: 'log-in' }
    ]


  }

  // onPageLoaded() {
  //     console.log("I'm alive!");
  //     this.loading = Loading.create({
  //         spinner: 'hide',
  //         content: 'Loading Please Wait...'
  //     });
  //     let nav = this.app.getComponent('my-nav');
  //     nav.present(this.loading);
  // }

  // onPageDidEnter() {
  //     console.log("I'm alive!");
  //     this.loading.dismiss();
  // }

  openPage(page) {
      // find the nav component and set what the root page should be
      // reset the nav to remove previous pages and only have this page
      // we wouldn't want the back button to show in this scenario
      //let nav = this.app.getComponent('mynav');
      //console.log(nav);

      if (page.index) {
          this.nav.setRoot(page.component, { tabIndex: page.index });
      } else {
          this.nav.setRoot(page.component);
      }

      if (page.title === '注销') {
          // Give the menu time to close before changing to logged out
          setTimeout(() => {
              this.userData.logout();
          }, 1000);
      }
  }

  // ngAfterViewInit() {
  //     var nav = this.app.getComponent('my-nav');
  //     // Let's navigate from TabsPage to Page1
  //     console.log(this.loggedIn);
  //     if (this.loggedIn)
  //         nav.setRoot(TabsPage);
  //     else
  //         nav.setRoot(LoginModal);
  //     //nav.push(LoginModal);
  // }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
        this.loggedIn = true;
    });

    this.events.subscribe('user:signup', () => {
        this.loggedIn = true;
    });

    this.events.subscribe('user:logout', () => {
        this.loggedIn = false;
    });
  }
}
