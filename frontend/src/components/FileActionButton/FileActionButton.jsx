import "./FileActionButton.css";

const FileActionButton = ({ type, onClick, children }) => {
  return (
    <button className={`files-btn ${type}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default FileActionButton;
