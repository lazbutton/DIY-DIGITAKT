# Inventaire — Ma machine Norns intégrée

Tout ce que je possède (ou ai commandé) qui sert à construire la machine, + ce qu'il reste à acquérir.

## 🧠 Le cerveau

| Élément | Statut | Rôle |
|---|---|---|
| Raspberry Pi 4B (2-4GB) | ✅ possédé | Fait tourner Norns |
| Raspberry Pi 3B | ✅ possédé | MiniDexed / secours |
| Carte microSD (16-32GB) | ✅ possédé | Image Norns |

---

## 📺 Affichage

| Élément | Statut | Rôle |
|---|---|---|
| OLED NHD-2.7-12864WDW3 | 🛒 commandé Digikey | Écran principal Norns (SPI) |
| LCD1602 (kit Elegoo) | ✅ possédé | Afficheur texte 16×2 — PAS un OLED, mais utilisable (BPM, nom de programme) |
| OLED 0.96" SSD1306 | ❌ à acquérir (~4€) | Si écran graphique souhaité pour le module FX |

---

## 🎛️ Navigation Norns

| Élément | Statut | Rôle |
|---|---|---|
| 3× encodeurs Bourns PEC11R | 🛒 commandé Digikey | Navigation Norns (E1/E2/E3) |
| 3× boutons | ✅ récup possible (UA-3FX / Elegoo / TDS) | Touches Norns (K1/K2/K3) |

**Pinout Norns Shield (Pi → composants) :**
| Signal | GPIO |
|---|---|
| Écran MOSI/CLK/CS/DC | 10 / 11 / 8 / 7 |
| Encodeur 1 A/B | 4 / 27 |
| Encodeur 2 A/B | 24 / 23 |
| Encodeur 3 A/B | 12 / 25 |
| Boutons 1/2/3 | 22 / 26 / 5 |

---

## 🔊 Audio

| Élément | Statut | Rôle |
|---|---|---|
| Yamaha AG06 | ✅ possédé | Carte son / mixeur USB (entrées + sorties → idéal pour Norns) |
| HiFiBerry DAC+ Standard | ✅ possédé | Sortie audio I2S intégrée au boîtier (⚠️ sortie seule, pas d'entrée) |

> Choix : **AG06** (a des entrées → Norns complet avec sampling) OU **HiFiBerry** interne (sortie seule, boîtier autonome).

---

## 🎚️ Surface de contrôle — TDS Mixte 8 (reçu ✅)

Console récupérée et inventoriée. Composants exploitables :

| Composant | Quantité | Usage pour le contrôleur |
|---|---|---|
| Faders linéaires | ~10 (canaux 2-7 + AUX + S1 + S2) | MIDI CC (volumes, params Takt) |
| Potentiomètres rotatifs | ~14 (7 Aigüe + 7 Grave) | MIDI CC (filtres, params) |
| Interrupteurs à bascule 3 positions | ~7 (permanente/automate/fermée) | Mute / routing / toggles |
| Interrupteur marche/arrêt | 1 | Alimentation |
| LEDs | 8 (rouges) | Indicateurs pilotés par Pico (via 74HC595) |
| Bouton poussoirs | 7
| Châssis métal + façade | 1 | **Boîtier de la machine Norns ou boitier de Edirol UA-3FX** |

**Électronique de lecture :**
| Élément | Statut | Rôle |
|---|---|---|
| Pi Pico | ✅ possédé | Lit tous les contrôles → MIDI CC vers Norns |
| 2× CD74HC4067 | ✅ possédé | Multiplexeurs : 16 entrées analogiques chacun (24 contrôles → OK) |

> ~24 entrées analogiques (faders + pots) → 2 multiplexeurs (capacité 32). Les 7 bascules → GPIO directs du Pico. Les LEDs → 74HC595 (kit Elegoo).

---

## ♻️ Composants de récup

**Edirol UA-3FX (démontée) :**
| Élément | Quantité | Usage |
|---|---|---|
| Faders linéaires | 2 | Contrôle MIDI / module FX |
| Potentiomètres | 5 | Contrôle params / FV-1 |
| Boutons poussoirs | 2 | Boutons fonction |
| LEDs (4 vertes, 2 rouges) | 6 | Indicateurs |

---

## 🎹 Entrées MIDI / séquençage

| Élément | Statut | Rôle |
|---|---|---|
| Clavier MIDI USB | ✅ possédé | Jeu mélodique sur les scripts Norns |
| Korg Electribe 2 BL | ✅ possédé | Séquenceur maître + ses 16 pas = grille MIDI pour Norns |

> Astuce : les 16 boutons de pas de l'Electribe envoient du MIDI → équivalent d'un grid de pads. Pas besoin de Monome Grid.

---

## 🎚️ Module d'effets (optionnel, sous-projet)

| Élément | Statut | Rôle |
|---|---|---|
| Carte FV-1 (PedalPCB / Easy Spin) | ❌ à acquérir | DSP effets (reverb/delay/etc.) |
| EEPROM 24LC32 | ❌ à acquérir | Stockage des programmes FV-1 |
| Pico (cerveau du module) | ✅ possédé | Boutons + presets + contrôle FV-1 |
| Pots de récup (UA-3FX) | ✅ possédé | Contrôle des 3 params FV-1 |
| Affichage module FX | ✅ LCD1602 (Elegoo) ou OLED à acheter | Affichage |
| Alim 9V | ✅ adaptateur 9V du kit Elegoo | Alimente le FV-1 |

> Le FV-1 se programme sur Mac avec **SpinCAD Designer** (Java), ou banques toutes faites sur mstratman.github.io/fv1-programs/

---

## 🧰 Kit Elegoo UNO R3 (contenu vérifié) — composants utiles

**Contrôles & entrées :**
- **1× encodeur rotatif (KY-040)** → spare (3 PEC11R déjà commandés)
- **2× potentiomètres 10K** → prototypage / contrôle
- **5× boutons poussoirs** → boutons contrôleur
- **1× joystick**, **1× keypad membrane**

**Câblage :**
- **Condensateurs 104 (100nF)** → filtres RC pour PWM (FV-1), anti-rebond ✅
- **22pf** + électrolytiques (10µF, 100µF) → filtrage
- **Diodes 1N4007** (5×) → ⚠️ pour entrée MIDI, préférer 1N4148 (à acheter)
- **Transistors** (PN2222, S8050), **IC 74HC595** (étendre sorties LEDs)
- **Résistances** (120 pcs), **Breadboard** (830 pts), **Fils Dupont**
- **LEDs** (5 par couleur + RGB)

**Affichage :** LCD1602 (texte 16×2)

**Capteurs (ajouts créatifs) :**
- **HC-SR04** → théremin / contrôle gestuel par distance
- **2× LDR** → contrôle réactif à la lumière
- **GY-521 (MPU-6050)** → contrôle gestuel par mouvement

**Alimentation :**
- **Adaptateur 9V 1A** → alimente le module FV-1 ✅
- 9V battery clip + Power Supply Module → prototypage

---

## 🔧 Outillage

- Fer à souder + fil à souder 0.7mm
- Fil de câblage
- (À prévoir : pompe à dessouder/tresse pour récup UA-3FX)

---

## 🛒 Liste de courses (à acquérir)

| Priorité | Élément | ~Prix |
|---|---|---|
| 🟡 Module FX | Carte FV-1 + EEPROM | ~40€ |
| 🟢 Option | OLED SSD1306 (écran graphique FX) | ~4€ |
| 🟢 Option | Diodes 1N4148 (si entrée MIDI DIN) | ~2€ |
| 🟢 Option | Boîtier dédié / découpe Fablab | variable |

---

## 🗺️ Architecture cible

```
        ┌─────────────── TDS Mixte 8 (boîtier) ───────────────┐
        │                                                      │
        │  [OLED NHD-2.7]   (E1)(E2)(E3)   [K1][K2][K3]        │
        │                                                      │
        │  ~10 Faders ─┐                                       │
        │  ~14 Pots  ──┼─► 2× CD74HC4067 ─► Pico ─► MIDI ─► Norns
        │  ~7 Switch ──┘                                       │
        │  ~15 LEDs ◄── 74HC595 ◄── Pico                       │
        │                                                      │
        │  Pi 4B (Norns + Takt)                                │
        │  Audio (AG06 ou HiFiBerry) ──► sortie                │
        └──────────────────────────────────────────────────────┘

  Electribe (séquenceur) ──MIDI──► Pi (Norns)
  Clavier MIDI ───────────MIDI──► Pi (Norns)
  [Module FV-1 standalone : Pico + pots récup + alim 9V]
```

---

## ✅ Ce qui est prêt vs à faire

**Prêt / possédé :**
- Pi 4B + 3B + SD, Pico, multiplexeurs, kit Elegoo, outillage
- Yamaha AG06, HiFiBerry DAC+ Standard
- Electribe, clavier MIDI
- TDS Mixte 8 (reçu), composants récup (UA-3FX)
- Écran NHD-2.7 + encodeurs commandés

**À faire :**
- [ ] Inventaire/nettoyage précis du TDS
- [ ] Câbler écran + encodeurs + boutons (GPIO)
- [ ] Câbler faders/pots → 2× CD74HC4067 → Pico → MIDI CC
- [ ] Câbler switches → GPIO Pico, LEDs → 74HC595
- [ ] Code MicroPython Pico (contrôles → MIDI)
- [ ] (Optionnel) Monter le module FV-1
