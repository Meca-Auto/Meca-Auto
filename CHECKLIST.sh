#!/usr/bin/env bash
# ============================================
# 🔒 CHECKLIST D'INTÉGRATION - COOKIES RGPD
# ============================================
# 
# Ce script liste tous les éléments à vérifier pour une intégration complète
# Exécutez-le et cochez les éléments au fur et à mesure

echo "=================================="
echo "🔒 CHECKLIST INTÉGRATION COOKIES RGPD"
echo "=================================="
echo ""

# Vérifier les fichiers
echo "📁 ÉTAPE 1 - VÉRIFIER LES FICHIERS"
echo "===================================="

if [ -f "cookies-consent.css" ]; then
    echo "✅ cookies-consent.css présent"
else
    echo "❌ cookies-consent.css MANQUANT"
fi

if [ -f "cookies-consent.js" ]; then
    echo "✅ cookies-consent.js présent"
else
    echo "❌ cookies-consent.js MANQUANT"
fi

if [ -f "index.html" ]; then
    echo "✅ index.html présent"
else
    echo "❌ index.html MANQUANT"
fi

if [ -f "politique-confidentialite.html" ]; then
    echo "✅ politique-confidentialite.html présent"
else
    echo "❌ politique-confidentialite.html MANQUANT"
fi

echo ""
echo "📝 ÉTAPE 2 - VÉRIFIER L'INTÉGRATION"
echo "===================================="

# Vérifier le CSS dans index.html
if grep -q "cookies-consent.css" index.html; then
    echo "✅ CSS importé dans index.html"
else
    echo "❌ CSS NOT importé dans index.html"
    echo "   → Ajoutez dans <head>: <link rel=\"stylesheet\" href=\"cookies-consent.css\">"
fi

# Vérifier le JS dans index.html
if grep -q "cookies-consent.js" index.html; then
    echo "✅ JavaScript importé dans index.html"
else
    echo "❌ JavaScript NOT importé dans index.html"
    echo "   → Ajoutez avant </body>: <script defer src=\"cookies-consent.js\"></script>"
fi

echo ""
echo "📚 ÉTAPE 3 - FICHIERS DE DOCUMENTATION"
echo "======================================="

if [ -f "README.md" ]; then
    echo "✅ README.md présent (documentation générale)"
else
    echo "⚠️  README.md MANQUANT"
fi

if [ -f "COOKIES-INTEGRATION.html" ]; then
    echo "✅ COOKIES-INTEGRATION.html présent (guide détaillé)"
else
    echo "⚠️  COOKIES-INTEGRATION.html MANQUANT"
fi

if [ -f "EXAMPLE-INTEGRATION.html" ]; then
    echo "✅ EXAMPLE-INTEGRATION.html présent (exemple visuel)"
else
    echo "⚠️  EXAMPLE-INTEGRATION.html MANQUANT"
fi

if [ -f "FILES-SUMMARY.md" ]; then
    echo "✅ FILES-SUMMARY.md présent (résumé des fichiers)"
else
    echo "⚠️  FILES-SUMMARY.md MANQUANT"
fi

echo ""
echo "✅ ÉTAPE 4 - CONFORMITÉ RGPD"
echo "=============================="
echo ""
echo "💡 Points à vérifier manuellement:"
echo "  ☐ Bannière affichée au premier chargement"
echo "  ☐ 3 boutons: Accepter, Refuser, Personnaliser"
echo "  ☐ Modale de personnalisation fonctionne"
echo "  ☐ localStorage sauvegarde les préférences"
echo "  ☐ Lié 'Gérer mes cookies' visible dans le footer"
echo "  ☐ Animations fluides"
echo "  ☐ Design responsive (mobile, tablette, desktop)"
echo "  ☐ Politique de confidentialité mise à jour"
echo "  ☐ Google Analytics chargé SEULEMENT si accepté"
echo "  ☐ Aucun cookie non-essentiel avant consentement"
echo ""
echo "🌐 ÉTAPE 5 - TESTS NAVIGATEUR"
echo "=============================="
echo ""
echo "💡 Testez dans ces navigateurs:"
echo "  ☐ Chrome/Chromium (desktop)"
echo "  ☐ Firefox (desktop)"
echo "  ☐ Safari (desktop + iOS si possible)"
echo "  ☐ Edge (desktop)"
echo "  ☐ Mobile (iOS Safari, Chrome Android)"
echo ""
echo "🔧 ÉTAPE 6 - CONSOLE DÉVELOPPEUR"
echo "=================================="
echo ""
echo "💡 Ouvrez F12 et vérifiez:"
echo "  ☐ Pas d'erreurs en rouge dans la console"
echo "  ☐ CSS chargé correctement (F12 → Network)"
echo "  ☐ JS chargé correctement (F12 → Network)"
echo "  ☐ localStorage contient 'meca-auto-cookies-consent' (après interaction)"
echo "  ☐ DevTools → Elements: bannière présente dans le DOM"
echo ""
echo "🎨 ÉTAPE 7 - PERSONNALISATION (OPTIONNEL)"
echo "=========================================="
echo ""
echo "💡 Vous pouvez personnaliser:"
echo "  ☐ Couleurs: Modifier les variables CSS :root"
echo "  ☐ Textes: Éditer la fonction createBanner() en JavaScript"
echo "  ☐ Langue: Changer 'fr' en autre langue"
echo "  ☐ Durée de consentement: Paramètre expirationDays"
echo ""
echo "📄 ÉTAPE 8 - MISE À JOUR LÉGALE"
echo "================================"
echo ""
echo "💡 À faire ABSOLUMENT:"
echo "  ☐ Ajouter section 'Cookies' dans politique-confidentialite.html"
echo "  ☐ Décrire quels cookies vous utilisez"
echo "  ☐ Expliquer pourquoi chaque cookie"
echo "  ☐ Expliquer comment les refuser"
echo ""
echo "🧹 ÉTAPE 9 - NETTOYAGE (UNE FOIS INTÉGRÉ)"
echo "=========================================="
echo ""
echo "💡 Vous pouvez supprimer ces fichiers après intégration:"
echo "  ☐ COOKIES-INTEGRATION.html"
echo "  ☐ EXAMPLE-INTEGRATION.html"
echo "  ☐ Ce script checklist"
echo ""
echo "=================================="
echo "✅ INTÉGRATION COMPLÈTE!"
echo "=================================="
echo ""
echo "📊 Résumé:"
echo "  • Fichiers CSS + JS: ✅ OBLIGATOIRES"
echo "  • Documentation: 📚 RÉFÉRENCE"
echo "  • Tests: 🧪 IMPORTANTS"
echo "  • Conformité RGPD: ⚖️ VÉRIFIÉE"
echo ""
echo "🚀 Vous êtes prêt à déployer!"
