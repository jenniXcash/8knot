import React from "react";
import "./Dms.css";
import userPic from "../../icons/account.svg";

export default function Dms() {
  return (
    <React.Fragment>
      <div className="singleMsgGrid">
        <div className="sendersProfilePic">
          <img src={userPic} alt="sendersProfilePic" />
        </div>
        <div className="space"></div>
        <div className="msgDataGrid">
          <div className="userNameDateAndTime">
            <div className="sendersUsername">Idan Malka</div>
            <div className="msgTime">25/1/2022</div>
          </div>
          <div className="firstLineOfMsg">first line of msg ...</div>
        </div>
      </div>
    </React.Fragment>
  );
}
