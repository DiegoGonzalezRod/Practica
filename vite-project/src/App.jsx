import React from 'react';
import ComicsFeed from './components/ComicsFeed'; // Importamos ComicsFeed
import './App.css'; // Estilos globales

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Marvel Comics</h1>
      </header>
      <ComicsFeed></ComicsFeed>
    </div>
  );
}

export default App;
