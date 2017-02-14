import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { DiscountCodes } from '../../providers/discount-codes';

import { DiscountCodeModel } from '../../models/discount-code';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [DiscountCodes]
})
export class HomePage {
  code: DiscountCodeModel;
  selectedCode: DiscountCodeModel;
  errorMessage: string;

  constructor(
    public navCtrl: NavController,
    private discountCodesService: DiscountCodes
  ) {

  }

  ngOnInit() {
    console.log(this.code);
  }

  onSubmitNewDiscountCode(value: number) {
    this.discountCodesService.inputNewCode(value).subscribe(
        code => this.code = code,
        error =>  this.errorMessage = <any>error);
  }

}
