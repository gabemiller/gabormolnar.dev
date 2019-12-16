/**
 * Represent a Dot
 */
class Dot {

	/**
	 * Initialize a Dot object
	 *
	 * @param {number} x - x coordinate of the dot's center point
	 * @param {number} y - y coordinate of the dot's center point
	 * @param {number} r - radius of the dot
	 * @param {DIRECTION_TYPE} directionType - type of dot's direction
	 * @param {number} speed - moving speed of dot
	 */
	constructor(x, y, r, directionType, speed) {
		this._x = x;
		this._y = y;
		this._r = r;
		this._directionType = directionType;
		this._speed = speed;
	}

	get x() {
		return this._x;
	}

	set x(value) {
		this._x = value;
	}

	get y() {
		return this._y;
	}

	set y(value) {
		this._y = value;
	}

	get r() {
		return this._r;
	}

	set r(value) {
		this._r = value;
	}

	get directionType() {
		return this._directionType;
	}

	set directionType(value) {
		this._directionType = value;
	}

	get speed() {
		return this._speed;
	}

	set speed(value) {
		this._speed = value;
	}
}

export default Dot;