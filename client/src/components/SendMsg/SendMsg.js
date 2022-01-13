import React from "react";
import "./SendMsg.css";

export default function SendMsg({
  reciever,
  recieversProfilePic,
  openOrClose,
}) {
  return (
    <React.Fragment>
      <div className="sendMsgContainer">
        <div className="sendMsgGrid">
          <img
            src={recieversProfilePic}
            alt="Recievers Profile Pic"
            className="recieversProfilePic"
          />
          <div className="sendMsgSpacer"></div>
          <div className="sendMsgheaderFlex">
            <div className="recieversName">To: {reciever}</div>
            <div className="closeSendMsg" onClick={openOrClose}>
              X
            </div>
          </div>
          <div></div> <div className="sendMsgSpacer"></div>
          <form>
            <textarea className="newMessageText" rows="8" cols="50"></textarea>
            <div>
              <button className="sendMsgButton">Send</button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}
