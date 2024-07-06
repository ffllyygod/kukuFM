/* eslint-disable no-unused-vars */
import { Navbar } from "./components/Navbar.jsx";
import { Box1 } from "./components/Box1.jsx";
import { AppProvider } from "./context/AppContext.jsx";
import { Box2 } from "./components/Box2.jsx";

// export default function App() {
//   const [query, setQuery] = useState("");
//   const [genre, setGenre] = useState(null);
//   const [order, setOrder] = useState(null);
//   const [audioBook, setAudioBook] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [isOpen1, setIsOpen1] = useState(true);
//   const [isOpen2, setIsOpen2] = useState(true);
//   const [selectedId, setSelectedId] = useState(null);
//   const [watched, setWatched] = useState(function () {
//     const storedAudioBook = localStorage.getItem("watched");
//     return storedAudioBook ? JSON.parse(storedAudioBook) : [];
//   });
//   // const base_URL = 'https://kukufm-41dv.onrender.com';
//   const base_URL = 'http://127.0.0.1:8080'
//   useEffect(
//     function () {
//       localStorage.setItem("watched", JSON.stringify(watched));
//     },
//     [watched]
//   );

//   useEffect(() => {
//     const controller = new AbortController();
//     const asyncFn = async function () {
//       try {
//         setIsLoading(true);
//         setError("");
//         let api_url;
//         const params = new URLSearchParams();
//         if (genre) params.append('genre', genre);
//         if (query) {
//           params.append('author', query);
//         }
//         if (order) params.append('order', order);

//         api_url = `${base_URL}/filter?${params.toString()}`;

//         // if (genre) {
//         //   api_url = `${base_URL}/filter/genre/${genre}`;
//         // }
//         // if (query) {
//         //   api_url = `${base_URL}/filter/author/${query}`;
//         // }
//         // if (order) {
//         //   api_url = `${base_URL}/filter/orderBy?order=${order}`;
//         // }
//         if (!genre && !query && !order) {
//           api_url = `${base_URL}/book/`;
//         }
//         const res = await fetch(api_url, {
//           signal: controller.signal,
//         });
//         if (!res.ok) throw new Error("Something went wrong!!");
//         const data = await res.json();
//         if (data.Response === "False") throw new Error("Audio Book not found");
//         setAudioBook(data);
//         setError("");
//       } catch (err) {
//         if (err.name !== "AbortError") {
//           setError(err.message);
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     // if (query.length < 3) {
//     //   setAudioBook([]);
//     //   setError("");
//     //   return;
//     // }
//     setSelectedId(null);
//     asyncFn();
//     return function () {
//       controller.abort();
//     };
//   }, [query, genre, order]);

//   return (
//     <>
//       <Navbar
//         query={query}
//         setQuery={setQuery}
//         genre={genre}
//         setGenre={setGenre}
//         order={order}
//         setOrder={setOrder}
//       />

//       <main className="main">
//         <Box isOpen={isOpen1} setIsOpen={setIsOpen1}>
//           {isLoading && <Loader audioBook={audioBook}/>}
//           {!isLoading && !error && !audioBook.length && (<div className="loader">No books found</div>)}
//           {!isLoading && !error && (
//             <AudioBookList
//               audioBook={audioBook}
//               setSelectedId={setSelectedId}
//               selectedId={selectedId}
//             />
//           )}
//           {error && <Error message={error} />}
//         </Box>

//         <Box isOpen={isOpen2} setIsOpen={setIsOpen2}>
//           {selectedId ? (
//             <AudioBookDetails
//               selectedId={selectedId}
//               setSelectedId={setSelectedId}
//               watched={watched}
//               setWatched={setWatched}
//             />
//           ) : (
//             <>
//               <Summary watched={watched} />
//               <WatchedAudioBook watched={watched} setWatched={setWatched} />
//             </>
//           )}
//         </Box>
//       </main>
//     </>
//   );
// }

export default function App() {
  return (
    <AppProvider>
      <Navbar />
      <main className="main">
        <Box1 />
        <Box2 />
      </main>
    </AppProvider>
  );
}
