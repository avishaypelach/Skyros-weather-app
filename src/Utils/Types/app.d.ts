declare namespace NApp {
  interface ILocation {
    id,
    icon: string;
    city: string;
    area: string;
    latitude: number;
    longitude: number;
    newLocation: boolean;
    temperature: number;
    lastUpdate: string;
    feelsLike: number;
    forecast: IForecast[];
  }

  interface IForecast {
    day: string;
    maxTemp: string;
    minTemp: string;
  }
}

declare namespace NInput {
  interface IProps {
    addLocation: any;
  }

  interface ISuggestion {
    description: string;
    id: string;
    matched_substrings: MatchedSubstring[];
    place_id: string;
    reference: string;
    structured_formatting: StructuredFormatting;
    terms: Term[];
    types: string[];
  }

  interface MatchedSubstring {
    length: number;
    offset: number;
  }

  interface MainTextMatchedSubstring {
    length: number;
    offset: number;
  }

  interface StructuredFormatting {
    main_text: string;
    main_text_matched_substrings: MainTextMatchedSubstring[];
    secondary_text: string;
  }

  interface Term {
    offset: number;
    value: string;
  }
}

declare namespace NLocations {
  interface IProps {
    locations: NApp.ILocation[];
    deleteLocation: any;
    onLocationPress: any;
  }
}

declare namespace NModal {
  interface IProps {
    chosenLocation: NApp.ILocation | null;
    updateLocationWeather: any;
    handleModal: any;
  }
}