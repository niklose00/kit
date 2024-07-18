<form section-stt>
    <h2 class="mb-3">
        Formular 1 : Dokumentation eines Unfalls
    </h2>
    <div class="my-5">

        <!-- Allgemeine Angaben -->
        <div class="my-5" form-section>
            <h4>Allgemeine Informationen</h4>
            <div class="row mt-2 mb-4">
                <div class="form-group col-sm">
                    <label for="datum">Datum:</label>
                    <input type="date" data-provide="datepicker" class="form-control" id="datum" name="datum">
                </div>
                <div class="form-group col-sm">
                    <label for="uhrzeit">Uhrzeit:</label>
                    <input type="time" class="form-control" id="uhrzeit" name="uhrzeit">
                </div>
            </div>
        </div>



        <!-- Pilot -->
        <div class="my-5" form-section>
            <h4>Angaben zum Piloten</h4>
            <div class="row mt-2 mb-4">
                <div class="form-group col-sm">
                    <label for="pilot_vorname">Vorname:</label>
                    <input type="text" class="form-control" placeholder="Max" id="pilot_vorname" name="pilot_vorname">
                </div>
                <div class="form-group col-sm">
                    <label for="pilot_nachname">Nachname:</label>
                    <input type="text" data-provide="datepicker" class="form-control" id="pilot_nachname" name="pilot_nachname">
                </div>
            </div>
            <div class="row my-4">
                <div class="form-group col-sm">
                    <label for="pilot_geburtsdatum">Geburtsdatum:</label>
                    <input type="date" class="form-control" id="pilot_geburtsdatum" name="pilot_geburtsdatum">
                </div>
                <div class="form-group col-sm">
                    <label for="pilot_telefonnummer">Telefonnummer:</label>
                    <input type="tel" class="form-control" id="pilot_telefonnummer" name="pilot_telefonnummer">
                </div>
            </div>
            <div class="row my-4">
                <div class="form-group col-sm">
                    <label for="pilot_wohnort">Wohnort:</label>
                    <input type="text" class="form-control" id="pilot_wohnort" name="pilot_wohnort">
                </div>
                <div class="form-group col-sm">
                    <label for="pilot_straße">Straße:</label>
                    <input type="text" class="form-control" id="pilot_straße" name="pilot_straße">
                </div>
            </div>
            <div class="row my-4">
                <div class="form-group col-sm">
                    <label for="pilot_mail">E-Mail-Adresse:</label>
                    <input type="email" class="form-control" id="pilot_mail" name="pilot_mail">
                </div>
                <div class="form-group col-sm">
                    <label for="pilot_erfahrungslevel">Erfahrungslevel:</label>
                    <select id="pilot_erfahrungslevel" name="pilot_erfahrungslevel" class="form-select">
                        <option value="0">Erfahrungslevel auswählen</option>
                        <option value="Anfänger">Anfänger</option>
                        <option value="Fortgeschritten">Fortgeschritten</option>
                        <option value="Profi">Profi</option>
                    </select>


                </div>
            </div>

            <div class="row my-4">
                <div class="form-group col-sm">
                    <label for="pilot_flugstunden">Anzahl der Flugstunden:</label>
                    <input type="number" class="form-control" id="pilot_flugstunden" name="pilot_flugstunden">
                </div>
            </div>


        </div>

        <!-- Angaben zum Unfallort -->
        <div class="my-5" form-section>
            <h4>Angaben zum Unfallort</h4>
            <div class="row mt-2 mb-4">
                <div class="form-group col-sm">
                    <label for="unfallort_plz">Postleitzahl:</label>
                    <input type="text" data-provide="datepicker" class="form-control" id="unfallort_plz" name="unfallort_plz">
                </div>
                <div class="form-group col-sm">
                    <label for="unfallort_ort">Ort:</label>
                    <input type="text" data-provide="datepicker" class="form-control" id="unfallort_ort" name="unfallort_ort">
                </div>
            </div>

            <div class="row my-4">
                <div class="form-group col-sm">
                    <label for="unfallort_wetterbedingungen">Wetterbedingungen (z.B. Windstärke, Windrichtung, Sichtverhältnisse):</label>
                    <textarea class="form-control" id="unfallort_wetterbedingungen" name="unfallort_wetterbedingungen" rows="3"></textarea>
                </div>
            </div>

            <div class="row my-4">
                <div class="form-group col-sm">
                    <label for="unfallort_gelaende">Beschreibung des Geländes:</label>
                    <textarea class="form-control" id="unfallort_gelaende" name="unfallort_gelaende" rows="3"></textarea>
                </div>
            </div>
        </div>

        <!-- Angaben zum Fluggerät -->
        <div class="my-5" form-section>
            <h4>Angaben zum Fluggerät</h4>
            <div class="row mt-2 mb-4">
                <div class="form-group col-sm">
                    <label for="hersteller">Hersteller:</label>
                    <input type="text" data-provide="datepicker" class="form-control" id="hersteller" name="hersteller">
                </div>
                <div class="form-group col-sm">
                    <label for="modell">Modell:</label>
                    <input type="text" data-provide="datepicker" class="form-control" id="modell" name="modell">
                </div>
            </div>
            <div class="row mt-2 mb-4">
                <div class="form-group col-sm">
                    <label for="seriennummer">Seriennummer:</label>
                    <input type="text" data-provide="datepicker" class="form-control" id="seriennummer" name="seriennummer">
                </div>
                <div class="form-group col-sm">
                    <label for="letztes_wartungsdatum">Letztes Wartungsdatum:</label>
                    <input type="text" data-provide="datepicker" class="form-control" id="letztes_wartungsdatum" name="letztes_wartungsdatum">
                </div>
            </div>
            <div class="row my-4">
                <div class="form-group col-sm">
                    <label for="bemerkung_zustand">Bemerkung zum Zustand vor dem Flug:</label>
                    <textarea class="form-control" id="bemerkung_zustand" name="bemerkung_zustand" rows="3"></textarea>
                </div>
            </div>
        </div>

        <!-- Unfallhergang -->
        <div class="my-5" form-section>
            <h4>Unfallhergang</h4>
            <div class="row mt-2 mb-4">
                <div class="form-group col-sm">
                    <label for="zeitpunkt_notfallmaßnahmen">Zeitpunkt der Einleitung von Notfallmaßnahmen (falls zutreffend):</label>
                    <input type="text" data-provide="datepicker" class="form-control" id="zeitpunkt_notfallmaßnahmen" name="zeitpunkt_notfallmaßnahmen">
                </div>
            </div>
            <div class="row my-4">
                <div class="form-group col-sm">
                    <label for="beschreibung_unfallhergang">Detaillierte Beschreibung des Unfallhergangs:</label>
                    <textarea class="form-control" id="beschreibung_unfallhergang" name="beschreibung_unfallhergang" rows="3"></textarea>
                </div>
            </div>
            <div class="row my-4">
                <div class="form-group col-sm">
                    <label for="maßnahmen_Unfall_vermeiden">Maßnahmen, die unternommen wurden, um den Unfall zu vermeiden:</label>
                    <textarea class="form-control" id="maßnahmen_Unfall_vermeiden" name="maßnahmen_Unfall_vermeiden" rows="3"></textarea>
                </div>
            </div>
        </div>

</form>