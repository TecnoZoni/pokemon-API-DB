import React from "react";
import { Link } from "react-router-dom"
import style from "./Landing.module.css"

const Landing = () => {
    return (
        <div className={style.container}>
            <dir>
                <Link to="/home" className={style.LandingLink}>
                    <p>Presiona Start</p>
                </Link>
            </dir>
        </div>
    )
}

export default Landing;