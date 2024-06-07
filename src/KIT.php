<?php

namespace Niklose00\Kit;

use Orhanerday\OpenAi\OpenAi;

class Kit
{
    public function sayHello()
    {
        return "Hello from KIT Library2!";
    }

    public function getOpenAiAnswer($prompt = "")
    {
        $open_ai_key = getenv('OPENAI_API_KEY');
        $open_ai = new OpenAi($open_ai_key);

        $response = $open_ai->chat([
            'model' => 'gpt-3.5-turbo',
            'messages' => [
                ['role' => 'system', 'content' => 'You are a helpful assistant.'],
                ['role' => 'user', 'content' => $prompt]
            ],
            'temperature' => 0.1,
            'max_tokens' => 1500,
            'frequency_penalty' => 0,
            'presence_penalty' => 0.6,
        ]);

        return $response;
    }
}
