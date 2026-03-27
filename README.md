# TTC Klingenmünster – Vereinswebsite

Dies ist die offizielle Website des **TTC Klingenmünster** (Tischtennisclub Klingenmünster). Die Seite dient als zentrale Informationsplattform für Mitglieder, Interessierte und Gäste des Vereins – mit Neuigkeiten, Trainingszeiten, Mannschaftsinformationen und mehr.

## Technologien

### Frontend
- **Next.js 14** – React-Framework mit Server-Side Rendering und statischer Generierung
- **React 18**
- **React Aria** – Barrierefreie UI-Komponentenbibliothek (Adobe)
- **Tailwind CSS 4** – Utility-first CSS-Framework für das Styling
- **Tiptap** – Rich-Text-Editor für Inhalte
- **Axios** – HTTP-Client für API-Anfragen
- **Lucide React / Font Awesome** – Icon-Bibliotheken
- **TypeScript** – Typsicherheit im Frontend-Code

### Backend
- **Strapi 4** – Headless CMS für die Inhaltsverwaltung
- **SQLite** (via `better-sqlite3`) – Datenbank für Entwicklung und Produktion
- **Puppeteer** – Headless-Browser für serverseitige Funktionen (z. B. PDF-Export)

### Deployment
- **Docker / Docker Compose** – Containerisierung von Frontend und Backend
- **Nginx** – Reverse Proxy für die Produktion

## Entwicklung

```bash
bun run dev
```

Startet das Frontend auf `localhost:3000` und das Backend (Strapi) auf `localhost:1337`.

## Umgebungsvariablen

### `/backend/.env`

```bash
HOST=0.0.0.0
PORT=1337
APP_KEYS="toBeModified1,toBeModified2"
API_TOKEN_SALT=tobemodified
ADMIN_JWT_SECRET=tobemodified
TRANSFER_TOKEN_SALT=tobemodified
JWT_SECRET=tobemodified
```

### `/frontend/.env.local`

```bash
# Für lokale Entwicklung
NEXT_PUBLIC_STRAPI_URL_PUBLIC=http://127.0.0.1:1337

# Für Deployment
# NEXT_PUBLIC_STRAPI_URL_PUBLIC=https://yourdomain.com

STRAPI_URL_LOCAL=http://127.0.0.1:1337
```

## Demo

[ttc-klingenmuenster.de](https://ttc-klingenmuenster.de/)
