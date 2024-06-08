// Funktion, um Daten von der PHP-Seite zu holen
function fetchOpenAiAnswer(prompt) {
    // URL, an die die Anfrage gesendet wird
    const url = `http://localhost/composer_testing2/vendor/niklose00/kit/src/api.php?action=getAnswer&prompt=${encodeURIComponent(prompt)}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Netzwerkantwort war nicht ok');
            }
            console.log(response)
            return response.json();  // Verarbeite die Antwort als JSON
        })
        .then(data => {
            console.log('Antwort von OpenAI:', data);
        })
        .catch(error => console.error('Fehler beim Abrufen der Daten:', error));
}

// Beispielaufruf der Funktion
fetchOpenAiAnswer("Erkläre mir, wie AJAX funktioniert.");
