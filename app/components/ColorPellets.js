import React from 'react'
import Colors from 'material-ui/lib/styles/colors'
import ColorPellet from './ColorPellet'

const colors = [
{
  hex: '#ff4081',
  name: Colors.pinkA200
},
{
  hex: '#9c27b0',
  name: Colors.purple500
},
{
  hex: '#d50000',
  name: Colors.redA700
},
{
  hex: '#4caf50',
  name: Colors.green500
},
{
  hex: '#2196f3',
  name: Colors.blue500
},
{
  hex: '#ff9800',
  name: Colors.orange500
},
{
  hex: '#fafafa',
  name: Colors.grey50
}]

const ColorPellets = ({ onClick, selectedColor }) => (
  <div>
    {colors.map(color =>
      <ColorPellet
        key={ color.hex }
        color={ color.name }
        onClick={ () => onClick(color.hex) }
        selected={ selectedColor === color.hex ? true : false }
      />
    )}
    <IconButton touch={true} onClick={() => onClick('rainbow')} className={selectedColor === 'rainbow' ? 'selected' : ''}>
      <ImageLooks color={Colors.blueGrey50} className={'rainbow'} />
    </IconButton>
  </div>
)

ColorPellets.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  selectedColor: React.PropTypes.string.isRequired
}

export default ColorPellets
