# react-movie-filter

Per avviarlo: `npm install`, poi `npm run dev`.

Domanda probabile all'esame: "serviva davvero useEffect?"
La consegna lo chiede, ma la lista filtrata si può anche calcolare direttamente nel corpo del componente
(stato DERIVATO), senza un secondo useState: è più semplice e non c'è un render in più.

```jsx
const filteredMovies = movies.filter(movie => selectedGenre === '' || movie.genre === selectedGenre);
```

Saper spiegare entrambe le versioni è un punto a favore.
