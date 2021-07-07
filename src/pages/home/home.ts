import { Component } from '@angular/core';
import { MoreInfoPage } from '../more-info/more-info';
import { NavController, AlertController, NavParams, LoadingController} from 'ionic-angular';
import { User } from '../../Modals/User';
import { FirebaseConnectionProvider } from '../../providers/firebase-connection/firebase-connection';
import { LoginPage } from '../login/login';
import {BusinessHomePage} from '../business/business-home/business-home'
// import { ScreenOrientation } from '@ionic-native/screen-orientation';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  fetching = [];
  fetchingRecentlyAdded = [];
  fetchingUpcoming = []


  Users = {} as User;
  plus;
  constructor(public loadingCtrl: LoadingController,public navCtrl: NavController,public navParams: NavParams ,public alertCtrl:AlertController,private firebaseService: FirebaseConnectionProvider){

  }
  ionViewDidLoad() {
    setTimeout(()=> {
      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'Please Wait.',
        duration: 1000
      });
  
      loading.present();
    this.fetching.length = 0;
    var user = this.navParams.get('user');
    this.firebaseService.getAlldata().then((data:any) => {
      this.fetching = data;
      console.log(data)
      var length =  this.fetching.length;
      for (var x = length - 5; x < length; x++){
        if (this.fetching[x] != undefined){
          this.fetchingRecentlyAdded.push(this.fetching[x])
        }
      }
      for (var x = length - 6; x >= 0; x--){
        if (this.fetching[x] != undefined){
          this.fetchingUpcoming.push(this.fetching[x])
        }
      }
      loading.dismiss()
    });
    }, 3100);
     
     }




viewMore(i){
this.navCtrl.push(MoreInfoPage, {events:i});
}

  moreinfo(){
    this.navCtrl.push(MoreInfoPage);
  }

  logOut(){
    this.firebaseService.logout();
    this.navCtrl.push(LoginPage);
   }

   viewAll(){
     this.navCtrl.push(BusinessHomePage, {events:this.fetching})
   }

}