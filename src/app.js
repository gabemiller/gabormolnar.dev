// styles
import './styles/app.scss';

import {default as P5} from 'p5';
import Dot from './components/Dot';
import DIRECTION_TYPE from './components/DirectionType';

/**
 * Represent GMApp
 *
 * @author Gabor Molnar
 */
class GMApp {

	/**
	 * Initialize a GMApp object
	 *
	 * @constructor
	 */
	constructor() {
		this._canvasParent = document.querySelector('body');
		this._dots = [];
		this._p5 = new P5(this._canvas());
	}

	get canvasParent() {
		return this._canvasParent;
	}

	get dots() {
		return this._dots;
	}

	/**
	 * Initialize dots
	 *
	 * @param {p5} sketch - object of p5
	 * @param {number} width - width of canvas
	 * @param {number} height - height of canvas
	 */
	initDots(sketch, width, height){
		for(let i = 0; i < 100; i++){
			this.dots.push(
				new Dot(
					sketch.random(50, width - 50),
					sketch.random(10, height - 10),
					5,
					sketch.random(Object.values(DIRECTION_TYPE)),
					sketch.random(0.1,1)
				)
			);
		}
	}

	/**
	 * Handle p5 js setup and refresh canvas
	 *
	 * @private
	 */
	_canvas() {
		const that  = this;

		return (sketch) => {
			let canvas = null;
			const {clientWidth: canvasWidth, clientHeight: canvasHeight} = that.canvasParent;
			this.initDots(sketch, canvasWidth, canvasHeight);

			sketch.setup = () => {
				canvas = sketch.createCanvas(canvasWidth, canvasHeight);
				canvas.parent(that.canvasParent);
			};

			sketch.draw = () => {
				sketch.background('hsl(280, 4%, 14%)');
				sketch.fill('hsl(0, 0%, 81%)');
				for(let i = 0; i < that.dots.length; i++) {
					for (let j = i + 1; j < that.dots.length; j++) {
						if (that.dots[i] === that.dots[j]) {
							continue;
						}
						const distance = sketch.int(
							sketch.dist(
								that.dots[i].x,
								that.dots[i].y,
								that.dots[j].x,
								that.dots[j].y
							)
						);

						if (distance < 100) {
							sketch.stroke(`rgba(255,255,255,${1 - distance / 100})`);
							sketch.line(that.dots[i].x, that.dots[i].y, that.dots[j].x, that.dots[j].y);
						}
					}
					sketch.noStroke();
					sketch.circle(that.dots[i].x, that.dots[i].y, that.dots[i].r);
					that._move(that.dots[i]);
					that._changeDirection(that.dots[i], canvasWidth, canvasHeight);
				}
			};

			sketch.windowResized = () => {
				sketch.resizeCanvas(canvas.parent().clientWidth, canvas.parent().clientHeight);
			};
		};
	}

	/**
	 * Move dot with speed to its direction
	 *
	 * @param {Dot} dot - a Dot object
	 * @private
	 */
	_move(dot){
		switch (dot.directionType) {
			case DIRECTION_TYPE.TOP:
				dot.y -= dot.speed;
				break;
			case DIRECTION_TYPE.RIGHT:
				dot.x += dot.speed;
				break;
			case DIRECTION_TYPE.BOTTOM:
				dot.y += dot.speed;
				break;
			case DIRECTION_TYPE.LEFT:
				dot.x -= dot.speed;
				break;
			case DIRECTION_TYPE.RIGHT_TOP:
				dot.x += dot.speed;
				dot.y -= dot.speed;
				break;
			case DIRECTION_TYPE.RIGHT_BOTTOM:
				dot.x += dot.speed;
				dot.y += dot.speed;
				break;
			case DIRECTION_TYPE.LEFT_TOP:
				dot.x -= dot.speed;
				dot.y -= dot.speed;
				break;
			case DIRECTION_TYPE.LEFT_BOTTOM:
				dot.x -= dot.speed;
				dot.y += dot.speed;
				break;
		}
	}

	/**
	 * Change dot direction to opposite direction
	 *
	 * @param {Dot} dot - a Dot object
	 * @param {number} width - width of canvas
	 * @param {height} height - height of canvas
	 * @private
	 */
	_changeDirection(dot, width, height){
		if (dot.y <= 0) {
			switch (dot.directionType) {
				case DIRECTION_TYPE.TOP:
					dot.directionType = DIRECTION_TYPE.BOTTOM;
					break;
				case DIRECTION_TYPE.RIGHT_TOP:
					dot.directionType = DIRECTION_TYPE.LEFT_BOTTOM;
					break;
				case DIRECTION_TYPE.LEFT_TOP:
					dot.directionType = DIRECTION_TYPE.RIGHT_BOTTOM;
					break;
			}
		}
		if (dot.y >= height) {
			switch (dot.directionType) {
				case DIRECTION_TYPE.BOTTOM:
					dot.directionType = DIRECTION_TYPE.TOP;
					break;
				case DIRECTION_TYPE.RIGHT_BOTTOM:
					dot.directionType = DIRECTION_TYPE.LEFT_TOP;
					break;
				case DIRECTION_TYPE.LEFT_BOTTOM:
					dot.directionType = DIRECTION_TYPE.RIGHT_TOP;
					break;
			}
		}
		if (dot.x <= 0) {
			switch (dot.directionType) {
				case DIRECTION_TYPE.LEFT:
					dot.directionType = DIRECTION_TYPE.RIGHT;
					break;
				case DIRECTION_TYPE.LEFT_TOP:
					dot.directionType = DIRECTION_TYPE.RIGHT_BOTTOM;
					break;
				case DIRECTION_TYPE.LEFT_BOTTOM:
					dot.directionType = DIRECTION_TYPE.RIGHT_TOP;
					break;
			}
		}
		if (dot.x >= width) {
			switch (dot.directionType) {
				case DIRECTION_TYPE.RIGHT:
					dot.directionType = DIRECTION_TYPE.LEFT;
					break;
				case DIRECTION_TYPE.RIGHT_TOP:
					dot.directionType = DIRECTION_TYPE.LEFT_BOTTOM;
					break;
				case DIRECTION_TYPE.RIGHT_BOTTOM:
					dot.directionType = DIRECTION_TYPE.LEFT_TOP;
					break;
			}
		}
	}
}

new GMApp();