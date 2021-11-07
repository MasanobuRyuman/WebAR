import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';

function WebAR() {

    const [vector, setVector] = useState([]);
    console.log("webAR");


    return (
        <a-scene embedded arjs="debugUIEnabled:false;" loaded="setHeight()">
          <a-assets>
            <a-asset-item id="cow" src="storage/618330511d8a8.obj"></a-asset-item>
            <a-asset-item id="mtl" src="storage/618330511d8a8.mtl"></a-asset-item>
          </a-assets>
          <a-marker preset="hiro">
            <a-obj-model src="#cow" mtl="#mtl" scale=".5 .5 .5" rotation="270 0 0"></a-obj-model>
          </a-marker>
          <a-entity camera=""></a-entity>
        </a-scene>



    );
}

export default WebAR;
if (document.getElementById('WebAR')) {
    let temp = document.getElementsByClassName("a-canvas");
    console.log("temp");
    console.log(temp);
    temp[0].style.color = "white";
    ReactDOM.render(<WebAR />, document.getElementById('WebAR'));
}
