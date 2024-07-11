import { useAppContext } from "../context/AppContext";

/* eslint-disable react/prop-types */
const Error = () => {
  const {error} = useAppContext();
  return (
    <div className="error">
      <span>❌</span>
      <p>{error}</p>
    </div>
  );
};
export default Error;
