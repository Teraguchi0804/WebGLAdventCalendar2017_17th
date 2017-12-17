//--------------------------------------------------
//
//  Size
//
//--------------------------------------------------

// ウィンドウ幅に合わせて対象オブジェクトの拡縮
// -----------------------------------
// win(obj)  : ウィンドウサイズ
    // win.def
    // win.min
    // win.max
    // win.hflag
// $obj(jqueryObj) : 対象jqueryオブジェクト
// list(array) : 対象プロパティ
// notobj(セレクタstr) : 対象jqueryオブジェクト
// notList(array) : 非対象にするプロパティ
// flag(obj) : フラグ
    // innerFlag(str) : widthでpaddingを含めるか含めないか 
    // defFlag(boolean) : デフォルトのプロパティを含めるか含めないか

// return : このクラス
// -----------------------------------
(function(){

  var gb = jp.co.mie;

  function SizeAdjust(win,$obj,list,notObj,notList,flag){

    // ----------------
    //  対象jqueryオブジェクト  
    // ----------------
    if (!notObj) {
      this.$target = $obj;
    } else {
      this.$target = $obj.not(notObj);  
    }

    // ----------------
    //  対象プロパティリスト
    // ----------------
    this.flag = flag;
    if (this.flag === undefined || this.flag.innerFlag === undefined) this.innerFlag = '';
    if (this.flag === undefined || this.flag.defFlag === undefined) this.defFlag = false;
    if (this.defFlag) {
      this.defList = [
        'width','height',
        'top','right','bottom','left',
        'margin-top','margin-right','margin-bottom','margin-left',
        'padding-top','padding-right','padding-bottom','padding-left',

        'background-size'
      ];
    } else {
      this.defList = [];
    }

    // デフォルトのプロパティリストと連結
    this.list = this.defList.concat(list);
    // 重複削除
    this.list = this.list.filter(function (x, i, self) {
              return self.indexOf(x) === i;
           });

    // 非対象プロパティリストを外す
    this.notList = notList || [];

    // 対象から外す
    for (var i = 0; i < this.notList.length; i++) {
      for(j=0; j<this.list.length; j++){
          if(this.list[j] == this.notList[i]){
              this.list.splice(j--, 1);
          }
      }
    }

    this.tempList = [];
    this.len = this.list.length;

    // ----------------
    //  ウィンドウ幅の設定
    // ----------------
    this.win = win;
    this.defW = win.def;
    this.maxW = win.max;
    this.minW = win.min;

    if (!win.hFlag) this.W = window.innerWidth;
    else this.W = window.innerHeight - 88;
    this.rate = this.W / this.defW;

    this.setup();
    this.setEvents();

  }

  SizeAdjust.prototype = {

    setup: function () {

      var self = this;

      this.$target.each(function(index) {

        self.tempList[index] = [];

        for (var i = 0; i < self.len; i++) {

          var css = $(this).css(self.list[i]);
          if (css !== '0px' && css !== 'auto') {

            // padding部分含めるか、含めないか
            if (self.innerFlag == 'inner' && self.list[i] == 'width') {
              var val = parseInt($(this).innerWidth());
            } else {
              var val = parseInt(css);
            }

            $(this).data(self.list[i],val);
            self.tempList[index].push(self.list[i]);
          };

        };

      });

    },

    update: function () {

      if (!this.win.hFlag) this.W = window.innerWidth;
      else this.W = window.innerHeight;

      if (this.W > this.maxW) this.W = this.maxW;
      if (this.W < this.minW) this.W = this.minW;

      this.rate = this.W / this.defW;

    },

    setVal: function () {

      var self = this

      this.$target.each(function(index) {

        var len = self.tempList[index].length;

        for (var i = 0; i < len; i++) {

          $(this).css(self.tempList[index][i],$(this).data(self.tempList[index][i]) * self.rate);  

        };

      });

    },

    run: function () {

      this.update();
      this.setVal();

    },

    setEvents: function() {

      // gb.in.r.add(this.run.bind(this));

    },

  }
  // 公開api
  gb.SizeAdjust = SizeAdjust;

}());



//--------------------------------------------------
//
//  USAGE
//
//--------------------------------------------------
// (function(){

//   var gb = jp.co.mie;

//   function ApplySizeDeviceTop() {

//     this.r = [];
//     this.rh = [];

//     this.setupPort();
//     this.setupLand();

//   };

//   ApplySizeDeviceTop.prototype = {

//     setupPort: function () {

//      // portrait時
//      var win = {
//              def: 375,
//              min: 320,
//              max: 375,
//            };
//      if (!$('body').hasClass('pjaxTransition')) {
//        var sizeList = [
//          // basic
//          {obj:$('img'),list:[],win:win,notObj:'.logoImg',inner:'',notList:[]},
//          {obj:$('.fzLiquid'),list:['font-size','letter-spacing'],win:win,notObj:'',inner:'',notList:['width','height']},

//          // topvisual
//          {obj:$('#topVisual'),list:[],win:win,notObj:'',inner:'inner',notList:[]},
//          {obj:$('#topVisual .tit'),list:[],win:win,notObj:'',inner:'',notList:['height']},
//          {obj:$('#topVisual .text'),list:[],win:win,notObj:'',inner:'',notList:['width','height']},
//          {obj:$('#topVisualWrap .barL'),list:[],win:win,notObj:'',inner:'',notList:['width']},
//          {obj:$('#topVisualWrap .ui__menu_btn'),list:[],win:win,notObj:'',inner:'',notList:['background-size']},

//          // header
//          {obj:$('#header .logoImg'),list:[],win:win,notObj:'',inner:'',notList:[]},
//          {obj:$('#header .barL'),list:[],win:win,notObj:'',inner:'',notList:['height']},
//          {obj:$('#header .page'),list:['font-size'],win:win,notObj:'',inner:'',notList:[]},
         
//          // menu
//          {obj:$('.ui__menu .item'),list:[],win:win,notObj:'',inner:'',notList:['width']},  
//          {obj:$('.ui__menu .ui__menu_btn_c'),list:[],win:win,notObj:'',inner:'',notList:['top']},  
//          {obj:$('.ui__menu'),list:[],win:{def: 375,min: 320,max: 10000},notObj:'',inner:'',notList:['width','height','padding-top','padding-bottom']},
//        ]
//       } else {
//         var sizeList = [
//           // basic
//           {obj:$('img'),list:[],win:win,notObj:'.logoImg',inner:'',notList:[]},
//           {obj:$('.fzLiquid'),list:['font-size','letter-spacing'],win:win,notObj:'',inner:'',notList:['width','height']},

//           // topvisual
//           {obj:$('#topVisual'),list:[],win:win,notObj:'',inner:'inner',notList:[]},
//           {obj:$('#topVisual .tit'),list:[],win:win,notObj:'',inner:'',notList:['height']},
//           {obj:$('#topVisual .text'),list:[],win:win,notObj:'',inner:'',notList:['width','height']},
//           {obj:$('#topVisualWrap .barL'),list:[],win:win,notObj:'',inner:'',notList:['width']},
//           {obj:$('#topVisualWrap .ui__menu_btn'),list:[],win:win,notObj:'',inner:'',notList:['background-size']},

//           // menu
//           {obj:$('.ui__menu .item'),list:[],win:win,notObj:'',inner:'',notList:['width']},  
//           {obj:$('.ui__menu .ui__menu_btn_c'),list:[],win:win,notObj:'',inner:'',notList:['top']},  
//           {obj:$('.ui__menu'),list:[],win:{def: 375,min: 320,max: 10000},notObj:'',inner:'',notList:['width','height','padding-top','padding-bottom']},
//         ]
//       }
       
//      for (var i = 0; i < sizeList.length; i++) {
//        var list = sizeList[i];
//        var Re = new gb.Size(list.obj,list.list,list.win,list.notObj,list.inner,list.notList);
//        Re.getDef();
//        this.r.push(Re);
//      };

//     },

//     setupLand: function () {
      
//       // landscape時
//       var win = {
//               def: 375,
//               min: 0,
//               max: 375,
//               hFlag: true,
//             };

//       if (!$('body').hasClass('pjaxTransition')) {
//         var sizeListH = [
//           // basic
//           {obj:$('img'),list:[],win:win,notObj:'.logoImg',inner:'',notList:[]},
//           {obj:$('.fzLiquid'),list:['font-size','letter-spacing'],win:win,notObj:'',inner:'',notList:['width']},

//           // topvisual
//           {obj:$('#topVisual'),list:[],win:win,notObj:'',inner:'inner',notList:[]},
//           {obj:$('#topVisual .tit'),list:[],win:win,notObj:'',inner:'',notList:[]},
//           {obj:$('#topVisual .text'),list:[],win:win,notObj:'',inner:'',notList:['width']},

//           // header
//           // {obj:$('#header .barL'),list:[],win:win,notObj:'',inner:'',notList:['height','top']},
//           // {obj:$('#header .page'),list:['font-size','letter-spacing'],win:win,notObj:'',inner:'',notList:['top']},

//           // menu
//           {obj:$('.ui__menu .item'),list:[],win:win,notObj:'',inner:'',notList:['width']},  
//           {obj:$('.ui__menu .ui__menu_btn_c'),list:[],win:win,notObj:'',inner:'',notList:['top']},  
//           {obj:$('.ui__menu'),list:[],win:{def: 375,min: 320,max: 10000},notObj:'',inner:'',notList:['width','height','padding-top','padding-bottom']},
//         ]
//       } else {
//         var sizeListH = [
//           // basic
//           {obj:$('img'),list:[],win:win,notObj:'.logoImg',inner:'',notList:[]},
//           {obj:$('.fzLiquid'),list:['font-size','letter-spacing'],win:win,notObj:'',inner:'',notList:['width']},

//           // topvisual
//           {obj:$('#topVisual'),list:[],win:win,notObj:'',inner:'inner',notList:[]},
//           {obj:$('#topVisual .tit'),list:[],win:win,notObj:'',inner:'',notList:[]},
//           {obj:$('#topVisual .text'),list:[],win:win,notObj:'',inner:'',notList:['width']},

//           // menu
//           {obj:$('.ui__menu .item'),list:[],win:win,notObj:'',inner:'',notList:['width']},  
//           {obj:$('.ui__menu .ui__menu_btn_c'),list:[],win:win,notObj:'',inner:'',notList:['top']},  
//           {obj:$('.ui__menu'),list:[],win:{def: 375,min: 320,max: 10000},notObj:'',inner:'',notList:['width','height','padding-top','padding-bottom']},
//         ]
//       }
        
//       for (var i = 0; i < sizeListH.length; i++) {
//         var list = sizeListH[i];
//         var Re = new gb.Size(list.obj,list.list,list.win,list.notObj,list.inner,list.notList);
//         this.rh.push(Re);
//       };

//     },

//     resizePort: function () {

//       // size
//       for (var i = 0; i < this.r.length; i++) {
//         this.r[i].onResize();
//       };

//     },
      
//     resizeLand: function () {

//       // size
//       for (var i = 0; i < this.rh.length; i++) {
//         this.rh[i].onResize();
//       };

//     },

//   }

//   gb.ApplySizeDeviceTop = ApplySizeDeviceTop;

// }());