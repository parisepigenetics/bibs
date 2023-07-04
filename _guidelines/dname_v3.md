---
layout: page
title: RRMS analysis
description: RRMS  analysis
order: 1
---

<img src="{{site.baseurl}}/images/banner.png" alt="drawing" width="600"/>

# Nanopore sequencing analysis
{:.no_toc}
Author: Magali Hennion.  
Last update : July 2023.  
Collaboration between Laure Ferry (EpiG) and Magali Hennion (BiBs), Epigenetics and Cell Fate lab.

---
# Table of content
{:.no_toc}

- TOC
{::options toc_levels="1,2" /}
{:toc}

---
# Run 
We followed [this protocol]({{site.baseurl}}/documents/ligation-sequencing-gdna-lsk114-rrms-RRMS_9180_v114_revC_08Feb2023-gridion.pdf).

---
# Basecalling

After the run open the terminal "invite de commandes", and start the basecalling using "dna_r10.4_e8.1_modbases_5mc_cg_sup.cfg" model. 
```
> "C:\Program Files\OxfordNanopore\MinKNOW\guppy\bin\guppy_basecaller.exe" --input_path E:\data\Nanopore\RUNS\2023XXX_runID\no_sample\PATH2\pod5 --save_path  E:\data\Nanopore\RUNS\2023XXX_runID\basecalled --config dna_r10.4_e8.1_modbases_5mc_cg_sup.cfg --device cuda:all --align_ref C:\data\Nanopore\References\mm39.fa --compress_fastq --bam_out --recursive --num_callers 5 --cpu_threads_per_caller 4
```
Replacing `2023XXX_runID` by your un folder. 

It is possible to use other config `cfg` file. 
Look at ONT resources for the analysis: 
https://nanoporetech.com/support/nanopore-sequencing-data-analysis

---
# Basic QC on IFB cluster
See the [introduction to IFB cluster]({{site.baseurl}}/cluster/ifb/#/cluster). Connect to the [Jupyter Hub](https://jupyterhub.cluster.france-bioinformatique.fr). You need 5 Gb to run the analysis, so you have to increase the RAM when starting your Jupyter session. 

## Add missing libraries (only once)
Open a new notebook in Python 3.9. 
Type the following commands:
```py 
!pip install aplanat
```
```py
!pip install epi2melabs
```

## Run the analysis
The file necessary for the basic QC is `sequencing_summary.txt` obtained AFTER basecalling. Upload this file to the cluster. 

Open `Template_basicQC_v1.1.ipynb` and save as `RUNID_basicQC_v1.0.ipynb`. Then run the cells adapting the path to your `sequencing_summary.txt` and choosing the name of your HTML report. 

`Template_basicQC_v1.1.ipynb` can downloaded [here]({{site.baseurl}}/documents/Template_basicQC_v1.1.ipynb). 

---
# Methylation analysis

## Copy the processed data (bam files only) to the cluster

Open Ubuntu shell and type: 

```
cd /mnt/e/Data/Nanopore/RUNS
```

Copy the bamfiles to the cluster (here only pass files)

```
rsync /mnt/e/Data/Nanopore/RUNS/2023XXX_runID/basecalled/pass/*bam ferry@ipop-up.rpbs.univ-paris-diderot.fr:/shared/projects/nano4edc/BAM_files/2023XXX_runID
```

## Run Methylator

As the workflow is under development, get the last version before running... [Nota: For now in WGBSflow folder].

Modify the configuration files (`config_nanopore.yaml` and `metadata.tsv` in `configs` folder). You can rename  `metadata.tsv` (here to `metadata_rrms.tsv`) and adjust the path in `config_nanopore.yaml`. 

Here is an example of `config_nanopore.yaml`:

```yaml
# ============================================================================= #
# ========= Methylator Workflow configuration file (Nanopore data) ============ #
# ============================================================================= #

# Please check the parameters, and adjust them according to your circumstance

# Project name
PROJECT: RRMS

## paths for intermediate final results
BIGDATAPATH: Big_Data # for big files
RESULTPATH: Results

## genome files
GENOMEPATH: /shared/banks/mus_musculus/mm39/fasta/mm39.fa  # path to the reference genome's folder 

## genome
ASSEMBLY: mm39 # mm10 name of the assembly used for the analysis (now use mm39, new version)

## maximum number of cores you want to allocate to one job of the workflow (mapping and feature counting)
NCORE: 32 

## maximum number of jobs running in parallel
NJOBS: 100



# ===================== Configuration for Nanopore data ==================== #
# ========================================================================== #
DATA: "NANOPORE" # do not touch!
METAFILE: configs/metadata_rrms.tsv
NANO_BAM_PATH: /shared/projects/nano4edc/BAM_files/
COMPARISON: [["WT-E14-rrms-1","WT-E14-rrms-2"]]    # [["WT","TKO"], ["WT","WT2"], ["WT2","TKO"]]



# # ===================== Configuration for process BAM files  ================== #
# =========================================================================== #

MERGE: yes # if yes, all BAM files to a same condition are merged  , useful for increase the coverage 
BAMTOBED: yes # if yes, convert BAM to BED files , necessary for Statistical Analysis, use no if your files are yet in BED format online


# =================== Configuration for Statistical Analysis ================ #
# =========================================================================== #


DMT: yes # if yes, perform a differential methylation by tiles (DMT) analysis , if no, perform a DM by Cytosines (DMC)
EDMR: no # if yes, perform a differential methylation analysis by region (Empirical Differentially Methylated Regions, EDMR) only possible with a previous DMC analysis
TILESIZE: 250 
STEPSIZE: 1  # Tiles relative step size

# ===== Exploratory analysis ===== #

## params 
MINCOV: 10  # int, minimum coverage for the analysis
NB_CPG_TILES: 1 
COV.PERC: 99.9 # to the coverage filter, choose the percentile for remove top ..% 
UNITE: all # 'all' or 'one' (at least one per group)
QVALUE: 0.05  # QValue

# ===== Differential analysis ===== #

## params
SIGNIDIF: 10  # SigDiffMeth en %
DIFFCPG: 25
QVALCPG: 0.05


# ======================= Configuration for annotations ===================== # 
# =========================================================================== #

# ===== Standard annotations  ===== #
## GTF 
GTFPATH: /shared/banks/mus_musculus/mm39/gtf/gencode.vM27.annotation.gtf

## CPG Bed 
BEDPATH: /shared/projects/nano4edc/Methylator/cpgIslandExt.mm39.bed

# ===== Customs Annotations ===== #
CUSTOM_ANNOT: no 
METAFILE_ANNOT: configs/metadata_annot.tsv
CUSTOM_ANNOT_PATH: "/shared/projects/wgbs_flow/Elouan/Custom_tracks/"
```

Here is an example of `metadata_rrms.tsv`. 

```
sample	group
20230608_E14_mouse_ES_WT_RRMS	WT-E14-rrms-1
20230626_E14_mouse_ES_WT_RRMS_150ng_8kb_pass	WT-E14-rrms-2
```
The sample have to be the name of the folder containing the bam files. 

When the configuration is fine, start the workflow using the command `sbatch WGBSworkflow.sh nanopore`. 

For instance: 
```
[hennion @ ipop-up 14:29]$ WGBSflow : sbatch WGBSworkflow.sh nanopore
Submitted batch job 1159358`
```
Cross your fingers. 

See the [documentation](https://parisepigenetics.github.io/bibs/edctools/workflows/methylator/#/edctools/). 
