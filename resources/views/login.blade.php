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
    <form action="{{ url('signUp') }}" method="post"  enctype="multipart/form-data">
        @csrf
        <p>名前</p>
        <input name="name">
        <p>パスワード</p>
        <input name="password">
        <input type="submit" name="login" value="ログイン">
        <input type="submit" name="newLogin" value="新規登録">
    </form>
    <div id="app"></div>
</body>
</html>
