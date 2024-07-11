/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

function useAppContext() {
    const context = useContext(AppContext);
    if (context === undefined)
      throw new Error("The AppContext was used outside of AppProvider");
    return context;
  }


const AppProvider = ({ children }) => {
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
  const base_URL = 'https://kukufm-41dv.onrender.com';
  // const base_URL = "http://127.0.0.1:8080";
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
        const params = new URLSearchParams();
        if (genre) params.append("genre", genre);
        if (query) {
          params.append("author", query);
        }
        if (order) params.append("order", order);

        api_url = `${base_URL}/filter?${params.toString()}`;

        // if (genre) {
        //   api_url = `${base_URL}/filter/genre/${genre}`;
        // }
        // if (query) {
        //   api_url = `${base_URL}/filter/author/${query}`;
        // }
        // if (order) {
        //   api_url = `${base_URL}/filter/orderBy?order=${order}`;
        // }
        if (!genre && !query && !order) {
          api_url = `${base_URL}/book/`;
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
    <AppContext.Provider
      value={{
        genre,
        setGenre,
        query,
        setQuery,
        order,
        setOrder,
        audioBook,
        setAudioBook,
        watched,
        setWatched,
        isLoading,
        setIsLoading,
        setError,
        error,
        isOpen1,
        setIsOpen1,
        isOpen2,
        setIsOpen2,
        selectedId,
        setSelectedId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export {AppProvider, useAppContext} ;
