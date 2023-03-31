import React from "react";
import style from "./Paginado.module.css"

const Paginado = ({ pokemonsPerPage, allPokemons, paginado }) => {
    const pageNumber = []

    for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
        pageNumber.push(i)
    }
    return (
        <nav className={style.navContainer}>
            {pageNumber && pageNumber.map(number => (
                <li key={number}>
                    <button onClick={() => paginado(number)}>{number}</button>
                </li>
            ))}
        </nav>
    )
}

export default Paginado;