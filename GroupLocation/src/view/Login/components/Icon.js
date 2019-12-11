import React from 'react';


import { Icon } from 'galio-framework';

//import argonConfig from '../assets/font/argon.json.js';
const ArgonExtra = require('../assets/font/argon.ttf');


class IconExtra extends React.Component {
  state = {
    fontLoaded: false,
  }

  async componentDidMount() {
    await Font.loadAsync({ ArgonExtra: ArgonExtra });
    this.setState({ fontLoaded: true });
  }

  render() {
    const { name, family, ...rest } = this.props;
    
    if (name && family && this.state.fontLoaded) {
      if (family === 'ArgonExtra') {
        return <Icon name={name} family={family} {...rest} />
      }
      return <Icon name={name} family={family} {...rest} />;
    }

    return null;
  }
}

export default IconExtra;
