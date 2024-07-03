/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar.jsx";
import { AudioBookList } from "./components/AudioBookList.jsx";
import { Summary } from "./components/Summary.jsx";
import { Box } from "./components/Box.jsx";
import { Loader } from "./components/Loader.jsx";
import Error from "./components/Error.jsx";
import { AudioBookDetails } from "./components/AudiBookDetails.jsx";
import WatchedAudioBook from "./components/WatchedAudioBook.jsx";


export default function App() {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState(null);
  const [order, setOrder] = useState(null);
  const [audioBook, setAudioBook] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useState(function () {
    const storedAudioBook = localStorage.getItem("watched");
    return storedAudioBook ? JSON.parse(storedAudioBook) : [];
  });

  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched]
  );

  useEffect(() => {
    const controller = new AbortController();
    const asyncFn = async function () {
      try {
        setIsLoading(true);
        setError("");
        let api_url;
        if (genre) {
          api_url = `http://127.0.0.1:8080/filter/genre/${genre}`;
        }
        if (query) {
          api_url = `http://127.0.0.1:8080/filter/author/${query}`;
        }
        if (order) {
          api_url = `http://127.0.0.1:8080/filter/orderBy?order=${order}`;
        }
        if (!genre && !query && !order) {
          api_url = `http://127.0.0.1:8080/book/`;
        }
        const res = await fetch(api_url, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Something went wrong!!");
        const data = await res.json();
        if (data.Response === "False") throw new Error("Audio Book not found");
        setAudioBook(data);
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    // if (query.length < 3) {
    //   setAudioBook([]);
    //   setError("");
    //   return;
    // }
    setSelectedId(null);
    asyncFn();
    return function () {
      controller.abort();
    };
  }, [query, genre, order]);

  return (
    <>
      <Navbar
        query={query}
        setQuery={setQuery}
        genre={genre}
        setGenre={setGenre}
        order={order}
        setOrder={setOrder}
      />

      <main className="main">
        <Box isOpen={isOpen1} setIsOpen={setIsOpen1}>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <AudioBookList
              audioBook={audioBook}
              setSelectedId={setSelectedId}
              selectedId={selectedId}
            />
          )}
          {error && <Error message={error} />}
        </Box>

        <Box isOpen={isOpen2} setIsOpen={setIsOpen2}>
          {selectedId ? (
            <AudioBookDetails
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              watched={watched}
              setWatched={setWatched}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedAudioBook watched={watched} setWatched={setWatched} />
            </>
          )}
        </Box>
      </main>
    </>
  );
}