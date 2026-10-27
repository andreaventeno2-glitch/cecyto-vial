<?php

$servidor = "127.0.0.1";
$usuario = "root";
$contrasena = "";
$base_datos = "cecytovial";

mysqli_report(MYSQLI_REPORT_OFF);

$conexion = new mysqli(
    $servidor,
    $usuario,
    $contrasena,
    $base_datos
);

if ($conexion->connect_error) {
    http_response_code(500);
    exit("Error de conexión con la base de datos: " .
        $conexion->connect_error);
}

$conexion->set_charset("utf8mb4");
?>