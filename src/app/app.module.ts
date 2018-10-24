import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {LaunchNavigator} from '@ionic-native/launch-navigator'
import {LocalNotifications} from '@ionic-native/local-notifications'

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SocialSharing } from '@ionic-native/social-sharing';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FirebaseConnectionProvider } from '../providers/firebase-connection/firebase-connection';
import { BusinessHomePage } from '../pages/business/business-home/business-home';
import { RegisterBusinessPage } from '../pages/business/register-business/register-business';
import { ViewPage } from '../pages/view/view';
import { MoreInfoPage } from '../pages/more-info/more-info';
import { LoginPage } from '../pages/login/login';
import { CommentsPage } from '../pages/comments/comments';
import { RegisterPage } from '../pages/register/register'
import { ProfileUpdatePage } from '../pages/profile-update/profile-update';
import { MyPopOverPage } from '../pages/my-pop-over/my-pop-over';
import { PopoverComponent } from '../components/popover/popover';
import { IonicImageViewerModule, ImageViewerComponent } from 'ionic-img-viewer';
import { PopOver2Component } from '../components/pop-over2/pop-over2';
import { Camera } from '@ionic-native/camera';
import { SecondPage } from '../pages/second/second';
import { TestPage } from '../pages/test/test';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    BusinessHomePage,
    RegisterBusinessPage,
    MoreInfoPage,
    LoginPage,
    CommentsPage,
    RegisterPage,
    CommentsPage,
    ProfileUpdatePage,

    MyPopOverPage,
    PopoverComponent,
    PopOver2Component,
    SecondPage,
    TestPage



  ],
  imports: [
    BrowserModule,
    IonicImageViewerModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    BusinessHomePage,
    RegisterBusinessPage,
    MoreInfoPage,
    LoginPage,
    CommentsPage,
    RegisterPage,
    ProfileUpdatePage,

    MyPopOverPage,
    PopoverComponent,
    PopOver2Component,
    SecondPage,

    TestPage


  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseConnectionProvider,

    SocialSharing,
    LaunchNavigator,
    LocalNotifications,
    Camera
  ]
})
export class AppModule{}