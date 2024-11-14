import React from 'react';

const FavoritesList = ({ favorites }) => {
  return (
    <div className="favorites-container">
      <h2>Your Favorites</h2>
      {favorites.length > 0 ? (
        <div className="comics-container">
          {favorites.map((comic) => (
            <div key={comic.id} className="comic">
              <img
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                alt={comic.title}
              />
              <h3>{comic.title}</h3>
              <p>{comic.description || 'No description available'}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No favorites yet.</p>
      )}
    </div>
  );
};

export default FavoritesList;
