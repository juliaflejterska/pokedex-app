import Pokemon from "./Pokemon";

const Pokemons = ({ pokemons, msg }) => {
  if (pokemons.length === 0 && msg) {
    return <div>{msg}</div>;
  }

  return (
    <div className="pokemon-container">
      <div className="pokemon-list">
        {pokemons.map((pokemon) => (
          <Pokemon
            name={pokemon.name}
            type={pokemon.types[0].type.name}
            sprites={pokemon.sprites.other.dream_world.front_default}
            weight={pokemon.weight}
            height={pokemon.height}
            key={pokemon.id}
          ></Pokemon>
        ))}
      </div>
    </div>
  );
};

export default Pokemons;
