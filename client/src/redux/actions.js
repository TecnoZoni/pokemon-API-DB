import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";
export const FILTER_CREATED = "FILTER_BY_ORIGIN";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_ATTACK = "ORDER_BY_ATTACK";
export const SEARCH_BY_NAME = "SEARCH_BY_NAME";
export const GET_TYPES = "GET_TYPES";
export const POST_POKEMONS = "POST_POKEMONS";
export const GET_DETAIL = "GET_DETAIL";
export const GET_POKES_FILTERED_TYPES = "GET_POKES_FILTERED_TYPES";

// Hasta aca andaba todo bien

export const getPokemons = () => {
    return async function (dispatch) {
        const json = await axios.get("http://localhost:3001/pokemon/");
        return dispatch({
            type: GET_POKEMONS,
            payload: json.data,
        });
    };
};

export const filterCreated = (payload) => {
    return {
        type: FILTER_CREATED,
        payload,
    }
};

export const orderByName = (payload) => {
    return {
        type: ORDER_BY_NAME,
        payload,
    }
}

export const orderByAttack = (payload) => {
    return {
        type: ORDER_BY_ATTACK,
        payload,
    }
}

export const getPokemonsByName = (payload) => {
    return async function (dispatch) {
        try {
            const json = await axios.get("http://localhost:3001/pokemon?name=" + payload);
            return dispatch({
                type: SEARCH_BY_NAME,
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const getTypes = () => {
    return async function (dispatch) {
        try {
            const json = await axios.get("http://localhost:3001/types");
            return dispatch({
                type: GET_TYPES,
                payload: json.data
            })
            
        } catch (error) {
            console.log(error);
        }
    }
}

export const postPokemons = (payload) => {
    return async function (dispatch) {
        try {
            const json = await axios.post("http://localhost:3001/pokemon/", payload);
            return dispatch({
                type: POST_POKEMONS,
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const getDetail = (id) => {
    return async function (dispatch) {
        try {
            const json = await axios.get("http://localhost:3001/pokemon/" + id);
            return dispatch({
                type: GET_DETAIL,
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

// Hasta aca andaba todo bien
export const getPokesFilteredTypes = (types) => {
    return { type: GET_POKES_FILTERED_TYPES, payload: types }
}