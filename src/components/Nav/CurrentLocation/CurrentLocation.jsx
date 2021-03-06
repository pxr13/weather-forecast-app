import React, { Component } from 'react';
import { func, shape, string, number } from 'prop-types';

import { Wrapper, style } from './CurrentLocationStyles';
import getIconFrom from '../../../utils/iconData.js';

export default class CurrentLocation extends Component {
  static propTypes = {
    fetchWeather: func.isRequired,
    fetchForecast: func.isRequired,
    currentLocation: shape({
      weather: shape({
        name: string,
        description: string,
        temp: number
      })
    })
  };

  componentDidMount() {
    const { currentLocation } = this.props;

    if (this.weatherHasntBeenFetched(currentLocation)) {
      this.getUserLocation();
    }
  }

  getUserLocation = () => {
    const maxTimeout = 10000; // === 10 seconds
    navigator.geolocation.getCurrentPosition(this.success, this.err, {
      timeout: maxTimeout
    });
  };

  success = ({ coords }) => {
    this.props.fetchWeather(coords);
  };

  err = (errMsg) => {
    alert(`Seems like we can't get your location. Please try again.`);
  };

  weatherHasntBeenFetched = (currentLocation) =>
    currentLocation.weather === undefined;

  render() {
    const { currentLocation } = this.props;

    if (this.weatherHasntBeenFetched(currentLocation))
      return <Wrapper>Loading</Wrapper>;

    const { name, description, temp } = currentLocation.weather;

    const Icon = getIconFrom(description);
    const StyledIcon = style(Icon);

    return (
      <Wrapper>
        {name} <StyledIcon size={25} />
        {temp}&deg;F
      </Wrapper>
    );
  }
}
