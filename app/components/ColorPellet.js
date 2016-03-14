import React from 'react'
import IconButton from 'material-ui/lib/icon-button'
import Lens from 'material-ui/lib/svg-icons/image/lens'

const iconStyles = {
	selected: {
		borderStyle: 'solid',
		borderWidth: 'thin',
		borderRadius: '50%',
		borderColor: 'white',
		margin: '4px'
	},
	unselected: {
		borderStyle: 'none'
	}
}

const ColorPellet = ({ onClick, selected, color }) => (
	<IconButton touch={true} onClick={onClick} className={selected ? 'selected' : ''}>
      <Lens color={color} />
  </IconButton>
);

ColorPellet.propTypes = {
	onClick: React.PropTypes.func.isRequired,
	selected: React.PropTypes.bool.isRequired,
	color: React.PropTypes.string.isRequired
}

export default ColorPellet
