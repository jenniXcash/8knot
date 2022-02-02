import React, { useEffect, useState } from "react";
import "./PostNew.css";
export default function PostNew() {
  const [setlmentList, setSetlmentList] = useState([]);

  useEffect(() => {
    const res = fetch(
      "https://data.gov.il/api/3/action/datastore_search?resource_id=5c78e9fa-c2e2-4771-93ff-7f400a12f7ba&limit=9000"
    );
    res
      .then((response) => {
        return response.json();
      })
      .then((names) => {
        setSetlmentList(names.result.records);
      });
  }, []);

  //mapping a new array so we would get it filtered of unwanted objects and sorted alphabetacly
  const yeshuvimNames = setlmentList
    .map((e) => {
      return e.שם_ישוב;
    })
    .filter((e) => e !== "לא רשום ")
    .sort();

  return (
    <React.Fragment>
      <div className="postNewGrid">
        <h1 className="heading">Post a new post</h1>
        <form className="postNewFormDiv">
          <label htmlFor="type of work" className="postNewLabel">
            Type of work:
          </label>
          <div className="typeOfWorkSelects">
            <select className="typeOfWorkSelect inputim">
              <option value="rope access">Rope Access</option>
              <option value="aerial platforms">Aerial Platforms</option>
              <option value="cradels">Cradels</option>
              <option value="mast climbing">Mast Climbing</option>
            </select>
            <select className="typeOfWorkSelect inputim">
              <option value="null"> </option>
              <option value="window cleaning">window cleaning</option>
              <option value="Sealing">Sealing</option>
              <option value="Concrete reconstruction">
                Concrete reconstruction
              </option>
              <option value="anti-bird nets">Installing anti-bird nets</option>
              <option value="window repeairs">Window Repairs</option>
              <option value="welding">Welding</option>
              <option value="Sign Hanging">Sign Hanging</option>

              <option value="other">Other</option>
            </select>
          </div>
          <label htmlFor="description" className="postNewLabel">
            Description:
          </label>
          <textarea
            name="projectDescription"
            cols="30"
            rows="10"
            className="inputim"
          />
          <label htmlFor="address" className="postNewLabel">
            Address:
          </label>
          <div className="addressInputs">
            <select className="projetAddress inputim">
              <option>Choose settlement</option>
              {yeshuvimNames.map((yeshuv) => {
                return (
                  <option value={yeshuv} key={yeshuv}>
                    {yeshuv}
                  </option>
                );
              })}
            </select>
            <input
              type="text"
              className="addressStreet inputim"
              placeholder="Street"
            />
            <input
              type="text"
              className="houseNum inputim"
              placeholder="House Number"
            />
          </div>
          <label htmlFor="neededEquipment" className="postNewLabel">
            Needed Equipment:{" "}
          </label>
          <textarea
            name="projectDescription"
            rows="4"
            cols="50"
            className="inputim"
          />
          <label htmlFor="addImages" className="postNewLabel">
            Add Images:
          </label>
          <div className="addImagesDiv">
            <input
              type="file"
              id="image1"
              accept="image/png, image/jpeg"
              className="addImageButton"
              multiple
            />
            <div style={{ fontSize: "0.9rem" }}>* Up to 4 files</div>
          </div>
          <div></div>
          <div className="formButtons">
            <button className="postNewButtons">Post</button>
            <button className="postNewButtons">Reset</button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}
