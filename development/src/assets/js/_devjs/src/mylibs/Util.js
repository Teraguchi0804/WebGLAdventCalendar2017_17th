/**
 * fileOverview: 便利関数クラス
 * Project:
 * File: Util
 * Date:
 * Author:
 */

export default class Util {

  constructor() {

    this.isSetSPSize = false;

    this.startTime = null;
    this.elapsedTime = null;
    this.now = new Date();

  }

  /**
   * Math
   */


  /**
   * ランダムな値を返す
   * @param min : 最小値(int)
   * @param max : 最大値(int)
   * @returns {number} : minからmaxまでのランダムな整数(int)
   */
  random(min, max) {

    return Math.floor((Math.random() * ((max + 1) - min) + min));

  }

  /**
   * ランダムな整数を2つの範囲から取得
   * @param min1 : 最小値1(int)
   * @param max1 : 最大値1(int)
   * @param min2 : 最小値2(int)
   * @param max2 : 最大値2(int)
   * @returns {number} : minからmaxまでのランダムな整数(int)
   */
  random2(min1, max1, min2, max2) {
    
    if (this.hit(2)) {
      return this.random(min1, max1);
    } else {
      return this.random(min2, max2);
    }

  }

  /**
   * 1/@rangeの確率でtrueを取得
   * @param range : 母数(int)
   * @returns {boolean} : true or false(boolean)
   */
  hit(range) {

    return this.random(0, range - 1) === 0;

  }
  
  // 0から範囲内でランダムな整数を取得
  // -----------------------------------
  // @val : 範囲(int)
  // return : ランダムな整数(int)
  // -----------------------------------
  range(val) {

    return this.random(-val, val);

  }
  
  // 値をマッピング
  // -----------------------------------
  // @num : マッピングする値(Number)
  // @resMin : 結果となる値の最小値(Number)
  // @resMax : 結果となる値の最大値(Number)
  // @baseMin : 元となる値の最小値(Number)
  // @baseMax : 元となる値の最大値(Number)
  // return : マッピングされた値(Number)
  // -----------------------------------
  map(num, resMin, resMax, baseMin, baseMax) {

    var p;
    if (num < baseMin) {
      return resMin;
    }
    if (num > baseMax) {
      return resMax;
    }
    p = (resMax - resMin) / (baseMax - baseMin);

    return ((num - baseMin) * p) + resMin;

  }    
  
  // 数値に小数点第@n位までをつけた文字列を返す
  // -----------------------------------
  // @num : 値(Number)
  // @n : 小数点の位(int)
  // return : 変換された値(String)
  // -----------------------------------
  decimal(num, n) {
    var i, pos;
    num = String(num);
    pos = num.indexOf(".");
    if (n === 0) {
      return num.split(".")[0];
    }
    if (pos === -1) {
      num += ".";
      i = 0;
      while (i < n) {
        num += "0";
        i++;
      }
      return num;
    }
    num = num.substr(0, pos) + num.substr(pos, n + 1);
    return num;
  }

  clamp(numerator,denominator,val) {

    return val * (numerator / denominator);

  }

	/**
   * ラジアンを角度に変換
	 * @param radians
	 * @returns {number}
	 */
  degree(radians) {

    return radians * 180 / Math.PI;

  }

  // to radians
  radian(angle) { 

    return angle * Math.PI / 180; //1度何ラジアンか

  }

  dist(p1, p2) {

    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));

  }

  ascend(arr) {

    arr.sort(function(a,b){
      if( a > b ) return -1;
      if( a < b ) return 1;
      return 0;
    });
    // var a = [5,3,9,1,10]
    // 結果:10,9,5,3,1

  }

  descend(arr) {

    arr.sort(function(a,b){
      if( a < b ) return -1;
      if( a > b ) return 1;
      return 0;
    });

    // var a = [5,3,9,1,10]
    // 結果:1,3,5,9,10

  }

  // map(value, min01, max01, min02, max02) {

  //   var dis01 = max01 - min01;
  //   var dis02 = max02 - min02

  //   var rate = dis02 / dis01;

  //   value = value * rate;

  //   return value;
  // }

  constrain(value, min, max) {

    return Math.min(max, Math.max(value, min));

    // if (value <= low) value = low;
    // if (value >= high) value = high;     
    // return value;

  }

  // ユニークIDを取得
  // -----------------------------------
  unique() {

    return new Date().getTime();

  }
  
  // **jquary使用
  // ボタンモード変更
  // trueならカーソルがポインターの形に
  // falseならデフォルトのカーソルに
  // -----------------------------------
  // @flg : 適用するかどうか(boolean)
  // -----------------------------------
  buttonMode(flg) {

    if (flg) {
      return $("body").css("cursor", "pointer");
    } else {
      return $("body").css("cursor", "default");
    }

  }

  // ------------------------------------------------------------
  //
  //  portrait / landscape
  //
  // ------------------------------------------------------------
  isDirection () {

    var W = window.innerWidth,
        H = window.innerHeight;

    if (H > W) {
      $("body").addClass("portrait");
      $("body").removeClass("landscape");
    }else{
      $("body").addClass("landscape");
      $("body").removeClass("portrait");
    }

  }

  // ------------------------------------------------------------
  //
  //  responsive 横幅を見る
  //
  // ------------------------------------------------------------
  isResponsive (bp) {

    if (bp==undefined) bp=375;

    var W = window.innerWidth,
        H = window.innerHeight;

    if (W > bp) {
      this.isResSP = false;
      this.isResPC = true;
      $('body').removeClass('isResponsiveSP');
      $('body').addClass('isResponsivePC');
    } else {
      this.isResSP = true;
      this.isResPC = false;
      $('body').addClass('isResponsiveSP');
      $('body').removeClass('isResponsivePC');
    }

  }

  // ------------------------------------------------------------
  //
  //  URL
  //
  // ------------------------------------------------------------

  /**
   *
   * @returns {array}
   */
  getParam() {

    var url = location.href;
    var param = url.split('?')[1];
    if (param==undefined) return undefined;
    var paramItems = param.split('&');
    var list = {};
  
    for( var i = 0; i<paramItems.length; i++ ){

        paramItem = paramItems[i].split('=');
        list[paramItem[0]] = paramItem[1];

    }

    return list;

  }

  /**
   * ハッシュ取得 : location.hashの#を削除したやつ
   * @returns {string}
   */
  hash() {

    return location.hash.replace("#", "");

  }

  /**
   * cookie取得
   * @param key
   * @returns {*}
   */
  getCookie(key) {

    var a, arr, i, l, len1, val;
    if (document.cookie === void 0 || document.cookie === null) {
      return null;
    }
    arr = document.cookie.split("; ");
    for (i = l = 0, len1 = arr.length; l < len1; i = ++l) {
      val = arr[i];
      a = val.split("=");
      if (a[0] === key) {
        return a[1];
      }
    }
    return null;

  }      

  /**
   * cookie設定
   * @param key : パラメータ名
   * @param val : 値
   * @returns {string}
   */
  setCookie(key, val) {

    return document.cookie = key + "=" + val;

  }

  // ------------------------------------------------------------
  //
  //  Color
  //
  // ------------------------------------------------------------

  // rgbからHEXカラー取得
  // -----------------------------------
  // @r : 0~255
  // @g : 0~255
  // @b : 0~255
  // return : ex "#FFFFFF"
  // -----------------------------------
  getHexColor(r,g,b) {
      var str;
      str = (r << 16 | g << 8 | b).toString(16);
      return "#" + new Array(7 - str.length).join("0") + str;
  }

  // ------------------------------------------------------------
  //
  //  String
  //
  // ------------------------------------------------------------

  isContain(str,contain) {

    // strの中に,containが存在したら
    if ( str.indexOf(contain) != -1 ) {
      return true;
    }

    return false;

  }

  // 0埋めで2桁にする関数
  add0(str,num=-2){
    
    return ( "000000000000" + str ).substr( num );

  }

  floatFormat( number, n ) {

    var _pow = Math.pow( 10 , n ) ;
    return Math.round( number * _pow ) / _pow ;

  }
    
  // 値段表記
  // -----------------------------------
  price(num) {

    return String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');

  }

  // 文字列を反転
  // -----------------------------------
  // @str : 文字列(String)
  // return : 文字列(String)
  // -----------------------------------
  strReverse(str) {

    var i, len, res;
    res = "";
    len = str.length;
    i = 1;
    while (i <= len) {
      res += str.substr(-i, 1);
      i++;
    }
    return res;

  }
  
  // 文字列の全置換
  // -----------------------------------
  // @val  : 文字列
  // @oeg  : 置換前の文字列
  // @dest : 置換後の文字列
  // -----------------------------------
  replaceAll(val, org, dest) {

    return val.split(org).join(dest);

  }    
  
  strReplace(str, before, after) {

    var r = new RegExp( before, 'g');

    return str.replace( r , after );

  }    
  
  // ------------------------------------------------------------
  //
  //  Date
  //
  // ------------------------------------------------------------

  getNow() {

    this.now = new Date();

  }

  start() {

    this.startTime = this.now.getTime();

  }

  elapsed() {

    this.elapsedTime = this.now.getTime() - this.startTime;

  }

  m() {

    return Math.floor( this.elapsedTime + 100 / 60 );

  }

  s() {

    return Math.floor(this.elapsedTime / 1000);

  }

  ms() {

    return this.elapsedTime;
    
  }

  time() {

    this.getNow();

    this.hour = this.now.getHours();          // 時
    this.minute = this.now.getMinutes();      // 分
    this.second = this.now.getSeconds();
    this.millSecond = this.now.getMilliseconds();

  }

  date() {

    return this.now.getDate();

  }

  months() {

    var monthdays = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);

    return this.now.getMonth() + 1;

  }

  year() {

    return this.now.getFullYear();

  }

  day() {

    // 曜日 (日本語)
    var weekDayJP = ["日","月","火","水","木","金","土"] ;
    var wDJ = weekDayJP[this.now.getDay()] ;

    // 曜日 (英語)
    var weekDayEN = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"] ;
    var wDE = weekDayEN[this.now.getDay()] ;

  }
  
  // 数日後のDateオブジェクト取得
  // -----------------------------------
  afterDay(date, num) {

    return new Date(date.getTime() + Number(num) * 24 * 60 * 60 * 1000);

  }

  // ------------------------------------------------------------
  //
  //  Data type check
  //
  // ------------------------------------------------------------

  isObject(value, ignoreArray) {
      return typeof value === 'object' && value !== null;
  }

  isNumber(value) {
      return typeof value === 'number';
  }

  isString(value) {
      return typeof value === 'string';
  }

  isFunction(value) {
      return typeof value === 'function';
  }

  isArray(value) {
      return Object.prototype.toString.call(value) === '[object Array]';
  }

  isNull(value) {
      return value === null;
  }

  isUndefined(value) {
      return typeof value === 'undefined';
  }

  // ------------------------------------------------------------
  //
  //  other
  //
  // ------------------------------------------------------------
  setImgSPSize ($target){

    // responsive spのとき処理
    if (!this.isResSP) return;
    // 一度だけ処理
    // if (this.isSetSPSize) return;
    // this.isSetSPSize = true;

    var $img = $target,
        len = $img.length;

    $img.each(function(i) {

        var w = Math.floor($(this).width() / 2),
            h = Math.floor($(this).height() / 2);

        $(this).attr({
            'width': w,
            'height': h,
        });

        if (len == i + 1) $(window).trigger('setSpZieEnd');

    });

  }

  // ------------------------------------------------------------
  //  スマホ操作無効
  // ------------------------------------------------------------
  setPrevent() {

    var self = this;

    $(window).on('touchmove.noControl', function(e){e.preventDefault();});

  }

  removePrevent() {

    $(window).off('touchmove.noControl');

  }

  // ------------------------------------------------------------
  //  host,protcol
  // ------------------------------------------------------------
  protocol() {

    return location.protocol;

  }
    
  host() {

    return location.hostname;
    // return location.host

  }

  port() {

    return location.port;

  }
        
  path() {

    return location.pathname;

  }

  preventDefault(e) {

    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;

  }

  preventDefaultForScrollKeys(e) {

    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }

  }

  disableScroll() {

    if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', this.preventDefault, false);
    window.onwheel = this.preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = this.preventDefault; // older browsers, IE
    window.ontouchmove  = this.preventDefault; // mobile
    document.onkeydown  = this.preventDefaultForScrollKeys;

  }

  enableScroll() {

    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', this.preventDefault, false);
    window.onmousewheel = document.onmousewheel = null; 
    window.onwheel = null; 
    window.ontouchmove = null;
    document.onkeydown = null;

  }

}