import { useState } from "react";
import { motion } from "framer-motion";

const Pokemon = ({ name, type, sprites, weight, height }) => {
  const [showMore, setShowMore] = useState(false);

  const onShowMore = () => {
    setShowMore(!showMore);
  };

  const formatedPokemon = {
    name: name,
    type: type,
    sprites: sprites,
    weight: weight,
    height: height,
  };

  return (
    <motion.div
      className="card"
      onClick={onShowMore}
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      transition={{
        duration: 0.1,
      }}
    >
      <div className="img-container">
        <img className="img" src={formatedPokemon.sprites} alt="pokemon"></img>
      </div>
      <div className="content">
        <h1>{formatedPokemon.name.toUpperCase()}</h1>

        <div className="content-categories">
          type: {formatedPokemon.type}
          {showMore && (
            <>
              <div>weight: {formatedPokemon.weight}</div>
              <div>height: {formatedPokemon.height}</div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Pokemon;
