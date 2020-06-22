import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import composants
import Loader from "../components/Loader";

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

  // FONCTION : GESTION DES QUERIES  ------------------------------------------------------

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
        str += "search=" + search;
      } else {
        str += "&search=" + search;
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

  // REQUETE CRUD READ = RECUPERER LISTE DES CHARACTERES ------------------------------------------------------
  const fetchData = async () => {
    const query = handleQuery();
    console.log(query);
    console.log("http://localhost:3001/comics" + query);
    const response = await axios.get(
      "http://localhost:3001/characters" + query
      // "https://marvel-fc.herokuapp.com/characters" + query
    );

    // console.log(response.data); // => obj API
    // console.log(response.data.total); // => 1493
    console.log(response.data.results); // => [tableau avec liste des perso en elet de type obj]

    setData(response.data);
    setCharacters(response.data.results);
    setTotal(response.data.total);
    setLimit(response.data.limit);
    setIsLoading(false);

    // forcer le rafraichissement pour que tous les perso s'affiche avec le map non plus sur le state "characters" mais sur "results"
    setResults(response.data.results);
  };

  // VARIABLES GESTION DES FILTRES NAME/TITLE ------------------------------------------------------
  // fonction qui va être appelée à chaque modification dans l'input de recherche qui retourne un tableau de resultats
  // const searchResult = (event) => {
  //   let newResults = [];
  //   for (let i = 0; i < characters.length; i++) {
  //     if (
  //       characters[i].name
  //         .toLowerCase()
  //         .indexOf(event.target.value.toLowerCase()) !== -1
  //     ) {
  //       if (newResults.length >= 100) {
  //         break;
  //         setResults(characters);
  //       } else {
  //         newResults.push(characters[i]);
  //       }
  //     }
  //   }
  //   setResults(newResults);
  // };

  useEffect(() => {
    console.log("Fetching Data");
    fetchData();
    // déclanche la requette axios a chaque maj des states dans le tableau (rafraichissement de page)
  }, [page, search2]);

  return (
    <>
      {isLoading ? (
        // <p>loading... Please Wait !</p>
        <Loader />
      ) : (
        <section className="container">
          <h1>MARVEL CHARACTERS florian</h1>
          <div className="infoPage">
            <div>Nombre de SuperHeros : {data.total}</div>
            <div>Nombre total de résultats affichés : {data.count}</div>
          </div>

          {/* TEST DES CLE DE OBJ DATA ------------------------------------------------------------*/}
          {/* <div>{characters.results[0].name}</div>
   
          {/* FILTRE SUR PAGNIATION -------------------------------------------------------------------*/}
          {/*  */}
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
          {/*  */}
          {/* 2) METHODE BALISE BOUTON*/}
          {/* faire une condition pour afficher page 1 si state est falsy */}
          <figure>
            <div>Page : {page}</div>
            {newTab.map((item, index) => {
              return (
                <button
                  key={index}
                  onClick={(event) => {
                    setPage(item);
                  }}
                >
                  {item}
                </button>
              );
            })}
          </figure>
          {/* FILTRE SUR TITRE ET NOM-------------------------------------------------------------*/}
          {/* faire une condition pour afficher tous les résultats quand barre de recherche vide*/}
          {/* A METTRE EN COMPOSANT "SEARCH" */}
          {/*  1) METHODE indexof --------------------- */}
          {/* <div>
            Rechercher sur la page :
            <input
              className="SearchBar"
              type="text"
              placeholder="Tapez recherche"
              onChange={(event) => {
                searchResult(event);
              }}
            />
          </div> */}
          <br />
          {/*  2) METHODE indexof --------------------- */}
          <div className="Search">
            <div>Recherche par titre sur toutes les pages </div>
            <div>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setSearch2(search);
                  setPage("");
                }}
              >
                <input
                  style={{ marginLeft: "10px" }}
                  type="submit"
                  value=" Rechercher"
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
                  {/* CARD CARACTERS DETAIL--------------------- */}
                  {/* -> enfant direct */}
                  <div>
                    {/* -> enfant direct nth(2) */}
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
                      <div>Description</div>
                      {/* -> enfant direct nth(3) */}
                      <div>{character.description}</div>
                      {/* <p>{character.description}</p> */}
                    </div>
                  </div>
                  {/* FIN CARD CARACTERS DETAIL--------------------- */}
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
