import React from 'react';
import { getDimensions, subscribeResize, unsubscribeResize } from '../utils/DisplayHelper';
import { Surface } from 'react-art'
import Grid from './Grid'
import GridTile from './GridTile'
import { connect } from 'react-redux'
import { rotate } from '../actions'

var SIZE_TO_PACKED_WIDTH = 1.6;
var SIZE_TO_PACKED_HEIGHT = 1.6;

const getOptimalSize = (widthPixels, heightPixels, countHorizontal, countVertical) => {
  var packedWidth = widthPixels / (parseInt(countHorizontal, 10));
  var packedHeight = heightPixels / (parseInt(countVertical, 10));

  var size = null;

  if ((packedWidth / SIZE_TO_PACKED_WIDTH) < (packedHeight / SIZE_TO_PACKED_HEIGHT)) {
    size = packedWidth / SIZE_TO_PACKED_WIDTH;
  }
  else {
    size = packedHeight / SIZE_TO_PACKED_HEIGHT;
  }

  return size.toFixed(8);
}

const calculatePixelCoordinates = (baseVector, gridElementSize, axialXCoord, axialYCoord) => {
  return {
    x: baseVector.x + (gridElementSize * 3 / 2 * axialXCoord) + 3, //shift to the right
    y: baseVector.y + (gridElementSize * 3 / 2 * axialYCoord) + 3
  };
}

const setupGridPositionsRadial = (widthPixels, heightPixels, countHorizontal, countVertical) => {
  let size = getOptimalSize(
      widthPixels, 
      heightPixels, 
      countHorizontal,
      countVertical
  );

  let centreVector = {
    x: Math.floor(widthPixels / 2),
    y: Math.floor(heightPixels / 2)
  };

  let gridElementSize = parseFloat(size, 10);

  let rows = [];
  _.times(countVertical, function(indexVertical) {

    let axialYCoord = indexVertical - countVertical / 2;
    var row = [];

    _.times(countHorizontal, function(indexHorizontal) {
      let axialXCoord = indexHorizontal - countHorizontal / 2;

      row.push({
        keyName: 'tile_' + axialXCoord + '_' + axialYCoord,
        axialCoordinates: {
          x: axialXCoord,
          y: axialYCoord 
        },
        normalizedCoordinates: {
          x: axialXCoord + countHorizontal/2,
          y: axialYCoord + countVertical/2
        },
        size: gridElementSize - 0.4,
        pixelCoordinates: calculatePixelCoordinates(centreVector, gridElementSize, axialXCoord, axialYCoord)
      });
    });

    rows.push(row);
  });

  return rows;
}

class Grids extends React.Component {
	constructor() {
		super()
    this.state = {
    	dimensions: getDimensions()
    }
    this.setDisplayDimensions = this.setDisplayDimensions.bind(this)
	}
	
	setDisplayDimensions(props) {
		this.setState({
			dimensions: getDimensions()
		})
	}

	componentWillMount() {
		subscribeResize(this.setDisplayDimensions)
	}

	componentWillUnmount() {
		unsubscribeResize(this.setDisplayDimensions)
	}

	shouldComponentUpdate(nextProps, nextState) {
		console.log("should?", nextProps, this.props);
  	return nextProps.orientation != this.props.orientation || nextProps.selectedColor != this.props.selectedColor;
	}

	render() {
		let width = this.state.dimensions.width
		let height = this.state.dimensions.height

		console.log("props", this.props.orientation, this.props.selectedColor);

		if (height > width) {
			height = width
		}

		let rows = setupGridPositionsRadial(width, height, '64', '64');

		return (
			<Surface width = { width } height = { height } className={'rotate-left-' + this.props.orientation}>
				<GridTile key={'marker'} color={'#f44336'} 
                        size={rows[0][0].size * 1.5} 
                        centre={{x: rows[0][0].pixelCoordinates.x - rows[0][0].size - 4, y: rows[0][0].pixelCoordinates.y - rows[0][0].size - 4}}
                        isCircle={true} />
				<Grid rows={rows} />
			</Surface>
		)
	}
}

const mapStateToProps = (state) => {
  return {
    orientation: state.orientation,
    selectedColor: state.selectedColor
  }
}

const GridBoard = connect(mapStateToProps)(Grids)

export default GridBoard;
