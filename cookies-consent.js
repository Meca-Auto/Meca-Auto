/* ========================================
   SYSTÈME DE GESTION DES COOKIES - JAVASCRIPT
   ======================================== */

class CookiesConsent {
    constructor(options = {}) {
        // Configuration par défaut
        this.config = {
            storageKey: 'cookies-consent-preferences',
            expirationDays: 365,
            bannerPosition: 'bottom',
            cookiesCategoryLabel: 'Paramètres des cookies',
            modalTitle: '🔒 Préférences de Cookies',
            ...options
        };

        // État initial
        this.preferences = {
            essential: true,      // Toujours accepté
            analytics: false,
            marketing: false,
            preferences: false
        };

        this.consentGiven = false;
        this.init();
    }

    /**
     * Initialisation du système
     */
    init() {
        // Charger les préférences sauvegardées
        this.loadPreferences();

        // Si pas de consentement précédent, afficher la bannière
        if (!this.consentGiven) {
            this.createBanner();
            this.createModal();
            this.showBanner();
        }

        // Ajouter le lien "Gérer mes cookies" dans le footer (optionnel)
        this.addManageLink();
    }

    /**
     * Créer la bannière de consentement
     */
    createBanner() {
        if (document.getElementById('cookies-banner')) return;

        const banner = document.createElement('div');
        banner.id = 'cookies-banner';
        banner.className = 'cookies-banner';
        banner.innerHTML = `
            <div class="cookies-container">
                <div class="cookies-content">
                    <p class="cookies-title">
                        <span class="cookies-icon">🍪</span>
                        Paramètres des Cookies
                    </p>
                    <p class="cookies-description">
                        Nous utilisons des cookies pour améliorer votre expérience. 
                        Les cookies non-essentiels sont désactivés par défaut. 
                        <a href="#" onclick="window.cookiesConsent.showModal(); return false;">
                            En savoir plus
                        </a>
                    </p>
                </div>
                <div class="cookies-buttons">
                    <button class="cookies-btn cookies-btn-reject" onclick="window.cookiesConsent.rejectAll()">
                        ❌ Refuser tous
                    </button>
                    <button class="cookies-btn cookies-btn-customize" onclick="window.cookiesConsent.showModal()">
                        ⚙️ Personnaliser
                    </button>
                    <button class="cookies-btn cookies-btn-accept" onclick="window.cookiesConsent.acceptAll()">
                        ✓ Accepter tous
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(banner);
    }

    /**
     * Créer la modale de personnalisation
     */
    createModal() {
        if (document.getElementById('cookies-modal-overlay')) return;

        const overlay = document.createElement('div');
        overlay.id = 'cookies-modal-overlay';
        overlay.className = 'cookies-modal-overlay hidden';
        overlay.innerHTML = `
            <div class="cookies-modal">
                <div class="cookies-modal-header">
                    <h2 class="cookies-modal-title">
                        <span style="font-size: 24px;">🔒</span>
                        Préférences de Cookies
                    </h2>
                    <button 
                        class="cookies-modal-close" 
                        onclick="window.cookiesConsent.hideModal()"
                        aria-label="Fermer"
                    >
                        ✕
                    </button>
                </div>
                <div class="cookies-modal-content">
                    <!-- Cookies Essentiels -->
                    <div class="cookies-section">
                        <h3 class="cookies-section-title">🔴 Cookies Essentiels</h3>
                        <p class="cookies-section-description">
                            Ces cookies sont obligatoires pour le fonctionnement du site. 
                            Ils ne peuvent pas être désactivés.
                        </p>
                        <div class="cookies-toggle">
                            <label class="cookies-toggle-label">
                                Essentiels (obligatoires)
                            </label>
                            <button 
                                class="switch active" 
                                disabled 
                                onclick="return false"
                                aria-label="Cookies essentiels (toujours activés)"
                            ></button>
                        </div>
                    </div>

                    <!-- Cookies Analytiques -->
                    <div class="cookies-section">
                        <h3 class="cookies-section-title">📊 Cookies Analytiques</h3>
                        <p class="cookies-section-description">
                            Ces cookies nous permettent de comprendre comment vous utilisez le site 
                            (pages visitées, durée de visite, etc.) pour l'améliorer.
                        </p>
                        <div class="cookies-toggle">
                            <label class="cookies-toggle-label">
                                Analytics (Google Analytics, Matomo...)
                            </label>
                            <button 
                                class="switch" 
                                data-type="analytics"
                                onclick="window.cookiesConsent.toggleCookie('analytics'); return false"
                                aria-label="Activer/désactiver les cookies analytiques"
                            ></button>
                        </div>
                    </div>

                    <!-- Cookies Marketing -->
                    <div class="cookies-section">
                        <h3 class="cookies-section-title">🎯 Cookies Marketing</h3>
                        <p class="cookies-section-description">
                            Ces cookies permettent des publicités ciblées et la mesure 
                            de l'efficacité des campagnes marketing.
                        </p>
                        <div class="cookies-toggle">
                            <label class="cookies-toggle-label">
                                Marketing (Facebook, Google Ads...)
                            </label>
                            <button 
                                class="switch" 
                                data-type="marketing"
                                onclick="window.cookiesConsent.toggleCookie('marketing'); return false"
                                aria-label="Activer/désactiver les cookies marketing"
                            ></button>
                        </div>
                    </div>

                    <!-- Cookies de Préférences -->
                    <div class="cookies-section">
                        <h3 class="cookies-section-title">❤️ Cookies de Préférences</h3>
                        <p class="cookies-section-description">
                            Ces cookies mémorisent vos choix et préférences 
                            (langue, région, thème...) pour personnaliser votre expérience.
                        </p>
                        <div class="cookies-toggle">
                            <label class="cookies-toggle-label">
                                Préférences (langue, thème...)
                            </label>
                            <button 
                                class="switch" 
                                data-type="preferences"
                                onclick="window.cookiesConsent.toggleCookie('preferences'); return false"
                                aria-label="Activer/désactiver les cookies de préférences"
                            ></button>
                        </div>
                    </div>

                    <!-- Informations légales -->
                    <div class="cookies-section" style="margin-bottom: 0; padding-bottom: 0; border-bottom: none;">
                        <p style="font-size: 12px; color: #64748b; margin: 0; line-height: 1.6;">
                            📋 Durée de conservation : L'expiration est fixée à 12 mois.<br/>
                            ⚖️ Pour plus d'informations, consultez notre 
                            <a href="politique-confidentialite.html" style="color: #ef4444; text-decoration: none; font-weight: 600;">
                                politique de confidentialité
                            </a>
                        </p>
                    </div>
                </div>
                <div class="cookies-modal-footer">
                    <button 
                        class="cookies-btn cookies-btn-reject" 
                        onclick="window.cookiesConsent.rejectAll()"
                    >
                        ❌ Tout refuser
                    </button>
                    <button 
                        class="cookies-btn cookies-btn-accept" 
                        onclick="window.cookiesConsent.acceptCustomized()"
                    >
                        ✓ Enregistrer & fermer
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        // Fermer la modale en cliquant en dehors
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.hideModal();
            }
        });

        // Mettre à jour l'état des switches
        this.updateSwitches();
    }

    /**
     * Basculer un type de cookie
     */
    toggleCookie(type) {
        this.preferences[type] = !this.preferences[type];
        this.updateSwitches();
    }

    /**
     * Mettre à jour l'état visuel des switches
     */
    updateSwitches() {
        ['analytics', 'marketing', 'preferences'].forEach(type => {
            const switchBtn = document.querySelector(`[data-type="${type}"]`);
            if (switchBtn) {
                if (this.preferences[type]) {
                    switchBtn.classList.add('active');
                } else {
                    switchBtn.classList.remove('active');
                }
            }
        });
    }

    /**
     * Afficher la bannière
     */
    showBanner() {
        const banner = document.getElementById('cookies-banner');
        if (banner) {
            banner.classList.remove('hidden', 'fade-out');
        }
    }

    /**
     * Masquer la bannière avec animation
     */
    hideBanner() {
        const banner = document.getElementById('cookies-banner');
        if (banner) {
            banner.classList.add('fade-out');
            setTimeout(() => {
                banner.classList.add('hidden');
            }, 300);
        }
    }

    /**
     * Afficher la modale
     */
    showModal() {
        const overlay = document.getElementById('cookies-modal-overlay');
        if (overlay) {
            overlay.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Empêcher le scroll
        }
    }

    /**
     * Masquer la modale
     */
    hideModal() {
        const overlay = document.getElementById('cookies-modal-overlay');
        if (overlay) {
            overlay.classList.add('hidden');
            document.body.style.overflow = ''; // Restaurer le scroll
        }
    }

    /**
     * Accepter tous les cookies
     */
    acceptAll() {
        this.preferences = {
            essential: true,
            analytics: true,
            marketing: true,
            preferences: true
        };
        this.savePrefences();
        this.hideBanner();
        this.hideModal();
        this.fireBannerClosedEvent('acceptAll');
    }

    /**
     * Refuser tous les cookies non-essentiels
     */
    rejectAll() {
        this.preferences = {
            essential: true,
            analytics: false,
            marketing: false,
            preferences: false
        };
        this.savePrefences();
        this.hideBanner();
        this.hideModal();
        this.fireBannerClosedEvent('rejectAll');
    }

    /**
     * Accepter la personnalisation
     */
    acceptCustomized() {
        this.savePrefences();
        this.hideBanner();
        this.hideModal();
        this.fireBannerClosedEvent('customized');
    }

    /**
     * Sauvegarder les préférences dans localStorage
     */
    savePrefences() {
        const data = {
            preferences: this.preferences,
            timestamp: new Date().getTime(),
            expirationDate: new Date(Date.now() + this.config.expirationDays * 24 * 60 * 60 * 1000).toISOString()
        };
        localStorage.setItem(this.config.storageKey, JSON.stringify(data));
        this.consentGiven = true;
    }

    /**
     * Charger les préférences depuis localStorage
     */
    loadPreferences() {
        const stored = localStorage.getItem(this.config.storageKey);
        
        if (stored) {
            try {
                const data = JSON.parse(stored);
                const expirationDate = new Date(data.expirationDate);
                
                // Vérifier si le consentement a expiré
                if (new Date() > expirationDate) {
                    localStorage.removeItem(this.config.storageKey);
                    this.consentGiven = false;
                } else {
                    this.preferences = data.preferences;
                    this.consentGiven = true;
                }
            } catch (e) {
                console.error('Erreur en chargeant les préférences de cookies:', e);
                this.consentGiven = false;
            }
        }
    }

    /**
     * Ajouter le lien "Gérer mes cookies" dans le footer
     */
    addManageLink() {
        // Chercher un élément footer ou créer un espace pour le lien
        const footer = document.querySelector('footer');
        
        if (footer) {
            if (!document.querySelector('.cookies-manage-link')) {
                const manageLink = document.createElement('button');
                manageLink.className = 'cookies-manage-link';
                manageLink.textContent = '🍪 Gérer mes cookies';
                manageLink.style.marginTop = '10px';
                manageLink.onclick = () => this.showModal();
                
                footer.appendChild(manageLink);
            }
        }
    }

    /**
     * Déclencher un événement personnalisé
     */
    fireBannerClosedEvent(action) {
        const event = new CustomEvent('cookiesConsentChanged', {
            detail: {
                action: action,
                preferences: this.preferences,
                timestamp: new Date().toISOString()
            }
        });
        window.dispatchEvent(event);
    }

    /**
     * Vérifier si un type de cookie est accepté
     */
    isAccepted(type) {
        return this.preferences[type] || false;
    }

    /**
     * Réinitialiser les préférences (utile pour les tests)
     */
    reset() {
        localStorage.removeItem(this.config.storageKey);
        location.reload();
    }
}

// Instanciation globale
document.addEventListener('DOMContentLoaded', () => {
    // Exposition globale pour y accéder depuis les événements HTML
    window.cookiesConsent = new CookiesConsent({
        storageKey: 'meca-auto-cookies-consent',
        expirationDays: 365
    });
});

// Export pour les modules si besoin
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CookiesConsent;
}
