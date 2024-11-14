  import md5 from 'md5'; 

  const API_PUBLIC_KEY = "d3a7640e83e6f26c84e687a10fbe6841"; // clave publica
  const API_PRIVATE_KEY = "734f4fc67918478b3747a392214cb2f6c32e3754"; //  clave privada
  const BASE_URL = "https://gateway.marvel.com/v1/public/comics";

  // funcioa  para sacar los comics con orderby = modified
  // para que saque los que han sido modificados recientemenre
  const fetchComics = () => {
    const timestamp = new Date().getTime();  // Generamos timestamp
    const hash = md5(timestamp + API_PRIVATE_KEY + API_PUBLIC_KEY); // Generamos  el hash

    //url de la cual vamos a sacar los comics
    const url = `${BASE_URL}?orderBy=-modified&ts=${timestamp}&apikey=${API_PUBLIC_KEY}&hash=${hash}`;

    // Realizamos el fetch y devolvemos la promesa para sacar los comics le pasamos la url
    //y devuelve los resultados en caso de error lo cogemos y nos muestra que tenemos un error a la 
    //hora de sacar los comics
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch comics');
        }
        return response.json();
      })
      .then(data => {
        if (data.data && data.data.results) {
          return data.data.results;
        } else {
          throw new Error('No comics found');
        }
      })
      .catch(error => {
        console.error('Error fetching comics:', error);
        throw new Error('Error fetching comics');
      });
  };

  // hacemos la funcion para obtener los detalles de los comics lo realizamsos mediante el comicId
  const fetchComicById = (comicId) => {
    const timestamp = new Date().getTime();
    const hash = md5(timestamp + API_PRIVATE_KEY + API_PUBLIC_KEY);
    const url = `https://gateway.marvel.com/v1/public/comics/${comicId}?ts=${timestamp}&apikey=${API_PUBLIC_KEY}&hash=${hash}`;

    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch comic details');
        }
        return response.json();
      })
      .then(data => {
        return data.data.results[0]; 
      })
      .catch(error => {
        console.error('Error fetching comic details:', error);
        throw new Error('Error fetching comic details');
      });
  };

  // Función para obtener los personajes del comic utilizando characterId es decir el id del personaje
  const fetchCharacterById = (characterId) => {
    const timestamp = new Date().getTime();
    const hash = md5(timestamp + API_PRIVATE_KEY + API_PUBLIC_KEY);
    const url = `https://gateway.marvel.com/v1/public/characters/${characterId}?ts=${timestamp}&apikey=${API_PUBLIC_KEY}&hash=${hash}`;



    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch character details');
        }
        return response.json();
      })
      .then(data => {
        return data.data.results[0]; 
      })
      .catch(error => {
        console.error('Error fetching character details:', error);
        throw new Error('Error fetching character details');
      });
  };

  export { fetchComics, fetchComicById, fetchCharacterById };
