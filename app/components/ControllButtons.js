import React from 'react'
import ImageRotateRight from 'material-ui/lib/svg-icons/image/rotate-right'
import ContentClear from 'material-ui/lib/svg-icons/content/clear'
import RaisedButton from 'material-ui/lib/raised-button'

export const RotateButton = ({onclick}) => (
	<RaisedButton icon={<ImageRotateRight />} secondary={true} onTouchTap={ onclick } label="Rotate canvas" />
)

export const ResetButton = ({onclick}) => (
	<RaisedButton icon={<ContentClear />} primary={true} onTouchTap={ onclick } label="Clear Artwork" />
)
