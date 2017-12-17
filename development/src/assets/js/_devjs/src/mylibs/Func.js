/**
 * fileOverview:
 * Project:
 * File: Func
 * Date:
 * Author:
 */

export default class Func {

  constructor() {

    this.blank();
    this.debugger();
    this.requestAnimationFrame();
    this.expandjQuery();

  }

  blank() {

    $(()=>{$('.blank').attr('target', '_blank');});

  }

  debugger() {

    // デバッグモード切替
    var RELEASE = gb.in.conf.RELEASE;

    // 置換対象のメソッドを配列として保持する
    var methods = [
      'log',
      'debug',
      'info',
      'warn',
      'error',
      'dir',
      'trace',
      'assert',
      'dirxml',
      'group',
      'groupEnd',
      'time',
      'timeEnd',
      'count',
      'profile',
      'profileEnd'
    ];

    // consoleが使えない場合は空のオブジェクトを設定しておく
    if( typeof window.console === "undefined" ){
      window.console = {};
    }

    // 各メソッドをwindowへ直接追加して行く
    for( var i in methods ){
      (function( m ){

       // consoleにある？デバッグモードは有効？consoleのものは関数？
       if( console[m] && !RELEASE && typeof console[m] === "function" ){
        window[m] = console[m].bind(console);
       } else {　// debugModeがfalse,もしくは該当メソッドが存在しない場合は、空のメソッドを用意する
        window[m] = function(){};
       }

      })( methods[i] );
    }

  }

  prepend(param) {

    $('body').prepend(param);

  }

  requestAnimationFrame() {

    var FPS = 1000/60;

    window.requestAnimationFrame = window.requestAnimationFrame || // chromeや最新の
                                   window.mozRequestAnimationFrame || // 古いfirefox用
                                   window.webkitRequestAnimationFrame ||  // safari6以前、iOS6 safari用
                                   function( callback ) {
                                     window.setTimeout(callback, FPS);
                                   };

    window.cancelAnimationFrame = window.cancelAnimationFrame ||
                                  window.mozCancelAnimationFrame ||
                                  window.webkitCancelAnimationFrame ||
                                  function( timer ) {
                                    window.clearTimeout(timer);
                                  };      

  }

  expandjQuery() {

    jQuery.fn.extend({
      w:0, 
      h:0, 
      adjust: function() {
          var w = $(this).innerWidth();
          var h = $(this).innerHeight();
          $(this).css({
            'position':'absolute',
            'left':'50%',
            'top':'50%',
            'margin-left':'-' + (w / 2) + 'px',
            'margin-top':'-' + (h / 2) + 'px'
          });
      },
      adjustW: function() {
          var w = $(this).innerWidth();
          var h = $(this).innerHeight();
          $(this).css({
            'position':'absolute',
            'left':'50%',
            'margin-left':'-' + (w / 2) + 'px'
          });
      },
      adjustH: function() {
          var w = $(this).innerWidth();
          var h = $(this).innerHeight();
          $(this).css({
            'position':'absolute',
            'top':'50%',
            'margin-top':'-' + (h / 2) + 'px'
          });
      }
    });

  }

  checkCssBlend() {

    if ('CSS' in window && 'supports' in window.CSS) {
      if (!window.CSS.supports('mix-blend-mode', 'soft-light')) {
        document.documentElement.classList.add('not-mix-blend-mode')
      }
    }

    log(gb.in.u.isIE);

    if (gb.in.u.isIE) {
      
      document.documentElement.classList.add('not-mix-blend-mode')
      
    };

  }

  notSaveImg() {

    // ------------------------------------------------------------
    //
    //  pc
    //
    // ------------------------------------------------------------

    if (gb.in.u.isPC) {

      $(()=>{
        $("img").on("contextmenu",()=>{
          return false;
        })
      })

    }


    // ------------------------------------------------------------
    //
    //  sp android
    //
    // ------------------------------------------------------------
    var v = gb.in.u.isAndroidVersion();

    if (v==undefined) return;
    if (v<5) {

      var timer;
      $("img").on("touchstart",()=>{
        timer = setTimeout(()=>{
          alert("画像は保存できません")
        },500)
        return false;
      })
      $("img").on("touchend",()=>{
        clearTimeout(timer);
        return false;
      })      

    }

  }

}