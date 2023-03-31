const { Pokemon, Type } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");
const { cleanArray2 } = require("../helper/cleanArrayDBPokemnos");


const createPokemon = async (
    name,
    imagen,
    vida,
    ataque,
    defensa,
    velocidad,
    altura,
    peso,
    types,
) => {
    const newPokemon = await Pokemon.create({
        name,
        imagen,
        vida,
        ataque,
        defensa,
        velocidad,
        altura,
        peso,
        types,
    });
    const typeDb = await Type.findAll({
        where: {
            name: types,
        },
    });
    newPokemon.addType(typeDb);
    tipo = typeDb.map(elem => elem.name)
    return { ...newPokemon.dataValues, types: tipo };
};

const getDataBase = async () => {
    return await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ["name"],
            through: {
                attributes: [],
            },
        }
    });
};

const getAllPokemon = async () => {
    const pokemonsAll = [];
    const url = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=251");
    const pokeData = url.data.results.map((p) => axios.get(p.url));

    const allPokes = pokeData;

    const results = await axios.all(allPokes).then((poke) => {
        poke.map((p) => {
            pokemonsAll.push({
                id: p.data.id,
                name: p.data.name,
                imagen: p.data.sprites.other.dream_world.front_default,
                vida: p.data.stats[0].base_stat,
                ataque: p.data.stats[1].base_stat,
                defensa: p.data.stats[2].base_stat,
                velocidad: p.data.stats[5].base_stat,
                altura: p.data.height,
                peso: p.data.height,
                types: p.data.types.map((pt) => pt.type.name),
                created: false,
            });
        });
        return pokemonsAll;
    });
    return results;
};

const getPokemonsDbApi = async () => {
    const api = await getAllPokemon();
    const db = await getDataBase();

    limpios = db.map(elem => cleanArray2(elem))
    const allpokemon = [...api, ...limpios]
    return allpokemon;
};

const searchPokemonByName = async (name) => {
    const lower = name.toLowerCase();
    const dbase = await Pokemon.findAll({
        where: { name: { [Op.iLike]: `%${name}%` } },
    });
    const api = await getAllPokemon();
    const filteredApi = api.filter((pokemon) => pokemon.name === lower);
    if (filteredApi.length === 0 && dbase.length === 0) {
        return "No se Encontro el pokemon";
    }
    return [...dbase, ...filteredApi];
};

const getPokemonId = async (idPokemon, source) => {
    const pokemon = source === "api"
        ? await pokemonIdApi(idPokemon)
        : await Pokemon.findByPk(idPokemon, {
            include: {
                model: Type,
            },
        });

    return pokemon;
};

const pokemonIdApi = async (idPokemon) => {
    const resPoke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);
    const poke = resPoke;
    const getId = {
        id: poke.data.id,
        name: poke.data.name,
        imagen: poke.data.sprites.other.dream_world.front_default,
        vida: poke.data.stats[0].base_stat,
        ataque: poke.data.stats[1].base_stat,
        defensa: poke.data.stats[2].base_stat,
        velocidad: poke.data.stats[5].base_stat,
        altura: poke.data.height,
        peso: poke.data.height,
        types: poke.data.types.map((e) => e.type.name),
    };
    return getId;
}

module.exports = { createPokemon, getPokemonId, getAllPokemon, searchPokemonByName, pokemonIdApi, getPokemonsDbApi };