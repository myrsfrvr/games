# 🎮 Web Games Collection | Kolekce webových her

🇨🇿 [Česky](#cesky) | 🇬🇧 [English](#english)

## Česky

Toto je můj osobní projekt: webová stránka, kde tvořím a sbírám malé webové hry. Slouží jako hřiště pro procvičování webového vývoje a zároveň jako portfolio pro ukázku mých dovedností. Na hlavní stránce najdete seznam všech dostupných her.

Projekt byl v dubnu 2026 přepsán pomocí Reactu. Původní verze ve vanilla JavaScriptu je uložená ve větvi backup-vanilla.

## Live ukázka

Projekt je nasazen na platformě Netlify a je dostupný [zde](https://games-ppopova.netlify.app).

---

## Všechny hry

### 🃏 Memory Cards

Klasická paměťová hra, ve které hráč otáčí karty a snaží se najít všechny dvojice dříve, než vyprší čas.

- Komponentová architektura v Reactu s důrazem na znovupoužitelné UI prvky (herní karty, popupy, menu obrazovky, časovač, ovládací prvky).
- Správa stavu pomocí React hooků (useState, useEffect) pro řízení průběhu hry, časovače, výběru karet, párování, pauzy a restartu hry.
- Dynamické vykreslování herní plochy na základě datových struktur namísto staticky vytvořeného UI.
- Vlastní inicializace hry včetně zamíchání karet a řízených přechodů mezi jednotlivými stavy.
- Interaktivní uživatelské rozhraní obsahující pauzu, výherní/proherní obrazovky, overlaye a modální okna.
- Pokročilý CSS design využívající glassmorphism, gradienty, světelné efekty, animované pozadí a vlastní design hracích karet.
- Responzivní rozvržení optimalizované pro desktop, tablet i mobilní zařízení pomocí CSS Gridu, Flexboxu, media queries a jednotek rem.
- Znovupoužitelný systém popupů využitý pro menu pauzy, výsledkové obrazovky i pravidla hry.

#### Screenshoty

##### Hlavní menu

![Memory Cards menu](screenshots/memory-game-menu.png)

##### Herní obrazovka

![Memory Cards gameplay](screenshots/memory-game-cards.png)

### 🔢 Guess the Sequence (Uhádni sekvenci)

Logická hra, kde je cílem hráčů rozluštit skrytý čtyřmístný kód pomocí strategické zpětné vazby.

- Deklarativní UI: znovupoužitelné komponenty Reactu vytvořené rozdělením komplexních UI prvků (tabulky tipů, popupy, výsledkové zprávy).
- Pokročilá správa stavu (sledování historie tipů, validace vstupu, logika ukončení hry).
- Hook useEffect pro spouštění oslavných efektů a řízení přechodů ve hře (canvas-confetti).
- Validace vstupu v reálném čase pomocí regulárních výrazů.
- Responzivní webdesign (Mobile-First přístup, Flexbox, media queries, jednotky rem, CSS proměnné).

---

#### Screenshot

![Guess the Sequence screenshot](screenshots/guess-sequence.png)

## 🛠️ Technologie

- React s nástrojem Vite
- JavaScript (ES6+)
- CSS3

## 🚀 Plány do budoucna

- Přidat další hry do kolekce.
- Vylepšit uživatelské rozhraní pomocí animací a celkového vizuálního doladění.
- Vylepšit animaci a přidat úrovně obtížnosti ve hře Memory Cards.

---

## English

This is my personal project: a website where I build and collect small web games.  
It’s both a playground for practicing web development and a portfolio project to showcase my skills.  
The home page lists all available games.

Project was rewritten using React in April 2026. The old vanilla JS version is stored on backup-vanilla branch.

## Live Demo

The project is deployed on Netlify and can be accessed [here](https://games-ppopova.netlify.app).

---

## All Games

### 🃏 Memory Cards

A classic memory game where players flip cards and try to match all pairs before the timer runs out.

- Component-based React architecture with reusable UI elements (game cards, popups, menu screens, timer, action controls).
- State management using React hooks (useState, useEffect) for game flow, timer logic, card selection, matching logic, pause state, and game reset functionality.
- Dynamic rendering of game boards from data structures rather than hardcoded UI.
- Custom game initialization with card shuffling and controlled state transitions.
- Interactive UI states including pause screen, win/lose conditions, overlays, and modal dialogs.
- Advanced CSS styling featuring glassmorphism effects, gradients, glowing elements, animated backgrounds, and custom card designs.
- Responsive layout optimized for desktop, tablet, and mobile devices using CSS Grid, Flexbox, media queries, and scalable rem units.
- Reusable popup system supporting pause menus, game results, and rules display.

#### Screenshots

##### Main Menu

![Memory Cards menu](screenshots/memory-game-menu.png)

##### Gameplay

![Memory Cards gameplay](screenshots/memory-game-cards.png)

### 🔢 Guess the Sequence

A logic-based puzzle game where players must crack a hidden 4-digit code using strategic feedback.

- Declarative UI: React's reusable components made from breaking down complex UI elements (Guess Tables, Popups, Result Messages).
- Advanced state management (guess history tracking, input validation, game-over logic).
- The useEffect hook to trigger celebratory effects and manage game transitions (canvas-confetti).
- Real-time regex-based input validation.
- Responsive web design (Mobile-First approach, Flexbox, Media queries, using rem units, CSS variables).

#### Screenshots

![Guess the Sequence screenshot](screenshots/guess-sequence.png)

---

## 🛠️ Built With

- React with Vite
- JavaScript (ES6+)
- CSS3

---

## 🚀 Future Plans

- Add more games to the collection.
- Improve the UI with animations and polish.
- Improve animation and add difficulty levels in Memory Cards.
