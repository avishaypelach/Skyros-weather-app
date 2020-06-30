import React from 'react';
import Style from "./Locations.module.scss";
import { Common } from "../../Utils/Maps/AssetsMap";

export default ({ locations, deleteLocation, onLocationPress }: NLocations.IProps) => {

  const renderLocations = ({ city, temperature, id, icon, lastUpdate }: NApp.ILocation) => {
    return (
      <div key={id} t-whoami={id} className={Style.location_Cube} onClick={onLocationPress}>
        <div className={Style.row}>
          <img className={Style.remove} src={Common.remove} alt="remove" onClick={deleteLocation} t-whoami={id} />
          <img className={Style.icon} src={icon} alt="icon" />
          {temperature && <div className={Style.temperature}>
            {temperature}&#8451;
          </div>}

        </div>
        <div className={Style.city}>
          <img src={Common.marker} alt="marker" className={Style.marker} />
          {city}
        </div>
        <div className={Style.updated}>Updated: {lastUpdate}</div>
      </div>
    )
  }

  return (
    <div className={Style.container}>
      <h2 className={Style.title}>My locations</h2>
      <div className={Style.location_container}>
        {locations.map(renderLocations)}
      </div>
    </div>
  );
};