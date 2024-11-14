import React, { useState, useEffect } from 'react';
import { fetchComicById, fetchCharacterById } from '../marvelApi'; // Importar las funciones necesarias

const ComicDetails = ({ comicId, onBack }) => {
  const [comic, setComic] = useState(null);
  const [characters, setCharacters] = useState([]); // Para almacenar los personajes
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect para obtener los detalles del cómic y los personajes
  useEffect(() => {
    fetchComicById(comicId)
      .then(fetchedComic => {
        setComic(fetchedComic); // Guardamos los detalles del cómic

        // Para cada personaje, obtenemos sus detalles
        const characterPromises = fetchedComic.characters.items.map(character =>
          fetchCharacterById(character.resourceURI.split('/').pop()) // Obtenemos el id del personaje
        );

        return Promise.all(characterPromises); // Esperamos que se resuelvan todas las promesas
      })
      .then(fetchedCharacters => {
        setCharacters(fetchedCharacters); // Guardamos los personajes obtenidos
      })
      .catch(error => {
        setError('Error fetching comic or character details');
      })
      .finally(() => {
        setLoading(false); // Terminamos la carga
      });
  }, [comicId]);

  if (loading) {
    return <div>Loading comic details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="comic-details">
      <button onClick={onBack}>Back to Comics List</button>
      <h2>{comic.title}</h2>
      <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} />
      <p><strong>Page Count:</strong> {comic.pageCount}</p>
      <p><strong>Price:</strong> ${comic.prices[0]?.price || 'N/A'}</p>
      <p><strong>Series:</strong> {comic.series.name}</p>

      {/* Galería de personajes */}
      <h3>Characters</h3>
      <div className="character-gallery">
        {characters.length > 0 ? (
          characters.map((character) => (
            <div key={character.id} className="character-card">
              <img
                src={character.thumbnail.path && character.thumbnail.extension ? `${character.thumbnail.path}.${character.thumbnail.extension}` : 'default_image_url'} // Usar una imagen por defecto si no existe
                alt={character.name}
              />
              <p>{character.name}</p>
            </div>
          ))
        ) : (
          <p>No characters available for this comic.</p>
        )}
      </div>
    </div>
  );
};

export default ComicDetails;
