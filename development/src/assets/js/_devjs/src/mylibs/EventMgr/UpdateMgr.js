/**
 * fileOverview: 画面更新クラス
 * Project:
 * File: UpdateMgr
 * Date:
 * Author:
 */

'use strict';

export default class UpdateMgr {

  constructor() {

    //更新回数
    this.cnt = 0;

    //毎フレーム実行させる関数を保持
    this.updateList = [];

    this.len = 0;
    this.Timer = null;
    this.isStop = false;

  }

  /**
   *  実行したい関数を登録
   *  func : 関数
   */
  add(name, func) {

    var obj = {name:name,func:func};

    this.updateList.push(obj);

  }

  /**
   *  実行したい関数を削除
   *  func : 関数
   */
  remove(name) {

    var target = {name:name,func:()=>{}};

    UpdateMgr.arrRemove(this.updateList, target);

  }

  /**
   *  更新(登録された関数の総数分実行する)
   */
  update() {

    for (var i in this.updateList) this.updateList[i].func();

  }

  /**
   *　更新の実行関数の内容
   */
  loop() {

    this.update();
    this.cnt++;

    this.Timer = requestAnimationFrame(this.loop.bind(this));
    if (this.isStop) cancelAnimationFrame(this.Timer);
    

  }

  /**
   *　更新停止
   */
  stop() {

    this.isStop = true;

  }

  /**
   *　更新再開
   */
  resume() {

    this.isStop = false;
    this.loop();

  }

  /**
   *　静的メンバ関数
   */
  static arrRemove(arr , target) {

    var len = arr.length;
    var check;
    for( var i = 0 ; i < len; i++ ) {
      check = arr[ i ];

      if( check.name == target.name){
        arr.splice( i , 1 ) ;
        i--;
        len--;
      }
    }

    return arr;

  }

}