import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ToastController } from 'ionic-angular';
import { FirebaseConnectionProvider } from '../../providers/firebase-connection/firebase-connection';
import { AboutPage } from '../about/about';

import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { SocialSharing } from '@ionic-native/social-sharing';

import {CommentsPage}  from '../comments/comments';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-more-info',
  templateUrl: 'more-info.html',
})
export class MoreInfoPage {
event = new Array();
plus;
url =   '../../assets/imgs/Spring-Fi.jpg';
color='linear-gradient(rgba(0,0,0,0.0),rgba(0,0,0,20)),';
gatefee;


go;
state = false;
buttonActive: boolean =  false;
color2 = "light";



  constructor(public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams, private view: ViewController,private toastCtrl: ToastController, private firebaseService: FirebaseConnectionProvider,private launchNavigator: LaunchNavigator, private socialSharing: SocialSharing) {
  }

ionViewDidLoad() {
  this.event.push(this.navParams.get('events'))
  console.log(this.event )
  this.go =    this.event[0].going;
  this.url = this.event[0].img;
  this.gatefee = parseInt(this.event[0].fee ) + 100;
  this.pet = 'kittens'
  }

  navigate = function(i){
    this.launchNavigator.navigate(i);
  }

  share(i){
  var location = 'at ' + this.event[0].location + ', this event was shared from event finder app, please download the app to get more events like this' 
    this.socialSharing.share(this.event[0].eventName,this.event[0].eventDesc,this.event[0].img, location ) .then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }
  going(){
    this.firebaseService.Goings(this.event[0].eventName,this.event[0].desc,this.event[0].start,this.event[0].end,this.event[0].date,this.event[0].location,this.event[0].img,this.event[0].amount)
    const toast = this.toastCtrl.create({
     message: 'Event of your choice has been added to your calender',
     duration: 3000
   });
   toast.present();
   }
  
  comment(){
  this.navCtrl.push(CommentsPage, {eventObject:this.event});

}
back(){
  this.navCtrl.pop();
}

logOut(){

  const confirm = this.alertCtrl.create({
    title: 'LOGGING OUT!',
    message: 'Are you sure you want to log out?',
    buttons: [
      {
        text: 'Disagree',
        handler: () => {
          console.log('Disagree clicked');
          this.navCtrl.push(TabsPage);
        }
      },
      {
        text: 'Agree',
        handler: () => {
          console.log('Agree clicked');
          this.firebaseService.logout();
        }
      }
    ]
  });
  confirm.present();
 
}
