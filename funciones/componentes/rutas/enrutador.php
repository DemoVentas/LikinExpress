<?php
    $uri = parse_url($_SERVER['REQUEST_URI'])['path'];

    $rutas = [
        '/' => 'app/controladores/indice.php',
    ];

    function rutaControlador($uri, $rutas){
        if(array_key_exists($uri, $rutas)){
            require rutaBase($rutas[$uri]);
        }else{
            abortar();
        }
    }

    function abortar($codigo = 404){
        http_response_code($codigo);

        require "{$codigo}.php";

        die();
    }

    rutaControlador($uri, $rutas);
?>