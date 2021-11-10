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

    #WebAR {
        height: 80%;
    }
    #a-frame {
        height: 100%;
    }
    #vecter {
        position: fixed;
        bottom: 150px;
    }
    #arEnd {
        position: fixed;
        bottom: 150px;
    }
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
    <input type="hidden" id="saveName" value={{$saveName}}>


  </body>
</html>
