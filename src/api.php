<?php
require_once __DIR__ . '/../../../../vendor/autoload.php';

use Orhanerday\OpenAi\OpenAi;

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

function getOpenAiAnswer($prompt = "")
{
    $openAiKey = getenv('OPENAI_API_KEY');  // Sicherer, den API-Key als Umgebungsvariable zu verwenden
    $openAi = new OpenAI($openAiKey);

    $complete = $openAi->completion([
        'model' => 'gpt-3.5-turbo-instruct',
        'prompt' => $prompt,
        'temperature' => 0.1,
        'max_tokens' => 1500,
        'frequency_penalty' => 0,
        'presence_penalty' => 0.6,
    ]);


    return json_encode($complete);
}

function getSomeData($input)
{
    return json_encode($input);
}

// Überprüfe, ob eine spezifische Funktion aufgerufen werden soll
// if (isset($_GET['action']) && $_GET['action'] == 'getAnswer' && isset($_GET['prompt'])) {
//     // echo getSomeData();
//     echo getOpenAiAnswer($_GET['prompt']);
// } else {
//     echo json_encode(["error" => "Missing parameters or wrong action"]);
// }



function handleRequest()
{
    $method = $_SERVER['REQUEST_METHOD'];
    if ($method == 'GET') {
        if (isset($_GET['action'])) {
            if ($_GET['action'] == 'getAnswer' && isset($_GET['prompt'])) {
                echo getOpenAiAnswer($_GET['prompt']);
            } else {
                echo getSomeData("test");
            }
        } else {
            echo json_encode(["error" => "Missing action parameter"]);
        }
    } elseif ($method == 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        if (isset($input['action'])) {
            if ($input['action'] == 'getAnswer' && isset($input['prompt'])) {
                echo getOpenAiAnswer($input['prompt']);
            } else if ($input['action'] == 'speechToText') {
                echo getSomeData($input["prompt"]);
            } else {
                echo json_encode(["error" => "Invalid action or missing prompt"]);
            }
        } else {
            echo json_encode(["error" => "Missing action parameter"]);
        }
    } else {
        echo json_encode(["error" => "Invalid request method"]);
    }
}

function handleRequesta()
{
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action']) && $_GET['action'] === 'tts') {
        // Prüfen, ob eine Datei hochgeladen wurde
        if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
            $fileTmpPath = $_FILES['file']['tmp_name'];
            $fileName = $_FILES['file']['name'];
            $fileSize = $_FILES['file']['size'];
            $fileType = $_FILES['file']['type'];
    
            // Zielverzeichnis für die Datei
            $uploadFileDir = './uploaded_files/';
            $dest_path = $uploadFileDir . $fileName;
    
            // Datei an das Zielverzeichnis verschieben
            if(move_uploaded_file($fileTmpPath, $dest_path)) {
                $message = 'Datei erfolgreich hochgeladen.';
    
                // Hier kannst du die Datei weiter verarbeiten, z.B. für Speech-to-Text
                // $audioText = convertAudioToText($dest_path);
    
                // Beispiel für eine Rückgabe
                echo json_encode([
                    'status' => 'success',
                    'message' => $message,
                    'file' => $fileName,
                    // 'text' => $audioText
                ]);
            } else {
                $message = 'Beim Hochladen der Datei ist ein Fehler aufgetreten.';
                echo json_encode([
                    'status' => 'error',
                    'message' => $message,
                ]);
            }
        } else {
            $message = 'Keine Datei hochgeladen oder ein Fehler ist aufgetreten.';
            echo json_encode([
                'status' => 'error',
                'message' => $message,
            ]);
        }
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Ungültige Anfragemethode oder Aktion.',
        ]);
    }
}

handleRequest();
