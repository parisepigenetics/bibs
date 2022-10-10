---
layout: page
title: BiBs - EDC lab
category: home
description: main page
---

![banner]({{site.baseurl}}/images/banner.png)
# Epigenetics and Cell Fate BiBs core facility

## Welcome to EDC Bioinformatics and Biostatistics facility website!

The [Paris Epigenetics](http://parisepigenetics.com) BiBs platform provides and develops user-friendly, state of the art epigenomics protocols.  We also maintain access to a local computing cluster and provide the teams of the UMR7216 a variety of bioinformatics related services such as technology monitoring, project-specific analyses and user-tailored, on-demand training. This website is the main resource for protocols, scripts and instructions on how to use the HPC clusters.
{:.ui.large.message}

<br/>
  

## How to access the facility

The easiest is to pass by the 366b room in Lamarck B! 

You can also contact us by email : [bibsATparisepigenetics.com](mailto:bibsATparisepigenetics.com).

If you need long-term help on a specific project, this has to be discussed with BiBs [steering committee](#steering-committee). Please download and fill-in the accession form ([docx]({{site.baseurl}}/documents/accession_plateforme.docx) or [odt]({{site.baseurl}}/documents/accession_plateforme.odt)) and send it via email. A meeting to discuss your needs will be set-up in the following days.

<br/>


## BiBs charter
Our user charter is available [here]({{site.baseurl}}/documents/BiBs_charte.v0.3.pdf). It defines the rules to use the facility. Please read and sign it!

<br/>

## Stay up to date

<span> <b>Slack</b></span><br> In order to get news about bioinformatics in the unit, you can follow us on Slack at hpc-edc.slack.com. To get access, please email us at bibsATparisepigenetics.com.
{:.ui.message}

<br/>

## How can we help you ?

<span> <b>Experimental design</b></span><br> You're planning to run high-throughput omics experiments? Please come to discuss with us about the design of your experiment. We'll help you to choose the best technical approach, with appropriate depth, number of replicates, controls. 
{:.ui.success.message}

<span> <b>Answer specific questions</b></span><br> Don't hesitate to pass by or to mail us about the problem you encounter while analysing your data. We'll try to answer directly or to put you in contact with a competent person. 
{:.ui.success.message} 

<span> <b>Proofreading of grant applications or articles</b></span><br> You're not an expert in bioinformatics, but you're planning to use, or using, high-throughput data analysis? Before submitting your grant application or your article, an extra proofreading by a bioinformatician might be beneficial. Your manuscript will be kept confidential. Last-minute overnight proofreading request will not be accepted! 
{:.ui.success.message}

<span> <b>Literature mining</b></span><br> Not sure about which technology or bioinformatics tool is the most appropriate to answer your biological question? If the topic is new to us, we can review the literature to guide your choices. 
{:.ui.success.message}

<span> <b>On-demand training</b></span><br> You'd like to use a tool but you don't know how? We can guide you until you become autonomous. 
{:.ui.success.message}

<span> <b>Help to hire</b></span><br> You want to hire a student/postdoc/engineer to analyse omics data? We can help you by proofreading the job description, and later on, by conducting or assisting in job interviews. 
{:.ui.success.message}


<br/>

## How can you work on your own? 

One important goal of the BiBs facility is to make you able to analyse your data yourself! To do so, we develop easy-to-use workflows and we support community workflows such as the ones from nf-core. We also guide you to use calculation clusters to analyse large datasets. 

### Using HPC clusters
1. [Getting started on IFB core cluster]({{site.baseurl}}/cluster/ifb/#/cluster)
2. [Getting started on iPOP-UP cluster]({{site.baseurl}}/cluster/ipopup/#/cluster)
3. [Tips and Tricks]({{site.baseurl}}/cluster/tips/#/cluster)

### Analysis workflows
  1. [RNA-seq by RASflow_EDC]({{site.baseurl}}/edctools/workflows/rasflow_edc/#/edctools)  
  Implemented by BiBs, this workflow for RNA-seq data analysis is based on RASflow which was originally published by [X. Zhang](https://bmcbioinformatics.biomedcentral.com/articles/10.1186/s12859-020-3433-x). It has been modified to run effectively on both IFB and iPOP-UP core cluster and to fit our specific needs. Moreover, several tools and features were added, including a comprehensive report, as well as the possibility to incorporate the repeats in the analysis. 
  2. [nf-cores worflows]({{site.baseurl}}/edctools/workflows/nf-cores/#/edctools/)  
  Curated set of analysis pipelines built using Nextflow. They can run on both [IFB-core](https://www.france-bioinformatique.fr/cluster-ifb-core/) and [iPOP-UP](https://ipop-up.docs.rpbs.univ-paris-diderot.fr/documentation/) clusters. 

### EDC toolbox
Our protocols, scripts and workflows are hosted on our [GitHub repository](https://github.com/parisepigenetics). Some of the resources are private, please provide us your GitHub Username to get access. A description of all the tools developped in-house is available [here]({{site.baseurl}}/edctools/githubrepo/#/edctools). 

### Guidelines

1. [Submit raw sequencing reads to ENA]({{site.baseurl}}/guidelines/enasubmission/#/guidelines)  
Summary of the different steps one has to follow to put raw FASTQ files into the European Nucleotide Archive. 
<br/>

## Steering committee

- Magali Hennion
- Florent Hubé
- Olivier Kirsh
- Valérie Mezger
- Jean-François Ouimette
- Pierre Poulain (Institut Jacques Monod)
- Claire Rougeulle

## Feedback request

This website is currently under construction. We kindly ask our users to provide some feedback about this resource. Please contact us if :

- something is unclear, 
- you spot some typos,
- you would like to request topic specific documentation/workflow,
- you would like to contribute to this resource. 
