import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { CommentsPage } from '../pages/comments/comments';
import { HomePage } from '../pages/home/home';

import { ContactPage } from '../pages/contact/contact';
import { RegisterPage } from '../pages/register/register';
import {LoginPage} from '../pages/login/login';
import { MoreInfoPage } from '../pages/more-info/more-info';
import {FirebaseConnectionProvider} from '../providers/firebase-connection/firebase-connection'
import { LocalNotifications } from '@ionic-native/local-notifications';
import { removeDebugNodeFromIndex } from '@angular/core/src/debug/debug_node';

@Component({
 templateUrl: 'app.html'
})
export class MyApp {

public rootPage:any ;
newEvents =  new Array();



 constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public fire:FirebaseConnectionProvider,private localNotifications: LocalNotifications) {
   platform.ready().then(() => {
     // Okay, so the platform is ready and our plugins are available.
     // Here you can do any higher level native things you might need.
     statusBar.styleDefault();

     splashScreen.hide();
     fire.getUserSatate().then( data =>{
       this.pushNotification();
    if (data == 1){
     this.rootPage =  TabsPage;
     fire.getuser();
    }
    else{
      this.rootPage = LoginPage;
    }
     })

   });
 }

 pushNotification(){
   this.fire.getNewEvents().then((data:any) =>{
     this.newEvents = data;
     if ( this.newEvents != undefined ||  this.newEvents != null){
       this.localNotifications.schedule({
         id : 1,
         title: 'New Event added by \n',
         text: this.newEvents[0].name + ', are you going?',
         vibrate: true,
         foreground: true,
         icon  :'https://firebasestorage.googleapis.com/v0/b/eventapp-a1624.appspot.com/o/fireworks%20(1).png?alt=media&token=6dee6a87-300e-4477-95f8-6d42b53ad9f5https://firebasestorage.googleapis.com/v0/b/eventapp-a1624.appspot.com/o/fireworks%20(1).png?alt=media&token=6dee6a87-300e-4477-95f8-6d42b53ad9f5',
         actions: [
           { id: 'yes', title: 'Yes' },
           { id: 'no',  title: 'No' }
       ],
         trigger: {at: new Date(new Date().getTime() + 5 * 1000)},
      });
     }
   })
 }
}

