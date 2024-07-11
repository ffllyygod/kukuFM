/* eslint-disable react/prop-types */
import { useAppContext } from "../context/AppContext";
import { AudioBookDetails } from "./AudiBookDetails";
import { Summary } from "./Summary";
import { ToggleButton } from "./ToggleButton";
import WatchedAudioBook from "./WatchedAudioBook";
export const Box2 = () => {
  const { isOpen2, setIsOpen2, selectedId } = useAppContext();
  return (
    <div className="box">
      <ToggleButton isOpen={isOpen2} setIsOpen={setIsOpen2} />
      {isOpen2 && (
        <>
          {selectedId ? (
            <AudioBookDetails />
          ) : (
            <>
              <Summary />
              <WatchedAudioBook />
            </>
          )}
        </>
      )}
    </div>
  );
};
