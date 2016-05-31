import React from 'react'
import Colors from 'material-ui/lib/styles/colors'
import ColorPellet from './ColorPellet'
import classNames from 'classnames'

const colors = [
  {
    hex: '#ec407a',
    name: Colors.pink400,
    icon: 'CLR_pink'
  },
  {
    hex: '#f44336',
    name: Colors.red500,
    icon: 'CLR_red'
  },
  {
    hex: '#ffa726',
    name: Colors.orange400,
    icon: 'CLR_orange'
  },
  {
    hex: '#ffee58',
    name: Colors.yellow400,
    icon: 'CLR_yellow'
  },
  {
    hex: '#8bc34a',
    name: Colors.lightGreen500,
    icon: 'CLR_green'
  },
  {
    hex: '#448aff',
    name: Colors.blueA200,
    icon: 'CLR_blue'
  },
  {
    hex: '#9c27b0',
    name: Colors.purple500,
    icon: 'CLR_purple'
  },
  {
    hex: '#FFFFFF',
    icon: 'CLR_rainbow'
  }]

class ColorPellets extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="color-selector">
        {colors.map(color =>
          <span
            key={ color.hex } 
            className={ classNames(color.icon, {
                'selected': this.props.selectedColor === color.hex ? true : false
            })}
            onTouchTap={ () => this.props.onClick(color.hex) }>
          </span>
        )}
      </div>
    )
  }
}

ColorPellets.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  selectedColor: React.PropTypes.string.isRequired
}

export default ColorPellets
