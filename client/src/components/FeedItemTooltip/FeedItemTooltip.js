import React, { useState } from "react";
import reply from "../../icons/replyBlack.svg";
import block from "../../icons/accountCancelBlack.svg";
import "./FeedItemTooltip.css";
export default function FeedItemTooltip({ userName }) {
  const [feeditemTooltipToggle, setFeeditemTooltipToggle] = useState(false);
  return (
    <React.Fragment>
      <div
        className="dots"
        onClick={() => setFeeditemTooltipToggle(!feeditemTooltipToggle)}
      >
        <span className="onlyDots">...</span>
        {feeditemTooltipToggle && (
          <div className="xxx">
            <div className="reply">
              <img src={reply} alt="reply" />
              Send message
            </div>
            <div>
              <img src={block} alt="block" />
              Block {userName}
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
