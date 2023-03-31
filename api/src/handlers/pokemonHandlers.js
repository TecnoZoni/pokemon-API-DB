const { createPokemon, getPokemonId, searchPokemonByName, getPokemonsDbApi } = require("../controllers/pokemonController");

const getPokemonsHandler = async (req, res) => {
    //lamara a la funcion que obtiene los datos de la API y la BDD
    //unir los datos unificando el formato de las dos y responderlos
    const { name } = req.query;
    try {
        const results = name ? await searchPokemonByName(name) : await getPokemonsDbApi();
        res.status(200).json(results);
    } catch (error) {
        res.status(400).json({ error: error.masage });
    }
}

const getIdPokemonHandler = async (req, res) => {
    const { idPokemon } = req.params;
    const source = isNaN(idPokemon) ? "bdd" : "api";
    try {
        const pokemon = await getPokemonId(idPokemon, source);
        res.status(200).json(pokemon)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

const createPokemonHandler = async (req, res) => {
    try {
        const { name, imagen, vida, ataque, defensa, velocidad, altura, peso, types } = req.body;

        const newPokemon = await createPokemon(
            name,
            imagen,
            vida,
            ataque,
            defensa,
            velocidad,
            altura,
            peso,
            types,
        );
        res.status(201).json(newPokemon);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = {
    getIdPokemonHandler, getPokemonsHandler, createPokemonHandler,
}