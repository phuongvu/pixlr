import React from 'react'
import IconButton from 'material-ui/lib/icon-button'
import FontIcon from 'material-ui/lib/font-icon'
import Colors from 'material-ui/lib/styles/colors'
import ImageRotateLeft from 'material-ui/lib/svg-icons/image/rotate-left'
import ContentClear from 'material-ui/lib/svg-icons/content/clear'
import RaisedButton from 'material-ui/lib/raised-button'

export const RotateButton = ({onclick}) => (
	<RaisedButton icon={<ImageRotateLeft />} secondary={true} onTouchTap={ onclick } label="Rotate canvas" />
)

export const ResetButton = ({onclick}) => (
	<RaisedButton icon={<ContentClear />} primary={true} onTouchTap={ onclick } label="Clear" />
)
