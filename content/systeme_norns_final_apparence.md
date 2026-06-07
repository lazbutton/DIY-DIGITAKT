# Fiche technique - système norns live TDS

---

## 1. Résumé système

- Machine cible : norns intégré dans le châssis TDS Mixte 8.
- Usage : instrument principal pour live tekno acid mental tribe.
- Son : drones, granular, delay, looper, samples, textures sombres.
- Clock / séquenceur : Korg Electribe 2 BL maître.
- Contrôle : TDS + Pi Pico en MIDI CC vers norns.
- Audio principal : Yamaha AG06 pour entrée + sortie + sampling.
- Audio autonome : HiFiBerry DAC+ pour sortie seule.
- Navigation norns : OLED 2.7", 3 encodeurs, 3 boutons.
- Priorité : machine jouable vite, stable, lisible, contrôlable.
- Option future : module FV-1 séparé, pas obligatoire au début.

---

## 2. Architecture cible

| Bloc | Matériel | Rôle | Statut | Priorité |
|---|---|---|---|---|
| Cerveau | Raspberry Pi 4B | norns + scripts + MIDI + audio | Possédé | P0 |
| Secours | Raspberry Pi 3B | MiniDexed / backup / test | Possédé | P3 |
| Stockage | microSD 16-32 Go | système norns | Possédé | P0 |
| Écran | OLED NHD-2.7 | écran norns principal | Commandé | P1 |
| Navigation | 3 encodeurs PEC11R | E1/E2/E3 norns | Commandé | P1 |
| Boutons | 3 boutons | K1/K2/K3 norns | Récup possible | P1 |
| Audio complet | Yamaha AG06 | entrée + sortie USB | Possédé | P0 |
| Audio autonome | HiFiBerry DAC+ | sortie I2S seule | Possédé | P2 |
| Surface | TDS Mixte 8 | faders, pots, switches, façade | Possédé | P1 |
| Contrôleur | Pi Pico | lit contrôles -> MIDI CC | Possédé | P1 |
| Analogique | 2x CD74HC4067 | faders/pots vers Pico | Possédé | P1 |
| LEDs | 74HC595 | extension sorties LEDs | Possédé kit | P2 |
| FX option | FV-1 + EEPROM | effet externe | À acheter | P4 |

Priorités :
- P0 : rendre norns jouable avec Electribe + AG06.
- P1 : intégrer écran/navigation + surface TDS minimale.
- P2 : rendre le système propre et autonome.
- P3 : ajouter secours / machines secondaires.
- P4 : extensions non bloquantes.

---

## 3. Schéma système compact

```text
Electribe 2 BL
  -> MIDI clock / start-stop / notes
  -> norns sur Pi 4B

TDS Mixte 8
  -> faders / pots / switches
  -> Pi Pico
  -> MIDI CC USB
  -> norns sur Pi 4B

norns sur Pi 4B
  -> scripts drone / granular / looper / delay / sample
  -> AG06 ou HiFiBerry
  -> sono / mixeur / enregistreur
```

---

## 4. Routing MIDI

### Sources MIDI

| Source | Destination | Données | Usage |
|---|---|---|---|
| Electribe 2 BL | norns | clock, start/stop, notes, CC | tempo + séquences |
| TDS/Pico | norns | MIDI CC | contrôle live |
| Clavier USB | norns | notes | drones, jeu manuel, test |

### Canaux conseillés

| Canal | Source | Usage |
|---|---|---|
| Ch. 1 | Electribe | notes principales vers norns |
| Ch. 2 | Electribe | piste secondaire / modulation |
| Ch. 15 | Pico TDS | faders + pots |
| Ch. 16 | Pico TDS | switches / macros / fonctions |

Checklist MIDI :
- [ ] Electribe réglée en maître clock.
- [ ] norns reçoit la clock.
- [ ] Start/stop testé.
- [ ] Une piste Electribe envoie des notes à norns.
- [ ] Pico reconnu comme périphérique MIDI USB.
- [ ] Fader 1 envoie un CC stable.
- [ ] Pot 1 envoie un CC stable.
- [ ] Switch 1 envoie une valeur claire.
- [ ] Canaux MIDI notés et fixes.

---

## 5. Routing audio

### Mode A - AG06 complet

À utiliser en priorité pour live et sampling.

```text
Electribe audio out -> AG06 input
AG06 USB audio <-> norns
norns output -> AG06 -> sono / casque / enregistreur
```

Permet :
- sampling live ;
- traitement de l'Electribe ;
- delay / looper / granular sur entrée ;
- mix plus flexible ;
- monitoring plus simple.

Checklist AG06 :
- [ ] AG06 branchée en USB au Pi 4B.
- [ ] norns utilise l'AG06 en entrée/sortie.
- [ ] Entrée audio testée.
- [ ] Sortie audio testée.
- [ ] Gains réglés sans saturation.
- [ ] Feedback testé à bas volume.
- [ ] Preset safe disponible.

### Mode B - HiFiBerry autonome

À utiliser pour machine simple, transportable, sans entrée audio.

```text
norns sur Pi 4B -> HiFiBerry DAC+ -> mixeur / sono
```

Permet :
- sortie stéréo interne ;
- moins de câbles ;
- setup plus robuste ;
- jeu avec synthèse et samples préparés.

Limites :
- pas d'entrée audio ;
- pas de sampling externe en live ;
- pas de traitement direct de l'Electribe.

Checklist HiFiBerry :
- [ ] HiFiBerry configurée comme sortie.
- [ ] Samples préchargés.
- [ ] Scripts testés sans entrée audio.
- [ ] Niveau de sortie vérifié.
- [ ] Configuration gardée comme secours/autonomie.

---

## 6. Façade recommandée

### Organisation

```text
+--------------------------------------------------------------------------------+
| OLED norns      E1  E2  E3      K1  K2  K3       LEDs: CLK MIDI SAFE PEAK       |
|                                                                                |
| TEXTURE / GRAIN        FILTER / ACID         DELAY / SPACE      MOD / CHAOS     |
| P1 P2 P3 P4            P5 P6 P7              P8 P9 P10          P11 P12 P13 P14 |
|                                                                                |
| SW1 SW2 SW3 SW4 SW5 SW6 SW7                                                    |
|                                                                                |
| F1  F2  F3  F4  F5  F6  F7  F8  F9  F10                                       |
| VOL DRN GRA SMP DLY REV NOI TENS FDBK SAFE                                     |
+--------------------------------------------------------------------------------+
```

### Zones

| Zone | Contrôles | Rôle |
|---|---|---|
| Navigation | OLED + E1/E2/E3 + K1/K2/K3 | usage normal norns |
| Faders | F1-F10 | volumes, couches, tension |
| Pots texture | P1-P4 | granular / sample / pitch |
| Pots filtre | P5-P7 | cutoff, résonance, drive |
| Pots delay | P8-P10 | time, feedback, tone |
| Pots modulation | P11-P14 | rate, depth, chaos, macro |
| Switches | SW1-SW7 | mute, freeze, hold, safe |
| LEDs | CLK/MIDI/SAFE/PEAK/etc. | état rapide |

Étiquettes courtes conseillées :
- `VOL`, `DRN`, `GRA`, `SMP`, `DLY`, `REV`, `NOI`, `TENS`, `FDBK`, `SAFE`
- `SIZE`, `DENS`, `POS`, `PITCH`, `CUT`, `RES`, `DRV`, `TIME`, `FB`, `TONE`
- `MUTE`, `FREEZE`, `HOLD`, `DARK`, `SAFE`

---

## 7. Mapping MIDI proposé

Canal conseillé pour faders/pots : `15`.

### Faders

| Contrôle | CC | Nom | Fonction |
|---|---:|---|---|
| F1 | 20 | `VOL` | volume norns principal |
| F2 | 21 | `DRN` | niveau drone |
| F3 | 22 | `GRA` | niveau granular / texture |
| F4 | 23 | `SMP` | niveau sample / boucle |
| F5 | 24 | `DLY` | send delay |
| F6 | 25 | `REV` | send reverb / espace |
| F7 | 26 | `NOI` | bruit / couche sale |
| F8 | 27 | `TENS` | macro tension |
| F9 | 28 | `FDBK` | feedback global limité |
| F10 | 29 | `SAFE` | retour stable / dry-wet |

### Potentiomètres

| Contrôle | CC | Nom | Fonction |
|---|---:|---|---|
| P1 | 30 | `SIZE` | taille des grains |
| P2 | 31 | `DENS` | densité des grains |
| P3 | 32 | `POS` | position sample |
| P4 | 33 | `PITCH` | pitch / jitter |
| P5 | 34 | `CUT` | cutoff |
| P6 | 35 | `RES` | résonance |
| P7 | 36 | `DRV` | drive / accent |
| P8 | 37 | `TIME` | delay time / division |
| P9 | 38 | `FB` | delay feedback |
| P10 | 39 | `TONE` | filtre feedback |
| P11 | 40 | `RATE` | vitesse modulation |
| P12 | 41 | `DEPTH` | profondeur modulation |
| P13 | 42 | `CHAOS` | random / instabilité |
| P14 | 43 | `COLOR` | macro couleur / scène |

### Switches

Canal conseillé : `16`.

| Contrôle | CC | Nom | Fonction |
|---|---:|---|---|
| SW1 | 50 | `MUTE_D` | mute drone |
| SW2 | 51 | `MUTE_T` | mute texture |
| SW3 | 52 | `FREEZE` | freeze buffer/grain |
| SW4 | 53 | `HOLD` | hold delay/loop |
| SW5 | 54 | `REV/OCT` | reverse ou octave |
| SW6 | 55 | `DARK` | mode sombre |
| SW7 | 56 | `SAFE` | retour sécurité |

### LEDs

| LED | État à afficher | Priorité |
|---|---|---|
| `CLK` | clock reçue | P1 |
| `MIDI` | notes/CC reçus | P1 |
| `SAFE` | mode safe actif | P1 |
| `PEAK` | niveau/feedback dangereux | P1 |
| `DRONE` | couche drone active | P2 |
| `TEXTURE` | couche granular active | P2 |
| `REC` | sampling actif | P3 |
| `FX` | delay/reverb actif | P3 |

Règle : ne pas câbler toutes les LEDs avant d'avoir stabilisé le mapping.

---

## 8. Build order

### MVP jouable vite

Objectif : jouer avec norns + Electribe + AG06 sans attendre la façade complète.

- [ ] Installer / démarrer norns sur Pi 4B.
- [ ] Brancher AG06 en USB.
- [ ] Tester sortie audio norns.
- [ ] Tester entrée audio AG06 dans norns.
- [ ] Brancher Electribe en MIDI/USB.
- [ ] Vérifier clock + start/stop.
- [ ] Tester une piste Electribe vers norns.
- [ ] Installer 3 scripts : drone, granular, delay/looper.
- [ ] Préparer 20 samples max.
- [ ] Faire un jam test de 30 min.

### Version contrôle minimal

Objectif : commencer à jouer avec des contrôles physiques.

- [ ] Brancher Pi Pico en USB MIDI.
- [ ] Lire 1 fader.
- [ ] Lire 1 pot.
- [ ] Lire 1 switch.
- [ ] Envoyer CC vers norns.
- [ ] Mapper 8 contrôles prioritaires.
- [ ] Tester 20 min sans changer de mapping.

Contrôles prioritaires :
- [ ] F1 `VOL`
- [ ] F2 `DRN`
- [ ] F3 `GRA`
- [ ] P5 `CUT`
- [ ] P6 `RES`
- [ ] P9 `FB`
- [ ] F8 `TENS`
- [ ] SW7 `SAFE`

### Version façade TDS

Objectif : intégrer la surface complète.

- [ ] Nettoyer / inventorier précisément la TDS.
- [ ] Fixer zones de façade.
- [ ] Câbler faders/pots vers 2x CD74HC4067.
- [ ] Câbler switches vers GPIO Pico.
- [ ] Stabiliser code Pico MIDI.
- [ ] Étiqueter les contrôles.
- [ ] Tester en faible lumière.
- [ ] Ajouter LEDs prioritaires.

### Version norns intégrée

Objectif : retrouver l'expérience norns classique dans la boîte.

- [ ] Monter OLED 2.7".
- [ ] Câbler E1/E2/E3.
- [ ] Câbler K1/K2/K3.
- [ ] Tester navigation.
- [ ] Tester script + paramètres.
- [ ] Vérifier que surface TDS et contrôles norns cohabitent.

### Version autonome

Objectif : jouer sans AG06 si besoin.

- [ ] Configurer HiFiBerry DAC+.
- [ ] Préparer set sans entrée audio.
- [ ] Tester samples préchargés.
- [ ] Tester sortie stéréo.
- [ ] Documenter différence AG06/HiFiBerry.

---

## 9. Checklists test

### Test audio

- [ ] Volume général bas au démarrage.
- [ ] Sortie gauche/droite OK.
- [ ] Pas de buzz anormal.
- [ ] AG06 reconnue.
- [ ] Entrée audio OK.
- [ ] HiFiBerry testée séparément.
- [ ] Feedback testé à faible niveau.
- [ ] Limite de volume définie.

### Test MIDI

- [ ] Electribe clock -> norns OK.
- [ ] Start/stop OK.
- [ ] Notes Electribe -> norns OK.
- [ ] Clavier USB -> norns OK.
- [ ] Pico visible en MIDI.
- [ ] CC faders stables.
- [ ] CC pots sans jitter excessif.
- [ ] Switches lisibles.
- [ ] Canaux séparés.

### Test script norns

À remplir pour chaque script :

```text
Script :
Famille : drone / granular / delay / looper / synth / sample
Clock MIDI : oui / non
Notes MIDI : oui / non
CC MIDI : oui / non
Entrée audio : oui / non
Sans grid : oui / non
Stable 30 min : oui / non
À garder live : oui / non
Paramètres essentiels :
- 
- 
- 
```

### Test live rapide

- [ ] Démarrer norns sans ordinateur externe.
- [ ] Lancer Electribe.
- [ ] Vérifier clock.
- [ ] Lancer drone.
- [ ] Ajouter texture.
- [ ] Monter delay.
- [ ] Monter tension.
- [ ] Activer `SAFE`.
- [ ] Revenir à un état stable.
- [ ] Continuer avec Electribe seule si norns coupe.

---

## 10. Décisions critiques

### À sécuriser

- [ ] `VOL` toujours accessible.
- [ ] `FDBK` limité.
- [ ] `SAFE` très visible.
- [ ] Alimentation Pi stable.
- [ ] Câble USB AG06 fiable.
- [ ] Pas de mapping critique non testé.
- [ ] Electribe capable de continuer seule.

### À rendre visible

- [ ] Clock reçue.
- [ ] MIDI reçu.
- [ ] Script actif.
- [ ] Feedback dangereux.
- [ ] Mode safe.
- [ ] Couche drone active.
- [ ] Couche texture active.

### À éviter

- [ ] Changer complètement de mapping selon les scripts.
- [ ] Mettre les fonctions vitales dans les menus.
- [ ] Dépendre du FV-1 au début.
- [ ] Câbler toutes les LEDs avant d'avoir testé le jeu.
- [ ] Multiplier les scripts avant d'en maîtriser 3 ou 4.
- [ ] Normaliser les samples trop fort.

---

## 11. Setup live standard

### Branchement

1. Pi 4B / norns alimenté.
2. AG06 branchée en USB au Pi.
3. Electribe branchée MIDI/USB vers norns.
4. Sortie AG06 vers sono/mixeur.
5. Pico/TDS branché en USB MIDI.
6. Clavier USB optionnel.

### Démarrage

- [ ] Volume bas.
- [ ] Charger script de départ.
- [ ] Tester sortie.
- [ ] Tester entrée AG06.
- [ ] Lancer clock Electribe.
- [ ] Vérifier LED/indicateur clock.
- [ ] Tester F1 `VOL`.
- [ ] Tester SW7 `SAFE`.

### Jeu

- Faders : doser couches.
- Pots : sculpter matière.
- Switches : gestes nets.
- Electribe : garde groove et structure.
- norns : crée texture, espace, tension.

### Récupération problème

Si chaos / feedback :
- [ ] Baisser F9 `FDBK`.
- [ ] Baisser F8 `TENS`.
- [ ] Activer SW7 `SAFE`.
- [ ] Garder Electribe en route.
- [ ] Recharger preset/script si besoin.

---

## 12. Backlog

### Court terme

- [ ] AG06 + norns stable.
- [ ] Clock Electribe fiable.
- [ ] 3 scripts live sélectionnés.
- [ ] 8 contrôles MIDI fonctionnels.
- [ ] Banque samples courte.

### Moyen terme

- [ ] TDS câblée proprement.
- [ ] OLED + encodeurs + boutons intégrés.
- [ ] Mapping complet faders/pots/switches.
- [ ] Étiquettes façade.
- [ ] LEDs `CLK`, `MIDI`, `SAFE`, `PEAK`.

### Long terme

- [ ] HiFiBerry autonome stable.
- [ ] Pi 3B en secours ou MiniDexed.
- [ ] Module FV-1 externe.
- [ ] Boîtier / découpe finale propre.
- [ ] Script norns custom si les scripts existants limitent le live.

---

## 13. Définition du MVP

MVP = machine jouable sans façade complète.

Minimum nécessaire :
- Pi 4B avec norns.
- AG06.
- Electribe maître clock.
- 3 scripts utiles.
- 20 samples max.
- 8 contrôles MIDI.
- Un geste `SAFE`.
- Un jam stable de 30 min.

Quand ce MVP fonctionne, seulement ensuite :
- intégrer la TDS complète ;
- ajouter LEDs ;
- finaliser le boîtier ;
- ajouter HiFiBerry autonome ;
- envisager FV-1.

---

## 14. Résumé opérationnel

Priorité réelle :
1. Faire sonner norns avec AG06.
2. Synchroniser Electribe.
3. Choisir peu de scripts mais solides.
4. Mapper 8 contrôles vraiment utiles.
5. Construire la TDS autour des gestes qui servent.
6. Sécuriser volume, feedback et safe.
7. Rendre la machine propre après validation du jeu.

Règle de construction : ne pas finaliser le hardware avant d'avoir validé le geste live.
