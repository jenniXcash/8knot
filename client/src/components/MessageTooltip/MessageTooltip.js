import React from "react";
import replyIcon from "../../icons/reply.svg";
import deleteIcon from "../../icons/delete.svg";
import "./MessageTooltip.css";

export default function MessageTooltip({ openCloseSendingWindow }) {
  return (
    <div className="singleMessageTools">
      <div className="tooltip">
        <img
          src={replyIcon}
          alt="reply button"
          className="replyButton"
          onClick={openCloseSendingWindow}
        />
        <span className="tooltiptext">Reply</span>
      </div>
      <div className="tooltip">
        <img src={deleteIcon} alt="Delete Message" className="deleteButton" />
        <span className="tooltiptext">Delete</span>
      </div>
    </div>
  );
}
