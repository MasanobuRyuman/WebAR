import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';

function WebAR() {
    const [vector, setVector] = useState([]);
    let saveName = document.getElementById("saveName").value;
    console.log("セーブ名");
    console.log(saveName);

    useEffect(() => {
        getrotationVectorData();
    },[]);
    const getrotationVectorData = async () => {
        const response = await axios.get(`/api/rotationVectorDataAPI`,{ params: { saveName: saveName }});
        console.log("rotationData");
        console.log(response.data[0].rotationX);
        let rotationData = response.data[0];
        let li = [rotationData.rotationX,rotationData.rotationY,rotationData.rotationZ];
        console.log(li[0]);
        setVector([rotationData.rotationX,rotationData.rotationY,rotationData.rotationZ]);
    }

    return (
        <div id="a-frame">
            <a-scene embedded arjs="debugUIEnabled:false;" loaded="setHeight()">
                <a-assets>
                    <a-asset-item id="cow" src="storage/618330511d8a8.obj"></a-asset-item>
                    <a-asset-item id="mtl" src="storage/618330511d8a8.mtl"></a-asset-item>
                </a-assets>
                <a-marker preset="hiro">
                     <a-obj-model src="#cow" mtl="#mtl" scale=".5 .5 .5" rotation="0 0 0"></a-obj-model>
                </a-marker>

            </a-scene>
            <a id="vecter" >座標</a>
            <input type="submit" id="arEnd" value="Submit" />

        </div>
    );
}

export default WebAR;
if (document.getElementById('WebAR')) {

    ReactDOM.render(<WebAR />, document.getElementById('WebAR'));
}
