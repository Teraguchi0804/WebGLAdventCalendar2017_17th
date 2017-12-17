//--------------------------------------------------
//
//  updateManager
//
//--------------------------------------------------

(function(){

  var gb = jp.co.plusMV;

  function EventMgr() {

    this.cbs = {}; //callbacks

  }

  EventMgr.prototype = {

    on: function(name, cb){
      
      if (!this.cbs[name]) this.cbs[name] = [];

      this.cbs[name].push(cb);   

    },

    trigger: function(name){
      
      var cbs = this.cbs[name];
      if (!cbs) return;
      
      for (var i in cbs) cbs[i]();

    },

  };

  // 公開api
  gb.EventMgr = EventMgr;
  
})();