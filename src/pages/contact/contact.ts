import { Component, NgZone } from '@angular/core';
import { NFC, Ndef } from 'ionic-native';
import { NavController, AlertController, Platform } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {


  constructor(public navCtrl: NavController, private Alert: AlertController, private zone: NgZone, private platform: Platform) {


  }

  ionViewWillEnter(){
    this.platform.ready().then(() => {
      this.cekNFC();
    });
  }

  cekNFC() {
    NFC.enabled().then(() => {
          console.log("NFC is ready");
          this.addListenNFC();
          // IF Disabled
        })
        .catch(err => {
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
    // console.log("Listening...");
    //
    // let alert = this.Alert.create({
    //   subTitle : "Listening...",
    //   buttons: [{ text : "OK"},{ text : "Go Setting",
    //     handler : () => {
    //       NFC.showSettings();
    //     }
    //   }]
    // });
    // alert.present();
    console.log("NFC is ready2");

    NFC.addTagDiscoveredListener('text/plain', nfcData => {
      console.log("Receved NFC tag: " + JSON.stringify(nfcData));
    }, error => {
      console.log("error NFC tag: " + error);
    }).subscribe(res => {
      console.log("res " + res);
    },(err) => console.log(err));


    NFC.addNdefListener(nfcData => {
      console.log("Receved NFC tag: " + JSON.stringify(nfcData));
    }, error => {
      console.log("error NFC tag: " + error);
    });



    // NFC.addNdefListener(nfcData => {
    //   console.log("NFC is ready3");
    //   console.log(nfcData);
    //   let alert = this.Alert.create({
    //     subTitle : "read",
    //     buttons: [{ text : "OK"},{ text : "Go Setting",
    //       handler : () => {
    //         NFC.showSettings();
    //       }
    //     }]
    //   });
    //   alert.present();
    // }, nfcData => {
    //   let alert = this.Alert.create({
    //     subTitle : "error",
    //     buttons: [{ text : "OK"},{ text : "Go Setting",
    //       handler : () => {
    //         NFC.showSettings();
    //
    //       }
    //     }]
    //   });
    //   alert.present();
    // });
  }

  onNfc(nfcEvent) {
    // var tag = nfcEvent.tag;
    // var tagId = NFC.bytesToHexString(tag.id);
    // alert(tagId);

    let alert = this.Alert.create({
      subTitle : nfcEvent,
      buttons: [{ text : "OK"},{ text : "Go Setting",
        handler : () => {
          NFC.showSettings();
        }
      }]
    });
    alert.present();
  }

  win() {
    console.log("Listening for NFC Tags");

    let alert = this.Alert.create({
      subTitle : "Listening for NFC Tags",
      buttons: [{ text : "OK"},{ text : "Go Setting",
        handler : () => {
          NFC.showSettings();
        }
      }]
    });
    alert.present();
  }

  fail(error) {

    let alert = this.Alert.create({
      subTitle : "Error adding NFC listener",
      buttons: [{ text : "OK"},{ text : "Go Setting",
        handler : () => {
          NFC.showSettings();
        }
      }]
    });
    alert.present();
  }

}
