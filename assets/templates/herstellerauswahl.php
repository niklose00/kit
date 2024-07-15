<div class="container" style="margin-bottom: 100px;">
    <form section-stt>

        <!-- Angaben zum Gleitschirm -->
        <div class="my-5" form-section>
            <h4>Angaben zum Gleitschirm</h4>
            <div class="row mt-2 mb-4">
                <div class="form-group col-sm">
                    <label for="hersteller">Hersteller:</label>
                    <select id="hersteller" name="hersteller" class="form-select">
                        <option value="0">Hersteller auswählen</option>
                        <option value="Ozone">Ozone</option>
                        <option value="Nova">Nova</option>
                        <option value="Gin">Gin</option>
                    </select>
                </div>
                <div class="form-group col-sm">
                    <label for="modell">Modell:</label>
                    <select id="modell" name="modell" class="form-select">
                        <option value="0">Modell auswählen</option>
                        <!-- Ozone Modelle -->
                        <option value="Enzo" data-hersteller="Ozone">Enzo</option>
                        <option value="Rush" data-hersteller="Ozone">Rush</option>
                        <!-- Nova Modelle -->
                        <option value="Mentor" data-hersteller="Nova">Mentor</option>
                        <option value="Ion" data-hersteller="Nova">Ion</option>
                        <!-- Gin Modelle -->
                        <option value="Bonanza" data-hersteller="Gin">Bonanza</option>
                        <option value="Atlas" data-hersteller="Gin">Atlas</option>
                    </select>
                </div>
            </div>
            <div class="row mt-2 mb-4">
                <div class="form-group col-sm">
                    <label for="seriennummer">Seriennummer:</label>
                    <input type="text" class="form-control" id="seriennummer" name="seriennummer">
                </div>
                <div class="form-group col-sm">
                    <label for="letztes_wartungsdatum">Letztes Wartungsdatum:</label>
                    <input type="text" class="form-control" id="letztes_wartungsdatum" name="letztes_wartungsdatum">
                </div>
            </div>
            <div class="row my-4">
                <div class="form-group col-sm">
                    <label for="bemerkung_zustand">Bemerkung zum Zustand vor dem Flug:</label>
                    <textarea class="form-control" id="bemerkung_zustand" name="bemerkung_zustand" rows="3"></textarea>
                </div>
            </div>
        </div>
    </form>
</div>