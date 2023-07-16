import React from "react";
import "./Rank.css";

const Rank = ({userName, entries}) => {
    return(
        <div className="rank">
            <span className="text">{userName}, your current rank is: </span>
            <p className="ranknumber">#{entries}</p>
        </div>
    )
}

export default Rank;