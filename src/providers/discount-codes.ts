import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { DiscountCodeModel } from '../models/discount-code'

/*
  Generated class for the DiscountCodes provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DiscountCodes {
  private codeData: DiscountCodeModel;
  errorMessage: string;

  constructor(public http: Http) {
    console.log('Hello DiscountCodes Provider');
    this.http = http;
    this.codeData = null;
  }

  scanNewCode(input: number) {
    return this.getCode(input);
  }

  inputNewCode(input: number) {
    return this.getCode(input);
  }

  getActiveCode() {
    //TODO: Check in local DB for active Code
    //TODO: Check if valid code
    //TODO: Double check with API
    return 123123;
  }

  getCode(code): Observable<DiscountCodeModel> {
    return this.http.get('http://gotravelersdiscount.com/discount-code?discountcode='+ code)
        .map(res => res.json())
        .map(res1 => {
          this.codeData = res1.map(code => new DiscountCodeModel(code))[0];
          // TODO: Check if valid code
          // TODO: Add it to local DB
          return this.codeData;
        })
        .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
