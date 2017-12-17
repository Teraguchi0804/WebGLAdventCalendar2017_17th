//--------------------------------------------------
//
//  AudioMgr
//
//--------------------------------------------------

(function(){

  var gb = jp.co.onepieace;

  function AudioMgr(src) {

    this.src = src;

    this.gainNode = null;
    this.context = null;
    this.buffer = null;
    this.analyser = null;
    this.audio = null;

    this.constructor();

  }

  AudioMgr.prototype = {

    constructor :function(){ 

      var audio,type;


      window.AudioContext = window.AudioContext || window.webkitAudioContext;

      try {
          this.context = new AudioContext();
      } catch (error) {
          window.alert(error.message);
          return;
      }

      if (this.src) this.loadAudio(this.src);

    },

    loadAudio :function(src){

        var self = this;

        var req = new XMLHttpRequest();
        req.open("GET", src, true);
        req.responseType = "arraybuffer";

        req.onload = function () {
            
            var res = req.response;
            self.context.decodeAudioData(res, function (buf) {

                self.buffer = buf;
                self.play();

            });

        }
        req.send();

    },

    audioLoaded :function() {

      // this.canplay = true;
      this.play();

    },

    // 1秒待った後、オーディオバッファの3秒経過した位置から、10秒間再生します。
    play :function(delay, offset, duration){ 

      var delay = delay || 0,
          offset = offset || 0,
          duration = duration || this.getDuration();

      this.gainNode = this.context.createGain();
      this.audio = this.context.createBufferSource();

      this.audio.start = this.audio.start || this.audio.noteOn;
      this.audio.stop  = this.audio.stop  || this.audio.noteOff;

      this.audio.buffer = this.buffer;
      this.audio.connect(this.gainNode);
      this.gainNode.connect(this.context.destination);

      this.audio.start(delay,offset,duration);

    },

    pause :function(){ 

      this.context.suspend();

    },

    resume :function(){ 

      this.context.resume();

    },

    updateCurrentTime :function(delay, offset, duration){ 

      var delay = delay || 0,
          offset = offset || 0,
          duration = duration || this.getDuration();

      this.audio.stop();
      this.play(delay, offset, duration);

    },

    getDuration :function(){ 

      return this.buffer.duration;

    },

    setLoop :function(boolean){ 

      this.audio.loop = boolean;

    },

    setRate :function(val){ 

      // デフォルトが1
      // this.audio.playbackRate = val;

    },

    tweenVolume :function(val,dur,ease){ 

      // 0.0（無音）～ 1.0（最大）

      var dur = dur || 0.5,
          ease = ease || Power4.easeIn; 

      TweenMax.to(this.gainNode.gain, dur, {value:val, ease: ease});

    },

    muted :function(boolean){ 

      // this.audio.muted = boolean;

    },

  }

  // 公開api
  gb.AudioMgr = AudioMgr;

  
})();