---
layout: page
title: Année de la biologie
description: Ressources pour les ateliers
order: 1
---

<img src="{{site.baseurl}}/images/annee_biologie.png" alt="drawing" width="300"/>


### Journée de formation des enseignantes   et enseignants de l’Académie de Créteil

Mercredi 7 décembre 2022  
De 9h00 à 17h30

------
<img src="{{site.baseurl}}/images/banner_edc.png" alt="drawing" width="600"/>

Vous allez participer à 3 ateliers qui ont pour but de vous donner un aperçu des méthodes utilisées au laboratoire pour étudier les génomes et leur régulation. 

------
### L’ADN : de l’extraction à la caractérisation
------
### L'analyse de la méthylation de l’ADN
------
### La bio-informatique

Avec l'essor du séquençage à haut-débit, les besoins en analyses de données ont explosés dans les laboratoires de biologie. En tout premier lieu, il y a un besoin de visualisation des données qui sortent du séquenceur sous la forme de fichiers texte de plusieurs dizaines voire centaines de millions de lignes. 
Dans cet atelier, nous allons utiliser un logiciel pour visualiser les données de séquençage après alignement sur le génome. 

## Navigateur de génome
1. Ouvrir IGV 
2. Choisir le génome : souris (mouse), version mm10
3. Cliquer sur un chromosome, observer la piste "Refseq genes", zommer en cliquant sur le "+". Cette piste indique la position des gènes. 
4. Taper "actb" dans la barre puis cliquer sur "Go".  
5. Avec un clic droit sur la piste Refseq, il est possible de changer le format d'affichage (Collapsed, Expanded, Squished). 

<span>{% include icon.liquid id='awesome-question-circle-o' %} <b>Question 1</b></span><br> Que représentent les boites bleues et les lignes avec les chevrons?
{:.ui.info.message}

Q1?    
Q2? Combien d'exons le gène Ltbr contient-il?  
Q3? Quelle taille fait le gène Dmd? Et Sox2? 


## Observation de données d'expression

1. Ajouter les données de transcription: Menu File/Load from File... Dossier "expression".
- ESC_SRR14102760.bw
- MEFs_SRR14102762.bw

2. Pour que ce soit plus lisible: 
- changer les couleurs (ESC = bleu, MEFs = vert): clic droit sur le nom de la piste, puis "Change Track Color..."
- changer la hauteur des pistes: Menu Tracks/Set Tracks Height... -> 80 (ou Fit Data to Window)
- pour que les données soient à la même échelle: sélectionner les 2 pistes (Ctrl+clic), clic droit, "Group Autoscale".

3. Se ballader, zoomer, aller voir les gènes:
    - Vim
    - Rfx2
    - Sgk1
    - Rps24
    - Sox2
    - Fst
    - Acta2
    
Q4? Lesquels sont exprimés spécifiquement dans les cellules ES? et dans les MEFs? 

## Observation de données de méthylation de l'ADN
1. Ajouter les données de méthylation: Menu File/Load from File... Dossier "methylation".  
 - ESC_me_GSM6070571.bw (entre 0 et 1)
 - MEFs_me_SRR8146641.bw (entre 0 et 100)

2. Ajuster les échelles (clic droit, "Set Data Range ...") et changer la couleur de la piste MEFs. 

3. Ajuster l'affichage : Menu Tracks/Fit Data to Window

4. Ajouter la piste de la densité en dinucléotides CG (CpG_density.bw) et celle des îlots CpG (CpG_Islands.bed). Changer les couleurs selon vos goûts. 

Votre fenêtre devrait maintenant ressembler à ça: 

<img src="{{site.baseurl}}/images/igv.png" alt="drawing" width="900"/>

Q5? Les îlots CpG sont-ils généralement méthylés?  

5. Aller voir quelques gènes comme:
- Acta2
- Brdt
- Sox2  

Observer l'expression et la méthylation (au niveau des promoteurs). 

Q6? Y-a-t'il une corrélation entre l'expression d'un gène et la méthylation de ses régions promotrices? Est-ce que tous les gènes suivent le même schéma?   

## Infos sur les gènes observés

- Rfx2: regulatory factor X 2, regulation of transcription by RNA polymerase II
- Vim: vimentin, cytosquelette
- Acta2: actine alpha
