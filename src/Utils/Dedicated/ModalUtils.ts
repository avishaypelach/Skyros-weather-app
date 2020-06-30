import moment from "moment";

export const handleIForecastData = (days: NIForecastData.Day[]) => {
  const newDays: NApp.IForecast[] = [];

  days.forEach((dayData: NIForecastData.Day) => {

    const day = moment(dayData.date, "DD/MM/YYYY").isSame(moment(), 'day')
      ? "Today"
      : moment(dayData.date, "DD/MM/YYYY").format("dddd").slice(0, 3);

    newDays.push({
      day,
      maxTemp: dayData.temp_max_c.toFixed(0),
      minTemp: dayData.temp_min_c.toFixed(0),
    })
  });

  return newDays;
}