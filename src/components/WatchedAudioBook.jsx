/* eslint-disable react/prop-types */
const WatchedAudioBook = ({watched,setWatched}) => {
  const removeWatchedAudioBook = (bookId) => {
    setWatched(() => watched.filter((book) => book._id !== bookId));
  };
  return (
        <ul className="list-second">
      {watched.map((book) => (
        <li key={book._id}>
          <img src={book.poster} alt={`${book.title} poster`} />
          <h3>{book.title}</h3>
          <div className="list-second-div">
            <p>
              <span>🌟</span>
              <span>{book.userRating}</span>
            </p>
            <p>
              <span>✍️</span>
              <span>{book.author}</span>
            </p>
          </div>
          <button
            className="btn-delete"
            onClick={() => removeWatchedAudioBook(book._id)}
          >
            X
          </button>
        </li>
      ))}
     </ul>
  )
}
export default WatchedAudioBook