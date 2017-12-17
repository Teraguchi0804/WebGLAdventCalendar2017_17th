/**
 * fileOverview:
 * Project:
 * File: DisplayTop
 * Date: 17/9/23
 * Author: Teraguchi
 */

import ZoomBlur from '../visual/ZoomBlur';


'use strict';

export default class DisplayTop {

	constructor() {

		this.zoomblur = new ZoomBlur();

		this.setup();
		this.setEvents();

	}

	setup() {

		this.zoomblur.init();

	}

	onLoad() {


	}

	setEvents() {

		$(window).on('load', this.onLoad.bind(this));

	}

}