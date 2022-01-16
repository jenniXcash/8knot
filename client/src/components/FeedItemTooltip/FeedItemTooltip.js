import React, { useState, useRef, useEffect } from "react";
import SendMsg from "../SendMsg/SendMsg";
import reply from "../../icons/replyBlack.svg";
import block from "../../icons/accountCancelBlack.svg";
import "./FeedItemTooltip.css";
export default function FeedItemTooltip({ userName, openOrClose, replyMsg }) {
  const [feeditemTooltipToggle, setFeeditemTooltipToggle] = useState(false);
  const node = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });
  const handleClick = (e) => {
    if (!node.current.contains(e.target)) {
      setFeeditemTooltipToggle(false);
    }
  };

  return (
    <React.Fragment>
      <div
        ref={node}
        className="dots"
        onClick={() => setFeeditemTooltipToggle(!feeditemTooltipToggle)}
      >
        <span className="onlyDots">...</span>
        {feeditemTooltipToggle && (
          <div className="xxx">
            <div className="reply" onClick={openOrClose}>
              <img src={reply} alt="reply" />
              Send message
            </div>
            <div
              className="block"
              onClick={() => console.log(`block ${userName}`)}
            >
              <img src={block} alt="block" />
              Block {userName}
            </div>
          </div>
        )}
      </div>
      {replyMsg && <SendMsg reciever={userName} openOrClose={openOrClose} />}
    </React.Fragment>
  );
}
