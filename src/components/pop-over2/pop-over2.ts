import { Component } from '@angular/core';
import { FirebaseConnectionProvider } from '../../providers/firebase-connection/firebase-connection';
import { LoginPage } from '../../pages/login/login';
import { PopoverController, AlertController, NavController ,NavParams,ViewController,ToastController} from 'ionic-angular';
import { TabsPage } from '../../pages/tabs/tabs';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { SocialSharing } from '@ionic-native/social-sharing';
import {CommentsPage}  from '../../pages/comments/comments';
import { ContactPage } from '../../pages/contact/contact';
/**
 * Generated class for the PopOver2Component component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pop-over2',
  templateUrl: 'pop-over2.html'
})
export class PopOver2Component {

  text1 = 'Log-Out';

  constructor(public popoverCtrl: PopoverController,public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams, private view: ViewController,private toastCtrl: ToastController, private firebaseService: FirebaseConnectionProvider,private launchNavigator: LaunchNavigator, private socialSharing: SocialSharing) {
  }

  logOut(){

    const confirm = this.alertCtrl.create({
      title: 'LOGGING OUT!',
      message: 'Are you sure you want to log out?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {

            this.navCtrl.push(TabsPage);
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.firebaseService.logout();
            this.navCtrl.push(LoginPage)
          }
        }
      ]
    });
    confirm.present();
   
  }
}
