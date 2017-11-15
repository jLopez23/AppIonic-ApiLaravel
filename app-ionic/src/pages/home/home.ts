import { Component } from '@angular/core';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { NavController, App, LoadingController, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RestProvider } from '../../providers/rest/rest';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loading: any;
  isLoggedIn: boolean = false;
  articles: string[];
  errorMessage: string;


  constructor(public app: App, public rest: RestProvider, public navCtrl: NavController, public authService: AuthServiceProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    if(localStorage.getItem("token")) {
      this.isLoggedIn = true;
    }
  }

  ionViewDidLoad() {
    if(localStorage.getItem("token")) {
      this.getArticles();
    }
  }

  getArticles() {
    this.rest.getArticles()
    .subscribe(
      articles => {this.articles = articles},
      error =>  this.errorMessage = <any>error);
    }

    logout() {
      this.authService.logout();
      this.navCtrl.setRoot(LoginPage);
      (err) => {
        this.loading.dismiss();
        this.presentToast(err);
      };
    }

    presentToast(msg) {
      let toast = this.toastCtrl.create({
        message: msg,
        duration: 3000,
        position: 'bottom',
        dismissOnPageChange: true
      });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });

      toast.present();
    }

  }
