import { useContext, useState, useEffect } from "react";
import "./App.css";
import FilterByName from "./components/FilterByName";
import FilterByType from "./components/FilterByType";
import Pokemons from "./components/Pokemons";
import { ThemeContext } from "./contexts/theme-context";
import { MdOutlineDarkMode } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";

function App() {
  const [{ theme, isDarkTheme }, toggleTheme] = useContext(ThemeContext);

  const [pokemons, setPokemons] = useState([]);
  const [next, setNext] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );

  const [isError, setIsError] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const fetchPokemons = async () => {
    setIsError(false);
    try {
      const res = await fetch(next);

      if (!res.ok) {
        window.alert(
          `Something went wrong and pokemon cannot be load. Please try refreshing the page.`
        );
        setIsError(true);
      }

      const data = await res.json();

      setNext(data.next);

      const fetchPokemonInfo = (pokemons) => {
        pokemons.forEach(async (pokemon) => {
          const res = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
          );

          const data = await res.json();

          setPokemons((prevPokemons) => [...prevPokemons, data]);
        });
      };

      fetchPokemonInfo(data.results);
    } catch (err) {
      setIsError(true);
      setErrMsg("Pokemon cannot be load");
      console.error(errMsg);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  const loadNext = () => {
    setIsFilterName(false);
    fetchPokemons();
  };

  const [isFilterName, setIsFilterName] = useState(false);

  const showFilteredByName = () => {
    setIsFilterType(false);
    setIsFilterName(!isFilterName);
  };

  const [isFilterType, setIsFilterType] = useState(false);

  const showFilteredByType = () => {
    window.scrollTo(0, 0);
    setIsFilterName(false);
    setIsFilterType(!isFilterType);
  };

  const goHome = () => {
    setIsFilterName(false);
    setIsFilterType(false);
  };

  return (
    <>
      <nav
        style={{ backgroundColor: theme.backgroundColor, color: theme.color }}
      >
        <li>
          <MdOutlineDarkMode
            size={30}
            style={{ cursor: "pointer" }}
            onClick={toggleTheme}
          />

          <AiOutlineHome
            size={30}
            style={{ cursor: "pointer" }}
            onClick={goHome}
          />
        </li>

        <li>
          <button onClick={loadNext}>LOAD MORE</button>
        </li>
        <li>
          <button onClick={showFilteredByType}>FILTER BY TYPE</button>
        </li>
        <li>
          <button onClick={showFilteredByName}>SEARCH BY NAME</button>
        </li>
      </nav>

      <div
        className="app"
        style={{ backgroundColor: theme.backgroundColor, color: theme.color }}
      >
        {isFilterName && <FilterByName />}

        <FilterByType
          isFilterName={isFilterName}
          isFilterType={isFilterType}
          pokemons={pokemons}
        />

        {!isFilterName && !isFilterType && <Pokemons pokemons={pokemons} />}
      </div>
    </>
  );
}

export default App;
