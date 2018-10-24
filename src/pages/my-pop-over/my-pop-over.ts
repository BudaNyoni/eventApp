import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { FirebaseConnectionProvider } from '../../providers/firebase-connection/firebase-connection';
import { LoginPage } from '../login/login';

/**
 * Generated class for the MyPopOverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-pop-over',
  templateUrl: 'my-pop-over.html',
})
export class MyPopOverPage {

  constructor(private firebaseService: FirebaseConnectionProvider,public navCtrl: NavController,public alertCtrl:AlertController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

}
