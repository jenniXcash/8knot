import deleteIcon from "./../../icons/delete.svg";
import "./Delete.css";
export default function Delete() {
  return (
    <div className="deleteIcon">
      <img src={deleteIcon} alt="delete" />
    </div>
  );
}
