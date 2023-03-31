import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, filterCreated, orderByName, orderByAttack, getTypesFiltered, getTypes, getPokesFilteredTypes } from "../redux/actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import style from "./Home.module.css"


const Home = () => {

    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons);
    const types = useSelector((state) => state.types)
    console.log(types);
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage, setpokemonsPerPage] = useState(12);
    const [orden, setOrden] = useState('');
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);


    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    useEffect(() => {
        dispatch(getPokemons())
        dispatch(getTypes())
    }, [dispatch]);

    const handleRefresh = (e) => {
        e.preventDefault();
        dispatch(getPokemons());
    }

    const handleFilterCreated = (e) => {
        dispatch(filterCreated(e.target.value))
        setCurrentPage(1);
    }

    const handleOrderName = (e) => {
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    };

    const handleOrderAttack = (e) => {
        e.preventDefault();
        dispatch(orderByAttack(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    };

    const getTypesFiltered = (event) => {
        dispatch(getPokesFilteredTypes(event.target.value))
    }


    return (
        // Render de la navegacion
        <div>
            {/* Renderizado de filtros, ordenamiento, creacion y refresco de los datos */}
            <div className={style.navContainer}>
                <nav>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png" alt="Pokemon Logo no funciona" />

                    <div className={style.searchButtons}>
                        <SearchBar />
                        <Link to="/creator">
                            <button className={style.button}>
                                <span>
                                    Crear Pokemon
                                </span>
                            </button>
                        </Link>
                        <button onClick={(e) => { handleRefresh(e) }} className={style.button}>
                            <span>
                                Volver a cargar los pokemons
                            </span>
                        </button>
                    </div>


                    {/* Filtros y ordenado */}
                    <div className={style.buttonNav}>

                        <label>Ordenar alfabeticamente</label>
                        <select onChange={(e) => { handleOrderName(e) }}>
                            <option value="asc"> ASCENDENTE </option>
                            <option value="desc"> DESCENDENTE </option>
                        </select>

                        <label>Ordenar por daño</label>
                        <select onChange={(e) => { handleOrderAttack(e) }}>
                            <option value="asc"> ASCENDENTE </option>
                            <option value="desc"> DESCENDENTE </option>
                        </select>

                        <label>Filtrar por procedencia de datos</label>
                        <select onChange={(e) => { handleFilterCreated(e) }}>
                            <option value="all"> TODOS </option>
                            <option value="api"> API </option>
                            <option value="created"> CREADOS </option>
                        </select>

                        {/* Filtrado por tipos */}
                        <label>Filtrar por tipos</label>
                        <select onChange={getTypesFiltered}>
                            <option select disabled selected={true}>TIPOS</option>
                            {
                                types.map(types => {
                                    return <option key={types.name} value={types.name}>{types.name.toUpperCase()}</option>
                                })
                            }
                        </select>
                    </div>
                </nav>
            </div>
            {/* Render del paginado */}
            <Paginado
                pokemonsPerPage={pokemonsPerPage}
                allPokemons={allPokemons.length}
                paginado={paginado} />
            {/* renderizado de las cards */}
            <div className={style.containerCards}>
                {
                    currentPokemons.map((el) => {
                        return (
                            <div>
                                <Link to={"/home/" + el.id} className={style.link}>
                                    <Card name={el.name} imagen={el.imagen} types={el.types + "\n"} key={el.id} />
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )

}

export default Home;
