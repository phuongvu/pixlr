import React from 'react'
import { Path } from 'react-art'
import { Shape } from 'react-art'

const makeShapePath = (size, centre, points) => {
	let path = new Path()
		, point = 0
		, angle = null
		, x = null
		, y = null

	while (point < points) {
		angle = 2 * Math.PI / points * (point + 0.5);
		x = centre.x + size * Math.cos(angle);
		y = centre.y + size * Math.sin(angle);

		if (point === 0) {
			path.moveTo(x, y);
		}
		else {
			path.lineTo(x, y);
		}

		point = point + 1;
	}

	return path;
};

const GridTile = ({size, centre, color, isCircle}) => (
	<Shape d={isCircle ? makeShapePath(size, centre, 15) : makeShapePath(size, centre, 4)} fill={color ? color : '#FAFAFA'} opacity='1'></Shape>
)

GridTile.propTypes = {
	color: React.PropTypes.string,
	size: React.PropTypes.number.isRequired,
	centre: React.PropTypes.object.isRequired,
	isCircle: React.PropTypes.bool
}

export default GridTile
