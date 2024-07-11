/* eslint-disable react/prop-types */

import { useAppContext } from "../context/AppContext";

/* eslint-disable no-unused-vars */
const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export const Summary = () => {
  const {watched} = useAppContext();
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  return (
    <div className="summary">
      <h2>Audio books you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} audio books</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{Math.round(avgUserRating*10)/10}</span>
        </p>
        {/* <p>
          <span>⏳</span>
          <span>`${avgHours} hr ${avgRemainingMinutes} min`</span>
        </p> */}
      </div>
    </div>
  );
};
