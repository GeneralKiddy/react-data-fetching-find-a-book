import "./App.css";
import { useEffect, useState } from 'react';
import axios from "axios";
import { DebounceInput } from 'react-debounce-input';

function App() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");

  const handleQueryChange = (event) => {
    setQuery(event.target.value)
  };

  useEffect(() => { 
    if (query !== "" ) { getBook(query) } 
    else { setBooks([]) }
  }, [query])

  const getBook = async (searchText) => {
    const result = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchText}`)
    setBooks(result.data.items)
  }

  return <div className="App">
    <h1>Find a Book</h1>
    <div>
      <DebounceInput
        minLength={2}
        debounceTimeout={500}
        type="text"
        value={query}
        onChange={handleQueryChange}
      />
      <div>
        <ul>
          {books.map((book, index) => (
            <li key={index}>{book.volumeInfo.title}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>;
}

export default App;
