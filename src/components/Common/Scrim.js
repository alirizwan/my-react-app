import React, { Component } from "react";
import LinearGradient from "react-native-linear-gradient";
import PropTypes from "prop-types";

class Scrim extends Component {
  static propTypes = {
    reversed: PropTypes.bool
  };

  render() {
    const scrimColors = [
      "rgba(0, 0, 0, 0.6)",
      "rgba(0, 0, 0, 0.3)",
      "rgba(0, 0, 0, 0.0)"
    ];

    const scrimPositions = [0, 0.3, 1.0];

    if(this.props.reversed) {
      scrimColors.reverse();
      scrimPositions.reverse();
    }

    return (
      <LinearGradient
        style={this.props.style}
        colors={scrimColors}
        positions={scrimPositions}
      >
        {this.props.children}
      </LinearGradient>
    );
  }
}

export default Scrim;
