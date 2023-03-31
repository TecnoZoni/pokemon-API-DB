import { FILTER_CREATED, GET_POKEMONS, ORDER_BY_NAME, ORDER_BY_ATTACK, SEARCH_BY_NAME, POST_POKEMONS, GET_TYPES, GET_DETAIL, GET_POKES_FILTERED_TYPES } from "./actions";

const initialState = {
    pokemons: [],
    types: [],
    detail: [],
    allPokemonsFilter: [],
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
                allPokemonsFilter: action.payload
            }

        case FILTER_CREATED:
            if (action.payload === 'api') {
                return {
                    ...state,
                    pokemons: [...state.allPokemonsFilter.filter(poke => !isNaN(poke.id))]
                }
            } else if (action.payload === 'created') {
                return {
                    ...state,
                    pokemons: [...state.allPokemonsFilter.filter(poke => isNaN(poke.id))]
                }
            }
            else {
                return {
                    ...state,
                    pokemons: state.allPokemonsFilter.map(g => g)
                }
            }

        case ORDER_BY_NAME:
            let orderName = action.payload === "asc"
                ? state.pokemons.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0;
                })
                : state.pokemons.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                pokemons: orderName
            }

        case ORDER_BY_ATTACK:
            let orderAttack = action.payload === "asc"
                ? state.pokemons.sort(function (a, b) {
                    if (a.ataque > b.ataque) {
                        return -1;
                    }
                    if (b.ataque > a.ataque) {
                        return 1;
                    }
                    return 0;
                })
                : state.pokemons.sort(function (a, b) {
                    if (a.ataque > b.ataque) {
                        return 1;
                    }
                    if (b.ataque > a.ataque) {
                        return -1;
                    }
                    return 0;
                })
            return {
                ...state,
                pokemons: orderAttack
            }

        case SEARCH_BY_NAME:
            return {
                ...state,
                pokemons: action.payload
            }
        case GET_TYPES:
            return {
                ...state,
                types: action.payload
            }

        case POST_POKEMONS:
            return {
                ...state
            }

        case GET_DETAIL:
            return {
                ...state,
                detail: action.payload
            }
        // Hasta aca andaba todo bien
        case GET_POKES_FILTERED_TYPES:
            return {
                ...state,
                pokemons: [...state.allPokemonsFilter.filter(poke => poke.types.includes(action.payload))]
            }

        default:
            return { ...state }
    }

}

export default rootReducer;