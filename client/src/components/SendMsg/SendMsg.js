import React from "react";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./SendMsg.css";

export default function SendMsg({ reciever }) {
  const { user } = useAuth0();
  const [message, setMessage] = useState({
    sendersSub: user.sub,
    recieversSub: reciever,
    sendersName: user.name,
    content: "",
    sendersPic: "",
    date: "",
    time: "",
  });
  async function handleSubmit(message) {
    console.log("sending a message");
    const body = JSON.stringify({ message: message });
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    };
    const response = await fetch("api/messages", requestOptions);
    const retrieved = await response.json();
    console.log(retrieved);
  }
  return (
    <React.Fragment>
      <div className="sendMsgContainer">
        <div className="sendMsgGrid">
          {/* <img
            src={recieversProfilePic}
            alt="Recievers Profile Pic"
            className="recieversProfilePic"
          /> */}
          <div className="sendMsgSpacer"></div>
          <div className="sendMsgheaderFlex">
            {/* <div className="recieversName">To: {reciever}</div> */}
            {/* <div className="closeSendMsg" onClick={openOrClose}>
              X
            </div> */}
          </div>
          <div></div> <div className="sendMsgSpacer"></div>
          <div>
            <textarea
              className="newMessageText"
              rows="8"
              cols="50"
              onChange={(e) => {
                setMessage({ ...message, content: e.target.value });
                console.log(message);
              }}
            ></textarea>
            <div>
              <button
                className="sendMsgButton"
                onClick={() => handleSubmit(message)}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
