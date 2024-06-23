<?php
require_once __DIR__ . '/../../../../vendor/autoload.php';

use Orhanerday\OpenAi\OpenAi;

// header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Origin: http://localhost/.com');
header('Content-Type: application/json');

function getOpenAiAnswer($prompt = "", $settings = [])
{
    $openAiKey = getenv('OPENAI_API_KEY');  // Sicherer, den API-Key als Umgebungsvariable zu verwenden
    $openAi = new OpenAI($openAiKey);

    $defaultSettings = [
        'model' => 'gpt-3.5-turbo-instruct',
        'temperature' => 0.1,
        'max_tokens' => 1500,
        'frequency_penalty' => 0,
        'presence_penalty' => 0.1,
    ];

    $finalSettings = array_merge($defaultSettings, $settings);

    $complete = $openAi->completion([
        'model' => $finalSettings['model'],
        'prompt' => $prompt,
        'temperature' => $finalSettings['temperature'],
        'max_tokens' => $finalSettings['max_tokens'],
        'frequency_penalty' => $finalSettings['frequency_penalty'],
        'presence_penalty' => $finalSettings['presence_penalty'],
    ]);


    return json_encode($complete);
}


function handleRequest()
{
    $method = $_SERVER['REQUEST_METHOD'];
    if ($method == 'GET') {
        if (isset($_GET['action'])) {
            if ($_GET['action'] == 'getAnswer' && isset($_GET['prompt'])) {
                echo getOpenAiAnswer($_GET['prompt']);
            }
        } else {
            echo json_encode(["error" => "Missing action parameter"]);
        }
    } elseif ($method == 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        if (isset($input['action'])) {
            if ($input['action'] == 'getAnswer' && isset($input['prompt'])) {
                echo getOpenAiAnswer($input['prompt']);
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

handleRequest();
