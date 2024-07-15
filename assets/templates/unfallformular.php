<form section-stt>

    <div class="my-5" form-section>

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
                    <div class="dropdown">
                        <input type="text" id="pilot_erfahrungslevel" name="pilot_erfahrungslevel" class="form-control dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" placeholder="Wähle aus">
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Anfänger</a></li>
                            <li><a class="dropdown-item" href="#">Fortgeschritten</a></li>
                            <li><a class="dropdown-item" href="#">Experte</a></li>
                        </ul>
                    </div>

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

        <!-- Verletzungen -->
        <div class="my-5" form-section>
            <h4>Verletzungen</h4>
            <div class="row mt-2 mb-4">
                <div class="form-group col-sm">
                    <label for="pilot_vorname">Beschreibung der Verletzungen (falls zutreffend):</label>
                    <input type="time" data-provide="datepicker" class="form-control" id="pilot_vorname">
                </div>
            </div>
            <div class="row my-4">
                <div class="form-group col-sm">
                    <label for="pilot_wohnort">Erste Hilfe Maßnahmen (wer, was, wann?):</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
            </div>
            <div class="row my-4">
                <div class="form-group col-sm">
                    <label for="pilot_wohnort">Wurde medizinische Hilfe in Anspruch genommen?:</label>

                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
                        <label class="form-check-label" for="flexSwitchCheckDefault">Ja, es wurde medizinische Hilfe in Anspruch genommen</label>
                    </div>
                </div>
            </div>
        </div>

        <!-- Medizinische Behandlung -->
        <div class="my-5" form-section>
            <h4>Medizinische Behandlung</h4>
            <div class="row mt-2 mb-4">
                <div class="form-group col-sm">
                    <label for="krankenhaus">Krankenhaus:</label>
                    <input type="text" data-provide="datepicker" class="form-control" id="krankenhaus" name="krankenhaus">
                </div>
                <div class="form-group col-sm">
                    <label for="arzt">Arzt:</label>
                    <input type="text" data-provide="datepicker" class="form-control" id="arzt" name="arzt">
                </div>
            </div>
            <div class="row my-4">
                <div class="form-group col-sm">
                    <label for="krankenhaus_mail">E-Mail-Adresse:</label>
                    <input type="email" class="form-control" id="krankenhaus_mail" name="krankenhaus_mail">
                </div>
                <div class="form-group col-sm">
                    <label for="krankenhaus_telefonnummer">Telefonnummer:</label>
                    <input type="tel" class="form-control" id="krankenhaus_telefonnummer" name="krankenhaus_telefonnummer">
                </div>
            </div>
            <div class="row my-4">
                <div class="form-group col-sm">
                    <label for="krankenhaus_plz">Postleitzahl:</label>
                    <input type="text" class="form-control" id="krankenhaus_plz" name="krankenhaus_plz">
                </div>
                <div class="form-group col-sm">
                    <label for="krankenhaus_ort">Ort:</label>
                    <input type="text" class="form-control" id="krankenhaus_ort" name="krankenhaus_ort">
                </div>
            </div>
            <div class="row my-4">
                <div class="form-group col-sm">
                    <label for="krankenhaus_straße">Straße:</label>
                    <input type="text" class="form-control" id="krankenhaus_straße" name="krankenhaus_straße">
                </div>
                <div class="form-group col-sm">
                    <label for="krankenhaus_hausnummer">Hausnummer:</label>
                    <input type="text" class="form-control" id="krankenhaus_hausnummer" name="krankenhaus_hausnummer">
                </div>
            </div>
        </div>



        <!-- Zeugen -->
        <div class="my-5" form-section>
            <h4>Zeugen</h4>
            <div class="row mt-2 mb-4">
                <div class="form-group col-sm">
                    <label for="zeuge1_vorname">Vorname:</label>
                    <input type="text" data-provide="datepicker" class="form-control" id="zeuge1_vorname" name="zeuge1_vorname">
                </div>
                <div class="form-group col-sm">
                    <label for="zeuge1_nachname">Nachname:</label>
                    <input type="text" data-provide="datepicker" class="form-control" id="zeuge1_nachname" name="zeuge1_nachname">
                </div>
            </div>
            <div class="row mt-2 mb-4">
                <div class="form-group col-sm">
                    <label for="zeuge1_mail">E-Mail-Adresse:</label>
                    <input type="email" class="form-control" id="zeuge1_mail" name="zeuge1_mail">
                </div>
                <div class="form-group col-sm">
                    <label for="zeuge1_telefonnummer">Telefonnummer:</label>
                    <input type="tel" class="form-control" id="zeuge1_telefonnummer" name="zeuge1_telefonnummer">
                </div>
            </div>
            <div class="row my-4">
                <div class="form-group col-sm">
                    <label for="zeuge1_plz">Postleitzahl:</label>
                    <input type="text" class="form-control" id="zeuge1_plz" name="zeuge1_plz">
                </div>
                <div class="form-group col-sm">
                    <label for="zeuge1_ort">Ort:</label>
                    <input type="text" class="form-control" id="zeuge1_ort" name="zeuge1_ort">
                </div>
            </div>
            <div class="row my-4">
                <div class="form-group col-sm">
                    <label for="zeuge1_straße">Straße:</label>
                    <input type="text" class="form-control" id="zeuge1_straße" name="zeuge1_straße">
                </div>
                <div class="form-group col-sm">
                    <label for="zeuge1_hausnummer">Hausnummer:</label>
                    <input type="text" class="form-control" id="zeuge1_hausnummer" name="zeuge1_hausnummer">
                </div>
            </div>
            <div class="row my-4">
                <div class="form-group col-sm">
                    <label for="zeuge1_schilderung">Schilderung des Vorfalls aus Sicht des Zeugen:</label>
                    <textarea class="form-control" id="zeuge1_schilderung" name="zeuge1_schilderung" rows="3"></textarea>
                </div>
            </div>
        </div>

        <button type="submit" class="btn btn-primary">Absenden</button>

</form>