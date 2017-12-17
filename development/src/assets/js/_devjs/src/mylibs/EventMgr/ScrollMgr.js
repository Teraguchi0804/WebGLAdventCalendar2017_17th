//--------------------------------------------------
//
//  ScrollMgr
//
//--------------------------------------------------

export default class ScrollMgr {

  constructor() {

    this.scrollList = [];
    this.scrollEndList = [];
    this.w = 0;this.h = 0;
    this.st = 0; // 現在のscroll top
    this.sb = 0; // 現在のscroll bottom
    this.sv = 0; // 現在のスクロール量

    this.STAmount = 0;
    this.offset = 0;

    this.isStart = true;

    this.setEvents();

  }

  setup() {

    var self = this;

    this.getWindowSize();
    this.add('end',this.end.bind(this));

  }

  add(name, func) {

    var obj = {name:name,func:func};

    this.scrollList.push(obj);
    
  }

  remove(name) {

    ScrollMgr.arrRemove(this.scrollList, name);

  }

  remove(target) {

    ScrollMgr.arrRemove(this.scrollList, target);

  }

  onResize(e) {

    this.getWindowSize();

  }

  onScroll(e) {

    if (this.isStart) {
      this.isStart = false;
      // log('resizeStart');
      // 最初だけの処理
    };

    this.st = $(window).scrollTop();
    this.sb = this.st + this.h;

    for (var i in this.scrollList) this.scrollList[i].func();

  }

  onMouseWheel(e,delta,deltaX,deltaY) {

    this.STAmount = deltaY;
    if (gb.in.u.isWin()) this.STAmount *= 60;
    if (gb.in.u.isFF() && !gb.in.u.isWin()) this.STAmount *= 60;
    // if (Math.abs(this.STAmount) > 10) this.STAmount *= 0.4;
    this.offset += this.STAmount;

    for (var i in this.scrollList) this.scrollList[i].func();

  }

  getWindowSize(){

    this.w = window.innerWidth;
    this.h = window.innerHeight;

  }

  end(e) {

    var self = this;

    if (this.Timer) clearTimeout(this.Timer);
    this.Timer = setTimeout(function() {
      self.isStart = true;
      // log('resizeEnd');

      for (var i in self.scrollEndList) self.scrollEndList[i]();

    }, 200);

  }

  addFixedObjectScroll($target) {

    this.scrollList.push(function(){

      $target.css("left", -$(window).scrollLeft());

    });

  }

  onReady() {

    this.setup();

    $(window).on('resize', (e)=>{this.onResize(e);});
    $(window).on('scroll', (e)=>{this.onScroll(e);});
    $(document).on('mousewheel', (e,delta,deltaX,deltaY)=>{this.onMouseWheel(e,delta,deltaX,deltaY);});

  }
       
  setEvents() {

    $(document).on('ready', this.onReady.bind(this));

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