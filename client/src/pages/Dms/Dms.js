import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useEffect, useState } from "react";
import RegistrationError from "../../components/RegistrationError/RegistrationError";
import SingleMsgPreview from "../../components/SinlgeMsgPreview/SinlgeMsgPreview";

import "./Dms.css";

export default function Dms() {
  const { user, isAuthenticated } = useAuth0();
  const [msgs, setMsgs] = useState([]);

  useEffect(() => {
    async function retrieveMessages(user) {
      const response = await fetch(`api/messages/${user.sub}`);
      const data = await response.json();
      setMsgs(data);
    }

    if (user) {
      retrieveMessages(user);
    }
  }, [user]);

  return (
    <React.Fragment>
      {!isAuthenticated && <RegistrationError page={"view messages"} />}
      {isAuthenticated && (
        <div className="inbox">
          {msgs.map((msg) => {
            return (
              <SingleMsgPreview
                key={msg._id}
                content={msg.content}
                date={msg.date}
                id={msg._id}
                profilePic={msg.profilePic}
                time={msg.time}
                userName={msg.userName}
              />
            );
          })}
        </div>
      )}
    </React.Fragment>
  );
}
