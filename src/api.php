<?php
require_once __DIR__ . '/../../../../vendor/autoload.php';

use Orhanerday\OpenAi\OpenAi;

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

function getOpenAiAnswer($prompt = "") {
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

function getSomeData() {
    return "Daten von der PHP-Funktion";
}

// Überprüfe, ob eine spezifische Funktion aufgerufen werden soll
if (isset($_GET['action']) && $_GET['action'] == 'getAnswer' && isset($_GET['prompt'])) {
    // echo getSomeData();
    echo getOpenAiAnswer($_GET['prompt']);
} else {
    echo json_encode(["error" => "Missing parameters or wrong action"]);
}
?>