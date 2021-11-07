<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>CG モデルを登場させる</title>
    <script src="./../js/app.js" defer></script>

    <script src="https://aframe.io/releases/0.6.1/aframe.min.js"></script>

    <script src="https://jeromeetienne.github.io/AR.js/aframe/build/aframe-ar.js"></script>
    <style>
    a-scene { display: block; width: 80%; height: 80%;}
    .a-canvas {display: block; width: 80%; height: 80%;}
    </style>
  </head>
  <body style="margin:0px; overflow:hidden;">
    <script>
    function setHeight(){
        document.getElementsByClassName("a-canvas")[0].style.height="80%";
        console.log("高さ変更");
    }
    </script>

    <div id="WebAR"></div>
    <div style="position: fixed; bottom: 150px;">
        <input type="button" id="b1" value="change" onclick="click1">
    </div>

  </body>
</html>
