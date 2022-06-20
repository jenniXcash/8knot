import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import SearchPostsContext from "../../context/SearchPostsContext";

import AddressAutocomplete from "../../components/AddressAutocomplete/AddressAutocomplete";
import RegistrationError from "../../components/RegistrationError/RegistrationError";
import "./PostNew.css";
export default function PostNew() {
  const [address, setAddress] = useState("");
  const { user, isAuthenticated } = useAuth0();
  //false means there are no errors, If we found an error on submit then it will be changed to true
  const [postErrors, setPostErrors] = useState({
    description: false,
    numberOfPics: false,
  });
  const [picsList, setPicsList] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [postData, setPostData] = useState({
    userName: isAuthenticated ? user.name : "",
    date: "",
    time: "",
    address: "",
    method: "",
    typeOfWork: "",
    description: "",
    images: "",
    equipment: "",
    userSub: isAuthenticated ? user.sub : "",
  });

  async function sendNewPost(postData, setPostData, picsList) {
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
      setRedirect(!redirect);
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
      {!isAuthenticated && <RegistrationError page={"post"} />}
      {isAuthenticated && (
        <div className="postNewGrid">
          <h1 className="heading">Post a new post</h1>
          <div className="postNewFormDiv">
            <div>By:</div>
            <div style={{ fontWeight: "bold" }}>{user.name}</div>
            <label htmlFor="type of work" className="postNewLabel">
              Type of work:
            </label>
            <div className="typeOfWorkSelects">
              <select
                className="typeOfWorkSelect inputim"
                onChange={(e) => {
                  setPostData({ ...postData, method: e.target.value });
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
                }}
              >
                <option value="null"> </option>
                <option value="window cleaning">window cleaning</option>
                <option value="Sealing">Sealing</option>
                <option value="Concrete reconstruction">
                  Concrete reconstruction
                </option>
                <option value="anti-bird nets">
                  Installing anti-bird nets
                </option>
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
      )}
      {redirect && <Navigate to="/" />}
    </React.Fragment>
  );
}
