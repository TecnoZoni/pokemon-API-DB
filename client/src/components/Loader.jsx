import React from "react";
import style from "./Loader.module.css"

const Loader = () => {
    return (
        <div className={style.container}>
            <img src="https://hohoushome.com/images/png/hooh_flyGS.gif" alt="loading" />
        </div >
    )
}

export default Loader;