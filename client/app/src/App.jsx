/**
 * App.jsx
 * Main React component for the Book Website.
 *
 * This component allows users to view, add, update, and delete books by interacting with a Django REST API backend.
 *
 * Key Features:
 * - Fetches and displays a list of books from the backend API
 * - Allows users to add a new book (title and release year)
 * - Allows users to update the title of an existing book
 * - Allows users to delete a book
 *
 * This file is well-commented for beginners to help understand how React state, effects, and API calls work.
 */
import { useEffect, useState } from 'react';
import './App.css';

/**
 * Main application component.
 */
function App() {
  /**
   * State: List of all books fetched from the backend API.
   * @type {Array<{id: number, title: string, release_year: number}>}
   */
  const [books, setBooks] = useState([]);

  /**
   * State: Title for a new book to be added.
   * @type {string}
   */
  const [title, setTitle] = useState("");

  /**
   * State: Release year for a new book to be added.
   * @type {number}
   */
  const [releaseYear, setReleaseYear] = useState(0);

  /**
   * State: New title for updating an existing book.
   * @type {string}
   */
  const [newTitle, setNewTitle] = useState("");

  /**
   * useEffect runs fetchBooks() once when the component mounts.
   * This loads the initial list of books from the backend.
   */
  useEffect(() => {
    fetchBooks();
  }, []);

  /**
   * Fetch all books from the backend API and update state.
   * Uses async/await for asynchronous API call.
   */
  const fetchBooks = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/books/");
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  /**
   * Add a new book to the backend API and update state.
   * Uses the current values of 'title' and 'releaseYear'.
   */
  const addBook = async () => {
    const bookData = {
      title: title,
      release_year: releaseYear
    };
    try {
      const response = await fetch("http://127.0.0.1:8000/api/books/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bookData)
      });
      const data = await response.json();
      setBooks((prev) => [...prev, data]);
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  /**
   * Update the title of an existing book in the backend API and update state.
   * @param {number} pk - The ID of the book to update.
   * @param {number} release_year - The release year of the book (unchanged).
   */
  const updateTitle = async (pk, release_year) => {
    const bookData = {
      title: newTitle,
      release_year,
    };
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/books/${pk}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bookData)
      });
      const data = await response.json();
      setBooks((prev) => prev.map((book) => (book.id === pk ? data : book)));
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  /**
   * Delete a book from the backend API and update state.
   * @param {number} pk - The ID of the book to delete.
   */
  const deleteBook = async (pk) => {
    try {
      await fetch(`http://127.0.0.1:8000/api/books/${pk}/`, {
        method: "DELETE",
      });
      setBooks((prev) => prev.filter((book) => book.id !== pk));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  // --- UI Rendering ---
  return (
    <div className="App">
      <h1>Book Website</h1>
      {/* Form to add a new book */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Book Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Release Year..."
          value={releaseYear}
          onChange={(e) => setReleaseYear(Number(e.target.value))}
        />
        <button onClick={addBook}>Add Book</button>
      </div>

      {/* List of books with update and delete options */}
      {books.map((book) => (
        <div key={book.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
          <p><strong>Title:</strong> {book.title}</p>
          <p><strong>Release Year:</strong> {book.release_year}</p>
          <input
            type="text"
            placeholder="New Title..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button onClick={() => updateTitle(book.id, book.release_year)}>Update Book</button>
          <button onClick={() => deleteBook(book.id)} style={{ marginLeft: '0.5rem', color: 'red' }}>Delete Book</button>
        </div>
      ))}
    </div>
  );
}

export default App;
