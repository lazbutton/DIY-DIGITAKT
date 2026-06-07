# Strategie norns live tekno acid mental tribe

Ce document transforme l'inventaire de la machine norns en feuille de route pratique pour construire un instrument de live complet, centré sur le son, les textures, les drones, les delays, les boucles et la tension progressive.

Objectif principal : utiliser norns comme instrument sonore principal dans un setup tekno/tribe sombre, mental et hypnotique, avec l'Electribe comme maitre clock et sequenceur MIDI.

---

## 1. Vision de l'instrument

### Direction artistique

L'instrument doit servir a produire :

- des nappes sombres et mouvantes ;
- des textures granuleuses et instables ;
- des delays longs, sales, dub, feedback controles ;
- des boucles qui se degradent lentement ;
- des couches acides ou resonantes, mais plus mentales que "lead 303 classique" ;
- des transitions longues pour maintenir une hypnose tribe/tekno ;
- une tension qui monte sans avoir besoin de changer de morceau brutalement.

La priorite n'est pas d'avoir le plus de fonctions possible. La priorite est d'avoir un instrument jouable, lisible en live, avec quelques parametres tres puissants sous les mains.

### Role de norns

norns devient :

- un generateur de matiere sonore ;
- un lecteur et transformateur de samples ;
- un processeur de signal en mode AG06 ;
- une source de drones, textures, grains, delays et feedbacks ;
- un instrument pilote par MIDI depuis l'Electribe ;
- une machine de mutation sonore controlee par la surface TDS/Pico.

norns ne remplace pas forcement l'Electribe. L'Electribe garde le role de machine stable : clock, sequences, patterns, energie rythmique. norns apporte la profondeur, le mouvement, le cote vivant et mental.

---

## 2. Architecture live cible

```text
Electribe 2 BL
  | MIDI clock + notes + CC
  v
Raspberry Pi 4B / norns
  | scripts existants : drones, granular, looper, delay, sample mangling
  | controle sonore par TDS/Pico MIDI
  v
Yamaha AG06 ou HiFiBerry DAC+
  v
Mix / sono / enregistreur
```

### Repartition des roles

| Element | Role live |
|---|---|
| Raspberry Pi 4B / norns | Instrument principal, textures, samples, synthese, traitement |
| Electribe 2 BL | Maitre clock, sequenceur MIDI, energie tribe/tekno |
| Yamaha AG06 | Mode complet : entrees audio, sampling, traitement live, mix |
| HiFiBerry DAC+ | Mode autonome : sortie propre et simple, sans entree audio |
| TDS Mixte 8 + Pico | Surface de controle MIDI pour les parametres sonores |
| Clavier MIDI USB | Jeu manuel, drones accordes, notes longues, declenchements |
| Raspberry Pi 3B | Secours, MiniDexed ou machine complementaire |

### Principe de performance

L'Electribe donne le squelette rythmique. norns cree l'environnement sonore autour : couche grave, texture instable, delay, sample detruit, souffle, boucle granulaire ou drone accorde. La performance consiste a faire muter cette matiere avec les mains, pas seulement a lancer des patterns.

---

## 3. Deux modes audio

### Mode A : AG06, setup complet

Ce mode est le plus puissant pour ton objectif.

Utilisations possibles :

- envoyer l'Electribe dans l'AG06 ;
- envoyer une source externe vers norns pour la sampler ou la traiter ;
- enregistrer des fragments live dans norns ;
- faire des boucles degradees ;
- utiliser norns comme effet experimental ;
- melanger norns et Electribe avec un controle simple.

Checklist AG06 :

- [ ] Brancher l'AG06 en USB sur le Raspberry Pi 4B.
- [ ] Verifier que norns voit l'AG06 comme interface audio.
- [ ] Tester la sortie stereo de norns vers l'AG06.
- [ ] Tester une entree audio dans norns.
- [ ] Regler les gains pour eviter la saturation numerique.
- [ ] Garder une marge de volume pour les feedbacks et delays longs.
- [ ] Preparer un preset "safe" avec feedback bas et volume modere.

Ce mode est ideal pour les lives longs, les jams, le sampling, les transitions et les textures qui reagissent a l'Electribe.

### Mode B : HiFiBerry DAC+, setup autonome

Ce mode est plus simple et plus robuste.

Utilisations possibles :

- norns comme instrument autonome ;
- drones internes ;
- samples precharges ;
- synthese SuperCollider ;
- sortie stereo directe vers mixeur ou sono ;
- moins de cables, moins de risques.

Limites :

- pas d'entree audio ;
- pas de sampling live externe ;
- moins adapte aux traitements directs de l'Electribe.

Checklist HiFiBerry :

- [ ] Configurer norns pour utiliser la sortie HiFiBerry.
- [ ] Preparer les samples directement sur la carte ou via Maiden.
- [ ] Tester les niveaux de sortie.
- [ ] Creer un set de scripts qui ne depend pas d'une entree audio.
- [ ] Garder ce mode comme version transportable ou secours.

### Choix pratique

Priorite conseillee :

1. AG06 pour construire l'instrument complet.
2. HiFiBerry pour faire une version autonome stable.
3. Garder les deux configurations documentees pour pouvoir changer selon le contexte.

---

## 4. Scripts norns a privilegier

Tu as choisi de partir d'abord sur des scripts existants. L'idee est donc de construire ton instrument autour de familles de scripts, pas autour d'un seul script magique.

### Famille 1 : drones et textures

A chercher dans Maiden / community :

- drones accordables ;
- synthese additive, FM ou bruit filtree ;
- generateurs de nappes ;
- scripts controles par MIDI note/CC ;
- scripts qui tournent longtemps sans intervention.

Usage live :

- creer le fond sombre du set ;
- installer une tonalite ou une masse grave ;
- ajouter de la tension avec modulation lente ;
- construire une intro ou une sortie.

Parametres importants a mapper :

- pitch ou root note ;
- filtre cutoff ;
- resonance ;
- densite ;
- modulation rate ;
- modulation depth ;
- decay/release ;
- volume.

### Famille 2 : granular et sample mangling

A chercher :

- lecteurs granulaires ;
- freeze audio ;
- scrubbing de sample ;
- boucle avec position variable ;
- degradation temporelle ;
- pitch instable.

Usage live :

- transformer un sample court en texture longue ;
- etirer une voix ou une percussion ;
- creer des masses bruitistes ;
- faire des transitions sans arret net ;
- passer d'un groove tribe a une nappe mentale.

Parametres importants :

- position dans le sample ;
- taille des grains ;
- densite des grains ;
- pitch ;
- jitter/random ;
- feedback interne si disponible ;
- wet/dry ;
- volume.

### Famille 3 : looper et delay

A chercher :

- delay stereo ;
- looper synchronise MIDI ;
- buffer delay ;
- tape delay ;
- dub delay ;
- degradation ou saturation ;
- freeze/hold.

Usage live :

- attraper des fragments de l'Electribe ;
- creer un mur de delay ;
- faire disparaitre un pattern dans le feedback ;
- construire des transitions longues ;
- salir le groove sans perdre la clock.

Parametres importants :

- feedback ;
- delay time ou division clock ;
- filtre dans le feedback ;
- freeze ;
- reverse ;
- send amount ;
- wet/dry ;
- clear/reset buffer.

### Famille 4 : synthese acide et lignes resonantes

A chercher :

- synth mono controle MIDI ;
- filtre resonant ;
- slide/portamento ;
- accent ou velocity ;
- sequencage externe depuis Electribe.

Usage live :

- ajouter une ligne acide sous le groove ;
- faire des phrases simples et hypnotiques ;
- transformer une note tenue en cri resonant ;
- rester dans le mental, sans devenir trop melodique.

Parametres importants :

- cutoff ;
- resonance ;
- envelope amount ;
- decay ;
- glide ;
- drive ;
- accent ;
- octave.

### Famille 5 : scripts deja presents dans ton projet d'installation

Ton script d'installation mentionne deja des scripts utiles a tester :

- `awake` ;
- `dronecaster` ;
- `l_ll__l_`.

Checklist :

- [ ] Installer et lancer chaque script un par un.
- [ ] Noter s'il accepte la clock MIDI.
- [ ] Noter s'il accepte les notes MIDI.
- [ ] Noter s'il expose des parametres assignables.
- [ ] Noter les 8 a 16 parametres les plus interessants.
- [ ] Garder seulement les scripts qui sont stables et jouables.

---

## 5. Mapping conceptuel de la surface TDS/Pico

Tu veux utiliser la surface surtout pour les parametres sonores. Il faut donc eviter de mapper trop de fonctions administratives. Les faders et pots doivent controler ce qui transforme vraiment le son.

### Philosophie du mapping

Chaque controle doit repondre a une question simple :

- Est-ce que ca augmente la tension ?
- Est-ce que ca salit le son ?
- Est-ce que ca ouvre ou ferme l'espace ?
- Est-ce que ca densifie la texture ?
- Est-ce que ca rend le live plus jouable ?

Si un controle ne change presque rien en live, il ne merite pas une place physique.

### Proposition de mapping pour les faders

| Fader | Fonction conseillee |
|---|---|
| Fader 1 | Volume norns principal |
| Fader 2 | Drone / couche grave |
| Fader 3 | Texture granulaire |
| Fader 4 | Sample ou boucle |
| Fader 5 | Delay send |
| Fader 6 | Reverb / espace |
| Fader 7 | Bruit / souffle / texture sale |
| Fader 8 | Macro tension |
| Fader 9 | Feedback global limite |
| Fader 10 | Dry/wet ou retour vers etat stable |

La macro tension peut controler plusieurs parametres en meme temps : plus de resonance, plus de feedback, plus de modulation, plus de densite, legerement plus de distortion.

### Proposition de mapping pour les potentiometres

| Pot | Fonction conseillee |
|---|---|
| Pot 1 | Cutoff principal |
| Pot 2 | Resonance |
| Pot 3 | Grain size |
| Pot 4 | Grain density |
| Pot 5 | Pitch / transpose |
| Pot 6 | Pitch instability / jitter |
| Pot 7 | Delay time ou division |
| Pot 8 | Delay feedback |
| Pot 9 | Filtre dans le feedback |
| Pot 10 | Modulation rate |
| Pot 11 | Modulation depth |
| Pot 12 | Decay / release |
| Pot 13 | Drive / saturation |
| Pot 14 | Random / probabilite / chaos |

### Proposition de mapping pour les switches

| Switch | Fonction conseillee |
|---|---|
| Switch 1 | Mute drone |
| Switch 2 | Mute texture |
| Switch 3 | Freeze granular |
| Switch 4 | Hold delay |
| Switch 5 | Reverse ou octave |
| Switch 6 | Mode sombre / mode ouvert |
| Switch 7 | Reset safe / retour controle |

Le switch "reset safe" est important : en live, il doit permettre de sortir d'une zone trop chaotique sans couper toute l'energie.

### Ce qu'il faut eviter

- Mapper trop de parametres differents selon chaque script sans logique commune.
- Changer completement de mapping d'un script a l'autre.
- Mettre le volume principal sur un pot trop sensible.
- Laisser un feedback sans limite.
- Avoir un controle critique sans position visuelle claire.

---

## 6. Workflow MIDI avec Electribe maitre

### Role de l'Electribe

L'Electribe doit rester le centre rythmique :

- clock MIDI ;
- start/stop ;
- sequences de notes ;
- patterns ;
- divisions rythmiques ;
- energie tekno/tribe stable.

norns suit l'Electribe et recoit :

- clock ;
- notes MIDI ;
- CC pour les parametres ;
- eventuellement program changes si les scripts les gerent.

### Checklist MIDI

- [ ] Brancher l'Electribe au Raspberry Pi en USB MIDI ou via interface MIDI compatible.
- [ ] Configurer l'Electribe comme maitre clock.
- [ ] Verifier que norns recoit la clock.
- [ ] Verifier start/stop.
- [ ] Tester une sequence de notes simple vers norns.
- [ ] Tester un CC depuis l'Electribe ou le Pico.
- [ ] Choisir un canal MIDI dedie a norns.
- [ ] Noter le canal MIDI dans ce document ou dans un fichier de setup.
- [ ] Garder un pattern Electribe minimal pour tester rapidement norns.

### Pattern de test conseille

Creer sur l'Electribe un pattern simple :

- kick stable ;
- hats ou percussion minimale ;
- une piste MIDI vers norns avec 2 ou 3 notes ;
- variation de velocity si possible ;
- automation lente d'un CC.

Ce pattern sert de banc d'essai pour tous les scripts norns.

---

## 7. Preparation des samples

### Types de samples utiles

Pour le style vise, prepare une banque courte mais forte :

- kicks sourds ou fragments de kicks ;
- voix courtes, cris, souffles, syllabes ;
- field recordings industriels ;
- bruits de machines ;
- basses tenues ;
- drones graves ;
- cymbales inversees ;
- textures metalliques ;
- boucles de percus degradees ;
- fragments acides ou resonants.

### Regles pratiques

- Preparer des samples courts et longs.
- Garder des niveaux homogenes.
- Eviter de tout normaliser trop fort.
- Nommer les fichiers clairement.
- Faire une banque "safe" stable.
- Faire une banque "sale" pour les moments de tension.

Structure conseillee :

```text
samples/
  live_tekno_mental/
    drones/
    voices/
    machines/
    percs_dirty/
    acid_fragments/
    transitions/
```

Checklist samples :

- [ ] Creer une banque de 20 a 40 samples maximum pour commencer.
- [ ] Tester chaque sample dans un script granulaire.
- [ ] Supprimer les samples qui ne donnent rien en live.
- [ ] Garder les noms courts et lisibles.
- [ ] Preparer 5 samples d'intro.
- [ ] Preparer 5 samples de tension.
- [ ] Preparer 5 samples de transition.
- [ ] Preparer 5 samples de sortie ou redescente.

---

## 8. Structure d'un live type

### Phase 1 : installation de l'espace

But : faire entrer le public dans la matiere.

Actions :

- lancer un drone grave ;
- ouvrir lentement le filtre ;
- ajouter une texture granulaire tres basse ;
- utiliser peu de rythme au debut ;
- garder le feedback bas ;
- installer la tonalite ou l'ambiance.

Checklist :

- [ ] Drone stable.
- [ ] Texture faible.
- [ ] Volume general sous controle.
- [ ] Pas de feedback dangereux.
- [ ] Electribe prete mais pas encore dominante.

### Phase 2 : entree du drive tribe

But : installer le mouvement physique sans casser l'hypnose.

Actions :

- lancer le pattern Electribe ;
- synchroniser norns a la clock ;
- ajouter un delay clocke ;
- faire respirer cutoff/resonance ;
- introduire des fragments de samples.

Checklist :

- [ ] Clock stable.
- [ ] Kick lisible.
- [ ] norns cale sur le tempo.
- [ ] Delay pas trop envahissant.
- [ ] Texture presente mais pas brouillonne.

### Phase 3 : montee mentale

But : augmenter la densite et la tension.

Actions :

- monter progressivement la macro tension ;
- augmenter la densite granulaire ;
- pousser la resonance ;
- faire monter le feedback par petites touches ;
- ajouter du jitter/pitch instability ;
- muter/reintroduire certaines couches.

Checklist :

- [ ] Tension perceptible.
- [ ] Feedback toujours controlable.
- [ ] Pas de saturation numerique excessive.
- [ ] Un controle "safe" reste disponible.
- [ ] La pulsation reste comprehensible.

### Phase 4 : zone sombre / peak

But : atteindre le moment le plus intense.

Actions :

- superposer drone + granular + delay ;
- geler une boucle ;
- ouvrir resonance et drive ;
- faire des micro-variations plutot que changer tout le pattern ;
- utiliser les mutes comme gestes de tension.

Checklist :

- [ ] Le son est dense mais pas illisible.
- [ ] Les basses ne masquent pas tout.
- [ ] Le feedback ne part pas seul.
- [ ] La sortie de peak est anticipee.

### Phase 5 : sortie ou mutation

But : quitter la tension sans couper brutalement.

Actions :

- baisser la macro tension ;
- reduire densite et feedback ;
- garder un reste de delay ;
- filtrer progressivement ;
- lancer un nouveau drone ou une nouvelle texture ;
- preparer le prochain cycle.

Checklist :

- [ ] Retour a un niveau stable.
- [ ] Delay nettoye ou gele proprement.
- [ ] Nouveau point de depart possible.
- [ ] Electribe peut changer de pattern sans trou.

---

## 9. Checklist de preparation avant repetition

### Materiel

- [ ] Raspberry Pi 4B avec norns fonctionnel.
- [ ] Carte microSD prete.
- [ ] AG06 testee en entree/sortie.
- [ ] HiFiBerry testee en mode autonome.
- [ ] Electribe connectee.
- [ ] Clavier MIDI USB disponible.
- [ ] TDS/Pico connecte si deja pret.
- [ ] Alimentation stable.
- [ ] Cables USB/audio/MIDI verifies.

### Logiciel

- [ ] Maiden accessible.
- [ ] Scripts norns installes.
- [ ] Banque de samples chargee.
- [ ] Clock MIDI testee.
- [ ] Mapping MIDI note.
- [ ] Mapping MIDI CC note dans un fichier.
- [ ] Un script drone pret.
- [ ] Un script granular pret.
- [ ] Un script delay/looper pret.
- [ ] Un script synth/acide pret si disponible.

### Securite live

- [ ] Volume principal facile a couper.
- [ ] Feedback limite.
- [ ] Preset de depart stable.
- [ ] Preset de secours.
- [ ] Aucun controle critique non teste.
- [ ] Tous les cables essentiels doubles si possible.

---

## 10. Checklist de test des scripts

Pour chaque script norns teste, remplir cette grille.

```text
Nom du script :
Famille : drone / granular / looper / delay / synth / autre
Accepte clock MIDI : oui / non
Accepte notes MIDI : oui / non
Accepte CC MIDI : oui / non
Stable 30 minutes : oui / non
Interessant pour live sombre : oui / non
Besoin d'un grid : oui / non
Utilisable sans grid : oui / non
Parametres essentiels :
1.
2.
3.
4.
5.
Commentaires :
```

Decision :

- [ ] Garder pour live.
- [ ] Garder pour studio seulement.
- [ ] Rejeter.
- [ ] Revoir plus tard.

---

## 11. Mapping minimal pour commencer

Avant de mapper toute la TDS, commencer avec 8 controles seulement.

### Set de 8 controles prioritaires

| Controle | Parametre |
|---|---|
| Fader 1 | Volume norns |
| Fader 2 | Volume texture/drone |
| Pot 1 | Cutoff |
| Pot 2 | Resonance |
| Pot 3 | Densite/grain |
| Pot 4 | Pitch/jitter |
| Pot 5 | Delay feedback |
| Pot 6 | Macro tension |

Checklist :

- [ ] Mapper ces 8 controles dans un seul script.
- [ ] Jouer 20 minutes sans changer de script.
- [ ] Noter ce qui manque vraiment.
- [ ] Ajouter seulement les controles necessaires.

Cette methode evite de construire une surface enorme avant de savoir ce qui est vraiment utile en live.

---

## 12. Plan d'action progressif

### Etape 1 : instrument norns minimal

Objectif : jouer vite avec ce qui est deja pret.

- [ ] Lancer norns sur le Pi 4B.
- [ ] Utiliser l'AG06 comme interface principale.
- [ ] Connecter l'Electribe en MIDI.
- [ ] Tester clock + notes.
- [ ] Installer 3 a 5 scripts existants.
- [ ] Preparer une petite banque de samples.
- [ ] Faire un premier jam de 30 minutes.
- [ ] Noter les manques.

### Etape 2 : set de scripts utilisables

Objectif : avoir une palette stable.

- [ ] Choisir 1 script drone.
- [ ] Choisir 1 script granular.
- [ ] Choisir 1 script looper/delay.
- [ ] Choisir 1 script synth ou acide.
- [ ] Tester chaque script avec l'Electribe.
- [ ] Garder uniquement ceux qui tiennent en live.

### Etape 3 : controle physique simple

Objectif : rendre le jeu manuel.

- [ ] Brancher le Pico comme controleur MIDI USB.
- [ ] Mapper 8 controles prioritaires.
- [ ] Tester les valeurs MIDI dans norns.
- [ ] Stabiliser le mapping.
- [ ] Ajouter progressivement faders, pots, puis switches.

### Etape 4 : surface TDS orientee performance

Objectif : transformer la TDS en facade d'instrument.

- [ ] Definir les zones de la facade : volumes, texture, filtre, granular, delay, tension.
- [ ] Garder le volume principal accessible.
- [ ] Garder le feedback sur un controle clair.
- [ ] Garder un switch safe/reset.
- [ ] Etiqueter les controles.
- [ ] Tester en conditions sombres.

### Etape 5 : version autonome HiFiBerry

Objectif : avoir une version simple et transportable.

- [ ] Creer un set sans entree audio.
- [ ] Precharger les samples.
- [ ] Tester les scripts sans AG06.
- [ ] Verifier la sortie HiFiBerry.
- [ ] Garder une configuration de secours.

### Etape 6 : module FV-1 optionnel

Objectif : ajouter un effet externe plus tard, sans bloquer le coeur de l'instrument.

- [ ] Ne pas acheter le FV-1 tant que le setup norns n'est pas jouable.
- [ ] Identifier le manque reel : reverb, delay, pitch, shimmer, distortion.
- [ ] Si besoin, construire le module comme effet externe independant.
- [ ] Utiliser les pots UA-3FX pour les 3 parametres FV-1.
- [ ] Garder le FV-1 comme extension, pas comme dependance.

---

## 13. Regles de live

### Regles musicales

- Une couche stable doit toujours exister.
- Une seule chose doit changer fortement a la fois.
- Le feedback doit etre joue comme un instrument, pas laisse libre.
- La texture doit soutenir le kick, pas le masquer.
- Les ruptures doivent etre rares et intentionnelles.
- Le silence partiel est plus puissant qu'un mur constant.

### Regles techniques

- Tester la clock avant chaque session.
- Garder un preset de depart simple.
- Ne pas changer de script sans savoir comment revenir.
- Ne pas mapper un controle non teste.
- Garder une sortie audio de secours.
- Garder l'Electribe capable de continuer seule si norns plante.

### Regles ergonomiques

- Les controles dangereux doivent etre faciles a identifier.
- Les fonctions de performance doivent etre sous les doigts.
- Les menus norns doivent rester secondaires pendant le live.
- Les noms de samples doivent etre courts.
- Les mappings doivent rester coherents entre scripts.

---

## 14. Feuille de route courte

### Priorite immediate

- [ ] Faire marcher norns + AG06.
- [ ] Faire recevoir la clock Electribe.
- [ ] Tester un script drone.
- [ ] Tester un script granular.
- [ ] Tester un script delay/looper.
- [ ] Faire une banque de samples sombre/mental.

### Priorite suivante

- [ ] Mapper 8 controles MIDI depuis Pico ou autre controleur.
- [ ] Repetitions de 30 minutes sans changer de setup.
- [ ] Noter les gestes qui reviennent naturellement.
- [ ] Construire le mapping TDS autour de ces gestes.

### Priorite plus tard

- [ ] Finaliser facade TDS.
- [ ] Ajouter LEDs de retour visuel.
- [ ] Faire une version HiFiBerry autonome.
- [ ] Ajouter FV-1 si un besoin clair apparait.
- [ ] Eventuellement coder un script custom plus tard si les scripts existants montrent leurs limites.

---

## 15. Definition du succes

Le setup est reussi quand tu peux :

- lancer l'Electribe ;
- synchroniser norns sans te battre avec la technique ;
- jouer une texture pendant 30 a 60 minutes ;
- faire monter la tension avec les mains ;
- revenir a un etat stable ;
- changer de phase sans silence non voulu ;
- garder une energie tribe/tekno tout en ajoutant une profondeur sombre et mentale ;
- comprendre chaque controle meme dans le stress du live.

Le meilleur parti de norns, dans ton cas, n'est pas d'en faire une machine compliquee. C'est d'en faire une source vivante de matiere sonore, pilotee par l'Electribe et par une surface physique simple, capable de transformer un groove stable en paysage mental profond.
