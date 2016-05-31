import React from 'react'
import _ from 'lodash'
import { Group } from 'react-art'
import GridTile from './GridTile'

const Grid = ({rows}) => (
  <Group>
    { _.map( rows, (row, i) =>
      <Group key={ 'row_' + i }>
        {
          _.map( row, (data, j) =>
            <GridTile key={data.keyName} coords={data.normalizedCoordinates} size={data.size} centre={data.pixelCoordinates}></GridTile>
          )
        }
      </Group>
    )}
  </Group>
)

export default Grid;
