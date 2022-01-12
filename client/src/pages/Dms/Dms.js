import React from "react";
import { useEffect, useState } from "react";
import "./Dms.css";
import SingleMsgPreview from "../../components/SinlgeMsgPreview/SinlgeMsgPreview";

export default function Dms() {
  const [msgs, setMsgs] = useState([]);

  useEffect(() => {
    const res = fetch("/api/messages");
    res
      .then(function (response) {
        return response.json();
      })
      .then(function (messages) {
        setMsgs(messages);
      });
  }, []);
  return (
    <React.Fragment>
      <div className="inbox">
        {msgs.map((msg) => {
          return (
            <SingleMsgPreview
              key={msg.id}
              content={msg.content}
              date={msg.date}
              id={msg.id}
              profilePic={msg.profilePic}
              time={msg.time}
              userName={msg.userName}
            />
          );
        })}
      </div>
    </React.Fragment>
  );
}
