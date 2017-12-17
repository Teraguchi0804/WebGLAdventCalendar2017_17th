//--------------------------------------------------
//
//  ResizeMgr
//
//--------------------------------------------------

export default class ResizeMgr {

  constructor() {

    this.resizeList = [];
    this.ws = {w:0, h:0, oldW:-1, oldH:-1};

    this.setup();

  }

  setup() {

    var self = this;

    $(window).on('resize', function(e){self.onResize.call(self,e);});
    this.getWindowSize();

  }

  onResize(e) {

    this.getWindowSize();

    for (var i in this.resizeList) this.resizeList[i].func();

  }

  W() {

      return this.ws.w;
    
  }
  
  H() {

      return this.ws.h;
  
  }

  getWindowSize(){

    var w = window.innerWidth,
        h = window.innerHeight;

    this.ws.oldW = this.ws.w;
    this.ws.oldH = this.ws.h;
    this.ws.w = w;
    this.ws.h = h;

  }

  add(name, func) {

    var obj = {name:name,func:func};

    this.resizeList.push(obj);
    
  }

  remove(name) {

    ResizeMgr.arrRemove(this.resizeList, name);

  }

  // ------------------------------------------------------------
  //
  //  静的メンバ
  //
  // ------------------------------------------------------------
  static arrRemove(arr , name) {

    var len = arr.length;
    var check;
    for( var i = 0 ; i < len; i++ ) {
      check = arr[ i ];

      if( check.name == name){
        arr.splice( i , 1 ) ;
        i--;
        len--;
      }
    }

    return arr;

  }

}