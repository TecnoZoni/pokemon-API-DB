import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../redux/actions";
import { useEffect } from "react";
import style from "./Detail.module.css"

const Detail = (props) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
    }, [dispatch])

    const myPokemon = useSelector((state) => state.detail)

    return (
        <div>
            <Link to="/home">
                <button className={style.button}>
                    <span>
                        VOLVER
                    </span>
                </button>
            </Link>

            <div className={style.container}>
                <div className={style.detail}>

                    <div className={style.ImageDetail}>
                        <img src={myPokemon.imagen} />
                    </div>

                    <div className={style.containerInfo}>
                        <h3>Datos: </h3>
                        <p>Nombre: {myPokemon.name}</p>
                        <p>ID: {myPokemon.id}</p>
                        <p>VIDA: {myPokemon.vida}</p>
                        <p>ATAQUE: {myPokemon.ataque}</p>
                        <p>DEFENSA: {myPokemon.defensa}</p>
                        <p>VELOCIDAD: {myPokemon.velocidad}</p>
                        <p>ALTURA: {myPokemon.altura}</p>
                        <p>PESO: {myPokemon.peso}</p>
                        <p>TIPOS: {myPokemon.types + "\n"}</p>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Detail;