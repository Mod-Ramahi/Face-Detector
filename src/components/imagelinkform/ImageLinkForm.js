import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({handleInputUrl, onButtonClick}) => {
    return(
        <div style={{display:"flex", flexDirection:"column", alignItems: "center"}}>
            <p className="p" style={{fontSize:"19px",fontWeight:"bold", textAlign:"center"}}>Upload your image url and this app will detect the faces in your picture</p>
            <h4>UPLOAD & CLICK ON TRY ME !!!</h4>
            <div className="imagelinkform">
                <input type="text" placeholder="your image url here..." className="urlinput" onChange={handleInputUrl}/>
                <button className="detectbtn" onClick={onButtonClick}>Try Me...</button>
            </div>
        </div>
    )
}

export default ImageLinkForm;