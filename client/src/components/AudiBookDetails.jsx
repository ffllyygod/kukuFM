/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

import { Loader } from "./Loader";
import Reviews from "./Reviews";

export const AudioBookDetails = ({
  selectedId,
  setSelectedId,
  watched,
  setWatched,
}) => {
  const [audioBook, setAudioBook] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [flag, setFlag] = useState(true);
  const {
    _id,
    title,
    description,
    avgRating,
    poster,
    author,
    genre,
    reviews,
    runtime,
    noOfEpisodes,
  } = audioBook;

  useEffect(() => {
    const asyncFn = async function () {
      setIsLoading(true);
      const res = await fetch(`http://127.0.0.1:8080/book/${selectedId}`);
      if (!res.ok) throw new Error("Something went wrong!!");
      const data = await res.json();
      if (data.Response === "False") throw new Error("Movie not found");
      setAudioBook(data);
      setIsLoading(false);
    };
    asyncFn();
  }, [selectedId, flag]);

  useEffect(() => {
    if (!title) return;
    document.title = `${title} | KuKu FM`;
    return function () {
      document.title = "KuKu FM";
    };
  }, [title]);

  useEffect(
    function () {
      const callback = (e) => {
        if (e.code === "Escape") {
          setSelectedId(null);
        }
      };
      document.addEventListener("keydown", callback);
      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [setSelectedId]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={() => setSelectedId(null)}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${audioBook} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                <span>⭐</span>
                <span>{Math.round(avgRating * 10) / 10}</span>
              </p>
            </div>
            <div className="details-overview-2 box">
              <h3>
                <span role="img" aria-label="author">
                  👤
                </span>{" "}
                {author}
              </h3>
              <p>
                <span className="genre-box">{genre}</span>
              </p>
            </div>
            <div className="details-overview-3 box">
              <h3>Description</h3>
              <p>{description}</p>
              <h3>
                Number of episodes: <span>{noOfEpisodes}</span>
              </h3>
              <h3>
                Total length: <span>{runtime}</span>
              </h3>
            </div>
            <Reviews
              reviews={reviews}
              id={_id}
              setFlag={setFlag}
              flag={flag}
              watched={watched}
              setWatched={setWatched}
            />
          </header>
        </>
      )}
    </div>
  );
};
