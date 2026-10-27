<?php

header('Content-Type: application/json; charset=utf-8');

require __DIR__ . '/conexion.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);

    echo json_encode([
        'ok' => false,
        'mensaje' => 'Método no permitido.'
    ]);

    exit;
}

$entrada = json_decode(
    file_get_contents('php://input'),
    true
);

if (!is_array($entrada)) {
    http_response_code(400);

    echo json_encode([
        'ok' => false,
        'mensaje' => 'Los datos enviados no son válidos.'
    ]);

    exit;
}

$nombre = trim($entrada['nombre'] ?? 'Participante');
$puntaje = filter_var(
    $entrada['puntaje'] ?? null,
    FILTER_VALIDATE_INT
);

$total = filter_var(
    $entrada['total'] ?? null,
    FILTER_VALIDATE_INT
);

$porcentaje = filter_var(
    $entrada['porcentaje'] ?? null,
    FILTER_VALIDATE_FLOAT
);

if (
    $nombre === '' ||
    $puntaje === false ||
    $total === false ||
    $porcentaje === false ||
    $puntaje < 0 ||
    $total < 1 ||
    $puntaje > $total ||
    $porcentaje < 0 ||
    $porcentaje > 100
) {
    http_response_code(422);

    echo json_encode([
        'ok' => false,
        'mensaje' => 'Revisa los datos del resultado.'
    ]);

    exit;
}

$stmt = $conexion->prepare(
    'INSERT INTO resultados
    (nombre_participante, puntaje, total_preguntas, porcentaje)
    VALUES (?, ?, ?, ?)'
);

if (!$stmt) {
    http_response_code(500);

    echo json_encode([
        'ok' => false,
        'mensaje' => 'No se pudo preparar el registro.'
    ]);

    exit;
}

$stmt->bind_param(
    'siid',
    $nombre,
    $puntaje,
    $total,
    $porcentaje
);

if ($stmt->execute()) {
    echo json_encode([
        'ok' => true,
        'mensaje' => '¡Resultado guardado en MySQL correctamente!'
    ]);
} else {
    http_response_code(500);

    echo json_encode([
        'ok' => false,
        'mensaje' => 'No se pudo guardar el resultado.'
    ]);
}

$stmt->close();
$conexion->close();

?>