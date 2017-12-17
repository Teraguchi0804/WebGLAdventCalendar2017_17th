/**
 * fileOverview:
 * Project:
 * File: Utils
 * Date:
 * Author: Teraguchi
 */

/**
 * animation
 */
import requestAnimationFrame from './animation/requestAnimationFrame';
import cancelAnimationFrame from './animation/cancelAnimationFrame';

import Array from './array/Array';
import checkClient from "./ua/checkClient";

import preloadImg from './img/preloadImg';
import setUpBtnTwitter from './sns/setUpBtnTwitter';
import setUpBtnLine from './sns/setUpBtnLine';
import setUpBtnFaceBook from './sns/setUpBtnFaceBook';


export default class Utils {

  constructor() {

    this._setup();
    
  }

  _setup() {
    // window.console.log('Utils_Setup!!');
    
    /**
     * array
     */
    this.Array = new Array();


    /**
     * ua
     */
    this.checkClient = new checkClient();


    /**
     * img
     */
    // this.preloadImg = new preloadImg();

    /**
     * sns
     */
    // this.setUpBtnTwitter = new setUpBtnTwitter;
    // this.setUpBtnLine = new setUpBtnLine;
    // this.setUpBtnFaceBook = new setUpBtnFaceBook;
  }

}