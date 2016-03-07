import React from 'react';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import Colors from 'material-ui/lib/styles/colors';
import ImageRotateLeft from 'material-ui/lib/svg-icons/image/rotate-left';

const ControllButtons = () => (
  <IconButton touch={true}>
    <ImageRotateLeft color='white'/>
  </IconButton>
);

export default ControllButtons;
