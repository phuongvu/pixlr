import React from 'react';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import Colors from 'material-ui/lib/styles/colors';
import ImageRotateLeft from 'material-ui/lib/svg-icons/image/rotate-left';

const ControllButtons = ({onclick}) => (
  <IconButton touch={ true } onClick={ onclick }>
    <ImageRotateLeft color='white'/>
  </IconButton>
)

ControllButtons.propTypes = {
	onclick: React.PropTypes.func.isRequired
}

export default ControllButtons;
