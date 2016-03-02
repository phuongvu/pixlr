'use strict';

var React       = require('react')
		, _         = require('lodash')
    , PureRenderMixin = require('react-addons-pure-render-mixin')
		;

import { Group } from 'react-art'
import GridTile from './GridTile'

var SIZE_TO_PACKED_WIDTH = 1.6;
var SIZE_TO_PACKED_HEIGHT = 1.6;

function getOptimalSize(widthPixels, heightPixels, countHorizontal, countVertical) {
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

function calculatePixelCoordinates(baseVector, gridElementSize, axialXCoord, axialYCoord) {
  return {
    x: baseVector.x + (gridElementSize * 3 / 2 * axialXCoord), //shifting 20px to the right hand side,
    y: baseVector.y + (gridElementSize * 3 / 2 * axialYCoord)
  };
}

function setupGridPositionsRadial(widthPixels, heightPixels, countHorizontal, countVertical) {
  var size = getOptimalSize(
      widthPixels, 
      heightPixels, 
      countHorizontal,
      countVertical
  );

  var centreX = Math.floor(widthPixels / 2);
  var centreY = Math.floor(heightPixels / 2);
  var gridRadiusHorizontal = countHorizontal / 2;
  var gridRadiusVertical = countVertical / 2;

  var centreVector = {
    x: centreX,
    y: centreY
  };

  var gridElementSize = parseFloat(size, 10);

  var rows = [];
  _.times(countVertical, function(indexVertical) {

    var axialYCoord = indexVertical - gridRadiusVertical;
    var row = [];

    _.times(countHorizontal, function(indexHorizontal) {
      var axialXCoord = indexHorizontal - gridRadiusHorizontal;

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

var Grid = React.createClass({
  displayName: 'Grid',
  mixins: [PureRenderMixin],
  render: function() {
    var widthPixels = this.props.width;
    var heightPixels = this.props.height;
    var countHorizontal = this.props.hSize;
    var countVertical = this.props.vSize;

    var gridElementPositions = setupGridPositionsRadial(
        widthPixels, 
        heightPixels, 
        countHorizontal, 
        countVertical
    );

    var grid = _.map(gridElementPositions, function(row, index) {
      var rowElements = _.map(row, function(data) {
        var key = data.keyName;
        return (
          <GridTile key={key} coords={data.normalizedCoordinates} size={data.size} centre={data.pixelCoordinates}></GridTile>
        );
      });

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
});

export default Grid;
