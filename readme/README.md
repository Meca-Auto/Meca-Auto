# 🔒 Système de Gestion des Cookies RGPD

## Vue d'ensemble

Système complet, moderne et conforme RGPD pour gérer le consentement des cookies sur votre site Meca Auto. 

**Caractéristiques:**
- ✅ Bannière élégante et responsive
- ✅ Conforme RGPD/CNIL
- ✅ 100% JavaScript vanilla (zéro dépendance)
- ✅ Modale de personnalisation
- ✅ Sauvegarde dans localStorage
- ✅ Animations fluides
- ✅ Lien "Gérer mes cookies" dynamique

---

## 📁 Fichiers

```
meca auto v3/
├── index.html                      (votre site)
├── politique-confidentialite.html  (mise à jour requise)
├── mentions-legales.html
├── cookies-consent.css             (styles bannière)
├── cookies-consent.js              (logique JavaScript)
├── COOKIES-INTEGRATION.html        (guide d'intégration)
└── README.md                       (ce fichier)
```

---

## ⚡ Intégration rapide (3 étapes)

### 1️⃣ Ajouter le CSS
Dans la section `<head>` de votre `index.html`:
```html
<link rel="stylesheet" href="cookies-consent.css">
```

### 2️⃣ Ajouter le JavaScript
Avant la fermeture `</body>`:
```html
<script defer src="cookies-consent.js"></script>
```

### 3️⃣ Tester
Ouvrez votre site - la bannière apparaît automatiquement! 🎉

---

## 🎨 Architecture et Fonctionnement

### Structure HTML
- **Bannière** : Affichée au premier chargement
- **Modale** : Panneau détaillé de personnalisation
- **Overlay** : Fond grisé pour la modale

### Types de cookies gérés

| Type | Description | Obligatoire |
|------|-------------|------------|
| **Essential** | Fonctionnement du site | ✅ Oui |
| **Analytics** | Google Analytics, Matomo | ❌ Non |
| **Marketing** | Facebook Pixel, Google Ads | ❌ Non |
| **Preferences** | Langue, thème, localisation | ❌ Non |

### Flux utilisateur

```
Premiers visit → Bannière visible
    ↓
Clique sur "Accepter" → Sauvegarde & Bannière ferme
              OU
Clique sur "Refuser" → Sauvegarde (essentiels seulement) & Bannière ferme
              OU
Clique sur "Personnaliser" → Modale s'ouvre
    ↓
Bascule les toggles → Choisit ses préférences
    ↓
Clique "Enregistrer" → Sauvegarde et Modale ferme
```

---

## 💾 Stockage des données

### localStorage (clé: `meca-auto-cookies-consent`)

```json
{
  "preferences": {
    "essential": true,
    "analytics": false,
    "marketing": false,
    "preferences": false
  },
  "timestamp": 1708105200000,
  "expirationDate": "2027-02-16T10:00:00.000Z"
}
```

**Durée:** 12 mois (modifiable dans le code)

---

## 🔧 API et Méthodes

### Vérifier l'acceptation
```javascript
// Dans vos scripts existants
if (window.cookiesConsent.isAccepted('analytics')) {
    // Charger Google Analytics
    loadGoogleAnalytics();
}
```

### Écouter les changements
```javascript
window.addEventListener('cookiesConsentChanged', (event) => {
    console.log('Action:', event.detail.action); // acceptAll, rejectAll, customized
    console.log('Préférences:', event.detail.preferences);
});
```

### Afficher la modale manuellement
```javascript
// Depuis un bouton ou lien
window.cookiesConsent.showModal();
```

### Réinitialiser (test)
```javascript
window.cookiesConsent.reset(); // Supprime localStorage et recharge
```

---

## 📱 Responsive Design

- ✅ **Desktop** : 3 boutons sur une ligne
- ✅ **Tablette** : Boutons organisés efficacement
- ✅ **Mobile** : Boutons empilés verticalement

---

## 🎨 Personnalisation des couleurs

Éditez les variables CSS au début de `cookies-consent.css`:

```css
:root {
    --primary-color: #ef4444;      /* Rouge - Couleur principale */
    --primary-dark: #dc2626;       /* Rouge foncé sur survol */
    --text-dark: #1e293b;          /* Texte sombre */
    --text-light: #64748b;         /* Texte clair */
    --border-color: #e2e8f0;       /* Bordures */
}
```

---

## 🔐 Conformité RGPD

### Points validés by CNIL

✅ **Consentement explicite** - L'utilisateur doit cliquer pour accepter  
✅ **Pas de pré-coché** - Tous les cookies non-essentiels sont OFF par défaut  
✅ **Refus aussi facile** - Bouton "Refuser tous" aussi visible que "Accepter"  
✅ **Granularité** - Choix par catégorie de cookies  
✅ **Transparence** - Descriptions claires dans la modale  
✅ **Droit de révocation** - L'utilisateur peut changer ses préférences  
✅ **Réversibilité** - Lien "Gérer mes cookies" accessible partout  

### À faire sur votre site

1. **Mettre à jour `politique-confidentialite.html`** avec une section "Cookies"
2. **Respecter les consentements** dans votre code (voir exemple Google Analytics ci-dessous)
3. **Tester la conformité** avec cookies-consent.js

---

## 📊 Intégration des analytics

### Google Analytics (exemple complet)

```javascript
// Dans un script séparé ou dans votre HTML
<script>
// Attendre le chargement du système de cookies
document.addEventListener('DOMContentLoaded', () => {
    // Vérifier le consentement
    if (window.cookiesConsent && window.cookiesConsent.isAccepted('analytics')) {
        // Initialiser Google Analytics
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G_YOUR_MEASUREMENT_ID', {
            'anonymize_ip': true
        });
        
        // Charger le script GA
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=G_YOUR_MEASUREMENT_ID';
        document.head.appendChild(script);
    }
    
    // Recharger les analytics si l'utilisateur accepte plus tard
    window.addEventListener('cookiesConsentChanged', (event) => {
        if (event.detail.preferences.analytics && !window.gtag) {
            location.reload(); // Recharger pour initialiser GA
        }
    });
});
</script>
```

---

## 🧪 Tester le système

### Test sur desktop
1. Ouvrez votre site
2. Vous devriez voir la bannière en bas
3. Testez chaque bouton
4. Ouvrez DevTools (F12) → Application → Local Storage

### Test sur mobile
1. Accédez au site sur mobile
2. Les boutons doivent être empilés
3. La modale doit être responsive

### Réinitialiser pour retester
```javascript
// Dans la console du navigateur
window.cookiesConsent.reset()
```

---

## 🚀 Cas d'usage avancés

### Charger un script seulement si accepté

```javascript
if (window.cookiesConsent.isAccepted('marketing')) {
    // Charger Facebook Pixel
    const fbScript = document.createElement('script');
    fbScript.innerHTML = `
        !function(f,b,e,v,n,t,s){...}(window,document,'script');
    `;
    document.body.appendChild(fbScript);
}
```

### Tracker un événement conditionnel

```javascript
window.addEventListener('cookiesConsentChanged', (event) => {
    if (event.detail.action === 'acceptAll') {
        console.log('✅ Tous les cookies acceptés!');
    } else if (event.detail.action === 'rejectAll') {
        console.log('❌ Tous les cookies refusés');
    }
});
```

---

## 🐛 Troubleshooting

### La bannière n'apparaît pas
- ❓ Le CSS est-il chargé? (F12 → Network → CSS)
- ❓ Le JS est-il chargé? (F12 → Network → JS)
- ❓ Y a-t-il des erreurs dans la console? (F12 → Console)

### localStorage ne sauvegarde pas
- ❓ Mode privé activé?
- ❓ localStorage activé dans les paramètres?
- ❓ Clé correcte: `meca-auto-cookies-consent`

### Conflit avec Tailwind CSS
- Le système utilise des classes CSS sans préfixe
- Si conflit, préfixez les classes du système dans le CSS

---

## 📄 License et utilisation

Ce système est fourni libre d'utilisation pour votre site Meca Auto.
Libre de le modifier, personnaliser, ou redistributuer.

---

## 📞 Support et maintenance

**Questions?** Vérifiez:
1. La console JS (F12 → Console)
2. Le fichier COOKIES-INTEGRATION.html (guide détaillé)
3. Le localStorage (F12 → Application → Local Storage)

**Besoin de modifier?**
- Textes → Éditez les fonctions `createBanner()` et `createModal()`
- Couleurs → Éditez les variables CSS au début de `cookies-consent.css`
- Logique → Éditez la classe `CookiesConsent` dans `cookies-consent.js`

---

## ✅ Checklist finale

- [ ] CSS chargé dans `<head>`
- [ ] JS chargé avant `</body>`
- [ ] Testez sur desktop et mobile
- [ ] localStorage fonctionne (F12)
- [ ] Bannière s'affiche au premier chargement
- [ ] Boutons fonctionnent correctement
- [ ] Modale s'ouvre et se ferme
- [ ] Politique de confidentialité mise à jour
- [ ] Analytics conditionnels (si applicable)
- [ ] Site RGPD conforme

---

**Version:** 1.0  
**Créé pour:** Meca Auto30 Saint-Dionisy  
**Conformité:** RGPD / CNIL ✅
