<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'Laravel') }}</title>
    <!-- Scripts -->
    <script src="./../js/app.js" defer></script>
    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.vgstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>

    <a href="/AR">AR</a>
    <a href="addFile">ファイルの追加</a>
    <a href="/">トップページに戻る</a>
    <input id="userName" type="hidden" value={{$users}}>
    <form method="POST" action="../AR" >
        @csrf
        <div id="mainPage"></div>
    </form>
</body>
</html>
