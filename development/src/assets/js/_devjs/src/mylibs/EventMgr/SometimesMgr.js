//--------------------------------------------------
//
//  SomeTimes
//
//--------------------------------------------------

export default class SomeTimes {

  constructor() {

    this.SomeTimes;
    this.Timer = null;
    this.cbList = [];
    this.len = 0;
    this.order = 0;

    this.min = [];
    this.max = [];

    this.setup();

  }

  setup() {


  }

  start(min=0, max=0) {

    this.later = gb.in.u.random(min,max) * 1000;
    this.Timer = setTimeout(this.run.bind(this),this.later);

  }

  run() {

    this.order = this.order % this.len;

    this.later = gb.in.u.random(this.min[this.order],this.max[this.order]) * 1000;

    this.cbList[this.order]();

    this.order++;
    this.Timer = setTimeout(this.run.bind(this),this.later);

  }

  stop() {

    log(this.Timer);
    clearTimeout(this.Timer);

  }

  add(func,min=8,max=12) {

    this.min.push(min);
    this.max.push(max);

    this.cbList.push(func);
    this.len = this.cbList.length;

  }

  setEvents() {


  }

}