import React from 'react'
import _ from 'lodash'
import { Group } from 'react-art'
import GridTile from './GridTile'

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

class Grid extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    var widthPixels = this.props.width;
    var heightPixels = this.props.height;
    var countHorizontal = this.props.hSize;
    var countVertical = this.props.vSize;
    var that = this;

    let gridElementPositions = setupGridPositionsRadial(
        widthPixels, 
        heightPixels, 
        countHorizontal, 
        countVertical
    );

    let grid = _.map(gridElementPositions, function(row, index) {
      let rowElements = _.map(row, function(data, index) {
        let key = data.keyName;

        return (
          <GridTile key={key} coords={data.normalizedCoordinates} size={data.size} centre={data.pixelCoordinates}></GridTile>
        );
      });

      if (index === 0) {
        rowElements.push(
            <GridTile key={'marker'} color={'#f44336'} 
              size={rowElements[0].props.size * 1.5} 
              centre={{x: rowElements[0].props.centre.x - rowElements[0].props.size - 4, y: rowElements[0].props.centre.y - rowElements[0].props.size - 4}}
              isCircle={true}>
            </GridTile>
          );
      }

      return (
        <Group key={ 'row_' + index }>
          { rowElements }
        </Group>
      );
    });

    return (
      <Group>
        { grid }
      </Group>
    );
  }
}

export default Grid;
