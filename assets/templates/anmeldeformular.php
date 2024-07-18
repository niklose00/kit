<div class="container" style="margin-bottom: 100px;">

    <form section-stt>
        <h2 class="mb-3">
            Formular 3 : Demonstration der KI-unterst ̈utzten Eingabefelder
        </h2>
        <!-- Hilfe zur Verfassung einer E-Mail -->
        <div class="my-5" form-section>
            <h4>Hilfe zur Verfassung einer E-Mail</h4>
            <div class="row my-4">
                <div class="form-group col-sm">
                    <label for="email_texteingabe">Hilfe zur Verfassung einer E-Mail:</label>
                    <textarea data-ai-enhanced tools="write_email_from_bullets" stil="professionelle geschäftliche" class="form-control" id="email_texteingabe" name="email_texteingabe" rows="3"></textarea>
                </div>
            </div>
        </div>

        <!-- Textbearbeitung -->
        <div class="my-5" form-section>
            <h4>Textbearbeitung</h4>
            <div class="row my-4">
                <div class="form-group col-sm">
                    <label for="text">Text:</label>
                    <textarea data-ai-enhanced tools="write_shorter;improve_writing;correct_text" class="form-control" id="text" name="text" rows="3"></textarea>
                </div>
            </div>
        </div>


        <!-- Dateneingabe -->
        <div class="my-5" form-section>
            <h4>Dateneingabe</h4>

            <div class="row mt-2 mb-4">
                <div class="form-group col-sm">
                    <label for="vorname">Vorname:</label>
                    <input type="text" data-ai-enhanced exampleText="Tom" erklaerung="Das Eingabefeld für den Vornamen erwartet den Vornamen einer Person in alphabetischer Form, mit dem ersten Buchstaben großgeschrieben. Es sollten keine Sonderzeichen oder Zahlen enthalten sein." class="form-control" placeholder="Max" id="vorname" name="vorname" tools="example;correct_input;explain_mistake">
                </div>
                <div class="form-group col-sm">
                    <label for="nachname">Nachname:</label>
                    <input type="text" data-ai-enhanced tools="example" exampleText="Mustermann" erklaerung="Zeichenbeschränkungen:Erlaubte Zeichen: Buchstaben (A-Z, a-z), Apostrophe ('), Bindestriche (-). Verbotene Zeichen: Sonderzeichen (z.B. @, #, $, %), Zahlen (0-9). Längenbeschränkungen: Minimum: 2 Zeichen. Maximum: 50 Zeichen. Groß- und Kleinschreibung: Der erste Buchstabe muss ein Großbuchstabe sein . Alle folgenden Buchstaben müssen Kleinbuchstaben sein. Leerzeichen: Innerhalb des Nachnamens keine Leerzeichen erlauben, außer bei korrekten Bindestrichverbindungen (z.B. Müller-Schmidt). Kulturelle und regionale Unterschiede: Berücksichtigung kultureller Besonderheiten bei der Zeichenverwendung und Namensstruktur (z.B. Akzente in französischen Nachnamen). Einhaltung der Gesetzgebung: Überprüfung der gesetzlichen Anforderungen des Landes, in dem die Person lebt, um sicherzustellen, dass der Nachname zulässig ist." data-provide="datepicker" class="form-control" id="nachname" name="nachname" placeholder="Mustermann">
                </div>
            </div>

            <div class="row mt-2 mb-4">
                <div class="form-group col-sm">
                    <label for="plz">Postleitzahl:</label>
                    <input type="text" data-ai-enhanced exampleText="54441" erklaerung="Eine Postleitzahl muss eine festgelegte Anzahl an Ziffern haben, typischerweise fünf in Deutschland. Sie darf keine Buchstaben oder Sonderzeichen enthalten, nur Zahlen sind erlaubt. Außerdem muss sie einem existierenden geografischen Gebiet zugeordnet sein, um eine korrekte Zustellung zu gewährleisten." class="form-control" placeholder="54321" id="plz" name="plz" tools="example;correct_input;explain_mistake">
                </div>
                <div class="form-group col-sm">
                    <label for="stadt">Stadt:</label>
                    <input type="text" data-ai-enhanced exampleText="Musterstadt" erklaerung="Ein Stadtname muss alphabetische Zeichen enthalten und darf keine Zahlen oder Sonderzeichen wie @, #, $ enthalten. Er sollte eine Mindestlänge von zwei Zeichen haben und der erste Buchstabe jedes Wortes im Namen sollte großgeschrieben werden. Zudem muss der Stadtname kulturell und regional passend sowie eindeutig und verständlich sein, um Verwechslungen zu vermeiden." class="form-control" placeholder="Musterstadt" id="stadt" name="stadt" tools="example;correct_input;explain_mistake">
                </div>
            </div>
            <div class="row mt-2 mb-4">
                <div class="form-group col-sm">
                    <label for="strasse">Straße:</label>
                    <input type="text" data-ai-enhanced exampleText="54441" erklaerung="Eine Postleitzahl muss eine festgelegte Anzahl an Ziffern haben, typischerweise fünf in Deutschland. Sie darf keine Buchstaben oder Sonderzeichen enthalten, nur Zahlen sind erlaubt. Außerdem muss sie einem existierenden geografischen Gebiet zugeordnet sein, um eine korrekte Zustellung zu gewährleisten." class="form-control" placeholder="54321" id="strasse" name="strasse" tools="example;correct_input;explain_mistake">
                </div>
                <div class="form-group col-sm">
                    <label for="hausnummer">Hausnummer:</label>
                    <input type="text" data-ai-enhanced exampleText="36A" erklaerung="Eine Hausnummer muss aus Ziffern bestehen und kann in einigen Fällen auch Buchstaben oder Ergänzungen wie Schrägstriche enthalten (z.B. 12A oder 15/3). Sie sollte eindeutig sein und eine gültige Adresse innerhalb der betreffenden Straße kennzeichnen. Zusätzlich muss die Hausnummer den lokalen Normen und Vorschriften entsprechen, um eine korrekte Zustellung und Identifizierung zu gewährleisten." class="form-control" placeholder="1A" id="hausnummer" name="hausnummer" tools="example;correct_input;explain_mistake">
                </div>
            </div>


        </div>
    </form>
</div>