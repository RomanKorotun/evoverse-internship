import "./ActionButton.css";

const ActionButton = ({ type, onClick, children }) => {
  return (
    <button className={`files-btn ${type}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default ActionButton;
