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
            <select className="typeOfWorkSelect">
              <option value="rope access">Rope Access</option>
              <option value="aerial platforms">Aerial Platforms</option>
              <option value="cradels">Cradels</option>
              <option value="mast climbing">Mast Climbing</option>
            </select>
            <select className="typeOfWorkSelect">
              <option value="null"> </option>
              <option value="window cleaning">window cleaning</option>
              <option value="Sealing">Sealing</option>
              <option value="Concrete reconstruction">
                Concrete reconstruction
              </option>
              <option value="anti-bird nets">Installing anti-bird nets</option>
              <option value="window repeairs">Window Repairs</option>
              <option value="welding">Welding</option>
              <option value="hanging signs">Hanging Signs</option>

              <option value="other">Other</option>
            </select>
          </div>
          <label htmlFor="description" className="postNewLabel">
            Description:
          </label>
          <textarea name="projectDescription" cols="30" rows="10" />
          <label htmlFor="address" className="postNewLabel">
            Address:
          </label>
          <div className="addressInputs">
            <select className="projetAddress">
              {yeshuvimNames.map((yeshuv) => {
                return (
                  <option value={yeshuv} key={yeshuv}>
                    {yeshuv}
                  </option>
                );
              })}
            </select>
            <input type="text" className="addressStreet" placeholder="Street" />
            <input
              type="text"
              className="houseNum"
              placeholder="House Number"
            />
          </div>
          <label htmlFor="neededEquipment" className="postNewLabel">
            Needed Equipment:{" "}
          </label>
          <textarea name="projectDescription" rows="4" cols="50" />
          <label htmlFor="addImages" className="postNewLabel">
            Add Images:
          </label>
          <div className="addImagesDiv">
            <input type="file" id="image1" accept="image/png, image/jpeg" />
            <input type="file" id="image2" accept="image/png, image/jpeg" />
            <input type="file" id="image3" accept="image/png, image/jpeg" />
            <input type="file" id="image4" accept="image/png, image/jpeg" />
          </div>
        </form>
        <div className="formButtons">
          {" "}
          <button>Post</button>
          <button>Reset</button>
        </div>
      </div>
    </React.Fragment>
  );
}
