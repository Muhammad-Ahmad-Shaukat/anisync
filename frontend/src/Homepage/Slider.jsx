import React from "react";
import "./Slider.css";

const Slider = () => {
    return(<>
        <div className="banner"> 
            <div className="slider" style={{ "--quantity": 10 }}>
                <div className="item" style = { {"--position": 1}}><img src='./src/images/bg1.webp' alt="#" /></div>
                <div className="item" style = { {"--position": 2}}><img src='./src/images/bg1.webp' alt="#" /></div>
                <div className="item" style = { {"--position": 3}}><img src='./src/images/bg1.webp' alt="#" /></div>
                <div className="item" style = { {"--position": 4}}><img src='./src/images/bg1.webp' alt="#" /></div>
                <div className="item" style = { {"--position": 5}}><img src='./src/images/bg1.webp' alt="#" /></div>
                <div className="item" style = { {"--position": 6}}><img src='./src/images/bg1.webp' alt="#" /></div>
                <div className="item" style = { {"--position": 7}}><img src='./src/images/bg1.webp' alt="#" /></div>
                <div className="item" style = { {"--position": 8}}><img src='./src/images/bg1.webp' alt="#" /></div>
                <div className="item" style = { {"--position": 9}}><img src='./src/images/bg1.webp' alt="#" /></div>
                <div className="item" style = { {"--position": 10}}><img src='./src/images/bg1.webp' alt="#" /></div>
            </div>
        </div>
    </>)
};

export default Slider;