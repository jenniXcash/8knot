import React from "react";
import "./ListOfCheakboxes.css";

export default function ListOfCheakboxes(props) {
  const {
    label,
    optionsArray,
    onFocus,
    onBlur,
    state,
    stateFunction: statefunction,
  } = props;

  //splitting and lowercasing the item name so it will be readable
  function rewriteItemName(str) {
    const splitted = str.split("");
    let returned = splitted.map((e) => {
      if (e === e.toLowerCase()) {
        return e;
      } else {
        return ` ${e}`;
      }
    });
    return returned.toString().replaceAll(",", "").toLowerCase();
  }

  //Rewriting the label so we could use it is writen in the newUserData state object
  function rewriteLabel(label) {
    label = label.split("");
    const lowered = label.map((e, index) => {
      if (index === 0) {
        return e.toLowerCase();
      } else {
        return e;
      }
    });
    return lowered.join().replaceAll(",", "").replaceAll(" ", "");
  }
  return (
    <React.Fragment>
      <div className="locContainer">
        <label htmlFor={label}>{label}:</label>
        {optionsArray && (
          <div>
            {optionsArray.map((item, index) => (
              <div className="boxAndLabel">
                <input
                  type="checkbox"
                  id={`label` + index}
                  key={index}
                  name={`label` + index}
                  value={item}
                  onChange={(e) => {
                    statefunction({
                      ...state,
                      [rewriteLabel(label)]: {
                        ...state[rewriteLabel(label)],
                        [item]: e.target.checked,
                      },
                    });
                  }}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
                <label htmlFor={`label` + index}>{rewriteItemName(item)}</label>
              </div>
            ))}
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
