import React, { useEffect, useState } from "react";
import "./SingleMsg.css";
import { useParams } from "react-router-dom";
import Reply from "../../components/Reply/Reply";
import Delete from "../../components/Delete/Delete";
export default function SingleMsg() {
  const { id } = useParams();
  const [message, setMessage] = useState([]);
  useEffect(() => {
    fetch(`/api/messages/${id}`)
      .then((res) => res.json())
      .then((message) => {
        setMessage(message);
      });
  }, [id]);
  return (
    <React.Fragment>
      <div className="singleMessageGrid">
        <div className="singleMessageProfilePic">
          <img
            src={message.profilePic}
            alt="Senders Profile Pic"
            className="singleMessageProfilePic"
          />
        </div>
        <div className="singleMessageSpacer"></div>
        <div className="singleMessageNameAndTime">
          <div className="singleMessageUserName">{message.userName}</div>
          <div className="singleMessageTimeAndDate">
            {message.date} / {message.time}
          </div>
        </div>
        <div></div>
        <div className="singleMessageSpacer"></div>
        <div className="singleMessageContent">{message.content}</div>
        <div></div>
        <div className="singleMessageSpacer"></div>
        <div className="replyAndDelete">
          <Reply />
          <div className="replyAndDeleteSpacer"></div>
          <Delete />
        </div>
      </div>
    </React.Fragment>
  );
}
