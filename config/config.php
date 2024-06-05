<?php

namespace niklose00\kit\Config;

use CodeIgniter\Config\BaseConfig;

class KIToolsConfig extends BaseConfig
{
    // Funktion 1: ai enhanced inputs
    public $activation_attribute = "data-ai-enhanced";

    public $tools = [
        'improve_writing' => [
            'category' => 'Auswahl bearbeiten',
            'label' => 'Schreibstil verbessern',
            'icon' => 'fa-chart-simple',
            'prompt' => 'Schreibe folgenden Text in einem viel besseren Stil: {input}',
        ],
        'write_shorter' => [
            'category' => 'Auswahl bearbeiten',
            'label' => 'Kürzer schreiben',
            'icon' => 'fa-solid fa-arrow-down-wide-short',
            'prompt' => 'Tue so als wärst du ein Experte für das Verfassen von Texten. Schreibe folgenden Text kürzer und prägnanter: {input}',
        ],
        'example' => [
            'category' => 'Hilfe',
            'label' => 'Beispiel einzeigen',
            'icon' => 'fa-question',
            'prompt' => '[erklaerung]. Hier sind einige Beispiele für die Eingabe: [exampleText]. Generiere nun ein Beispiel für die Eingabe.',
            'resources' => ['exampleText', 'erklaerung']
        ],
        'correct_input' => [
            'category' => 'Hilfe',
            'label' => 'Eingabe korrigieren',
            'icon' => 'fa-check',
            'prompt' => '[erklaerung]. Korrigiere meine Eingabe anhand: {input}.',
            'resources' => ['exampleText', 'erklaerung']
        ],
        'explain_mistake' => [
            'category' => 'Hilfe',
            'label' => 'Fehler erklären',
            'icon' => 'fa-pen',
            'prompt' => '[erklaerung]. Erkläre meinen Fehler: {input}.',
            'resources' => ['exampleText', 'erklaerung']
        ],
    ];

    public $visuals = [
        'aiEnhancedIcon' => 'fa-solid fa-wand-magic-sparkles',
    ];

    // Funktion 2: Abschnittsbezogene Spracheingabe
    public $speech_section_activation_attribute = "section-stt";
    public $speech_section_identifier = "form-section";
}
