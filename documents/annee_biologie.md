---
layout: page
title: Année de la biologie
description: Ressources pour les ateliers
order: 1
---

<img src="{{site.baseurl}}/images/annee_biologie.png" alt="drawing" width="300"/>


## Journée de formation des enseignantes   et enseignants de l’Académie de Créteil

Mercredi 7 décembre 2022  
De 9h00 à 17h30

------
<img src="{{site.baseurl}}/images/banner_edc.png" alt="drawing" width="600"/>

## Introduction de l'unité 

La directrice Valérie Mezger présentera l'unité. Retrouvez [ici le support de sa présentation]({{site.baseurl}}/documents/Mezger_Presentation_UMR_Annee_de_la_Biologie_2022.pdf).

## Ateliers

Vous allez participer à 3 ateliers qui ont pour but de vous donner un aperçu des méthodes utilisées au laboratoire pour étudier les génomes et leur régulation.  
Ces ateliers sont animés par : 
- Léo Carrillo 
- Emmanuel Cazottes
- Laure Ferry
- Magali Hennion
- Olivier Kirsh
- Jean-François Ouimette

------
## L’ADN : de l’extraction à la caractérisation
Dans cet atelier nous allons observer sur gel d'électrophorèse le produit d'amplification par PCR d'une région de l'ADN génomique issu de différents types cellulaires murins. Nous comparerons également les niveaux d'expression des transcrits provenant de cette même région dans les différents types cellulaires.  
Les [diapositives présentées sont disponibles ici]({{site.baseurl}}/documents/20221207_expression.pdf). 

------
## L'analyse de la méthylation de l’ADN
Dans cet atelier nous allons mesurer le niveau global de méthylation de l'ADN génomique issu de différents types cellulaires murins. Pour cela nous utiliserons la technique LUMA (LUminometric Methylation Assay), basée sur le Pyroséquençage des produits de digestion par des enzymes sensibles à la méthylation.  
Les [diapositives présentées sont disponibles ici]({{site.baseurl}}/documents/20221207_methylation.pdf). 

------
## La bio-informatique

Avec l'essor du séquençage à haut-débit, les besoins en analyses de données ont explosés dans les laboratoires de biologie. En tout premier lieu, il y a un besoin de visualisation des données qui sortent du séquenceur sous la forme de fichiers texte de plusieurs dizaines voire centaines de millions de lignes. 
Dans cet atelier, nous allons utiliser un logiciel pour visualiser les données de séquençage après alignement sur le génome. 

Les [diapositives d'introduction présentées sont disponibles ici]({{site.baseurl}}/documents/20221207_atelier_igv.pdf). 

Les données de test (700 MB) peuvent être téléchargées [ici](https://mycore.core-cloud.net/index.php/s/PzPy58RchYTC3iF) si vous voulez réessayer chez vous. Un fichier `igv_session.xml` est inclus dans ce dossier et permet de charger directement toutes les données dans IGV (Menu File/Open Session...). 

Le logiciel IGV est disponible [ici](https://software.broadinstitute.org/software/igv/download). 

### Navigateur de génome
1. Ouvrir IGV 
2. Choisir le génome : souris (mouse), version mm10
3. Cliquer sur un chromosome, observer la piste "Refseq genes", zoomer en cliquant sur le "+". Cette piste indique la position des gènes. 
4. Taper "actb" dans la barre puis cliquer sur "Go".  
5. Avec un clic droit sur la piste Refseq, il est possible de changer le format d'affichage (Collapsed, Expanded, Squished). 

<span>{% include icon.liquid id='awesome-question-circle-o' %} <b>Question 1</b></span><br> Que représentent les boites bleues et les lignes avec les chevrons?
{:.ui.info.message}

<span>{% include icon.liquid id='awesome-question-circle-o' %} <b>Question 2</b></span><br> Combien d'exons le gène *Ltbr* contient-il? 
{:.ui.info.message}

<span>{% include icon.liquid id='awesome-question-circle-o' %} <b>Question 3</b></span><br> Quelle taille fait le gène *Dmd*? Et *Sox2*?
{:.ui.info.message}



### Observation de données d'expression

1. Ajouter les données de transcription: Menu File/Load from File... Dossier "expression".
- ESC_SRR14102760.bw
- MEFs_SRR14102762.bw

2. Pour que ce soit plus lisible: 
- changer les couleurs (ESC = bleu, MEFs = vert): clic droit sur le nom de la piste, puis "Change Track Color..."
- changer la hauteur des pistes: Menu Tracks/Set Tracks Height... -> 80 (ou Fit Data to Window)
- pour que les données soient à la même échelle: sélectionner les 2 pistes (Ctrl+clic), clic droit, "Group Autoscale".

3. Se ballader, zoomer, aller voir les gènes:
    - *Rfx2*
    - *Rps24*
    - *Sox2*
    - *Fst*
    - *Vim*

<span>{% include icon.liquid id='awesome-question-circle-o' %} <b>Question 4</b></span><br> Lesquels sont exprimés spécifiquement dans les cellules ES? et dans les MEFs? 
{:.ui.info.message}

### Observation de données de méthylation de l'ADN
1. Ajouter les données de méthylation: Menu File/Load from File... Dossier "methylation".  
 - ESC_me_GSM6070571.bw (entre 0 et 1)
 - MEFs_me_SRR8146641.bw (entre 0 et 100)

2. Ajuster les échelles (clic droit, "Set Data Range ...") et changer la couleur de la piste MEFs. 

3. Ajuster l'affichage : Menu Tracks/Fit Data to Window

<span>{% include icon.liquid id='awesome-question-circle-o' %} <b>Question 5</b></span><br> Globalement, quel type cellulaire présente le plus de méthylation de l'ADN?  
{:.ui.info.message}

4. Ajouter la piste de la densité en dinucléotides CG (CpG_density.bw) et celle des îlots CpG (CpG_Islands.bed). Changer les couleurs selon vos goûts. 

Votre fenêtre devrait maintenant ressembler à ça: 

<img src="{{site.baseurl}}/images/igv.png" alt="drawing" width="900"/>

<span>{% include icon.liquid id='awesome-question-circle-o' %} <b>Question 6</b></span><br> Les îlots CpG sont-ils généralement méthylés?  
{:.ui.info.message}

5. Aller voir quelques gènes comme:
- *Acta2*
- *Sox2*  
- *Ezh1*
- *Vim*
- *Rfx2*


Observer l'expression et la méthylation (au niveau des promoteurs). 

<span>{% include icon.liquid id='awesome-question-circle-o' %} <b>Question 7</b></span><br> Y-a-t'il une corrélation entre l'expression d'un gène et la méthylation de ses régions promotrices? Est-ce que tous les gènes suivent le même schéma?  
{:.ui.info.message}

### Information sur les gènes observés

- *Acta2* actine alpha
- *Atf4* Activating transcription factor 4, facteur de transcription 
- *Ezh1* composant du complexe Polycomb PRC2 (méthylation de la lysine 27 de l'histone H3)
- *Fst* Follistatine, régulation des facteurs de croissance de la famille de TGFβ
- *Rfx2* regulatory factor X 2, regulation de la transcription par l'ARN polymérase II
- *Rps24* protéine ribosomique (40S)
- *Sox2* facteur de transcription essentiel dans le maintien de l'auto renouvellement des cellules souches
- *Vim* vimentine, filaments intermédiaires faisant partie du cytosquelette

Vous pouvez trouver plus d'information sur les gènes sur les bases de données en ligne, comme celle de [Ensembl](http://www.ensembl.org/Mus_musculus/Info/Index). 


 