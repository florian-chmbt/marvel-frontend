import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function ComcisById() {
  // PARAMS
  const { idToto } = useParams();
  console.log(idToto);

  // STATE
  const [data, setData] = useState();
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState("");

  // const [results, setResults] = useState(characters.slice(0, 10));
  const [search, setSearch] = useState("");

  // REQUETE CRUD READ = RECUPERER LISTE DES CHARACTERES ------------------------------------------------------
  const fetchData = async () => {
    const response = await axios.get(
      // `http://localhost:3001/comicsbyid/${idToto}`
      `https://marvel-fc.herokuapp.com/comicsbyid/${idToto}`
    );

    // console.log(response.data); // => obj API
    // console.log(response.data.total); // => 1493
    console.log(response.data.results); // => [tableau avec liste des perso en elet de type obj]

    setData(response.data);
    setCharacters(response.data.results);

    setIsLoading(false);
    // setId(id);
  };

  useEffect(() => {
    console.log("Fetching Data");
    fetchData();
  }, [idToto]);

  return (
    <>
      {isLoading ? (
        <p>loading... Please Wait !</p>
      ) : (
        <section className="container">
          <h1>MARVEL CHARACTERS</h1>
          <div className="infoPage">
            <div>Nombre de Comics pour ce superHero : {data.total}</div>
            <div>Nombre total de résultats affichés : {data.count}</div>
          </div>

          {/* LSITE DES PERSO ----------------------------------------------------------------------*/}
          {characters.map((character, index) => {
            //  {results.map((character, index) => {
            return (
              <article key={character.id}>
                <h2>{character.title}</h2>
                <div>
                  <div>
                    <img
                      src={
                        character.thumbnail.path +
                        "." +
                        character.thumbnail.extension
                      }
                      alt={character.title}
                    />
                  </div>
                  <div>
                    {/* <h3>Description</h3>
              <p>{character.description}</p> */}
                    <div>Description</div>
                    <br />
                    <p>{character.description}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </>
  );
}

export default ComcisById;
