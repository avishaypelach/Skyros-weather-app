import React, { useState, useEffect } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import Style from "./Modal.module.scss";
import moment from "moment";
import { handleIForecastData } from "../../Utils/Dedicated/ModalUtils";

export default ({ chosenLocation, updateLocationWeather, handleModal }: NModal.IProps) => {
  const [loading, updateLoading] = useState<boolean>(true);
  const [errorMessage, updateError] = useState<string>("");

  const onError = () => {
    updateError('Failed to get weather');
    updateLoading(false);
  }

  const getWeather = () => {
    const id = chosenLocation?.id;
    const latitude = chosenLocation ? chosenLocation.latitude.toFixed(3) : 0;
    const longitude = chosenLocation ? chosenLocation.longitude.toFixed(3) : 0;

    const proxy = "https://cors-anywhere.herokuapp.com/";
    const credentials = "app_id=609dc9e9&app_key=99d6cc452be204ba54bc04154187463c"
    const currentWeatherUrl = `${proxy}http://api.weatherunlocked.com/api/current/${latitude},${longitude}?${credentials}`;
    const forecastWeatherUrl = `${proxy}http://api.weatherunlocked.com/api/forecast/${latitude},${longitude}?${credentials}`;

    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const calls = [
      // Current Weather
      fetch(currentWeatherUrl, options),
      // Forecast Weather
      fetch(forecastWeatherUrl, options)
    ];

    Promise.all(calls)
      .then(response => {
        const currentWeather = response[0].json();
        const forecastWeather = response[1].json();

        currentWeather
          .then(currentWeatherData => {
            forecastWeather.then(({ Days }: NIForecastData.RootObject) => {
              const currentTime = moment().format("DD/MM   HH:mm");

              updateLocationWeather({
                id,
                forecast: handleIForecastData(Days),
                lastUpdate: currentTime,
                temperature: currentWeatherData.temp_c.toFixed(0),
                feelsLike: currentWeatherData.feelslike_c.toFixed(0),
                icon: 'http://www.weatherunlocked.com/Images/icons/2/' +
                  currentWeatherData.wx_icon.replace('gif', 'png'), // replace gif with gif for better images
              });
            })

            updateLoading(false);
          });
      })
      .catch(() => onError());
  }

  useEffect(() => {
    getWeather()
  })

  const handleCloseOnBackgroundHit = () => {
    if (!loading) {
      handleModal(false);
    }
  }

  const renderForecast = ({ day, maxTemp, minTemp }: NApp.IForecast, idx: number) => {
    return (
      <div key={idx} className={Style.forecast_day}>
        <div className={Style.day}>{day}</div>
        <div>{maxTemp}&#8451; / {minTemp}&#8451;</div>
      </div>
    )
  }

  return (
    <div className={Style.container} onClick={handleCloseOnBackgroundHit}>
      <div
        onClick={e => e.stopPropagation()}
        className={Style.location_container}
      >
        <div className={Style.city}>
          {chosenLocation?.city}
          <div className={Style.area}>{(chosenLocation?.area)}</div>
        </div>
        <ClipLoader
          size={60}
          color="#3246b6"
          loading={loading}
        />
        {!loading && !errorMessage ? <div className={Style.modal_content}>
          <div className={Style.temperature}>
            {chosenLocation?.temperature}&#8451;
            <div className={Style.feels_like}>(feels like {chosenLocation?.feelsLike}&#8451;)</div>
            <img src={chosenLocation?.icon} alt="icon" className={Style.icon} />
          </div>
          <div className={Style.forecast}>
            <h3 className={Style.title}>forecast</h3>
            <div className={Style.days_container}>
              {chosenLocation?.forecast && chosenLocation?.forecast.map(renderForecast)}
            </div>
          </div>
        </div> : <div className={Style.modal_error}>
            {errorMessage}
          </div>}
      </div>
    </div>
  );
};