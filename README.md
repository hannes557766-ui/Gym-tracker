# IronLog v3 - Modular Refactored Edition

Ein modernes, offline-fähiges Trainings-Tracking-App mit dunklem Modus und PWA-Support.

## ✨ Features

### Phase 1 (Umgesetzt)
- ✅ **Modular Architecture** - Saubere Aufteilung in Module
- ✅ **Dark Mode** - Toggle in den Einstellungen
- ✅ **PWA Support** - Service Worker für Offline-Nutzung
- ✅ **Manifest** - Installierbar als App
- ✅ **Responsive Design** - Optimiert für Mobile
- ✅ **LocalStorage** - Persistente Datenspeicherung

### Phase 2 (Geplant)
- 📅 History Screen mit Filterung
- 📊 Stats Screen mit Charts
- 📱 Verbessertes UI/UX
- 🔄 Undo/Redo System

### Phase 3 (Geplant)
- ☁️ Cloud-Sync
- 📤 CSV/PDF Export
- 🔔 Notifications
- 📈 Advanced Analytics

## 🏗️ Architektur

```
src/
├── js/
│   ├── app.js                 # Main app entry
│   ├── service-worker.js      # PWA offline support
│   ├── modules/
│   │   ├── workouts.js        # Workout management
│   │   ├── stats.js           # Statistics calculation
│   │   └── theme.js           # Dark mode management
│   ├── ui/
│   │   ├── renderer.js        # UI rendering utilities
│   │   └── screens/
│   │       ├── home.js        # Home screen
│   │       └── profile.js     # Profile screen
│   └── utils/
│       ├── storage.js         # LocalStorage abstraction
│       └── helpers.js         # Utility functions
├── styles/
│   └── main.css               # Global styles + dark mode
└── data/
    └── exercises.json         # Exercise database

public/
├── index.html                 # Main HTML
└── manifest.json              # PWA manifest
```

## 🚀 Installation & Development

### Requirements
- Node.js 16+
- Modern browser with ES6 modules support

### Setup

```bash
# Clone repository
git clone https://github.com/hannes557766-ui/Gym-tracker.git
cd Gym-tracker

# Install dependencies (optional, für lokale Entwicklung)
npm install

# Start local server
npm run dev
```

### Build

```bash
# Production build
npm run build
```

## 📱 PWA Installation

### Chrome/Edge
1. Öffne die App im Browser
2. Klick auf Menu (⋮) → "In App-Fenster installieren"
3. App wird auf Startbildschirm hinzugefügt

### iOS (über Web-Clip)
1. Öffne in Safari
2. Share → "Zum Home-Bildschirm"

## 🎨 Dark Mode

Automatische Erkennung von Betriebssystem-Preferenzen. Manuelles Toggle in den Profileinstellungen unter "Dunkler Modus".

## 📊 Datenstruktur

### Workout Object
```javascript
{
  id: 1,
  date: "2025-05-23",
  type: "Push",
  duration: 60,
  feeling: 4,
  notes: "Gutes Training",
  exercises: [
    {
      name: "Bankdrücken",
      sets: "4",
      reps: "8",
      kg: "95"
    }
  ]
}
```

## 🔐 Datenschutz

- ✅ Alle Daten werden lokal gespeichert
- ✅ Keine externe Datenübertragung
- ✅ Offline-fähig
- ✅ Export/Import jederzeit möglich

## 📄 Lizenz

MIT License - Siehe LICENSE file

## 🤝 Contributing

Pull Requests sind willkommen! Für größere Änderungen bitte erst ein Issue erstellen.

## 📞 Support

Bei Fragen oder Problemen öffne ein GitHub Issue.
