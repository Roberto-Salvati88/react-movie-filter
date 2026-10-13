import { useState, useEffect } from 'react';

const initialMovies = [
  { title: 'Inception', genre: 'Fantascienza' },
  { title: 'Il Padrino', genre: 'Thriller' },
  { title: 'Titanic', genre: 'Romantico' },
  { title: 'Batman', genre: 'Azione' },
  { title: 'Interstellar', genre: 'Fantascienza' },
  { title: 'Pulp Fiction', genre: 'Thriller' }
];

function App() {
  const [movies, setMovies] = useState(initialMovies);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [search, setSearch] = useState('');
  const [filteredMovies, setFilteredMovies] = useState(initialMovies);
  const [newMovie, setNewMovie] = useState({ title: '', genre: '' });

  // la consegna chiede useEffect: ogni volta che cambiano film, genere o ricerca, ricalcolo la lista
  useEffect(() => {
    let result = movies;

    // nessun genere selezionato = tutti i film
    if (selectedGenre !== '') {
      result = result.filter(movie => movie.genre === selectedGenre);
    }

    // BONUS: ricerca per titolo, senza distinguere maiuscole e minuscole
    if (search.trim() !== '') {
      result = result.filter(movie => movie.title.toLowerCase().includes(search.toLowerCase()));
    }

    setFilteredMovies(result);
  }, [movies, selectedGenre, search]);

  // i generi per la select li ricavo dai film, senza doppioni
  const genres = [...new Set(movies.map(movie => movie.genre))];

  // BONUS: aggiunta di un film
  const handleAdd = e => {
    e.preventDefault();
    if (newMovie.title.trim() === '' || newMovie.genre.trim() === '') return;

    setMovies([...movies, { title: newMovie.title.trim(), genre: newMovie.genre.trim() }]);
    setNewMovie({ title: '', genre: '' });
  };

  return (
    <main className="container">
      <h1>Movie Filter</h1>

      <div className="filters">
        <select value={selectedGenre} onChange={e => setSelectedGenre(e.target.value)}>
          <option value="">Tutti i generi</option>
          {genres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
        <input type="text" placeholder="Cerca per titolo" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <ul className="movies">
        {filteredMovies.map(movie => (
          <li key={movie.title}>
            <strong>{movie.title}</strong> <span>{movie.genre}</span>
          </li>
        ))}
      </ul>

      <h2>Aggiungi un film</h2>
      <form onSubmit={handleAdd} className="filters">
        <input placeholder="Titolo" value={newMovie.title} onChange={e => setNewMovie({ ...newMovie, title: e.target.value })} />
        <input placeholder="Genere" value={newMovie.genre} onChange={e => setNewMovie({ ...newMovie, genre: e.target.value })} />
        <button type="submit">Aggiungi</button>
      </form>
    </main>
  );
}

export default App;
