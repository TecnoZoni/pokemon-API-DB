import React from "react";
import style from "./Card.module.css"

const Card = ({ name, imagen, types, id }) => {
    return (
        <React.Fragment>
            <div className={style.container}>
                <div className={style.card}>

                    <div className={style.containerImage}>
                        <img src={imagen} alt="La imagen no fue encontrada" />
                    </div>

                    <div className={style.containerInfo}>
                        <h3>{name}</h3>
                        <span>{types}</span>
                    </div>

                </div>
            </div>
        </React.Fragment>

    )
}

export default Card;