import React, { useState } from "react";
import AddressAutocomplete from "../../components/AddressAutocomplete/AddressAutocomplete";
import "./PostNew.css";
export default function PostNew() {
  // const [setlmentList, setSetlmentList] = useState([]);
  const [address, setAddress] = useState("");
  console.log(address);
  //false means there are no errors, If we found an error on submit then it will be changed to true
  const [postErrors, setPostErrors] = useState({
    description: false,
    numberOfPics: false,
  });
  const [picsList, setPicsList] = useState([]);
  const [postData, setPostData] = useState({
    userName: "",
    date: "",
    time: "",
    address: "",
    method: "",
    typeOfWork: "",
    description: "",
    images: "",
    equipment: "",
  });

  // useEffect(() => {
  //   const res = fetch(
  //     "https://data.gov.il/api/3/action/datastore_search?resource_id=5c78e9fa-c2e2-4771-93ff-7f400a12f7ba&limit=9000"
  //   );
  //   res
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((names) => {
  //       setSetlmentList(names.result.records);
  //     });
  // }, []);

  //mapping a new array so we would get it filtered of unwanted objects and sorted alphabetacly
  // const yeshuvimNames = setlmentList
  //   .map((e) => {
  //     return e.שם_ישוב;
  //   })
  //   .filter((e) => e !== "לא רשום ")
  //   .sort();

  async function sendNewPost(postData, setPostData, picsList) {
    console.log(address);
    console.log(postData);
    const body = JSON.stringify({
      base64EncodedImagesArray: picsList,
      postData: postData,
    });
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    };
    if (postData.description.length === 0) {
      setPostErrors({ ...postErrors, description: true });
    } else {
      setPostErrors({ ...postErrors, description: false });
      const res = await fetch(`/api/posts`, requestOptions);
      const json = await res.json();
      console.log(json);
    }
  }

  function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  async function tobase64Handler(files) {
    const filePathsPromises = [];
    files.forEach((file) => {
      filePathsPromises.push(toBase64(file));
    });
    const filePaths = await Promise.all(filePathsPromises);
    return filePaths;
  }

  async function handleFileInputChange(e) {
    const files = [...e.target.files];
    const mappedFiles = await tobase64Handler(files);
    setPicsList(mappedFiles);
  }

  return (
    <React.Fragment>
      <div className="postNewGrid">
        <h1 className="heading">Post a new post</h1>
        <div className="postNewFormDiv">
          <label htmlFor="type of work" className="postNewLabel">
            Type of work:
          </label>
          <div className="typeOfWorkSelects">
            <select
              className="typeOfWorkSelect inputim"
              onChange={(e) => {
                setPostData({ ...postData, method: e.target.value });
                console.log(postData);
              }}
            >
              <option value="null"> </option>
              <option value="rope access">Rope Access</option>
              <option value="aerial platforms">Aerial Platforms</option>
              <option value="cradels">Cradels</option>
              <option value="mast climbing">Mast Climbing</option>
            </select>
            <select
              className="typeOfWorkSelect inputim"
              onChange={(e) => {
                setPostData({ ...postData, typeOfWork: e.target.value });
                console.log(postData);
              }}
            >
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
            *Description:
          </label>
          <textarea
            name="projectDescription"
            cols="30"
            rows="10"
            className="inputim"
            onChange={(e) => {
              setPostData({ ...postData, description: e.target.value });
              console.log(postData);
              setPostErrors({ ...postErrors, description: false });
            }}
          />
          {!postData.description && <div></div>}
          {!postData.description && (
            <div style={{ fontSize: "0.9rem" }}>*This field is mandatory</div>
          )}
          <label htmlFor="address" className="postNewLabel">
            Address:
          </label>
          <div className="addressInputs">
            <AddressAutocomplete
              address={address}
              setAddress={setAddress}
              postData={postData}
              setPostData={setPostData}
            />

            {/* <select
              className="projetAddress inputim"
              onChange={(e) => {
                setPostData({ ...postData, address: e.target.value });
                console.log(postData);
              }}
            >
              <option>Address: </option>
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
            /> */}
          </div>
          <label htmlFor="neededEquipment" className="postNewLabel">
            Needed Equipment:{" "}
          </label>
          <textarea
            name="projectDescription"
            rows="4"
            cols="50"
            className="inputim"
            onChange={(e) => {
              setPostData({ ...postData, equipment: e.target.value });
              console.log(postData);
            }}
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
              onChange={handleFileInputChange}
            />
            {picsList.length > 4 && (
              <div style={{ fontSize: "1.1rem", color: "red" }}>
                You have chosen {picsList.length} pics. Please choose only 4.
              </div>
            )}
            {picsList.length < 4 && (
              <div style={{ fontSize: "0.9rem" }}>* Up to 4 files</div>
            )}
          </div>
          {postErrors.description && <div></div>}
          {postErrors.description && (
            <div style={{ fontSize: "1.1rem", color: "red" }}>
              You forgot to fill the description field
            </div>
          )}
          <div></div>

          <div className="formButtons">
            <button
              className="postNewButtons"
              onClick={() => {
                sendNewPost(postData, setPostData, picsList);
              }}
            >
              Post
            </button>
            <button className="postNewButtons">Reset</button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
