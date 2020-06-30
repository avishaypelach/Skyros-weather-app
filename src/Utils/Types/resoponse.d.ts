declare namespace NIForecastData {
  interface Timeframe {
    date: string;
    time: number;
    utcdate: string;
    utctime: number;
    wx_desc: string;
    wx_code: number;
    wx_icon: string;
    temp_c: number;
    temp_f: number;
    feelslike_c: number;
    feelslike_f: number;
    winddir_deg: number;
    winddir_compass: string;
    windspd_mph: number;
    windspd_kmh: number;
    windspd_kts: number;
    windspd_ms: number;
    windgst_mph: number;
    windgst_kmh: number;
    windgst_kts: number;
    windgst_ms: number;
    cloud_low_pct: number;
    cloud_mid_pct: number;
    cloud_high_pct: number;
    cloudtotal_pct: number;
    precip_mm: number;
    precip_in: number;
    rain_mm: number;
    rain_in: number;
    snow_mm: number;
    snow_in: number;
    snow_accum_cm: number;
    snow_accum_in: number;
    prob_precip_pct: string;
    humid_pct: number;
    dewpoint_c: number;
    dewpoint_f: number;
    vis_km: number;
    vis_mi: number;
    slp_mb: number;
    slp_in: number;
  }

  interface Day {
    date: string;
    sunrise_time: string;
    sunset_time: string;
    moonrise_time: string;
    moonset_time: string;
    temp_max_c: number;
    temp_max_f: number;
    temp_min_c: number;
    temp_min_f: number;
    precip_total_mm: number;
    precip_total_in: number;
    rain_total_mm: number;
    rain_total_in: number;
    snow_total_mm: number;
    snow_total_in: number;
    prob_precip_pct: number;
    humid_max_pct: number;
    humid_min_pct: number;
    windspd_max_mph: number;
    windspd_max_kmh: number;
    windspd_max_kts: number;
    windspd_max_ms: number;
    windgst_max_mph: number;
    windgst_max_kmh: number;
    windgst_max_kts: number;
    windgst_max_ms: number;
    slp_max_in: number;
    slp_max_mb: number;
    slp_min_in: number;
    slp_min_mb: number;
    Timeframes: Timeframe[];
  }

  interface RootObject {
    Days: Day[];
  }
}

