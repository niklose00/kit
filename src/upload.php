<?php
header('Content-Type: application/json');

$response = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['audio'])) {
        if ($_FILES['audio']['error'] === UPLOAD_ERR_OK) {
            $uploadDir = '../assets/uploads/';
            $uploadFile = $uploadDir . basename($_FILES['audio']['name']);

            if (!is_dir($uploadDir)) {
                if (!mkdir($uploadDir, 0777, true)) {
                    $response['status'] = 'error';
                    $response['message'] = 'Fehler beim Erstellen des Verzeichnisses.';
                    echo json_encode($response);
                    exit;
                }
            }

            if (move_uploaded_file($_FILES['audio']['tmp_name'], $uploadFile)) {
                $response['status'] = 'success';
                $response['message'] = 'Audio-Datei erfolgreich hochgeladen.';
                $response['filePath'] = $uploadFile;
            } else {
                $response['status'] = 'error';
                $response['message'] = 'Fehler beim Speichern der Audio-Datei.';
            }
        } else {
            $response['status'] = 'error';
            $response['message'] = 'Fehler beim Hochladen der Datei: ' . $_FILES['audio']['error'];
        }
    } else {
        $response['status'] = 'error';
        $response['message'] = 'Keine Audio-Datei hochgeladen.';
    }
} else {
    $response['status'] = 'error';
    $response['message'] = 'Ungültige Anforderung.';
}

echo json_encode($response);
?>
