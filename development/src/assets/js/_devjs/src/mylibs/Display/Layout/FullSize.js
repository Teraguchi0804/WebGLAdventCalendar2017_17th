//--------------------------------------------------
//
//  FullSize
//
//--------------------------------------------------

export default class FullSize {

  constructor($Wrap,$Target,mode, name) {

    this.$wrap = $Wrap;
    this.$target = $Target;

    this.W = this.$wrap.width();
    this.H = this.$wrap.height();
    this.targetW;
    this.targetH;
    this.targetDefW;
    this.targetDefH;
    this.ratioW;
    this.ratio;
    this.ml;
    this.mt;

    this.mode = mode || 0;
    this.name = name || 'fullsize';

    // this.init();
    // this.run();
    this.setEvents();

  }

  setStyle() {

    this.$wrap.css({
      'overflow': 'hidden',
    });
    this.$target.css('position', 'absolute');

  }

  getDef() {

    this.targetDefW = this.$target.get(0).clientWidth || this.$target.get(0).width || this.$target.width(),
    this.targetDefH = this.$target.get(0).clientHeight || this.$target.get(0).height  || this.$target.height();

  }

  getSize() {

    this.W = this.$wrap.width();
    this.H = this.$wrap.height(); 

    this.ratioW = this.H / this.W;
    this.ratio = this.targetDefH / this.targetDefW,

    this.ml = - (this.targetDefW * (this.H / this.targetDefH)) / 2;
    this.mt = - (this.targetDefH * (this.W / this.targetDefW)) / 2;

  }

  setPos(){

      if (this.mode == 'cover' || this.mode == 0) {

        //--------------------------------------------------
        //  枠にピッタリになるように background-size cover
        //--------------------------------------------------

        if (this.ratioW > this.ratio) {

          var w = (this.H / this.targetDefH) * this.targetDefW;

            this.$target
              .css({'height': this.H})
              .css({'margin-top': 0,'margin-left': this.ml,'top':0,'left':'50%','width':w});

        } else if ( this.ratioW <= this.ratio) {

            var h = (this.W / this.targetDefW) * this.targetDefH;

            this.$target
              .css({'width': this.W})
              .css({'margin-top': this.mt,'margin-left': 0,'top':'50%','left':0,'height':h});

        }

      } else if (this.mode == 'contain' || this.mode == 1){

        //--------------------------------------------------
        //  枠内にピッタリ収まるように background-size contain
        //--------------------------------------------------

        if (this.ratioW < this.ratio) {

            this.$target
              .css({'height': this.H})
              .css({'margin-top': 0,'margin-left': this.ml,'top':0,'left':'50%','width':'auto'});

        } else if ( this.ratioW >= this.ratio) {

            this.$target
              .css({'width': this.W})
              .css({'margin-top': this.mt,'margin-left': 0,'top':'50%','left':0,'height':'auto'});

        }

      } 

  }

  init() {

    this.getDef();

  }

  run() {

    this.setStyle();
    this.getSize();
    this.setPos();

  }

  setEvents() {

    gb.in.r.add(this.name, this.run.bind(this));

  }

}