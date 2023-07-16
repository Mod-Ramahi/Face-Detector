import React from "react";
import './ImgBox.css'

const ImgBox = ({Image, box}) => {
    return(
        <div className="boximage">
            <img id="imagebox" alt="" src={Image}/>
            <div className="bounding_box" style={{top: box.topRow, right: box.rightCol, left: box.leftCol, bottom: box.bottomRow }}></div>
        </div>
    )
}

export default ImgBox;