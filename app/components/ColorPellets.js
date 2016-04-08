import React from 'react'
import Colors from 'material-ui/lib/styles/colors'
import IconButton from 'material-ui/lib/icon-button'
import ImageLooks from 'material-ui/lib/svg-icons/image/looks'
import ColorPellet from './ColorPellet'
import IconFactory from 'react-icon-factory'

const colors = [
{
  hex: '#ff4081',
  name: Colors.purple500
},
{
  hex: '#9c27b0',
  name: Colors.pink400
},
{
  hex: '#d50000',
  name: Colors.yellow400
},
{
  hex: '#4caf50',
  name: Colors.orange400
},
{
  hex: '#2196f3',
  name: Colors.blueA200
},
{
  hex: '#ff9800',
  name: Colors.lightGreen500
}]

const ColorPellets = ({ onClick, selectedColor }) => (
  <div className="color-selector">
    {colors.map(color =>
      <span key={ color.hex } 
          className="color-pellet"
          onClick={ () => onClick(color.hex) }
          selected={ selectedColor === color.hex ? true : false }>
      </span>
    )}
  </div>
)

ColorPellets.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  selectedColor: React.PropTypes.string.isRequired
}

export default ColorPellets
