import React from "react";
import MessageTooltip from "../MessageTooltip/MessageTooltip";
import { Link } from "react-router-dom";
import "./SinlgeMsgPreview.css";

export default function SingleMsgPreview({
  id,
  date,
  time,
  profilePic,
  content,
  userName,
}) {
  return (
    <React.Fragment>
      <Link to={`/SingleMsg/${id}`}>
        <div className="singleMsgPreviewGrid">
          <div className="singleMsgProfilePic">
            <img
              src={profilePic}
              alt="Profile Pic"
              className="singleMsgProfilePic"
            />
          </div>
          <div className="singleMsgPreviewSpacer"></div>
          <div className="singleMsgPreviewInfo">
            <div className="nameAndTime">
              <div className="singleMsgPreviewUser">{userName}</div>
              <div className="singleMsgPreviewTime">
                {date} / {time}
              </div>
            </div>
            <div className="singleMsgPreviewContent">{content}</div>
          </div>
          <div></div>
          <div></div>
          <MessageTooltip />
        </div>
      </Link>
    </React.Fragment>
  );
}
