const { Router } = require('express');

const { createPokemonHandler, getIdPokemonHandler, getPokemonsHandler } = require("../handlers/pokemonHandlers")

const pokemonRouter = Router();


pokemonRouter.get("/", getPokemonsHandler);

pokemonRouter.get("/:idPokemon", getIdPokemonHandler)



pokemonRouter.post("/", createPokemonHandler)




module.exports = pokemonRouter