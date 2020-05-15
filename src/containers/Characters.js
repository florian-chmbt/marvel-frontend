import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Characters() {
  const [data, setData] = useState();
  // attention : penser à mettre les crochets dans le state caracters pour le filtre sur nom
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState("");
  const [limit, setLimit] = useState("");
  const [total, setTotal] = useState("");
  const [results, setResults] = useState(characters);
  // const [results, setResults] = useState(characters.slice(0, 10));
  const [search, setSearch] = useState("");

  // VARIABLES GESTION DES PAGES -----------------------------------------------------------------------
  // const tabTest = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  let tab = [];
  let newTab = [];
  // * nombre maximum de pages à afficher
  const pageLimit = limit; // => 100
  const pageTotal = total; // => 1493
  const pageMax = Number(Math.ceil(pageTotal / 100)); // => 15
  tab.length = pageMax;
  for (let i = 1; i < tab.length + 1; i++) {
    newTab.push(i);
  }
  // console.log(newTab); // => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

  // RECUPERER LE DERNIER CHAR DE LA STRING STATE ------------------------------------------------------
  // console.log(typeof page); // => "string"
  // * Methode 1
  const numPage1 = page;
  const lastChar1 = numPage1.charAt(numPage1.length - 1); // => "1"
  console.log(lastChar1);
  // * Methode 2
  var numPage2 = page;
  var lastChar2 = numPage2.substr(numPage2.length - 1); // => "1"
  console.log(lastChar2);
  // * Methode 3
  var numPage3 = page;
  var lastChar3 = numPage3.split("=").pop(); // => "11"
  console.log(lastChar3);

  // REQUETE CRUD READ = RECUPERER LISTE DES CHARACTERES ------------------------------------------------------
  const fetchData = async () => {
    const response = await axios.get("http://localhost:3001/characters" + page);

    // console.log(response.data); // => obj API
    // console.log(response.data.total); // => 1493
    console.log(response.data.results); // => [tableau avec liste des perso en elet de type obj]

    setData(response.data);
    setCharacters(response.data.results);
    setTotal(response.data.total);
    setLimit(response.data.limit);
    setIsLoading(false);
    // setPage(page);

    // forcer le rafraichissement pour que tous les perso s'affiche avec le map non plus sur le state "characters" mais sur "results"
    setResults(response.data.results);
  };

  // VARIABLES GESTION DES FILTRES NAME/TITLE ------------------------------------------------------
  // fonction qui va être appelée à chaque modification dans l'input de recherche qui retourne un tableau de resultats
  const searchResult = (event) => {
    let newResults = [];
    for (let i = 0; i < characters.length; i++) {
      if (
        characters[i].name
          .toLowerCase()
          .indexOf(event.target.value.toLowerCase()) !== -1
      ) {
        newResults.push(characters[i]);
      }
    }
    setResults(newResults);
  };

  useEffect(() => {
    console.log("Fetching Data");
    fetchData();
  }, [page]);

  return (
    <>
      {isLoading ? (
        <p>loading... Please Wait !</p>
      ) : (
        <section className="container">
          <h1>MARVEL CHARACTERS</h1>
          <div className="infoPage">
            <div>Nombre de SuperHeros : {data.total}</div>
            <div>Nombre total de résultats affichés : {data.count}</div>
          </div>

          {/* TEST DES CLE DE OBJ DATA ------------------------------------------------------------*/}
          {/* <div>{characters.results[0].name}</div>
          <div>{characters.results[0].id}</div>
          <div>{characters.results[0].description}</div> */}
          {/* <img
            src={characters.results[0].thumbnail.path}
          /> */}

          {/* FILTRE SUR PAGNIATION -------------------------------------------------------------------*/}

          {/* 1) METHODE BALISE FORM*/}
          {/* <div>
            <form
              className="form"
              onSubmit={async (event) => {
                event.preventDefault();
              }}
            >
              <input type="submit" value="valider" />

              <div>page</div>
              <input
                type="number"
                onClick={(event) => {
                  setPage("?page=" + event.target.value);
                }}
              ></input>
            </form>
          </div> */}

          {/* 2) METHODE BALISE BOUTON*/}
          {/* faire une condition pour afficher page 1 si state est falsy */}
          <figure>
            <div>Page : {lastChar3}</div>
            {newTab.map((item) => {
              return (
                <button
                  key={item}
                  onClick={(event) => {
                    setPage("?page=" + item);
                  }}
                >
                  {item}
                </button>
              );
            })}
          </figure>

          {/* FILTRE SUR TITRE ET NOM-------------------------------------------------------------*/}
          {/* faire une condition pour afficher tous les résultats quand barre de recherche vide*/}
          <div className="Search">
            <div>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                }}
              >
                <input type="submit" value="Rechercher" />
                <input
                  style={{
                    height: "40px",
                    width: "600px",
                    backgroundColor: "beige",
                    marginLeft: "20px",
                  }}
                  placeholder="Tapez recherche"
                  type="text"
                  onChange={(event) => {
                    searchResult(event);
                  }}
                />
              </form>
            </div>
            <br />
            {/* <div>
              Recherche par non :
              <input
                type="text"
                onChange={(event) => {
                  searchResult(event);
                }}
              />
            </div> */}
          </div>

          {/* Rafraichir la page pour forcer l'affichage des perso (resultas des filtre nom) */}

          {/* LSITE DES PERSO ----------------------------------------------------------------------*/}
          {results.map((character, index) => {
            //  {results.map((character, index) => {
            return (
              <Link
                className="Link"
                style={{ textDecoration: "none" }}
                to={`/comicsbyid/${character.id}`}
              >
                <article key={character.id}>
                  <h2>{character.name}</h2>
                  <div>
                    <div>
                      <img
                        src={
                          character.thumbnail.path +
                          "." +
                          character.thumbnail.extension
                        }
                        alt={character.name}
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
              </Link>
            );
          })}
        </section>
      )}
    </>
  );
}

export default Characters;
