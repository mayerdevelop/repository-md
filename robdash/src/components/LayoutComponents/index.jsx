import "./styles.css";
export const LayoutComponents = (props) => {
  return (
    <div className="container">
      {props.children}
    </div>
  );
};
