
const cleanArray2 = (pokemon) => {
    return {
        id: pokemon.id,
        name: pokemon.name,
        imagen: pokemon.imagen,
        vida: pokemon.vida,
        ataque: pokemon.ataque,
        defensa: pokemon.defensa,
        velocidad: pokemon.velocidad,
        altura: pokemon.altura,
        peso: pokemon.pokemon,
        types: pokemon.types.map((type) => type.name),
        created: pokemon.created,
    }
}
module.exports={cleanArray2}