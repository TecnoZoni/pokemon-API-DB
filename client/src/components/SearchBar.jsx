import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonsByName } from "../redux/actions";
import style from "./SearchBar.module.css"

const SearchBar = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    const handleInputChange = (e) => {
        e.preventDefault();
        setName(e.target.value)
    }

    const handleInputSubmit = (e) => {
        e.preventDefault();
        dispatch(getPokemonsByName(name));
        setName("");
    }

    return (
        <div>
            <input
                onChange={(e) => { handleInputChange(e) }}
                placeholder="Busca por nombre...🔎"
                required=""
                className={style.input}
                name="text"
                type="text"
            />
            <button type="submit" onClick={(e) => { handleInputSubmit(e) }} className={style.button}>
                <span>
                    BUSCAR
                </span>
            </button>
        </div>
    )
}

export default SearchBar;