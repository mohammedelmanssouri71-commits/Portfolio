# Mohammed El-Manssouri — Portfolio

Portfolio professionnel full-stack développé avec **React 18** et un moteur i18n personnalisé (FR/EN).

---

## 📁 Architecture du projet

```
src/
├── i18n/
│   ├── index.jsx            # Moteur i18n (I18nProvider + useI18n hook)
│   └── locales/
│       ├── fr.json          # Traductions françaises
│       └── en.json          # Traductions anglaises
│
├── context/
│   └── ThemeContext.jsx     # Dark / Light mode (Provider + useTheme hook)
│
├── components/
│   ├── Navbar.jsx           # Navigation fixe responsive
│   ├── Footer.jsx           # Pied de page + réseaux sociaux
│   └── ui/
│       ├── TypewriterText.jsx   # Effet typewriter animé
│       ├── AnimatedCounter.jsx  # Compteur animé au scroll
│       ├── SkillBar.jsx         # Barre de compétence animée
│       ├── ProjectCard.jsx      # Carte projet avec hover
│       └── CertCard.jsx         # Carte certification
│
├── pages/
│   ├── Hero.jsx             # Section d'accueil
│   ├── About.jsx            # Profil, formation, langues
│   ├── Skills.jsx           # Compétences techniques par catégorie
│   ├── Projects.jsx         # Projets + lien GitHub
│   ├── Certifications.jsx   # Diplômes et certifications
│   └── Contact.jsx          # Formulaire + WhatsApp + anti-spam
│
├── data/
│   ├── skills.js            # Données des compétences
│   ├── projects.js          # Données des projets
│   └── certifications.js    # Données des certifications
│
├── hooks/
│   └── useIntersectionObserver.js  # Hook scroll-triggered visibility
│
├── styles/
│   └── globals.css          # CSS variables, reset, tokens de design
│
└── App.jsx                  # Racine : providers + layout
```

---

## 🚀 Lancer le projet

```bash
# 1. Installer les dépendances
npm install

# 2. Démarrer le serveur de développement
npm start
# → http://localhost:3000
```

---

## 🌐 i18n — Ajouter une traduction

1. Éditer `src/i18n/locales/fr.json` et `en.json`
2. Utiliser `useI18n()` dans vos composants :

```jsx
import { useI18n } from "../i18n";

function MyComponent() {
  const { t, lang, setLang } = useI18n();
  return <h1>{t("hero.greeting")}</h1>;
}
```

3. Pour obtenir un tableau JSON : `t("about.formation")` retourne le tableau directement.

---

## 🎨 Thème

Basculer dark/light via `useTheme()` :

```jsx
import { useTheme } from "../context/ThemeContext";

function Toggle() {
  const { dark, toggle } = useTheme();
  return <button onClick={toggle}>{dark ? "☀️" : "🌙"}</button>;
}
```

Le thème est persisté dans `localStorage` et suit `prefers-color-scheme` par défaut.

---

## ➕ Ajouter un projet

Éditer `src/data/projects.js` :

```js
{
  id: "mon-projet",
  title:        "Titre en français",
  title_en:     "Title in English",
  description:  "Description FR...",
  description_en: "Description EN...",
  tech: ["React", "Node.js"],
  github: "https://github.com/...",
  demo:   "https://mon-site.com",     // null si pas de démo
  inProgress: false,
  accentColor: "#ff6b6b",
  icon: "🛒",
}
```

---

## 📦 Déploiement — GitHub Pages

### 1. Mettre à jour `package.json`

```json
"homepage": "https://<USERNAME>.github.io/<REPO_NAME>"
```

### 2. Créer le dépôt GitHub et pousser le code

```bash
git init
git add .
git commit -m "feat: initial portfolio"
git remote add origin https://github.com/<USERNAME>/<REPO_NAME>.git
git push -u origin main
```

### 3. Déployer

```bash
npm run deploy
```

Cette commande :
- Exécute `npm run build` → génère le dossier `build/`
- Pousse `build/` sur la branche `gh-pages` via le package `gh-pages`

### 4. Activer GitHub Pages

Dans votre dépôt GitHub :
- **Settings** → **Pages**
- **Source** : branche `gh-pages`, dossier `/ (root)`
- Cliquer **Save**

Votre site sera disponible à l'URL définie dans `homepage` après 1–2 minutes.

### 5. Mises à jour futures

```bash
# Modifier le code, puis :
npm run deploy
```

---

## 📬 Intégration email (Contact)

Le formulaire simule l'envoi. Pour un vrai envoi, intégrer **EmailJS** :

```bash
npm install @emailjs/browser
```

Dans `Contact.jsx`, remplacer le `setTimeout` par :

```js
import emailjs from "@emailjs/browser";

emailjs.send(
  "SERVICE_ID",
  "TEMPLATE_ID",
  { name: form.name, email: form.email, message: form.message },
  "PUBLIC_KEY"
).then(() => setStatus("sent"));
```

Créer un compte gratuit sur [emailjs.com](https://emailjs.com) pour obtenir vos clés.

---

## 🔧 Technologies

| Catégorie | Outil |
|-----------|-------|
| UI | React 18 |
| i18n | Moteur maison (Context + JSON) |
| Styles | CSS Variables + CSS Modules |
| Animations | CSS Keyframes + Intersection Observer |
| Déploiement | GitHub Pages + gh-pages |
