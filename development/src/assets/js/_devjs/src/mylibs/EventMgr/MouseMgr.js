//--------------------------------------------------
//
//  MouseMgr
//
//--------------------------------------------------

export default class MouseMgr {

  constructor($target = $(document)) {

    this.$target = $target;

    this.x = 0;
    this.y = 0;

    this.cx = 0;
    this.cy = 0;

    this.mouseMoveList = [{name:'def',func:()=>{}}];
    this.mouseMoveStartList = [{name:'def',func:()=>{}}];
    this.mouseMoveEndList = [{name:'def',func:()=>{}}];

    this.isStart = true;
    this.Timer = null;
    this.endTime = 10;

    this.setup();
    this.setEvents();

  }

  setup() {

    this.add('onEnd', this.onEnd.bind(this));

  }

  onTouchmove(e) {

    // e.preventDefault();

    this.x = e.originalEvent.changedTouches[0].pageX; 
    this.y = e.originalEvent.changedTouches[0].pageY;

  }

  onMousemove(e) {

    // log(this.mouseMoveList);

    if (this.isStart) {
      this.isStart = false;

      // 最初だけの処理
      // log('moveStart');

      for (var i in this.mouseMoveStartList) this.mouseMoveStartList[i].func();

    };

    if (e.offsetX==undefined) { // this works for Firefox
       this.x = e.pageX - this.$target.offset().left;
       this.y = e.pageY - this.$target.offset().top;
     } else { // works in Google Chrome
       this.x = e.pageX - $(window).scrollLeft();
       this.y = e.pageY - $(window).scrollTop();
     }

    this.cx = ( e.clientX - gb.in.r.W()/2 );
    this.cy = ( e.clientY - gb.in.r.H()/2 );

    for (var i in this.mouseMoveList) this.mouseMoveList[i].func();

  }

  onEnd(e) {

    if (this.Timer) clearTimeout(this.Timer);
    this.Timer = setTimeout(()=>{
      this.isStart = true;

      // log('moveEnd');

      for (var i in this.mouseMoveEndList) this.mouseMoveEndList[i].func();

    }, this.endTime);

  }

  add(name, func) {

    var obj = {name:name,func:func};

    this.mouseMoveList.push(obj);
    
  }
 
  addStart (name, func) {

    var obj = {name:name,func:func};

    this.mouseMoveStartList.push(obj);
    
  }

  addEnd (name, func) {

    var obj = {name:name,func:func};

    this.mouseMoveEndList.push(obj);
    
  }

  remove(name) {

    MouseMgr.arrRemove(this.mouseMoveList, name);

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

  removeEvents(){

    this.$target.off("touchmove.MouseMgr");
    this.$target.off("mousemove.MouseMgr");

  }

  setEvents(){

    this.$target.on("touchmove.MouseMgr", (e)=>{this.onTouchmove(e);});
    this.$target.on("mousemove.MouseMgr", (e)=>{this.onMousemove(e);});

  }

}