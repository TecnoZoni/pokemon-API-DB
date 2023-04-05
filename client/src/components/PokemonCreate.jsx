import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postPokemons, getTypes } from "../redux/actions"
import { useDispatch, useSelector } from "react-redux";
import style from "./PokemonCreate.module.css"

const PokemonCreate = () => {
    const dispatch = useDispatch();
    const types = useSelector((state) => state.types)
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: "",
        imagen: "",
        vida: "",
        ataque: "",
        defensa: "",
        velocidad: "",
        altura: "",
        peso: "",
        types: []
    })


    let noEmpty = /\S+/;
    let validateName = /^[a-z]+$/i;
    let validateNum = /^\d+$/;
    let validateUrl = /^(ftp|http|https):\/\/[^ "]+$/;

    const validate = (input) => {
        let errors = {};
        if (
            !noEmpty.test(input.name) ||
            !validateName.test(input.name) ||
            input.name.length < 3
        ) {
            errors.name =
                "Nombre requerido. Solo se permiten cadenas de más de dos caracteres y sin números.";
        }
        if (!validateNum.test(input.vida) || parseInt(input.vida) < 1) {
            errors.vida = "Número requerido. Mayor a uno.";
        }
        if (!validateNum.test(input.ataque) || parseInt(input.ataque) < 1) {
            errors.ataque = "Número requerido. Mayor a uno.";
        }
        if (!validateNum.test(input.defensa) || parseInt(input.defensa) < 1) {
            errors.defensa = "Número requerido. Mayor a uno.";
        }
        if (!validateNum.test(input.velocidad) || parseInt(input.velocidad) < 1) {
            errors.velocidad = "Número requerido. Mayor a uno.";
        }
        if (!validateNum.test(input.altura) || parseInt(input.altura) < 1) {
            errors.altura = "Número requerido. Mayor a uno.";
        }
        if (!validateNum.test(input.peso) || parseInt(input.peso) < 1) {
            errors.peso = "Número requerido. Mayor a uno.";
        }
        if (!validateUrl.test(input.imagen)) {
            errors.imagen = "URL requerida";
        }

        return errors;
    };


    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(
            validate({
                ...input,
                [e.target.name]: e.target.value,
            })
        );
    }

    const handleSelect = (e) => {
        setInput({
            ...input,
            types: [...input.types, e.target.value]
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(input)
        dispatch(postPokemons(input))
        alert("Pokemons creado!!")
        setInput({
            name: "",
            imagen: "",
            vida: "",
            ataque: "",
            defensa: "",
            velocidad: "",
            altura: "",
            peso: "",
            types: []
        })
        history.push("/home")
    }

    const handleDelete = (el) => {
        setInput({
            ...input,
            types: input.types.filter((occ) => occ !== el)
        })
    }

    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch])

    return (
        <div className={style.bodyContainer}>
            <Link to="/home">
                <button className={style.button}>
                    <span>
                        Volver
                    </span>
                </button>
            </Link>

            <h1 className={style.title}>Crea tu pokemon</h1>

            <form onSubmit={(e) => { handleSubmit(e) }}>
                <div className={style.formContainer}>

                    <label>Nombre: </label>
                    <input type="text" value={input.name} name="name" onChange={(e) => { handleChange(e) }} />
                    <p >{errors.name}</p>

                    <label>Vida: </label>
                    <input type="number" value={input.vida} name="vida" onChange={(e) => { handleChange(e) }} />
                    <p >{errors.vida}</p>

                    <label>ataque: </label>
                    <input type="number" value={input.ataque} name="ataque" onChange={(e) => { handleChange(e) }} />
                    <p >{errors.ataque}</p>

                    <label>defensa: </label>
                    <input type="number" value={input.defensa} name="defensa" onChange={(e) => { handleChange(e) }} />
                    <p >{errors.defensa}</p>

                    <label>velocidad: </label>
                    <input type="number" value={input.velocidad} name="velocidad" onChange={(e) => { handleChange(e) }} />
                    <p >{errors.velocidad}</p>

                    <label>altura: </label>
                    <input type="number" value={input.altura} name="altura" onChange={(e) => { handleChange(e) }} />
                    <p >{errors.altura}</p>


                    <label>peso: </label>
                    <input type="number" value={input.peso} name="peso" onChange={(e) => { handleChange(e) }} />
                    <p >{errors.peso}</p>

                    <label>imagen: </label>
                    <input type="text" value={input.imagen} name="imagen" onChange={(e) => { handleChange(e) }} />
                    <p >{errors.imagen}</p>

                    <label>tipo: </label>
                    <select onChange={(e) => { handleSelect(e) }}>
                        {types.map((type) => {
                            return (
                                <option key={type.id} value={type.name}>{type.name}</option>
                            )
                        })}
                    </select>
                    {input.types.map((e) => {
                        return (
                            <div key={e}>
                                <p>{e}</p>
                                <button onClick={() => { handleDelete(e) }}>
                                    X
                                </button>
                            </div>
                        );
                    })}

                    <button type="submit" className={style.button2}>
                        <span>
                            Crear Personaje
                        </span>
                    </button>


                </div>
            </form>
        </div>
    )
}

export default PokemonCreate;