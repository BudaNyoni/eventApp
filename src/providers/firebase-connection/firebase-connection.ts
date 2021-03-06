import { Injectable } from '@angular/core';
import * as moment from 'moment'

declare var firebase;
@Injectable()
export class FirebaseConnectionProvider {
  database = firebase.database();
  authenticate = firebase.auth();
  state ;

  dbRef;
  currentUserName;
  currentUserImage;
  currentUserPath;

  username;
  userKey;
  fetch = new Array();
  comments = new Array();
  newEvents =  new Array();
  profile = new Array();
  currentUserID;

  defaultImages = ['../../assets/imgs/pic.jpg','../../assets/imgs/pic23.jpg','../../assets/imgs/pic24.jpg', '../../assets/imgs/pic22.jpg','../../assets/imgs/pic25.jpg']
  constructor() {
  }

  registerUser(email,password,userName){
    return new Promise((accpt,rej) =>{
      this.authenticate.createUserWithEmailAndPassword(email,password).then(() =>{
        var user = firebase.auth().currentUser;

        this.dbRef = 'users/' + userName + ":" + user.uid;
        this.database.ref(this.dbRef).push({
          Username: userName,
          img : this.defaultImages[Math.floor(Math.random() * 4)],
          userType: "User"

        })
        accpt("user Registered")
      },Error => {
        rej(Error.message);
      })
    })
  }


  UpdateProfile(userName,img){
    return new Promise ((accpt,rej) =>{
      var img;
      if(img == undefined || img == null){
        img = this.defaultImages;
      }   

      if(userName == undefined){
        userName = ""
      }
      var path = 'users/' + this.currentUserID + '/' + this.userKey;
      console.log(path)
      this.database.ref(path).update({
        userName: userName,
        img: img
      })
    })
  }


  logout(){
    console.log('exit')
    this.authenticate.signOut();
  }
  getALlGoings(){
    return new Promise((accept,reject) => {
      this.fetch.length = 0;
      this.database.ref('goings/').on('value', (data: any) => {
        var users = data.val();
        var userIDs = Object.keys(users);
        for(var i = 0; i < userIDs.length; i++){
          var k = userIDs[i];
          var n = 'goings/' + k;
          console.log(n);
  
          this.database.ref(n).on('value', (data2:any) =>{
            var fav = data2.val();
            console.log(fav);
            var keys = Object.keys(fav);
            for(var a = 0;a < keys.length;a++){
              var k = keys[a];
              let obj = {
                end: fav[k].end,
                desc: fav[k].desc,
                eventName: fav[k].name,
                amount: fav[k].amount,
                img: fav[k].image,
                location: fav[k].venue,
                start: fav[k].start,
                date: fav[k].day
              }
              this.fetch.push(obj)
            }
            accept(this.fetch);
            console.log(this.fetch)
          })
        }
      }, Error => {
        reject(Error.message);
      })
    })
  }
  

  registerBusiness(email,password,userName,companyName,location, img){
    return new Promise((accpt,rej) =>{
      this.authenticate.createUserWithEmailAndPassword(email,password).then(() =>{
        var user = firebase.auth().currentUser;
        this.dbRef = 'users/' + user.uid;
        this.database.ref(this.dbRef).push({
          CompanyName: companyName,
          companyOwner : userName,
          location: location,
          img : img
        })
        accpt("success!");
      },Error =>{
        rej(Error.message);
        console.log(Error.message);
      })
    })
  }


  forgotPassword(email:any){
    return this.authenticate.sendPasswordResetEmail(email);
  }

  getUserSatate(){
    return new Promise ((accpt, rej) =>{ 
      this.authenticate.onAuthStateChanged(user =>{ 
        if (user != null){
          this.state = 1;
        }
        else{
        this.state = 0;
        }
        accpt(this.state);
       });
    })
  }

login(email,password){
  return new Promise((accept,reject) =>{
    this.authenticate.signInWithEmailAndPassword(email, password).then(() =>{
      accept("Success")
    }, Error =>{
      reject(Error.message);
      console.log(Error.message);
    })
  })
}

getAlldata(){
return new Promise ((accept,reject) => {
this.fetch.length = 0;
this.database.ref('events/').on('value', (data: any) => {
  var users = data.val();
  var userIDs = Object.keys(users);
  for(var i = 0; i < userIDs.length;i++){
    var k2 = userIDs[i];
    var y = 'events/' + k2;
    console.log(y)
    this.database.ref(y).on('value', (data2:any) =>{
      var events = data2.val();
      var keys = Object.keys(events);
      for(var a = 0;a < keys.length;a++){
        var k = keys[a];
        let obj = {
          date: moment(events[k].date).format('MMM Do, YYYY'),
          endTIme: events[k].endTIme,
          eventDesc: events[k].eventDesc,
          eventName: events[k].eventName,
          fee: events[k].fee,
          key : k,
          hostname: k2,
          img: events[k].img,
          location: events[k].location,
          startTIme: events[k].startTIme,
          going: events[k].going,
          comments: events[k].comments,
          hostimg : events[k].hostImg,
          enddate : moment(events[k].endDate).format('MMM Do, YYYY')
        }
        this.fetch.push(obj)
      }
      accept(this.fetch);
      console.log(this.fetch)
    })
  }

}, Error => {
  reject(Error.message);
})
  })
}

going(key, name, going){
  var numGoing = going + 1;
  return new Promise((accpt, rej) =>{
  this.database.ref('events/' + name + '/' + key).update({going: numGoing})
})
}

getuser(){
 // this.authenticate.signOut();
  this.database.ref('users').on('value', (data: any) => {
    var users =  data.val();
    var user = firebase.auth().currentUser;
    var  userIDs = Object.keys(users);
    for (var x = 0; x < userIDs.length; x++){
      var str1 = new String( userIDs[x]); 
      var index = str1.indexOf( ":" ); 
      var currentUserID = userIDs[x].substr(index + 1);
      if (user.uid == currentUserID){
        this.database.ref('users/' + userIDs[x]).on('value', (data: any) => {
          var Userdetails = data.val(); 
          var keys2:any = Object.keys(Userdetails);
          this.storeCurrentUserImage(Userdetails[keys2[0]].img);
          this.storeCurrentUsername(Userdetails[keys2[0]].Username);
          this.storeCurrentUserPath(userIDs[x])
        })
        break;
      }
    }
  })
}


getNewEvents(){
  return new Promise((accpt,rej) =>{
    this.database.ref('NewEvents/').on('value', (data:any) =>{
      if (data.val() != null || data.val() != undefined){
        var events =  data.val();
        var keys = Object.keys(data.val());
        for (var x = 0; x < keys.length; x++){
          var k = keys[x];
          let obj = {
            date : events[k].date,
            name :  events[k].name,
            eventName : events[k].eventName,
            key :  k,
            img : events[k].img
          }
          this.newEvents.push(obj)
        }
        console.log(this.newEvents)
        accpt(this.newEvents)
      }
      else{
        rej('no new ')
      }
    })
  })
 }

 storeUserName(name){
  this.username = name;
  }

  getuser(){
    // this.authenticate.signOut();
    return new Promise ((accpt,rej)=>{
      this.database.ref('users').on('value', (data: any) => {
        var users =  data.val();
        var user = firebase.auth().currentUser;
        var  userIDs = Object.keys(users);
        for (var x = 0; x < userIDs.length; x++){
          var str1 = new String( userIDs[x]); 
          var index = str1.indexOf( ":" ); 
          var currentUserID = userIDs[x].substr(index + 1);
          if (user.uid == currentUserID){
            console.log(user.uid)
            this.database.ref('users/' + userIDs[x]).on('value', (data: any) => {
              var Userdetails = data.val(); 
              this.storeUserID(userIDs[x]);
              var keys2:any = Object.keys(Userdetails);
              this.storeCurrentUserImage(Userdetails[keys2[0]].img);
              this.storeCurrentUsername(Userdetails[keys2[0]].Username);
              this.storeUserKey(Userdetails[keys2[0]].key)
              this.storeCurrentUserPath(userIDs[x])
              accpt(Userdetails[keys2])
            })
            break
          }
        }
      })
    })
   }
   
   storeCurrentUsername(username){
   this.currentUserName =  username;
   }
   
   storeCurrentUserImage(img){
   this.currentUserImage = img;
   }
   
   storeCurrentUserPath(path){
   this.currentUserPath = path;
   }

   storeUserKey(key){
    console.log(key)
    this.userKey = key
   }

   storeUserID(key){
    this.currentUserID = key;
    console.log(this.currentUserID)
  }

getProfile(){
  return new Promise((accpt,rej)=>{
    this.profile.length = 0;
    console.log(this.currentUserID);
    this.database.ref('users/' + this.currentUserID ).on('value',(data2:any)=>{
      var details = data2.val();
      console.log(details)
      var keys = Object.keys(details);
      console.log(keys)
      for (var x = 0;x < keys.length;x++){
        var k = keys[x];
        let obj ={
          username: details[k].Username,
          img: details[k].img,
          userType: details[k].userType,
        }
        this.profile.push(obj);
      }
      accpt(this.profile)
      console.log(this.profile)
    })
  })

}

comment(text,key){
  return new Promise((accpt, rej) =>{
    var day = moment().format('MMMM Do YYYY, h:mm:ss a');
    this.database.ref('comments/' +  key).push({
      text:text,
      username: this.currentUserName,
      date : day,
      img : this.currentUserImage
    })
    accpt("comment added")
  })
}


getComments(key){
  return new Promise ((accpt,rej) =>{
    this.comments.length = 0;
    this.database.ref('comments/' + key).on('value', (data2: any) => {
      var details = data2.val();
      if (details != null ||  details != undefined){
        this.comments.length = 0;
        var keys = Object.keys(details) 
        for (var x =0; x < keys.length; x++){
          var key = keys[x];
          let obj = {
            date :moment( details[key].date,'MMMM Do YYYY, h:mm:ss a').startOf('minutes').fromNow(),
            text :  details[key].text,
            name : details[key].username,
            img: details[key].img
          }
          this.comments.push(obj)
        }
          accpt(this.comments);
          console.log(this.comments);
      }
      })
  })
}

addNumComments(key, numComments, user){
  var num =  numComments  + 1;
  this.database.ref('events/' + user+ "/"+ key).update({comments: num});
  console.log("comment number added")
}
Goings(eventName,eventDesc,startTIme,endTIme,date,location,img,fee){
  var user = firebase.auth().currentUser;
  firebase.database().ref('goings/' + user.uid).push({
amount:fee,
day:date,
desc: eventDesc,
name: eventName,
end: endTIme,
start: startTIme,
venue:location,
image:img
  });
} 

}