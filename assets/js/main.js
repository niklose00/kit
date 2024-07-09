class AIEnhancedElement {
  static configuration = null;

  constructor(element, index) {
    this.element = element;
    this.index = index;
    this.box = null;
    this.init();
  }

  async init() {
    if (!AIEnhancedElement.configuration) {
      AIEnhancedElement.configuration = await ApiService.loadConfiguration();
    }

    this.setupGraphics();
    this.element.addEventListener("click", this.showBox.bind(this));
  }

  setupGraphics() {
    const displayIcon =
      AIEnhancedElement.configuration.visuals.aiEnhancedIcon.display;
    const parentDiv = this.element.parentNode;
    const elementContainer = this.createElementContainer(displayIcon);
    const boxDiv = this.createBoxStructure();

    if (displayIcon) {
      const iconElement = this.createIconElement();

      elementContainer
        .append(this.element)
        .append(iconElement)
        .appendTo(parentDiv);
    } else {
      elementContainer.append(this.element).appendTo(parentDiv);
    }
    parentDiv.insertBefore(boxDiv, parentDiv.children[3]);
  }

  createElementContainer(displayIcon) {
    const containerClass = displayIcon ? "input-with-icon p-l" : "";
    return new DOMElement("div", { className: containerClass });
  }

  createIconElement() {
    return new DOMElement("i", {
      className: `icon fas ${AIEnhancedElement.configuration.visuals.aiEnhancedIcon.icon}`,
    });
  }

  showBox() {
    AIEnhancedElement.hideAllBoxes();
    const box = this.element
      .closest(".input-with-icon")
      .parentNode.querySelector(".box");
    if (box) box.style.display = "block";
  }

  createBoxStructure() {
    const boxDiv = document.createElement("div");
    boxDiv.className = "box";
    boxDiv.style.maxWidth = this.element.offsetWidth + "px";

    const toolsMap = this.getToolsMap();
    boxDiv.innerHTML = this.generateBoxContent(toolsMap);

    this.addToolSelectionHandlers(boxDiv);

    return boxDiv;
  }

  getToolsMap() {
    const toolsMap = new Map();
    const tools = this.element.getAttribute("tools")?.split(";") || [];

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
    return toolsMap;
  }

  generateBoxContent(toolsMap) {
    return Array.from(toolsMap, ([category, categoryTools]) => {
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
  }

  addToolSelectionHandlers(boxDiv) {
    boxDiv.querySelectorAll(".auswahl").forEach((element) => {
      element.addEventListener("click", (event) => this.handleSelection(event));
    });
  }

  async handleSelection(event) {
    const selectedElement = event.currentTarget;
    const key = selectedElement.getAttribute("key");
    const tool = AIEnhancedElement.configuration.tools[key];

    let prompt = this.buildPrompt(tool, selectedElement);
    const box = selectedElement.closest(".box");

    try {
      const responseText = await this.sendPromptToServer(prompt);
      this.updateBoxContent(box, responseText);
    } catch (error) {
      console.error("Fehler beim Senden der Anfrage:", error);
    }
  }

  buildPrompt(tool, selectedElement) {
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

          if (typeof baustein === "undefined") {
            throw new Error(
              `Baustein für die Ressource "${resource}" ist undefiniert. In der Konfigurationsdatei ist für die Funktion "${tool}" die Ressource "${resource}" registriert. Diese Ressource wurde in dem Eingabefled nicht implementiert`
            );
          }

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
    return prompt;
  }

  async sendPromptToServer(prompt) {
    const requestData = { action: "getAnswer", prompt: prompt };
    const response = await ApiService.sendRequest("", {
      method: "POST",
      body: JSON.stringify(requestData),
      headers: { "Content-Type": "application/json" },
    });
    return JSON.parse(response).choices[0].text;
  }

  updateBoxContent(box, responseText) {
    box.innerHTML = `
      <div class="ai-answer">
        <div>
          <div class="heading">Vorschlag</div>
          <div class="responseText">${responseText}</div>
        </div>
        <div>
          <button class="btn btn-ai-primary" id="uebernehmen">übernehmen</button>
          <button class="btn btn-ai-danger" id="ablehnen">ablehnen</button>
        </div>
      </div>`;
    box
      .querySelector("#uebernehmen")
      .addEventListener("click", () => this.transfer(box));
    box
      .querySelector("#ablehnen")
      .addEventListener("click", () => this.rejectGeneration(box));
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

  constructor(form) {
    this.form = form;
    this.inputJSON = [];
    this.init();
  }

  async init() {
    if (!SectionSTT.configuration) {
      SectionSTT.configuration = await ApiService.loadConfiguration();
    }
    this.addButtonsToSections();
  }

  addButtonsToSections() {
    const formSections = this.form.querySelectorAll(
      `[${SectionSTT.configuration.section_identifier}]`
    );

    formSections.forEach((section, index) => {
      if (SectionSTT.configuration.input_types != undefined) {
        const buttonContainer = new DOMElement("div", {
          className: "inputButtonContainer",
        });

        if (SectionSTT.configuration.input_types.includes("audio")) {
          const audioButton = this.createRecordingButton();

          buttonContainer.append(audioButton.element);

          audioButton.addEventListener("click", (event) =>
            this.handleRecording(event, section, index)
          );
        }
        if (SectionSTT.configuration.input_types.includes("text")) {
          const textButton = DOMElement.createButton(
            "",
            "fa-solid fa-file-import",
            "btn-ai-primary",
            {
              type: "button",
              "data-bs-toggle": "modal",
              "data-bs-target": `#inputTextModal${index}`,
            }
          );

          const modal = DOMElement.createBootstrapModal(
            `inputTextModal${index}`,
            this.joinLabels(section)
          );
          
          this.form.appendChild(modal);

          buttonContainer.append(textButton.element);

          const confirmationButton = $(`#btn-confirm-inputTextModal${index}`);
          confirmationButton.on("click", () => {
            const messageInput = $(`#message-textinputTextModal${index}`, modal).eq(0);
            const text = messageInput.val();
        
            this.processInstructions(section, text, index);
            messageInput.val('');
        });
        }

        buttonContainer.appendTo(section);
        this.inputJSON[index] = {};
      } else {
        console.error(
          "Es sind keine Typen für die Eingabe der SectionSTT Funktion definiert. Füge input_types der Konfigurationsdatei hinzu."
        );
      }
    });
  }

  joinLabels(section) {
    function removeSpecialCharacters(text) {
      return text.replace(/[:]/g, "");
    }
    const labels = [...section.querySelectorAll("label")].map((label) =>
      removeSpecialCharacters(label.innerHTML)
    );

    if (labels.length === 0) return "";
    if (labels.length === 1) return labels[0];
    if (labels.length === 2) return labels.join(" und ");

    const allButLast = labels.slice(0, -1).join(", ");
    const lastLabel = labels[labels.length - 1];
    return `${allButLast} und ${lastLabel}`;
  }

  async handleRecording(event, section, index) {
    const button = event.target.closest("button");
    const [span, icon] = [
      button.querySelector("span"),
      button.querySelector("i"),
    ];

    if (!this.recording) {
      this.startRecording(span, icon, button);
    } else {
      await this.stopRecording(span, icon, button, section, index);
    }
  }

  handleTextInput(event, section, index) {
    const text = $("inputTextModal").val();
    console.log(text);
  }

  startRecording(span, icon, button) {
    this.updateButtonUI(
      span,
      icon,
      button,
      "Aufnahme beenden",
      "fa-solid fa-stop",
      "btn-record",
      false
    );
    this.audio = new AudioRecorder();
    this.audio.startRecording();
    this.recording = true;
  }

  async stopRecording(span, icon, button, section, index) {
    this.updateButtonUI(
      span,
      icon,
      button,
      "Verarbeite Eingabe",
      "fa-solid fa-spinner fa-spin",
      "btn-ai-primary",
      false
    );

    try {
      const blob = await this.audio.stopRecording();
      const result = await ApiService.transcriptAudio(blob);
      const text = JSON.parse(result.transcription).text;
      this.processInstructions(section, text, index);
    } catch (error) {
      console.error("Fehler beim Hochladen:", error);
    } finally {
      this.updateButtonUI(
        span,
        icon,
        button,
        "Aufnahme Starten",
        "fa-solid fa-microphone",
        "btn-ai-primary",
        true
      );
      this.recording = false;
    }
  }

  updateButtonUI(span, icon, button, text, iconClass, btnClass, addClass) {
    span.innerText = text;
    icon.className = iconClass;
    button.classList.toggle(btnClass, addClass);
  }

  createRecordingButton() {
    const buttonContainer = new DOMElement("div", {
      className: "d-flex gap-2 justify-content-center align-items-center",
    });

    const micIcon = new DOMElement("i", {
      className: "fa-solid fa-microphone",
      attributes: { style: "--fa-animation-duration: 2s;" },
    });

    const text = new DOMElement("span", { content: "Aufnahme Starten" });

    buttonContainer.append(micIcon).append(text);

    return new DOMElement("button", {
      className: "btn btn-ai-primary aufnehmen",
      attributes: { type: "button", recording: false },
      content: buttonContainer,
    });
  }

  async processInstructions(section, text, index) {
    const inputs = Array.from(section.querySelectorAll("input, textarea"));
    const prompt = this.buildPrompt(inputs, text, index);
    const requestData = { action: "getAnswer", prompt };

    try {
      const response = await ApiService.sendRequest("", {
        method: "POST",
        body: JSON.stringify(requestData),
        headers: { "Content-Type": "application/json" },
      });
      const json = SectionSTT.convertToJSON(
        JSON.parse(response).choices[0].text
      );
      SectionSTT.fillInputs(json, inputs);
      this.inputJSON[index] = json;
    } catch (error) {
      console.error("Fehler beim Senden der Anfrage:", error);
    }
  }

  buildPrompt(inputs, text, index) {
    const keys = inputs.map((input) => input.id);
    inputs
      .map((input) => `${input.id} ist ein ${input.tagName.toLowerCase()}`)
      .join(", ");
    const targetJSON = `{${keys
      .map(
        (key) =>
          `"${key}": ${inputs
            .find((input) => input.id === key)
            .getAttribute("type")}`
      )
      .join(", ")}}`;

    const existingJSON = this.inputJSON[index]
      ? `Nutze die folgende JSON als Ausgangspunkt und korrigiere diese: ${JSON.stringify(
          this.inputJSON[index]
        )}.`
      : "";

    return `
      Aufgabenstellung: Analysiere den vorgelegten Text, um spezifische Informationen zu extrahieren, und trage diese Informationen in ein sorgfältig strukturiertes JSON-Objekt ein. Es ist entscheidend, dass das JSON-Objekt exakt dem spezifizierten Format folgt. Die Aufgabe erfordert die Extraktion von Informationen wie ${keys.join(
        ", "
      )} aus dem Text. Wenn bestimmte Informationen im Text nicht verfügbar sind, solltest du für die entsprechenden Felder im JSON-Objekt leere Strings ("") einsetzen, ohne irgendwelche Dummy-Daten zu verwenden.
      ${existingJSON}

      Gegebener Text: "${text}" 
      Ziel: Generiere ein JSON-Objekt, das die aus dem Text extrahierten Informationen enthält. Achte darauf, das richtige Format für jeden Informationstyp zu verwenden, und lasse Felder, für die keine Informationen verfügbar sind, bewusst leer (""). Die Schlüssel des JSON-Objekts sind wie folgt definiert: ${keys.join(
        ", "
      )}

      Es ist sehr wichtig, dass die Inhalte in der JSON das richtige Format haben. Der Inhalt der JSON muss in dem korrekten Format zurückgegeben werden. Für Typ Time gemäß der Spezifikation "HH:mm", wobei "HH" für die Stunden im Bereich von 00 bis 23 steht und "mm" für Minuten im Bereich von 00 bis 59. Für Typ Date in das korrekte Format gemäß der Spezifikation "yyyy-MM-dd", wobei "yyyy" für das Jahr im Bereich von 0 bis 3000 steht und "MM" für Monat im Bereich von 01 bis 12 und "dd" für Tage im Bereich 01 bis 31. Für den Typ number muss eine Zahl zurückgegeben werden.
      Gefordertes JSON-Format mit Format-Typen: {${targetJSON}}

      Verfasse für die Textfelder präzise, zusammenhängende Texte, die alle relevanten Informationen enthalten.
      
      Anweisungen an die KI:
      1. Beginne mit einer gründlichen Analyse des bereitgestellten Textes, um alle verfügbaren Informationen zu identifizieren.
      2. Achte darauf, das JSON-Objekt mit den extrahierten Informationen korrekt zu befüllen, unter Beachtung des spezifischen Formats für jeden Informationstyp.
      3. Für jedes Feld, für das keine Information aus dem Text extrahiert werden kann, füge einen leeren String ("") ein. Füge unter gar keinen Umständen Dummy Daten ein.
      4. Stelle sicher, dass das finale JSON-Objekt syntaktisch korrekt ist und genau die extrahierten Informationen in der korrekten Struktur enthält.
      5. Deine Rückgabe muss das JSON-Objekt mit den befüllten Informationen in dem Text mit dem richtigen Format sein.
    `;
  }

  static convertToJSON(answer) {
    const adjustedString = answer
      .trim()
      .replace(/(?:\r\n|\r|\n)/g, "")
      .replace(/^[^{]*|[^}]*$/g, "");

    try {
      return JSON.parse(adjustedString);
    } catch (error) {
      console.error("Fehler beim Konvertieren des Strings zu JSON:", error);
      return null;
    }
  }

  static fillInputs(json, inputs) {
    console.log(json);
    inputs.forEach((input) => {
      const newValue = json[input.id];
      if (
        newValue !== undefined &&
        newValue !== "" &&
        input.value !== newValue
      ) {
        input.value = newValue;
        input.classList.add("input-changed");
        setTimeout(() => input.classList.remove("input-changed"), 2000);
      }
    });
  }
}

class AudioRecorder {
  constructor() {
    this.mediaRecorder = null;
    this.audioChunks = [];
  }

  async startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.mediaRecorder = new MediaRecorder(stream);
    this.mediaRecorder.ondataavailable = (event) =>
      this.audioChunks.push(event.data);
    this.mediaRecorder.start();
  }

  stopRecording() {
    return new Promise((resolve, reject) => {
      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, {
          type: "audio/wav; codecs=opus",
        });
        this.audioChunks = [];
        resolve(audioBlob);
      };
      this.mediaRecorder.onerror = reject;
      this.mediaRecorder.stop();
    });
  }
}

class ApiService {
  static configuration = {};
  static baseurl = ApiService.getBaseUrl();

  static getBaseUrl() {
    const { protocol, host, pathname } = window.location;
    const pathSegments = pathname.split("/").slice(0, -2);
    const basePath = pathSegments.join("/");
    return `${protocol}//${host}${basePath}`;
  }

  static async loadConfiguration() {
    console.log(ApiService.baseurl);
    if (Object.keys(ApiService.configuration).length === 0) {
      const response = await fetch(
        `${ApiService.baseurl}/vendor/niklose00/kit/config/config.json`
      );
      console.log(
        `${ApiService.baseurl}/vendor/niklose00/kit/config/config.json`
      );
      if (!response.ok)
        throw new Error("Konfiguration konnte nicht geladen werden.");
      ApiService.configuration = await response.json();
    }
    return ApiService.configuration;
  }

  static async sendRequest(path, options = {}) {
    const url = new URL(
      `${ApiService.baseurl}/vendor/niklose00/kit/src/api.php${
        path ? `?${path}` : ""
      }`
    );

    const fetchOptions = {
      method: options.method ?? "POST",
      headers: {
        ...options.headers,
        Accept: "application/json",
      },
    };

    if (fetchOptions.method === "GET") {
      Object.keys(options.params || {}).forEach((key) =>
        url.searchParams.append(key, options.params[key])
      );
    } else {
      fetchOptions.body = options.body;
      if (!(options.body instanceof FormData)) {
        fetchOptions.headers["Content-Type"] = "application/json";
      }
    }

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

  static async transcriptAudio(blob) {
    const formData = new FormData();
    formData.append("audio", blob, "aufnahme.wav");

    try {
      const response = await fetch(
        `${ApiService.baseurl}/vendor/niklose00/kit/src/upload.php`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Fehler beim Hochladen: ${response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error(
        "Es gab ein Problem mit dem Hochladen der Audio-Datei:",
        error
      );
      throw error;
    }
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

  static createButton(text, icon, className, attributeObject) {
    const buttonContainer = new DOMElement("div", {
      className: "d-flex gap-2 justify-content-center align-items-center",
    });

    const micIcon = new DOMElement("i", {
      className: icon,
    });

    const buttonText = new DOMElement("span", { content: text });

    if (icon != "") {
      buttonContainer.append(micIcon);
    }
    if (text != "") {
      buttonContainer.append(buttonText);
    }

    return new DOMElement("button", {
      className: `btn ${className}`,
      attributes: attributeObject,
      content: buttonContainer,
    });
  }

  static createBootstrapModal(id, information) {
    const modalTemplate = `
      <div class="modal fade" id="${id}" tabindex="-1" aria-labelledby="${id}Label" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="${id}Label">Texteingabe</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <b>Es werden folgende Informationen verlangt: </b><br/>${information}
                </div>
                <div class="mb-3">
                  <label for="message-text${id}" class="col-form-label">Text:</label>
                  <textarea class="form-control" id="message-text${id}" rows="10" cols="50"></textarea>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Schließen</button>
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal" id="btn-confirm-${id}">Bestätigen</button>
            </div>
          </div>
        </div>
      </div>
    `;

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = modalTemplate.trim();

    return tempDiv.firstChild;
  }
}

// Initialisierung mit Konfigurationsladung
document.addEventListener("DOMContentLoaded", async () => {
  // Konfigurationsdatei laden
  const config = await ApiService.loadConfiguration();
  console.log(config);

  AIEnhancedElement.configuration = ApiService.configuration["inputFunction"];
  SectionSTT.configuration = ApiService.configuration["speechSectionFunction"];

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
    const isBox = event.target.closest(`.box`);
    const isInputElement =
      event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA";
    if (!isAIEnhancedElement && !isBox) {
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
