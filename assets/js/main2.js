// Funktion, um Daten von der PHP-Seite zu holen
function fetchDataFromPHP() {
    fetch('http://localhost/composer_testing2/vendor/niklose00/kit/src/api.php?action=fetchData')
        .then(response => response.text())  // Verarbeite die Antwort als Text
        .then(data => console.log(data))    // Gib die Antwort in der Konsole aus
        .catch(error => console.error('Fehler beim Abrufen der Daten:', error));
}

// Aufruf der Funktion
fetchDataFromPHP();
