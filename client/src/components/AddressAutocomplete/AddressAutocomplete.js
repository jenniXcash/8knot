import React from "react";
import PlacesAutoComplete, {
  geocodeByAddress,
} from "react-places-autocomplete";

export default function AddressAutocomplete({
  address,
  setAddress,
  postData,
  setPostData,
}) {
  async function handleSelect(value) {
    const results = await geocodeByAddress(value);
    setAddress(value);
    setPostData({ ...postData, address: results });
    console.log(results);
  }

  return (
    <React.Fragment>
      <PlacesAutoComplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({ placeholder: "Type Address" })}
              className="inputim"
            />
            <div>{loading ? <div>'...Loading'</div> : null}</div>
            {suggestions.map((suggestion) => {
              const style = {
                borderRadius: "5px",
                paddingLeft: "5px",
                backgroundColor: "rgba(143, 172, 229, 0.3)",
              };
              return (
                <div
                  key={suggestion.description}
                  {...getSuggestionItemProps(suggestion, { style })}
                >
                  {suggestion.description}
                </div>
              );
            })}
          </div>
        )}
      </PlacesAutoComplete>
    </React.Fragment>
  );
}
