//--------------------------------------------------
//
//  ReadyMgr
//
//--------------------------------------------------

import ReadyPercent from '../../Func/ReadyPercent.js';

export default class ReadyMgr {

  constructor() {

    this.completed = 0;
    this.total = 0;
    this.current = 0;


    this.onCompletedFunc = ()=>{};

    this.setEvents();

  }

  setup() {

    this.readyPercent = new ReadyPercent();

  }

  onComplete() {

    // update処理をやめる
    gb.in.up.remove('readyPercent', this.readyPercent.update.bind(this));

    // 準備完了後の処理
    this.onCompletedFunc();

  }

  onReady() {

    this.setup();

  }
       
  setEvents() {

    $(document).on('ready', this.onReady.bind(this));

  }

}