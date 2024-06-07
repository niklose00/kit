<?php
// Sorgt dafür, dass Anfragen von anderen Domains angenommen werden können (CORS)
header('Access-Control-Allow-Origin: *');

function getSomeData() {
    return "Daten von der PHP-Funktion";
}

// Überprüfe, ob eine spezifische Funktion aufgerufen werden soll
if(isset($_GET['action']) && $_GET['action'] == 'fetchData') {
    echo getSomeData();
}
?>
