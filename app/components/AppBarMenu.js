'use strict';

import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/lib/menus/menu-item';
import ImageBrush from 'material-ui/lib/svg-icons/image/brush';

const style = {
  'backgroundColor': '#729f98'
};

const AppBarMenu = () => (
  <AppBar
    title="ARTable"
    style={style}
    iconElementLeft={
    	<IconButton>
    		<ImageBrush />
    	</IconButton>
    }
    iconElementRight={
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="Free draw" />
        <MenuItem primaryText="Pictionary" />
        <MenuItem primaryText="Exqisite corps" />
      </IconMenu>
    }
  />
);

export default AppBarMenu;
