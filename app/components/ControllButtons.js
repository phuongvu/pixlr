import React from 'react';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import Colors from 'material-ui/lib/styles/colors';
import ImageRotateLeft from 'material-ui/lib/svg-icons/image/rotate-left';

const ControllButtons = ({orientation, onClick}) => (
  <IconButton touch={ true } onTouchTap={ onClick }>
    <ImageRotateLeft color='white'/>
  </IconButton>
);

ControllButtons.propTypes = {
	orientation: React.PropTypes.number.isRequired,
	onClick: React.PropTypes.func.isRequired
}

export default ControllButtons;
