import React from "react";
import { useRef, useEffect } from "react";
import "./SendMsg.css";

export default function SendMsg({
  reciever,
  recieversProfilePic,
  openOrClose,
}) {
  //This Ref referes to the container so we could know whether we click either inside or outside of it
  const node = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });
  const handleClick = (e) => {
    if (!node.current.contains(e.target)) {
      openOrClose();
    }
  };

  return (
    <React.Fragment>
      <div className="sendMsgContainer" ref={node}>
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
