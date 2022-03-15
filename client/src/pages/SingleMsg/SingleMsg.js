import React, { useEffect, useState } from "react";
import "./SingleMsg.css";
import { useParams } from "react-router-dom";
import SendMsg from "../../components/SendMsg/SendMsg";
import MessageTooltip from "../../components/MessageTooltip/MessageTooltip";
export default function SingleMsg() {
  const { id } = useParams();
  const [message, setMessage] = useState([]);
  const [replyMessage, setReplyMessage] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    fetch(`/api/messages/${id}`)
      .then((res) => res.json())
      .then((message) => {
        setMessage(message);
        setLoader(false);
      });
  }, [id]);

  function openCloseSendingWindow() {
    setReplyMessage(!replyMessage);
  }

  return (
    <React.Fragment>
      <div className="singleMessageContainer">
        {loader && <div>Loading</div>}
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
        <MessageTooltip openCloseSendingWindow={openCloseSendingWindow} />
        {replyMessage && <SendMsg recieversSub={message.recieversSub} />}
      </div>
    </React.Fragment>
  );
}
