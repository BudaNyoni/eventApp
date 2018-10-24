import { Component, } from '@angular/core';
import { FirebaseConnectionProvider } from '../../providers/firebase-connection/firebase-connection';
import { LoginPage } from '../../pages/login/login';
import { PopoverController, AlertController, NavController ,NavParams,ViewController,ToastController} from 'ionic-angular';
import { TabsPage } from '../../pages/tabs/tabs';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { SocialSharing } from '@ionic-native/social-sharing';

import {CommentsPage}  from '../../pages/comments/comments';

/**
 * Generated class for the PopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})
export class PopoverComponent {

  text1: string;
  text2: string;
  text3: string;
  text4: string;
items:any;
event = new Array();
test = this.navParams.get('testing')
// gatefee;
// url =   '../../assets/imgs/Spring-Fi.jpg';
// pet;
// go;
constructor(public popoverCtrl: PopoverController,public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams, private view: ViewController,private toastCtrl: ToastController, private firebaseService: FirebaseConnectionProvider,private launchNavigator: LaunchNavigator, private socialSharing: SocialSharing) {
  this.text1 = 'Share'
  this.text2 = 'Location'
  this.text3 = 'comments'
  this.text4 = 'log-Out';
  
  }

  // ionViewDidLoad() {
  //   this.event.push(this.navParams.get('events'))
  //   console.log(this.event )
  //   // this.go =    this.event[0].going;
  //   this.url = this.event[0].img;
  //   this.gatefee = parseInt(this.event[0].fee ) + 100;
  //   this.pet = 'kittens'
  //   }
  

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

  comment(){
  this.navCtrl.push(CommentsPage, {eventObject:this.event});
}




}
