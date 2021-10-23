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
    <a href="/AR">AR</a>
    <a href="addFile">ファイルの追加</a>
    <a href="/">トップページに戻る</a>
    <h1>一覧表示（普通）</h1>
    <ul>
        @foreach($users as $user)
        <li>
            <p>{{$user->name}}</p>
            <p>{{$user->contentName}}</p>
        </li>
        @endforeach
    </ul>
    {{$users->links()}}
  </body>
</html>
