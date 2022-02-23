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
  // const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  async function handleSelect(value) {
    const results = await geocodeByAddress(value);
    setAddress(value);
    // setCoordinates(latLng);
    setPostData({ ...postData, address: results });
    console.log(postData.address);
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
                borderRadius: "10px",
                paddingLeft: "10px",
                backgroundColor: "rgba(143, 172, 229, 0.3)",
              };
              return (
                <React.Fragment>
                  <div
                    key={suggestion.description}
                    {...getSuggestionItemProps(suggestion, { style })}
                  >
                    {suggestion.description}
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        )}
      </PlacesAutoComplete>
    </React.Fragment>
  );
}
