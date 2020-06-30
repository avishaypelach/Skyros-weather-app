import React from "react";
import Style from "./Input.module.scss";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";

export default ({ addLocation }: NInput.IProps) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });
  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleInput = (e: any) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect = (suggestion: NInput.ISuggestion) => () => {
    const {
      structured_formatting: { main_text, secondary_text },
      description,
      id
    } = suggestion;

    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter as "false"
    clearSuggestions();

    // Get latitude and longitude via utility functions
    getGeocode({ address: description })
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        addLocation({
          id,
          latitude: lat,
          longitude: lng,
          city: main_text,
          area: secondary_text
        })
      })
      .catch((error) => {
        console.log("😱 Error: ", error);
      });

    setValue("")
  };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <div key={id} onClick={handleSelect(suggestion)} className={Style.suggestion}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </div>
      );
    });

  return (
    <div ref={ref} className={Style.container}>
      <input
        className={Style.input}
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Add location +"
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === "OK" && <div className={Style.suggestions_container}>{renderSuggestions()}</div>}
    </div>
  );
};