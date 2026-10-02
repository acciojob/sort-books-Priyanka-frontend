import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchBooks,
  setSortBy,
  setSortOrder,
} from "../redux/actions";

function BooksList() {
  const dispatch = useDispatch();

  const books = useSelector((state) => state.books);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const sortBy = useSelector((state) => state.sortBy);
  const sortOrder = useSelector((state) => state.sortOrder);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const booksArray = Array.isArray(books) ? books : [];

  const sortedBooks = [...booksArray].sort((a, b) => {
    let valueA = "";
    let valueB = "";

    if (sortBy === "title") {
      valueA = a.title || "";
      valueB = b.title || "";
    } else if (sortBy === "author") {
      valueA = a.author || "";
      valueB = b.author || "";
    } else if (sortBy === "publisher") {
      valueA = a.publisher || "";
      valueB = b.publisher || "";
    }

    const comparison = valueA
      .toLowerCase()
      .localeCompare(valueB.toLowerCase());

    return sortOrder === "asc" ? comparison : -comparison;
  });

  const handleSortBy = (event) => {
    dispatch(setSortBy(event.target.value));
  };

  const handleSortOrder = (event) => {
    dispatch(setSortOrder(event.target.value));
  };

  if (loading) {
    return <p>Loading books...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Book Sorting App</h1>

      <div className="sorting-controls">
        <select value={sortBy} onChange={handleSortBy}>
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="publisher">Publisher</option>
        </select>

        <select value={sortOrder} onChange={handleSortOrder}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>ISBN</th>
          </tr>
        </thead>

        <tbody>
          {sortedBooks.map((book, index) => (
            <tr key={book.primary_isbn13 || book.primary_isbn10 || index}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publisher}</td>
              <td>
                {book.primary_isbn13 ||
                  book.primary_isbn10 ||
                  "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BooksList;