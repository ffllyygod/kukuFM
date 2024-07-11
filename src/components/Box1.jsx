/* eslint-disable react/prop-types */
import { useAppContext } from "../context/AppContext";
import { ToggleButton } from "./ToggleButton";
import { Loader } from "./Loader";
import { AudioBookList } from "./AudioBookList";
import Error from "./Error";

export const Box1 = () => {
  const { isOpen1, setIsOpen1, isLoading, error, audioBook } = useAppContext();
  return (
    <div className="box">
      <ToggleButton isOpen={isOpen1} setIsOpen={setIsOpen1} />
      {isOpen1 && (
        <>
          {isLoading && <Loader />}
          {!isLoading && !error && !audioBook.length && (
            <div className="loader">No books found</div>
          )}
          {!isLoading && !error && <AudioBookList />}
          {error && <Error />}
        </>
      )}
    </div>
  );
};
