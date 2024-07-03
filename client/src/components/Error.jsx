/* eslint-disable react/prop-types */
const Error = ({ message }) => {
  return (
    <div className="error">
      <span>❌</span>
      <p>{message}</p>
    </div>
  );
};
export default Error;
