<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'Laravel') }}</title>
    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>
    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
    <form action="{{ url('upload') }}" method="post"  enctype="multipart/form-data">
        @csrf

        <input type="file" name="obj" value="オブジェクトファイルを選択してください。">
        <input type="file" name="mtl" value="マテリアルファイルを選択してください。">
        <p>作品名を入力してください</p>
        <input name="contentName">
        <input type="radio" id="public" name="releaseSetting" name="public" value="public">
        <label for="public">public</label>
        <input type="radio" id="private" name="releaseSetting" name="private" value="private">
        <label for="private">private</label>
        <input type="submit">
    </form>
</body>
</html>
