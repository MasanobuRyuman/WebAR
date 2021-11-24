import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import {matrix,index,subset,atan2,asin,multiply} from 'mathjs';


function WebAR() {
    const [vector, setVector] = useState([]);
    const [vectorData,setVectorData] = useState("0 0 0");
    const [rotationData,setRotationData] = useState(matrix([[1,0,0],[0,1,0],[0,0,1]]));
    let saveName = document.getElementById("saveName").value;


    console.log("セーブ名");
    console.log(saveName);

    useEffect(() => {
        getrotationVectorData();
    },[]);

    function upRotation(){
        let move = vector[0]-10.0;
        console.log(move);
        setVector([move,vector[1],vector[2]]);
        setVectorData(move+" "+vector[1]+" "+vector[2]);
        console.log("leftMove");
        console.log(move+" "+vector[1]+" "+vector[2]);
    }

    function downRotation(){
        let move = Number(vector[0])+Number(10.0);
        console.log(move);
        setVector([move,vector[1],vector[2]]);
        setVector([move,vector[1],vector[2]]);
        setVectorData(move+" "+vector[1]+" "+vector[2]);
        console.log("leftMove");
        console.log(move+" "+vector[1]+" "+vector[2]);
    }

    function leftTilt(){
        let move = vector[1]-10.0;
        console.log(vector[0]+" "+move+" "+vector[2]);
        setVector([vector[0],move,vector[2]]);
        setVectorData(vector[0]+" "+move+" "+vector[2]);
    }

    function rightTile(){
        let move = Number(vector[1])+Number(10.0);
        console.log(vector[0]+" "+move+" "+vector[2]);
        setVector([vector[0],move,vector[2]]);
        setVectorData(vector[0]+" "+move+" "+vector[2]);
    }

    function leftRotation(){
        let move = vector[2]-10;
        console.log("leftRotation");
        console.log(vector[0]+" "+vector[1]+" "+move);
        setVector([vector[0],vector[1],move]);
        setVectorData(vector[0]+" "+vector[1]+" "+move);
    }

    function rightRotation(){
        let move = Number(vector[2])+Number(10);
        console.log(vector[0]+" "+vector[1]+" "+move);
        setVector([vector[0],vector[1],move]);
        setVectorData(vector[0]+" "+vector[1]+" "+move);
    }

    function rotation(move){
        let xpMat = matrix([[1,0,0],[0,0.7,-0.7],[0,0.7,0.7]]);
        let xmMat = matrix([[1,0,0],[0,0.7,0.7],[0,-0.7,0.7]]);
        let ypMat = matrix([[0.7,0,-0.7],[0,1,0],[-0.7,0,0.7]]);
        let ymMat = matrix([[-0.7,0,0.7],[0,1,0],[0.7,0,-0.7]]);
        let zpMat = matrix([[0.7,-0.7,0],[0.7,0.7,0],[0,0,1]]);
        let zmMat = matrix([[0.7,0.7,0],[-0.7,0.7,0],[0,0,1]]);
        let mat = matrix([[1,0,0],[0,1,0],[0,0,1]]);
        if(move == "xp"){
            mat = matrix([[1,0,0],[0,0.7,-0.7],[0,0.7,0.7]]);
        }else if(move == "xm"){
            mat = matrix([[1,0,0],[0,0.7,0.7],[0,-0.7,0.7]]);
        }else if(move == "yp"){
            mat = matrix([[0.7,0,-0.7],[0,1,0],[-0.7,0,0.7]]);
        }else if(move == "ym"){
            mat = matrix([[-0.7,0,0.7],[0,1,0],[0.7,0,-0.7]]);
        }else if(move == "zp"){
            console.log("zp");
            mat = matrix([[0.7,-0.7,0],[0.7,0.7,0],[0,0,1]]);
        }else if(move == "zm"){
            mat = matrix([[0.7,0.7,0],[-0.7,0.7,0],[0,0,1]]);
        }
        console.log(mat);

        let rotMat = multiply(rotationData,mat);
        setRotationData(rotMat);

        let yaw = atan2(subset(rotMat, index(1,0)),subset(rotMat,index(0,0)));
        console.log("test");
        let pitch = asin(subset(rotMat,index(2,0)) * -1);
        let roll = atan2(subset(rotMat,index(2,1)),subset(rotMat,index(2,2)));
        yaw = Number(yaw * 180 / 3.14);
        pitch = Number(pitch * 180 / 3.14);
        roll = Number(roll * 180 / 3.14);

        console.log("roll");
        console.log(roll);
        console.log("pitch");
        console.log(pitch);
        console.log("yaw");
        console.log(yaw);
        setVector([pitch,yaw,roll]);
        setVectorData(pitch+" "+yaw+" "+roll);
    }

    const getrotationVectorData = async () => {
        const response = await axios.get(`/api/rotationVectorDataAPI`,{ params: { saveName: saveName }});
        console.log("rotationData");
        console.log(response);
        let rotationData = response.data[0];
        let li = [rotationData.rotationX,rotationData.rotationY,rotationData.rotationZ];
        console.log(li[0]);
        //setVector([rotationData.rotationX,rotationData.rotationY,rotationData.rotationZ]);
        //setVectorData(rotationData.rotationX+" "+rotationData.rotationY+" "+rotationData.rotationZ);
        setVector([0,0,0]);
        setVectorData(0+" "+0+" "+0);
    }

    return (
        <div id="a-frame">
            <a-scene embedded arjs="debugUIEnabled:false;" loaded="setHeight()">
                <a-assets>
                    <a-asset-item id="cow" src="storage/618330511d8a8.obj"></a-asset-item>
                    <a-asset-item id="mtl" src="storage/618330511d8a8.mtl"></a-asset-item>
                </a-assets>
                <a-marker preset="hiro">
                     <a-obj-model src="#cow" mtl="#mtl" scale=".5 .5 .5" rotation={vectorData}></a-obj-model>
                </a-marker>
            </a-scene>
            <a id="vecter" >座標</a>
            <input type="submit" id="arEnd" value="Submit" />
            <input type="submit" onClick={rotation} id="left" value="test"/>
            <input type="submit" onClick={() => rotation("yp")} id="left" value="下"/>
            <input type="submit" onClick={() => rotation("ym")} id="left" value="上"/>
            <input type="submit" onClick={() => rotation("zp")} id="left" value="左に傾く"/>
            <input type="submit" onClick={() => rotation("zm")} id="left" value="右に傾く"/>
            <input type="submit" onClick={() => rotation("xp")} id="left" value="左"/>
            <input type="submit" onClick={() => rotation("xm")} id="left" value="右"/>
        </div>
    );
}

export default WebAR;
if (document.getElementById('WebAR')) {

    ReactDOM.render(<WebAR />, document.getElementById('WebAR'));
}
