import React, { useEffect, useState } from "react";
import "./SingleMsg.css";
import { useParams } from "react-router-dom";
import SendMsg from "../../components/SendMsg/SendMsg";
import replyIcon from "../../icons/reply.svg";
import deleteIcon from "../../icons/delete.svg";
export default function SingleMsg() {
  const { id } = useParams();
  const [message, setMessage] = useState([]);
  const [sendMessage, setSendMessage] = useState(false);
  useEffect(() => {
    fetch(`/api/messages/${id}`)
      .then((res) => res.json())
      .then((message) => {
        setMessage(message);
      });
  }, [id]);

  function openCloseSendingWindow() {
    setSendMessage(!sendMessage);
  }
  return (
    <React.Fragment>
      <div className="singleMessageContainer">
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
        </div>
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
            <img
              src={deleteIcon}
              alt="Delete Message"
              className="deleteButton"
            />
            <span className="tooltiptext">Delete</span>
          </div>
        </div>
      </div>
      {sendMessage && (
        <SendMsg
          reciever={message.userName}
          recieversProfilePic={message.profilePic}
          openOrClose={openCloseSendingWindow}
        />
      )}
    </React.Fragment>
  );
}
