class AIEnhancedElement {
  static configuration = null;
  element = null; // Das DOM-Element, mit dem dieses Objekt verknüpft ist -> input oder textarea
  index = null; // Ein eindeutiger Index, der diesem Element zugeordnet ist
  box = null; // Verweis auf das Box-Element, das die KI Funktionen enthält

  constructor(element, index) {
    this.element = element;
    this.index = index;
    this.init();
  }

  async init() {
    // Lädt die Konfiguration asynchron und initialisiert die grafische Darstellung und Event-Listener
    AIEnhancedElement.configuration = await ApiService.loadConfiguration(
      "ai_enhanced_element"
    );
    this.setupGraphics();
    this.element.addEventListener("click", this.showBox.bind(this));
  }

  setupGraphics() {
    // Bereitet das grafische Layout des Elements vor
    const parentDiv = this.element.parentNode;
    const elementContainer = new DOMElement("div", {
      className: "input-with-icon p-l",
    });

    const iconElement = new DOMElement("i", {
      className: `icon fas ${AIEnhancedElement.configuration["visuals"].aiEnhancedIcon}`,
    });
    const boxDiv = this.createBoxStructure();

    // Fügt das Hauptelement (input/textarea) und das KI-repräsentierende Icon zum Container hinzu, fügt diesen Container dann ins DOM ein und platziert anschließend die Box mit den KI-Funktionen.
    elementContainer.append(this.element);
    elementContainer.append(iconElement);
    elementContainer.appendTo(parentDiv);

    parentDiv.insertBefore(boxDiv, parentDiv.children[3]);
  }

  showBox() {
    // Blendet alle anderen Boxen aus, bevor die spezifische Box angezeigt wird
    const aiEnhancedElements = document.querySelectorAll(
      `[${AIEnhancedElement.configuration.activation_attribute}]`
    );
    aiEnhancedElements.forEach((el) => {
      const box = el
        .closest(".input-with-icon")
        .parentNode.querySelector(".box");
      if (box) {
        box.style.display = "none";
      }
    });

    // Zeigt die Box des geklickten Elements an
    const parentDiv = this.element.closest(".input-with-icon").parentNode;
    const box = parentDiv.querySelector(".box");
    if (box) {
      box.style.display = "block";
    }
  }

  createBoxStructure() {
    const boxDiv = document.createElement("div");
    boxDiv.className = "box";
    boxDiv.style.maxWidth = this.element.offsetWidth + "px";

    try {
      // Tool-Namen aus dem "tools"-Attribut des Elements extrahieren
      const tools = this.element.getAttribute("tools")?.split(";") || [];

      // Map erstellen (Kategorie => Tool)
      const toolsMap = new Map();

      tools.forEach((tool) => {
        const toolData = AIEnhancedElement.configuration.tools[tool];

        if (toolData == null) {
          console.error(`Das Tool ${tool} ist nicht in der Config definiert`);
          return;
        }
        toolData.key = tool;
        const category = toolData.category;
        toolsMap.set(category, [...(toolsMap.get(category) || []), toolData]);
      });

      // HTML-Inhalt der Box basierend auf den kategorisierten Tools zusammenstellen
      const boxContent = Array.from(toolsMap, ([category, categoryTools]) => {
        const toolsHTML = categoryTools
          .map(
            (tool) =>
              `<div class="auswahl" key="${tool.key}">
                <div class="icon-container">
                  <i class="fa-solid ${tool.icon}"></i>
                </div>
                <div>${tool.label}</div>
              </div>`
          )
          .join("");

        return `
        <div class="bereich">
          <div class="heading">${category}</div>
          ${toolsHTML}
        </div>
      `;
      }).join("");

      // HTML-Inhalt in die Box einfügen
      boxDiv.innerHTML = boxContent;

      // KI-Funktionen innerhalb der Box interaktiv machen
      boxDiv.querySelectorAll(".auswahl").forEach((element) => {
        element.addEventListener("click", (event) => {
          this.handleSelection(event);
        });
      });

      return boxDiv;
    } catch (error) {
      console.error(
        "Ein Error ist während der Erstellung der Box Struktur aufgetreten:",
        error
      );
      return null;
    }
  }

  handleSelection(event) {
    // Extrahiere das geklickte Element aus dem Event-Target.
    const selectedElement = event.currentTarget;
    const key = selectedElement.getAttribute("key");
    const tool = AIEnhancedElement.configuration.tools[key];

    let prompt = tool.prompt;
    const input = $(selectedElement)
      .closest(".box")
      .parent()
      .find("input, textarea")
      .first();
    const resources = tool.resources ?? [];

    // Ersetze alle spezifischen Platzhalter im Prompt durch tatsächliche Werte aus dem Input-Feld.
    if (tool) {
      resources.forEach((resource) => {
        if (prompt.includes(`[${resource}]`)) {
          // In prompt soll Resource eingebaut werden
          let baustein = input.attr(resource);

          // Platzhalter durch Signalisator ersetzen
          prompt = prompt.replace(`[${resource}]`, baustein);
        }
      });
    }

    if (prompt.includes(`{input}`)) {
      // In prompt soll Inhalt des Inputs eingebaut werden
      let baustein = input.val();

      // Platzhalter durch Signalisator ersetzen
      prompt = prompt.replace(`{input}`, baustein);
    }

    const box = selectedElement.closest(".box");

    // Senden der angepassten Anfrage an den Server und Verarbeitung der Antwort
    try {
      const requestData = prompt;
      ApiService.sendRequest(`KITools/getOpenAiAnswer/${requestData}`)
        .then((responseData) => {
          console.log("Antwort vom Controller:", responseData);
          const responseText = responseData.choices[0].text;

          // Aktualisieren des HTMLs der Box mit der Antwort des Servers
          box.innerHTML = `
          <div class="ai-answer">
            <div>
            <div class="heading">Vorschlag</div>
              <div class="responseText">
                ${responseText}
              </div>
            </div>
            <div>
              <div type="button" class="btn btn-ai-primary" id="uebernehmen">
                übernehmen
              </div>


              <div type="button" class="btn btn-ai-danger" id="test">
                ablehnen
              </div>
            </div>
          </div>`;

          // Hinzufügen von  Event Listener für die Antwort-Buttons
          document.getElementById("test").addEventListener("click", (event) => {
            this.rejectGeneration(event);
          });
          document
            .getElementById("uebernehmen")
            .addEventListener("click", (event) => {
              this.transfer(event);
            });
        })
        .catch((error) => {
          console.error("Fehler beim Senden der Anfrage:", error);
        });
    } catch (error) {
      console.error("Fehler beim Senden der Anfrage:", error);
    }
  }

  rejectGeneration(params) {
    const visibleBox = document.querySelector(
      '.box:not([style*="display: none"])'
    );

    if (visibleBox) {
      const boxDiv = this.createBoxStructure();
      visibleBox.replaceWith(boxDiv);
      boxDiv.style.display = "block";
    }
  }

  transfer() {
    const visibleBox = document.querySelector(
      '.box:not([style*="display: none"])'
    );
    const text = $(visibleBox).find(".responseText")[0].innerText;

    $(visibleBox).parent().find("input").val(text);
    const boxDiv = this.createBoxStructure();
    visibleBox.replaceWith(boxDiv);
  }

  static hideAllBoxes() {
    const boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {
      box.style.display = "none";
    });
  }
}

class SectionSTT {
  static configuration = null;
  form = null;
  inputJSON = []; // Speichert Daten für jedes Formularfeld zur späteren Verarbeitung

  constructor(form) {
    this.form = form;
    this.init();
  }

  /**
   * Initialisiert die Konfiguration und fügt Aufnahme-Buttons zu jedem Abschnitt hinzu.
   */
  async init() {
    if (!SectionSTT.configuration) {
      // Stellt sicher, dass die Konfiguration nur einmal geladen wird
      SectionSTT.configuration = await ApiService.loadConfiguration(
        "sectiontts"
      );
    }
    this.addButtonToSections();
  }

  /**
   * Geht alle Formularabschnitte durch und fügt ihnen Aufnahme-Buttons hinzu.
   */
  async addButtonToSections() {
    // Selektiere alle Abschnitte im Formular, die für die STT-Funktion markiert sind
    const fromSections = this.form.querySelectorAll(
      `[${SectionSTT.configuration.section_identifier}]`
    );

    // Erstellt am Ende jedes Abschnitts einen Aufnahme-Button
    fromSections.forEach((formSection, index) => {
      const button = this.createAndAddRecordingButton(formSection);
      this.inputJSON[index] = {};

      // Fügt einen Klick-Event-Listener hinzu, der die Aufnahme steuert
      button.addEventListener("click", async (event) => {
        await this.handleRecording(event, formSection, index);
      });
    });
  }

  /**
   * Startet oder stoppt die Aufnahme basierend auf dem aktuellen Zustand und verarbeitet die Daten
   */
  async handleRecording(event, formSection, index) {
    const btnElement = event.target.closest("button");
    const span = btnElement.querySelector("span");
    const icon = btnElement.querySelector("i");

    // Prüfe, ob bereits aufgenommen wird, und starte oder stoppe die Aufnahme entsprechend.
    if (!this.recording) {
      // Startet die Aufnahme
      this.updateButtonUI(
        span,
        icon,
        btnElement,
        "Aufnahme beenden",
        "fa-solid fa-stop",
        "btn-record",
        false
      );
      this.audio = new Audio();
      this.audio.startRecording();
      this.recording = true;
    } else {
      // Beendet die Aufnahme und verarbeitet die Audio-Daten
      this.updateButtonUI(
        span,
        icon,
        btnElement,
        "Verarbeite Eingabe",
        "fa-solid fa-spinner fa-spin",
        "btn-ai-primary",
        false
      );
      this.audio.stopRecording(async (blob) => {
        try {
          const result = await ApiService.sendAudioForSTT(blob);
          this.processInstructions(formSection, result.text, index);

          // Aktualisiert den Button erst, nachdem processInstructions abgeschlossen ist
          this.updateButtonUI(
            span,
            icon,
            btnElement,
            "Aufnahme Starten",
            "iconSpeechRecording fa-solid fa-microphone",
            "btn-ai-primary",
            true
          );
        } catch (error) {
          console.error("Fehler beim Hochladen:", error);
          this.updateButtonUI(
            span,
            icon,
            btnElement,
            "Aufnahme Starten",
            "iconSpeechRecording fa-solid fa-microphone",
            "btn-ai-primary",
            true
          );
        }
      });
      this.recording = false;
    }
  }

  /**
   * Aktualisiert die Benutzeroberfläche des Buttons entsprechend dem aktuellen Zustand der Aufnahme
   */
  updateButtonUI(span, icon, button, text, iconClass, btnClassToAdd, add) {
    span.innerText = text;
    icon.className = iconClass;
    if (btnClassToAdd) {
      if (add) {
        button.classList.add(btnClassToAdd);
        button.classList.remove(
          btnClassToAdd === "btn-record" ? "btn-ai-primary" : "btn-record"
        );
      } else {
        button.classList.add(btnClassToAdd);
        button.classList.remove(
          btnClassToAdd === "btn-ai-primary" ? "btn-record" : "btn-ai-primary"
        );
      }
    }
  }

  /**
   * Erstellt und fügt einen Aufnahme-Button zum übergebenen Formularabschnitt hinzu
   */
  createAndAddRecordingButton(formSection) {
    const buttonContainer = new DOMElement("div", {
      className: "d-flex gap-2 justify-content-center align-items-center",
    });

    const micIcon = new DOMElement("i", {
      className: "iconSpeechRecording fa-solid fa-microphone",
      attributes: { style: "--fa-animation-duration: 2s;" },
    });

    const text = new DOMElement("span", {
      className: "",
      content: "Aufnahme Starten",
    });

    buttonContainer.append(micIcon);
    buttonContainer.append(text);

    const button = new DOMElement("button", {
      className: "btn btn-ai-primary aufnehmen",
      attributes: { type: "button", recording: false },
      content: buttonContainer,
    });

    button.appendTo(formSection);
    return button;
  }

  /**
   * Verarbeitet Texteingaben und sendet eine Anfrage an den Server, um eine verarbeitete Antwort zu erhalten.
   * Diese Methode nimmt Text von einem Formularabschnitt, erstellt eine Anfrage und verarbeitet die Antwort,
   * um die Formulareingaben basierend auf der Antwort zu aktualisieren
   *
   * @param {HTMLElement} formSection - Der Formularabschnitt, der die Input-Felder enthält
   * @param {string} text - Der Text, der analysiert werden soll
   * @param {number} index - Der Index des Formularabschnitts im Array `inputJSON`
   */
  processInstructions(formSection, text, index) {
    const formSectionInputs = $(formSection).find("input, textarea");
    let prompt = this.buildPrompt(formSectionInputs, text, index);
    // Bereitet den Anfragekörper vor, der als JSON-String formatiert wird
    const body = { text: prompt };

    ApiService.sendRequest("KITools/getOpenAiAnswerBody/text", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((responseData) => {
        let convertedJSON = SectionSTT.convertToJSON(
          responseData.choices[0].text
        );
        // Aktualisiert die Input-Felder des Formularabschnitts basierend auf der verarbeiteten Antwort
        SectionSTT.fillInputs(convertedJSON, formSectionInputs);
        // Speichert die konvertierten Daten im Array `inputJSON` für den aktuellen Index
        this.inputJSON[index] = convertedJSON;
      })
      .catch((error) => {
        console.error("Fehler beim Senden der Anfrage:", error);
      });
    return true;
  }

  buildPrompt(formSectionInputs, text, index) {
    let typeString = "";
    let keyArray = [];
    let targetJSONString = "{";
    let textareas;

    formSectionInputs.each(function () {
      let key = $(this).attr("id");
      keyArray.push(key);
      typeString += `${key} ist ein ${String(this.tagName).toLowerCase()}, `;
      textareas +=
        String(this.tagName).toLowerCase() == "textarea" ? key + ", " : "";
      targetJSONString += `"${key}": ${this.getAttribute("type")} \n`;
    });

    targetJSONString += "}";

    let keyString = keyArray.join(", ");

    let prompt = `"
    Aufgabenstellung: Analysiere den vorgelegten Text, um spezifische Informationen zu extrahieren, und trage diese Informationen in ein sorgfältig strukturiertes JSON-Objekt ein. Es ist entscheidend, dass das JSON-Objekt exakt dem spezifizierten Format folgt. Die Aufgabe erfordert die Extraktion von Informationen wie ${keyString}. aus dem Text. Wenn bestimmte Informationen im Text nicht verfügbar sind, solltest du für die entsprechenden Felder im JSON-Objekt leere Strings ("") einsetzen, ohne irgendwelche Dummy-Daten zu verwenden. 
    ${
      this.inputJSON[index] != {}
        ? `Sollte es sich um Änderungwünsche handlen oder der gegebene Text auf die bereits ausgefüllten Informationen beziehen, nutze die folgende JSON: ${JSON.stringify(
            this.inputJSON[index]
          )}.Aktualisiere das JSON-Objekt basierend darauf, ob die Informationen aus dem Text Korrekturen oder Ergänzungen sind. Stelle sicher, dass das Ergebnis alle relevanten und korrekten Informationen in den spezifizierten Formaten enthält.`
        : ""
    }
    

    Gegebener Text: "${text}" 
    Ziel: Ziel: Generiere ein JSON-Objekt, das die aus dem Text extrahierten Informationen enthält. Achte darauf, das richtige Format für jeden Informationstyp zu verwenden, und lasse Felder, für die keine Informationen verfügbar sind, bewusst leer (""). Die Schlüssel des JSON-Objekts sind wie folgt definiert: ${keyString}


    Es ist sehr wichtig, dass die Inhalte in der JSON das richtige Format haben. Der Inhalt der JSON muss in dem korrekten Fomrat zurückgegeben werrden.Für Typ Time gemäß der Spezifikation "HH:mm", wobei "HH" für die Stunden im Bereich von 00 bis 23 steht und "mm" für Minuten im Bereich von 00 bis 59.  Für Typ Date in das korrekte Format gemäß der Spezifikation "yyyy-MM-dd", wobei yyyy" für das Jahr im Bereich von 0 bis 3000 steht und "MM" für Monat im Bereich von 01 bis 12 und "dd" für Tage im Bereich 01 bis 31. Für den Typ number muss eine Zahl zurückgegben werden.
    Gefordertes JSON-Format mit Format-Typen: ${targetJSONString}
   

    ${
      textareas == ""
        ? `Verfasse für ${textareas} einen präzisen, zusammenhängenden Text. Der Text soll alle relevanten Informationen für das Eingabefeld in einer hochwertigen, gut formulierten Weise zusammenfassen.`
        : ""
    }

   
    
    Anweisungen an die KI:
    1. Beginne mit einer gründlichen Analyse des bereitgestellten Textes, um alle verfügbaren Informationen zu identifizieren.
    2. Achte darauf, das JSON-Objekt mit den extrahierten Informationen korrekt zu befüllen, unter Beachtung des spezifischen Formats für jeden Informationstyp.
    3. Für jedes Feld, für das keine Information aus dem Text extrahiert werden kann, füge einen leeren String ("") ein. Füge unter gar keinen Umständen Dummy Daten ein.
    4. Stelle sicher, dass das finale JSON-Objekt syntaktisch korrekt ist und genau die extrahierten Informationen in der korrekten Struktur enthält.
    5. Deine Rückgabe soll ein kurzer Text wie: "Hier ist ein Ergebnis: " und dann das JSON Objekt mit den befüllten Informationen in dem Text mit dem richtigen Format sein${targetJSONString}
    "`;

    return prompt;
  }

  static convertToJSON(answer) {
    function adjustStringForJSONParsing(inputString) {
      inputString = inputString.trim();
      // Entferne Zeilenumbrüche sowie die ersten und letzten Zeichen, die nicht zu einem JSON-Objekt gehören
      inputString = inputString.replace(/(?:\r\n|\r|\n)/g, "");

      // Filtert das JSON Objekt aus dem String heraus
      inputString = inputString.replace(/^[^{]*|[^}]*$/g, "");

      return inputString;
    }

    let adjustedString = adjustStringForJSONParsing(answer);

    try {
      // Versuchen, den String zu einem JSON-Objekt zu konvertieren
      let json = JSON.parse(adjustedString);
      return json;
    } catch (error) {
      // TODO Fehlerbehandlung mit KI, falls der String nicht in ein JSON-Objekt konvertiert werden kann
      console.error("Fehler beim Konvertieren des Strings zu JSON:", error);
      return null;
    }
  }

  // füllt die Eingabefelder mit Hilfe der JSON und markiert diese für 2 Sekunden
  static fillInputs(json, fields) {
    if (fields && typeof fields.each === "function") {
      fields.each(function () {
        const input = $(this);
        const inputId = input.attr("id");
        const newValue = json[inputId];
        if (newValue !== undefined && input.val() !== newValue) {
          input.val(newValue);
          input.addClass("input-changed");
          setTimeout(() => {
            input.removeClass("input-changed");
          }, 2000);
        }
      });
    } else if (Array.isArray(fields)) {
      fields.forEach((element) => {
        const input = document.getElementById(element.id);
        const newValue = json[element.id];
        if (newValue && input.value !== newValue) {
          input.value = newValue;
          input.classList.add("input-changed");
          setTimeout(() => {
            input.classList.remove("input-changed");
          }, 2000);
        }
      });
    } else {
      console.error("fields ist kein gültiges jQuery-Objekt oder Array.");
    }
  }
}

class Audio {
  constructor() {
    this.mediaRecorder = null;
    this.audioChunks = [];
  }

  async startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.mediaRecorder = new MediaRecorder(stream);
    this.mediaRecorder.ondataavailable = (event) => {
      this.audioChunks.push(event.data);
    };
    this.mediaRecorder.onstop = () => {
      const audioBlob = new Blob(this.audioChunks, {
        type: "audio/wav; codecs=opus",
      });
      stream.getTracks().forEach((track) => track.stop());
    };
    this.audioChunks = [];
    this.mediaRecorder.start();
  }

  stopRecording(callback) {
    this.mediaRecorder.onstop = () => {
      this.audioBlob = new Blob(this.audioChunks, {
        type: "audio/wav; codecs=opus",
      });
      this.audioChunks = [];

      // Callback-Funktion, wegen src Asynchronitätsproblem beim Aufnahme Button
      if (callback && typeof callback === "function") {
        callback(this.audioBlob);
      }

      this.mediaRecorder.stream.getTracks().forEach((track) => track.stop());
    };
    this.mediaRecorder.stop();
  }
}

class ApiService {
  static configuration = new Map();

  static async loadConfiguration(type = "") {
    if (!ApiService.configuration.has(type)) {
      try {
        const response = await fetch(`*/config/config.json`);
        if (!response.ok) {
          throw new Error("Konfiguration konnte nicht geladen werden.");
        }

        const configurationData = await response.json();
        ApiService.configuration.set(type, configurationData);
      } catch (error) {
        console.error("Fehler beim Laden der Konfiguration:", error);
        throw error;
      }
    }
    return ApiService.configuration.get(type);
  }

  static async sendRequest(path, options = {}) {
    const url = `${baseurl}/${path}`;
    const fetchOptions = {
      method: options.method ?? "POST",
      headers: {
        ...options.headers,
        Accept: "application/json",
      },
      body: options.body,
    };

    // Entfernen des Content-Type Headers, wenn body ein FormData ist
    if (options.body instanceof FormData) {
      delete fetchOptions.headers["Content-Type"];
    }

    try {
      const response = await fetch(url, fetchOptions);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("API Request failed:", error);
      throw error;
    }
  }

  // Spezifische Methode zum Hochladen von Audio-Dateien
  static sendAudioForSTT(blob) {
    const formData = new FormData();
    formData.append("file", blob, "audiofile.wav");

    // Pfad, Methode und Body für den Request
    return ApiService.sendRequest("KITools/speechToText", {
      method: "POST",
      body: formData,
    });
  }
}

class DOMElement {
  constructor(tagName, options = {}) {
    this.element = document.createElement(tagName);
    if (options.id) {
      this.element.id = options.id;
    }
    if (options.className) {
      this.element.className = options.className;
    }
    if (options.attributes) {
      Object.keys(options.attributes).forEach((key) => {
        this.element.setAttribute(key, options.attributes[key]);
      });
    }
    if (options.content !== undefined) {
      this.addContent(options.content);
    }
  }

  addContent(content) {
    if (typeof content === "string" || typeof content === "number") {
      this.element.textContent = content;
    } else if (content instanceof DOMElement) {
      this.element.appendChild(content.element);
    } else {
      this.element.appendChild(content);
    }
    return this;
  }

  addClass(className) {
    this.element.classList.add(className);
  }

  removeClass(className) {
    this.element.classList.remove(className);
  }

  addEventListener(eventName, callbackFunction) {
    this.element.addEventListener(eventName, callbackFunction);
  }

  addClass(className) {
    this.element.classList.add(className);
    return this;
  }

  setAttribute(key, value) {
    this.element.setAttribute(key, value);
  }

  getAttribute(key) {
    return this.element.getAttribute(key);
  }

  append(child) {
    if (child instanceof DOMElement) {
      this.element.appendChild(child.element);
    } else {
      this.element.appendChild(child);
    }
    return this;
  }

  appendTo(parent, position = "end") {
    if (parent instanceof DOMElement) {
      parent = parent.element;
    }

    if (position === "start") {
      if (parent.firstChild) {
        parent.insertBefore(this.element, parent.firstChild);
      } else {
        parent.appendChild(this.element);
      }
    } else {
      parent.appendChild(this.element);
    }

    return this;
  }
}

class Regex {
  static isValidTime(time) {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)(:([0-5]\d)(\.(\d{1,3}))?)?$/;
    return regex.test(time);
  }

  static returnTimeMatch(string) {
    const regex = /(\d{2}):(\d{2})/;
    console.log(string);
    return string.match(regex)[0];
  }

  static isValidDate(date) {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[012])\.(\d{4})$/;
    return regex.test(date);
  }

  static returnDateMatch(string) {
    const regex = /\d{4}-[01]\d-[0-3]\d/;
    console.log(string);
    return string.match(regex)[0];
  }
}

// -----------------------------
// -----------------------------
// -----------------------------

// Initialisierung mit Konfigurationsladung
document.addEventListener("DOMContentLoaded", async () => {
  // Konfigurationsdatei laden
  const config = await ApiService.loadConfiguration();
  console.log(config);


  

  // Konfigurationen laden
  AIEnhancedElement.configuration = await ApiService.loadConfiguration(
    "ai_enhanced_element"
  );
  SectionSTT.configuration = await ApiService.loadConfiguration("sectiontts");

  // Funktion 1: AI Box zu Input Felder hinzufügen
  const aiEnhancedElements = document.querySelectorAll(
    `[${AIEnhancedElement.configuration.activation_attribute}]`
  );
  aiEnhancedElements.forEach(async (element, index) => {
    const aiElement = new AIEnhancedElement(element, index);
  });

  document.addEventListener("click", (event) => {
    const isAIEnhancedElement = event.target.closest(
      `[${AIEnhancedElement.configuration.activation_attribute}]`
    );
    const isInputElement = event.target.tagName === "INPUT";
    if (!isAIEnhancedElement && isInputElement) {
      AIEnhancedElement.hideAllBoxes();
    }
  });

  // Funktion 2: Sprachunterstützung für alle Abschnitte hinzufügen
  if (SectionSTT.configuration.activation_attribute) {
    const forms = document.querySelectorAll(
      `form[${SectionSTT.configuration.activation_attribute}]`
    );
    forms.forEach((form) => {
      new SectionSTT(form);
    });
  }
});
