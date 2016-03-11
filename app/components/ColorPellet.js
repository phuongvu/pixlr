import React from 'react'
import IconButton from 'material-ui/lib/icon-button'
import Lens from 'material-ui/lib/svg-icons/image/lens'

const iconStyles = {
	selected: {

	}
}

const ColorPellet = ({ onClick, selected, color}) => (
	<IconButton touch={true} onTouchTap={onClick}>
      <Lens color={color} style={selected ? 'selected' : ''}/>
  </IconButton>
);

ColorPellet.propTypes = {
	onClick: React.PropTypes.func.isRequired,
	selected: React.PropTypes.bool.isRequired,
	color: React.PropTypes.string.isRequired
}

export default ColorPellet
