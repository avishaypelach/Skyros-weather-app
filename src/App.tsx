import React, { useState } from 'react';
import './App.css';
import Input from "./Components/Input/Input";
import Locations from './Components/Locations/Locations';
import Modal from './Components/Modal/Modal';

export default () => {
  const [myLocations, updateLocations] = useState<NApp.ILocation[]>([]);
  const [chosenLocation, updateChosenLocation] = useState<NApp.ILocation | null>(null);
  const [isModalOpen, handleModal] = useState<boolean>(false);

  const onLocationPress = (({ currentTarget }: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const id = currentTarget.getAttribute("t-whoami");

    const location = myLocations.find(location => location.id === id);

    if (location) {
      updateChosenLocation(location);

      handleModal(true);
    }
  })

  const addLocation = (newLocation: NApp.ILocation) => {
    const newLocations = [...myLocations];

    const location = newLocations.find(location => location.id === newLocation.id);

    // If location dose not exists we'll add it to the list. 
    if (!location) {
      newLocations.push({ ...newLocation, newLocation: true });

      updateLocations(newLocations);
    }

    updateChosenLocation(newLocation);

    handleModal(true);
  }

  const updateLocationWeather = ({
    id,
    temperature,
    icon,
    lastUpdate,
    feelsLike,
    forecast
  }: Partial<NApp.ILocation>) => {
    const newLocations = [...myLocations];

    const location = newLocations.find(location => location.id === id);

    if (location) {
      Object.assign(location, { icon, temperature, lastUpdate, feelsLike, forecast });

      updateChosenLocation(location);
    }
  }

  // Delete chosen location.
  const deleteLocation = ((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    const id = e.currentTarget.getAttribute("t-whoami");

    const newLocations = [...myLocations];

    newLocations.forEach((location, idx) => {
      if (location.id === id) {
        newLocations.splice(idx, 1);

        return updateLocations(newLocations);
      }
    })
  })

  return (
    <div className="App" >
      <h1 className="title">Skyros weather app</h1>
      <Input addLocation={addLocation} />
      <Locations
        locations={myLocations}
        deleteLocation={deleteLocation}
        onLocationPress={onLocationPress}
      />
      {isModalOpen && <Modal
        updateLocationWeather={updateLocationWeather}
        chosenLocation={chosenLocation}
        handleModal={handleModal}
      />}
    </div>
  );
}