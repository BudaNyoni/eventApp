// import { Component, } from '@angular/core';
// import { FirebaseConnectionProvider } from '../../providers/firebase-connection/firebase-connection';
// import { LoginPage } from '../../pages/login/login';
// import { PopoverController, AlertController, NavController } from 'ionic-angular';
// import { TabsPage } from '../../pages/tabs/tabs';

// /**
//  * Generated class for the PopoverComponent component.
//  *
//  * See https://angular.io/api/core/Component for more info on Angular
//  * Components.
//  */
// @Component({
//   selector: 'popover',
//   templateUrl: 'popover.html'
// })
// export class PopoverComponent {

//   text: string;
// items:any;
//   constructor(public popoverCtrl: PopoverController,public navCtrl: NavController,private firebaseService: FirebaseConnectionProvider, private alertCtrl : AlertController) {
//     console.log('Hello PopoverComponent Component');
//     this.text = 'log-Out';
//   }
//   logOut(){

//     const confirm = this.alertCtrl.create({
//       title: 'LOGGING OUT!',
//       message: 'Are you sure you want to log out?',
//       buttons: [
//         {
//           text: 'Disagree',
//           handler: () => {
//             console.log('Disagree clicked');
//             this.navCtrl.push(TabsPage);
//           }
//         },
//         {
//           text: 'Agree',
//           handler: () => {
//             console.log('Agree clicked');
//             this.firebaseService.logout();
//             this.navCtrl.push(LoginPage)
//           }
//         }
//       ]
//     });
//     confirm.present();
   
//   }
// }