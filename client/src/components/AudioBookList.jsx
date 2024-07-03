export const AudioBookList = ({ audioBook, setSelectedId, selectedId }) => {
  const handleSelectedId = (id) => {
    // console.log(id);
    if (selectedId === id) {
      setSelectedId(null);
    } else {
      setSelectedId(id);
    }
  };
  return (
    <ul className="list list-movies">
      {audioBook?.map((book,id) => (
        <li key={id} onClick={() => handleSelectedId(book._id)}>
          <img src={book.poster} alt={`${book.title} poster`} />
          <h3>{book.title}</h3>
          <div>
            <p>
              <span>✍️</span>
              <span>{book.author}</span>
            </p>
            <p>
              <span>⭐
              </span>
              <span>{book.avgRating}</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};
