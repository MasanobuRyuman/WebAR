<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>CG モデルを登場させる</title>
  </head>
  <body style="margin:0px; overflow:hidden;">
    <!-- A-Frame ライブラリの読み込み -->
    <script src="https://aframe.io/releases/0.6.1/aframe.min.js"></script>
    <!-- AR.js ライブラリの読み込み -->
    <script src="https://jeromeetienne.github.io/AR.js/aframe/build/aframe-ar.js"></script>

    <!-- A-Frame の VR空間に AR.js を紐づける（デバッグUIを非表示） -->
    <a-scene embedded arjs="debugUIEnabled:false;">

      <!-- OBJ形式のCGモデルの読み込み -->
      <a-assets>
        <a-asset-item id="cow" src="{{asset('monkey.obj')}}"></a-asset-item>
        <a-asset-item id="mtl" src="{{asset('monkey.mtl')}}"></a-asset-item>
      </a-assets>

      <!-- マーカーを登録（プリセットされている「hiro」マーカー） -->
      <a-marker preset="hiro">
        <!-- マーカーの場所に箱を置く（見やすいようにワイヤーフレーム表示） -->
        <a-obj-model src="#cow" mtl="#mtl" scale=".5 .5 .5" rotation="270 0 0"></a-obj-model>
      </a-marker>

      <!-- マーカーを登録（プリセットされている「kanji」マーカー） -->

      <!-- AR用のカメラを置く -->
      <a-entity camera></a-entity>
    </a-scene>
  </body>
</html>
