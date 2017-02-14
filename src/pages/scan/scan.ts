import { Component, NgZone } from '@angular/core';
import { NFC, Ndef } from 'ionic-native';
import { NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { DiscountCodes } from '../../providers/discount-codes';
import 'rxjs/add/operator/catch';

/*
  Generated class for the Scan page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
  providers: [DiscountCodes]
})
export class ScanPage {

  constructor(public navCtrl: NavController,
              private Alert: AlertController,
              private zone: NgZone,
              private platform: Platform,
              public navParams: NavParams,
              discountCodesService: DiscountCodes) {
    console.log(discountCodesService.getCode('1486805084'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanPage');
  }


  ionViewWillEnter(){
    this.platform.ready().then(() => {
      this.cekNFC();
    });
  }

  cekNFC() {
    NFC.enabled().then(() => {
      this.addListenNFC();
      // IF Disabled
    }).catch(err => {
      console.log(err);
      let alert = this.Alert.create({
        subTitle : "NFC DISABLED",
        buttons: [{ text : "OK"},{ text : "Go Setting",
          handler : () => {
            NFC.showSettings();
          }
        }]
      });
      alert.present();
    });
  }

  addListenNFC() {
    NFC.addNdefListener(nfcData => {
      console.log("Receved NFC tag1: " + JSON.stringify(nfcData));
    }, error => {
      console.log("error NFC tag1: " + error);
    }).subscribe(res => {
      console.log("res1 " + JSON.stringify(res));
    },(err) => console.log(err));
  }
}
