import "./SideBar.css";
import plus from "../../icons/plus-thick.svg";
import dms from "../../icons/email-outline.svg";
import home from "../../icons/home.svg";
import account from "../../icons/account.svg";
import { Link } from "react-router-dom";

export default function SideBar() {
  return (
    <div className="sideBar">
      <div className="topbarTooltip">
        <Link to="/">
          <img src={home} alt="home screen" className="sidebarIcon" />
        </Link>
        <span className="topbarTooltipText">Home</span>
      </div>

      <div className="topbarTooltip">
        <Link to="PostNew">
          <img src={plus} alt="Add a new post" className="sidebarIcon" />
        </Link>
        <span className="topbarTooltipText">Add post</span>
      </div>

      <div className="topbarTooltip">
        <Link to="Dms">
          <img src={dms} alt="Inbox" className="sidebarIcon" />
        </Link>
        <span className="topbarTooltipText">Inbox</span>
      </div>

      <div className="topbarTooltip">
        <Link to="Account">
          <img
            src={account}
            alt="personalprofile page"
            className="sidebarIcon"
          />
        </Link>
        <span className="topbarTooltipText">Profile</span>
      </div>
    </div>
  );
}
