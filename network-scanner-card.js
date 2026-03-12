const STORAGE_KEY = "network_scanner_card_mappings";

const LANGS = {
  ro: { title:"Scanner Rețea",    filter:"Filtrează după IP, nume, vendor, MAC...", cols:["","Adresă IP","Hostname","Nume","Tip","Producător","Adresă MAC",""],  devices:"Dispozitive", updated:"Actualizat",    showing:(f,t)=>`${f} din ${t}`,   all:t=>`${t} online`, edit:"Editează dispozitiv", save:"Salvează", cancel:"Anulează", name:"Nume personalizat", type:"Tip dispozitiv", reset:"Resetează", edited:"editat" },
  en: { title:"Network Scanner",  filter:"Filter by IP, name, vendor, MAC...",      cols:["","IP Address","Hostname","Name","Type","Vendor","MAC Address",""],   devices:"Devices",     updated:"Updated",       showing:(f,t)=>`${f} of ${t}`,    all:t=>`${t} online`, edit:"Edit device",        save:"Save",      cancel:"Cancel",   name:"Custom name",  type:"Device type",    reset:"Reset",    edited:"edited" },
  de: { title:"Netzwerk-Scanner", filter:"Nach IP, Name, Hersteller filtern...",    cols:["","IP-Adresse","Hostname","Name","Typ","Hersteller","MAC",""],        devices:"Geräte",      updated:"Aktualisiert",  showing:(f,t)=>`${f} von ${t}`,   all:t=>`${t} online`, edit:"Gerät bearbeiten",   save:"Speichern", cancel:"Abbrechen", name:"Benutzername",type:"Gerätetyp",    reset:"Reset",    edited:"bearbeitet" },
  fr: { title:"Scanner Réseau",   filter:"Filtrer par IP, nom, fabricant...",       cols:["","Adresse IP","Nom d'hôte","Nom","Type","Fabricant","MAC",""],       devices:"Appareils",   updated:"Mis à jour",    showing:(f,t)=>`${f} sur ${t}`,   all:t=>`${t} en ligne`,edit:"Modifier",          save:"Enregistrer",cancel:"Annuler",  name:"Nom personnalisé",type:"Type",      reset:"Réinit.",  edited:"modifié" },
  es: { title:"Escáner de Red",   filter:"Filtrar por IP, nombre, fabricante...",   cols:["","Dirección IP","Hostname","Nombre","Tipo","Fabricante","MAC",""],   devices:"Dispositivos",updated:"Actualizado",   showing:(f,t)=>`${f} de ${t}`,    all:t=>`${t} en línea`,edit:"Editar",             save:"Guardar",   cancel:"Cancelar", name:"Nombre personalizado",type:"Tipo",  reset:"Restablecer",edited:"editado" },
  it: { title:"Scanner di Rete",  filter:"Filtra per IP, nome, produttore...",      cols:["","Indirizzo IP","Hostname","Nome","Tipo","Produttore","MAC",""],     devices:"Dispositivi", updated:"Aggiornato",    showing:(f,t)=>`${f} di ${t}`,    all:t=>`${t} online`, edit:"Modifica",           save:"Salva",     cancel:"Annulla",  name:"Nome personalizzato",type:"Tipo", reset:"Reset",    edited:"modificato" },
  pl: { title:"Skaner Sieci",     filter:"Filtruj po IP, nazwie, producencie...",   cols:["","Adres IP","Hostname","Nazwa","Typ","Producent","Adres MAC",""],    devices:"Urządzenia",  updated:"Zaktualizowano",showing:(f,t)=>`${f} z ${t}`,     all:t=>`${t} online`, edit:"Edytuj urządzenie",  save:"Zapisz",    cancel:"Anuluj",   name:"Nazwa własna", type:"Typ urządzenia",  reset:"Reset",    edited:"edytowano" },
  hu: { title:"Hálózat Szkenner", filter:"Szűrés IP, név, gyártó alapján...",      cols:["","IP-cím","Gépnév","Név","Típus","Gyártó","MAC-cím",""],            devices:"Eszközök",    updated:"Frissítve",     showing:(f,t)=>`${f} / ${t}`,     all:t=>`${t} online`, edit:"Eszköz szerkesztése",save:"Mentés",    cancel:"Mégse",    name:"Egyéni név",  type:"Eszköztípus",    reset:"Alaphelyzet",edited:"szerkesztett" },
};

const FLAGS = { ro:"🇷🇴", en:"🇬🇧", de:"🇩🇪", fr:"🇫🇷", es:"🇪🇸", it:"🇮🇹", pl:"🇵🇱", hu:"🇭🇺" };

const DEVICE_TYPES = [
  // Network
  "Router", "Switch", "Access Point", "Modem", "Powerline Adapter",
  // Computers
  "Desktop", "Laptop", "Server", "NAS", "Raspberry Pi", "Tablet", "Mobile",
  // Entertainment
  "Smart TV", "TV Box", "Chromecast", "Apple TV", "Game Console", "Media Player", "Projector",
  // Audio
  "Smart Speaker", "Soundbar", "Bluetooth Speaker", "Hi-Fi System", "AV Receiver",
  // Cameras & Security
  "IP Camera", "Doorbell Camera", "Baby Monitor", "Alarm System", "Motion Sensor",
  // Lighting
  "Smart Bulb", "Light Switch", "LED Strip", "Smart Dimmer",
  // Climate
  "Thermostat", "Air Conditioner", "Air Purifier", "Humidifier", "Fan", "Radiator Valve",
  // Appliances
  "Washing Machine", "Dishwasher", "Dryer", "Refrigerator", "Microwave",
  "Air Fryer", "Coffee Machine", "Kettle", "Toaster", "Robot Vacuum",
  "Lawn Mower Robot", "Window Cleaner Robot",
  // Smart Home
  "Smart Plug", "Smart Hub", "Zigbee Hub", "Z-Wave Hub", "IR Blaster",
  "Smart Lock", "Smart Blinds", "Garage Door", "Doorbell", "Smoke Detector",
  "Leak Sensor", "Energy Monitor",
  // Peripherals
  "Printer", "Scanner", "NFC Reader", "Barcode Scanner",
  // Other
  "IP Phone", "Intercom", "E-Ink Display", "Wearable", "Other"
];

const TYPE_ICONS = {
  // Network
  "router":"🌐", "switch":"🔀", "access point":"📶", "modem":"📡", "powerline adapter":"🔌",
  // Computers
  "desktop":"🖥️", "laptop":"💻", "server":"🖧", "nas":"🗄️", "raspberry pi":"🍓",
  "tablet":"📟", "mobile":"📱",
  // Entertainment
  "smart tv":"📺", "tv box":"📺", "chromecast":"📺", "apple tv":"📺",
  "game console":"🎮", "media player":"▶️", "projector":"📽️",
  // Audio
  "smart speaker":"🔊", "soundbar":"🔊", "bluetooth speaker":"🔊",
  "hi-fi system":"🎵", "av receiver":"🎵",
  // Cameras & Security
  "ip camera":"📷", "doorbell camera":"🔔", "baby monitor":"👶",
  "alarm system":"🚨", "motion sensor":"👁️",
  // Lighting
  "smart bulb":"💡", "light switch":"💡", "led strip":"💡", "smart dimmer":"💡",
  // Climate
  "thermostat":"🌡️", "air conditioner":"❄️", "air purifier":"💨",
  "humidifier":"💧", "fan":"🌀", "radiator valve":"🔥",
  // Appliances
  "washing machine":"🫧", "dishwasher":"🍽️", "dryer":"👕",
  "refrigerator":"🧊", "microwave":"📦", "air fryer":"🍟",
  "coffee machine":"☕", "kettle":"🫖", "toaster":"🍞",
  "robot vacuum":"🤖", "lawn mower robot":"🌿", "window cleaner robot":"🪟",
  // Smart Home
  "smart plug":"🔌", "smart hub":"🏠", "zigbee hub":"🏠", "z-wave hub":"🏠",
  "ir blaster":"📡", "smart lock":"🔒", "smart blinds":"🪟",
  "garage door":"🚗", "doorbell":"🔔", "smoke detector":"🚒",
  "leak sensor":"💧", "energy monitor":"⚡",
  // Peripherals
  "printer":"🖨️", "scanner":"🖨️", "nfc reader":"📲", "barcode scanner":"📲",
  // Other
  "ip phone":"☎️", "intercom":"📞", "e-ink display":"🖼️",
  "wearable":"⌚", "other":"🔌"
};

function getIcon(t) {
  const s = (t||"").toLowerCase();
  // exact match first
  if (TYPE_ICONS[s]) return TYPE_ICONS[s];
  // partial match
  for (const [key, icon] of Object.entries(TYPE_ICONS)) {
    if (s.includes(key) || key.includes(s)) return icon;
  }
  return "🔌";
}

function getTypeClass(t) {
  const s = (t||"").toLowerCase();
  if (["router","switch","access point","modem","powerline adapter"].some(k=>s.includes(k))) return "t-router";
  if (["mobile","tablet","wearable"].some(k=>s.includes(k))) return "t-mobile";
  if (["smart tv","tv box","chromecast","apple tv","game console","media player","projector"].some(k=>s.includes(k))) return "t-tv";
  if (["speaker","soundbar","hi-fi","av receiver"].some(k=>s.includes(k))) return "t-audio";
  if (["camera","baby monitor","alarm","motion sensor","doorbell"].some(k=>s.includes(k))) return "t-camera";
  if (["bulb","light","dimmer","led"].some(k=>s.includes(k))) return "t-light";
  if (["thermostat","air conditioner","air purifier","humidifier","fan","radiator"].some(k=>s.includes(k))) return "t-climate";
  if (["washing","dishwasher","dryer","refrigerator","microwave","air fryer","coffee","kettle","toaster","robot vacuum","mower","window cleaner"].some(k=>s.includes(k))) return "t-appliance";
  if (["smart plug","smart hub","zigbee","z-wave","ir blaster","smart lock","blinds","garage","smoke","leak","energy"].some(k=>s.includes(k))) return "t-smarthome";
  if (["server","nas","raspberry","desktop","laptop","computer"].some(k=>s.includes(k))) return "t-laptop";
  if (["printer","scanner","nfc","barcode"].some(k=>s.includes(k))) return "t-printer";
  return "t-other";
}

const CSS = `
  :host { display: block; }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .card {
    font-family: 'Courier New', monospace;
    background: #0a0e1a; border-radius: 16px; padding: 20px;
    color: #e2e8f0; border: 1px solid #1e2d4a;
    position: relative; overflow: hidden;
    box-shadow: 0 0 40px rgba(0,212,255,0.05);
  }
  .topbar {
    position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, #00d4ff, #00ff9d, transparent);
  }
  .grid-bg {
    position: absolute; inset: 0; pointer-events: none;
    background-image: linear-gradient(rgba(0,212,255,0.025) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(0,212,255,0.025) 1px, transparent 1px);
    background-size: 32px 32px;
  }

  .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; flex-wrap: wrap; gap: 10px; position: relative; }
  .title  { display: flex; align-items: center; gap: 10px; font-weight: 800; font-size: 15px; color: #00d4ff; letter-spacing: 3px; text-transform: uppercase; }
  .pulse  { width: 10px; height: 10px; border-radius: 50%; background: #00ff9d; box-shadow: 0 0 10px #00ff9d; animation: pulse 1.6s ease-in-out infinite; flex-shrink: 0; }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.25;transform:scale(0.7)} }

  .right  { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
  .flags  { display: flex; gap: 4px; }
  .flag-btn { background: transparent; border: 1px solid #1e3a5a; border-radius: 6px; padding: 3px 6px; cursor: pointer; font-size: 13px; transition: all 0.15s; line-height:1; }
  .flag-btn.active { background: rgba(0,212,255,0.15); border-color: rgba(0,212,255,0.45); }
  .flag-btn:hover  { border-color: #00d4ff; }
  .badge { background: #0d1929; border: 1px solid #1e3a5a; border-radius: 8px; padding: 4px 12px; font-size: 11px; color: #64b5f6; white-space: nowrap; }
  .badge span { color: #00d4ff; font-weight: 600; }

  .search-wrap { position: relative; margin-bottom: 13px; }
  .search-icon { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); color: #2e4560; font-size: 13px; pointer-events: none; }
  input[type="text"] {
    width: 100%; background: #0d1929; border: 1px solid #1e3a5a;
    border-radius: 10px; padding: 8px 12px 8px 32px;
    color: #e2e8f0; font-family: inherit; font-size: 12px; outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  input[type="text"]:focus { border-color: #00d4ff; box-shadow: 0 0 0 3px rgba(0,212,255,0.08); }
  input[type="text"]::placeholder { color: #243040; }

  .table-wrap { overflow-x: auto; border-radius: 10px; border: 1px solid #1a2a40; }
  table { width: 100%; border-collapse: collapse; font-size: 12px; }
  thead tr { background: #0b1422; }
  th { padding: 10px 14px; text-align: left; color: #3a8fa8; font-size: 10px; letter-spacing: 1.8px; text-transform: uppercase; border-bottom: 1px solid #1a2e44; white-space: nowrap; font-weight: 600; }
  tbody tr { border-bottom: 1px solid #0e1a28; transition: background 0.12s; }
  tbody tr:last-child { border-bottom: none; }
  tbody tr:hover { background: rgba(0,212,255,0.035); }
  td { padding: 9px 14px; white-space: nowrap; vertical-align: middle; }

  .dot { width: 8px; height: 8px; border-radius: 50%; background: #00ff9d; box-shadow: 0 0 7px #00ff9d; margin: 0 auto; animation: pulse 2.5s ease-in-out infinite; }
  .col-ip     { color: #00ff9d; font-weight: 600; }
  .col-host   { color: #7ab8d4; font-size: 11px; }
  .col-name   { color: #e2e8f0; font-weight: 600; }
  .col-vendor { color: #a78bfa; font-size: 11px; }
  .col-mac    { color: #2a6a9a; font-size: 11px; letter-spacing: 0.5px; }

  .type-badge { padding: 2px 8px; border-radius: 5px; font-size: 10px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; }
  .t-router    { background:rgba(0,212,255,0.1);   color:#00d4ff; border:1px solid rgba(0,212,255,0.25); }
  .t-mobile    { background:rgba(52,211,153,0.1);  color:#34d399; border:1px solid rgba(52,211,153,0.25); }
  .t-tv        { background:rgba(251,146,60,0.1);  color:#fb923c; border:1px solid rgba(251,146,60,0.25); }
  .t-audio     { background:rgba(239,68,68,0.1);   color:#f87171; border:1px solid rgba(239,68,68,0.25); }
  .t-camera    { background:rgba(251,191,36,0.1);  color:#fbbf24; border:1px solid rgba(251,191,36,0.25); }
  .t-light     { background:rgba(253,224,71,0.1);  color:#fde047; border:1px solid rgba(253,224,71,0.25); }
  .t-climate   { background:rgba(56,189,248,0.1);  color:#38bdf8; border:1px solid rgba(56,189,248,0.25); }
  .t-appliance { background:rgba(251,146,60,0.1);  color:#fb923c; border:1px solid rgba(251,146,60,0.25); }
  .t-smarthome { background:rgba(34,197,94,0.1);   color:#4ade80; border:1px solid rgba(34,197,94,0.25); }
  .t-laptop    { background:rgba(167,139,250,0.1); color:#a78bfa; border:1px solid rgba(167,139,250,0.25); }
  .t-printer   { background:rgba(148,163,184,0.1); color:#94a3b8; border:1px solid rgba(148,163,184,0.25); }
  .t-other     { background:rgba(71,85,105,0.15);  color:#64748b; border:1px solid rgba(71,85,105,0.3); }

  .edit-btn {
    background: transparent; border: 1px solid #1e3a5a; border-radius: 6px;
    color: #3a8fa8; cursor: pointer; font-size: 13px; padding: 3px 7px;
    transition: all 0.15s; line-height: 1;
  }
  .edit-btn:hover { background: rgba(0,212,255,0.1); border-color: #00d4ff; color: #00d4ff; }

  .custom-badge {
    display: inline-block; width: 6px; height: 6px; border-radius: 50%;
    background: #00d4ff; box-shadow: 0 0 5px #00d4ff;
    margin-left: 5px; vertical-align: middle;
  }

  /* Modal */
  .modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.75);
    display: flex; align-items: center; justify-content: center;
    z-index: 9999; backdrop-filter: blur(4px);
    animation: fadeIn 0.15s ease;
  }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }

  .modal {
    background: #0d1929; border: 1px solid #1e3a5a; border-radius: 16px;
    padding: 24px; width: 340px; max-width: 90vw;
    box-shadow: 0 0 60px rgba(0,212,255,0.1), 0 20px 60px rgba(0,0,0,0.8);
    animation: slideUp 0.18s ease; font-family: 'Courier New', monospace;
  }
  @keyframes slideUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }

  .modal-title { font-size: 13px; font-weight: 800; color: #00d4ff; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 4px; }
  .modal-mac   { font-size: 10px; color: #2a6a9a; margin-bottom: 18px; letter-spacing: 1px; }

  .modal label { display: block; font-size: 10px; color: #3a8fa8; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 6px; }

  .modal input[type="text"], .modal select {
    width: 100%; background: #060e1a; border: 1px solid #1e3a5a;
    border-radius: 8px; padding: 9px 12px; color: #e2e8f0;
    font-family: inherit; font-size: 12px; outline: none; margin-bottom: 14px;
    transition: border-color 0.2s; appearance: none; -webkit-appearance: none;
  }
  .modal input[type="text"]:focus, .modal select:focus { border-color: #00d4ff; box-shadow: 0 0 0 3px rgba(0,212,255,0.08); }

  .select-wrap { position: relative; margin-bottom: 14px; }
  .select-wrap::after { content:'▾'; position:absolute; right:12px; top:50%; transform:translateY(-50%); color:#3a8fa8; pointer-events:none; font-size:12px; }
  .select-wrap select { margin-bottom: 0; }

  .modal-actions { display: flex; gap: 8px; margin-top: 4px; }
  .btn-save   { flex:1; background:rgba(0,212,255,0.15); border:1px solid rgba(0,212,255,0.4); border-radius:8px; color:#00d4ff; font-family:inherit; font-size:12px; font-weight:600; padding:9px; cursor:pointer; transition:all 0.15s; letter-spacing:1px; }
  .btn-save:hover { background:rgba(0,212,255,0.25); }
  .btn-cancel { flex:1; background:transparent; border:1px solid #1e3a5a; border-radius:8px; color:#64748b; font-family:inherit; font-size:12px; padding:9px; cursor:pointer; transition:all 0.15s; letter-spacing:1px; }
  .btn-cancel:hover { border-color:#64748b; color:#94a3b8; }
  .btn-reset  { background:transparent; border:1px solid #3a1a1a; border-radius:8px; color:#6b2a2a; font-family:inherit; font-size:11px; padding:9px 12px; cursor:pointer; transition:all 0.15s; letter-spacing:1px; }
  .btn-reset:hover { border-color:#ef4444; color:#ef4444; }

  .footer { margin-top: 10px; display: flex; justify-content: space-between; font-size: 10px; color: #1e3050; letter-spacing: 1px; flex-wrap: wrap; gap: 4px; }
  .empty { text-align: center; padding: 32px; color: #243040; letter-spacing: 1px; font-size: 12px; }
`;

class NetworkScannerCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._lang = "ro";
    this._filter = "";
    this._devices = [];
    this._lastUpdated = null;
    this._config = {};
    this._mappings = this._loadMappings();
  }

  _loadMappings() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); }
    catch { return {}; }
  }

  _saveMappings() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(this._mappings)); }
    catch {}
  }

  setConfig(config) {
    this._config = config;
    this._lang = config.language || "ro";
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    const entity = this._config.entity || "sensor.network_scanner";
    const state = hass.states[entity];
    if (state) {
      this._devices = state.attributes.devices || [];
      this._lastUpdated = state.last_updated;
    }
    this._renderTable();
    this._updateBadges();
  }

  _getDeviceDisplay(d) {
    const m = this._mappings[d.mac] || {};
    return {
      name: m.name || d.name || "—",
      type: m.type || d.type || "Other",
      isCustom: !!(m.name || m.type),
    };
  }

  _render() {
    const shadow = this.shadowRoot;
    shadow.innerHTML = `<style>${CSS}</style>
      <div class="card">
        <div class="topbar"></div>
        <div class="grid-bg"></div>
        <div class="header">
          <div class="title"><div class="pulse"></div><span id="title-text"></span></div>
          <div class="right">
            <div class="flags" id="flags"></div>
            <div class="badge" id="badge-count"></div>
            <div class="badge" id="badge-time"></div>
          </div>
        </div>
        <div class="search-wrap">
          <span class="search-icon">⌕</span>
          <input type="text" id="search" />
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr id="thead-row"></tr></thead>
            <tbody id="tbody"><tr><td colspan="8" class="empty">Loading…</td></tr></tbody>
          </table>
        </div>
        <div class="footer">
          <span>${this._config.entity || "sensor.network_scanner"}</span>
          <span id="footer-info"></span>
        </div>
      </div>`;

    const flagsEl = shadow.getElementById("flags");
    Object.keys(FLAGS).forEach(lang => {
      const btn = document.createElement("button");
      btn.className = "flag-btn" + (lang === this._lang ? " active" : "");
      btn.dataset.lang = lang;
      btn.textContent = FLAGS[lang];
      btn.title = lang.toUpperCase();
      btn.addEventListener("click", () => {
        this._lang = lang;
        shadow.querySelectorAll(".flag-btn").forEach(b => b.classList.toggle("active", b.dataset.lang === lang));
        this._applyLang();
        this._renderTable();
        this._updateBadges();
      });
      flagsEl.appendChild(btn);
    });

    shadow.getElementById("search").addEventListener("input", e => {
      this._filter = e.target.value;
      this._renderTable();
    });

    this._applyLang();
    this._renderTable();
    this._updateBadges();
  }

  _applyLang() {
    const l = LANGS[this._lang];
    const shadow = this.shadowRoot;
    shadow.getElementById("title-text").textContent = l.title;
    shadow.getElementById("search").placeholder = "🔍  " + l.filter;
    shadow.getElementById("thead-row").innerHTML =
      l.cols.map((c, i) =>
        i === 0 ? `<th style="width:36px"></th>`
        : i === l.cols.length - 1 ? `<th style="width:44px"></th>`
        : `<th>${c}</th>`
      ).join("");
  }

  _updateBadges() {
    const l = LANGS[this._lang];
    const shadow = this.shadowRoot;
    const time = this._lastUpdated
      ? new Date(this._lastUpdated).toLocaleTimeString([], { hour:"2-digit", minute:"2-digit" })
      : "—";
    shadow.getElementById("badge-count").innerHTML = `${l.devices}: <span>${this._devices.length}</span>`;
    shadow.getElementById("badge-time").innerHTML  = `${l.updated}: <span>${time}</span>`;
  }

  _renderTable() {
    const l = LANGS[this._lang];
    const q = this._filter.toLowerCase();
    const shadow = this.shadowRoot;

    const filtered = this._devices.filter(d => {
      const disp = this._getDeviceDisplay(d);
      return [d.ip, d.mac, disp.name, d.vendor, d.hostname, disp.type]
        .some(v => (v||"").toLowerCase().includes(q));
    });

    shadow.getElementById("footer-info").textContent = q
      ? l.showing(filtered.length, this._devices.length)
      : l.all(this._devices.length);

    const tbody = shadow.getElementById("tbody");

    if (!this._devices.length) {
      tbody.innerHTML = `<tr><td colspan="8" class="empty">⊘ No data from ${this._config.entity || "sensor.network_scanner"}</td></tr>`;
      return;
    }
    if (!filtered.length) {
      tbody.innerHTML = `<tr><td colspan="8" class="empty">⊘ No match</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.map((d, i) => {
      const disp = this._getDeviceDisplay(d);
      const customDot = disp.isCustom ? `<span class="custom-badge" title="${l.edited}"></span>` : "";
      return `
        <tr>
          <td><div class="dot"></div></td>
          <td class="col-ip">${d.ip || "—"}</td>
          <td class="col-host">${d.hostname || "—"}</td>
          <td class="col-name">${getIcon(disp.type)} ${disp.name}${customDot}</td>
          <td><span class="type-badge ${getTypeClass(disp.type)}">${disp.type}</span></td>
          <td class="col-vendor">${d.vendor || "—"}</td>
          <td class="col-mac">${d.mac || "—"}</td>
          <td><button class="edit-btn" data-index="${i}" title="${l.edit}">✎</button></td>
        </tr>`;
    }).join("");

    tbody.querySelectorAll(".edit-btn").forEach(btn => {
      btn.addEventListener("click", e => {
        this._openModal(filtered[parseInt(e.currentTarget.dataset.index)]);
      });
    });
  }

  _openModal(device) {
    const l = LANGS[this._lang];
    const shadow = this.shadowRoot;
    const existing = this._mappings[device.mac] || {};

    const old = shadow.getElementById("ns-modal");
    if (old) old.remove();

    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.id = "ns-modal";

    const typeOptions = DEVICE_TYPES.map(t =>
      `<option value="${t}" ${(existing.type || device.type || "") === t ? "selected" : ""}>${getIcon(t.toLowerCase())} ${t}</option>`
    ).join("");

    const hasCustom = !!(existing.name || existing.type);

    overlay.innerHTML = `
      <div class="modal">
        <div class="modal-title">${l.edit}</div>
        <div class="modal-mac">${device.mac} · ${device.ip}</div>
        <label>${l.name}</label>
        <input type="text" id="modal-name" value="${existing.name || device.name || ""}" placeholder="${device.name || ""}">
        <label>${l.type}</label>
        <div class="select-wrap"><select id="modal-type">${typeOptions}</select></div>
        <div class="modal-actions">
          <button class="btn-save" id="modal-save">${l.save}</button>
          <button class="btn-cancel" id="modal-cancel">${l.cancel}</button>
          ${hasCustom ? `<button class="btn-reset" id="modal-reset">${l.reset}</button>` : ""}
        </div>
      </div>`;

    overlay.addEventListener("click", e => { if (e.target === overlay) overlay.remove(); });

    overlay.querySelector("#modal-save").addEventListener("click", () => {
      const name = overlay.querySelector("#modal-name").value.trim();
      const type = overlay.querySelector("#modal-type").value;
      if (!this._mappings[device.mac]) this._mappings[device.mac] = {};
      if (name) this._mappings[device.mac].name = name;
      else delete this._mappings[device.mac].name;
      this._mappings[device.mac].type = type;
      this._saveMappings();
      overlay.remove();
      this._renderTable();
    });

    overlay.querySelector("#modal-cancel").addEventListener("click", () => overlay.remove());

    const resetBtn = overlay.querySelector("#modal-reset");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        delete this._mappings[device.mac];
        this._saveMappings();
        overlay.remove();
        this._renderTable();
      });
    }

    shadow.appendChild(overlay);
    setTimeout(() => overlay.querySelector("#modal-name").focus(), 50);
  }

  getCardSize() { return Math.ceil(this._devices.length / 3) + 2; }
  static getStubConfig() { return { entity: "sensor.network_scanner", language: "ro" }; }
}

customElements.define("network-scanner-card", NetworkScannerCard);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "network-scanner-card",
  name: "Network Scanner Card",
  description: "Displays devices from network_scanner with inline rename & type editor.",
  preview: false,
});
