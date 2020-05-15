import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Comics() {
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
  const [search2, setSearch2] = useState("");

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

  const handleQuery = () => {
    // console.log(handleQuery);
    let str = "?";
    console.log(str);
    if (page) {
      str += "page=" + page;
      console.log(str);
    }
    if (search) {
      // si str n'est pas modifié (aucun query avant)
      if (str === "?") {
        str += "sort=" + search;
      } else {
        str += "&sort=" + search;
      }
      console.log(str);
    }
    // si aucune query
    if (str === "?") {
      return "";
      // si query :
    } else {
      return str;
    }
  };

  // REQUETE CRUD READ = RECUPERER LISTE DES COMICS ------------------------------------------------------
  const fetchData = async () => {
    const query = handleQuery();
    console.log(query);
    console.log("http://localhost:3001/comics" + query);
    const response = await axios.get(
      "https://marvel-fc.herokuapp.com/comics" + query
      // "https://marvel-fc.herokuapp.com/comics" + page
    );

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
        characters[i].title
          .toLowerCase()
          .indexOf(event.target.value.toLowerCase()) !== -1
      ) {
        // if (!event.target.value) {
        //   newResults.push(characters[i]);
        if (newResults.length >= 100) {
          break;
          setResults(characters);
        } else {
          newResults.push(characters[i]);
        }
      }
    }
    setResults(newResults);
  };

  useEffect(() => {
    console.log("Fetching Data");
    fetchData();
  }, [page, search2]);

  return (
    <>
      {isLoading ? (
        <p>loading... Please Wait !</p>
      ) : (
        <section className="container">
          <h1>MARVEL COMICS</h1>
          <div className="infoPage">
            <div>Nombre de Comics : {data.total}</div>
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
            <div className="bb">
              {newTab.map((item) => {
                return (
                  <div className="aa">
                    <div>
                      <button
                        className="aa"
                        key={item}
                        onClick={(event) => {
                          setPage(item);
                        }}
                      >
                        {item}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
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
                <input type="submit" value="Rechercher sur la page" />
                <input
                  className="SearchBar"
                  placeholder="Tapez recherche"
                  type="text"
                  onChange={(event) => {
                    searchResult(event);
                  }}
                />
              </form>
            </div>
            <br />
            <div>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setSearch2(search);
                  setPage("");
                }}
              >
                <input
                  type="submit"
                  value=" Recherche par titre sur toutes les pages "
                />
                <input
                  className="SearchBar"
                  placeholder="Tapez recherche"
                  type="text"
                  onChange={(event) => {
                    setSearch(event.target.value);
                  }}
                />
              </form>
            </div>
            {/* <div>
              Recherche par titre sur toutes les pages :
              <input
                className="SearchBar"
                type="text"
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
              />
            </div> */}
          </div>

          {/* Rafraichir la page pour forcer l'affichage des perso (resultas des filtre nom) */}

          {/* LSITE DES PERSO ----------------------------------------------------------------------*/}
          {results.map((character, index) => {
            //  {characters.map((character, index) => {
            return (
              <Link
                className="Link"
                style={{ textDecoration: "none" }}
                to={`/comics${characters.id}`}
              >
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
              </Link>
            );
          })}
        </section>
      )}
    </>
  );
}

export default Comics;
