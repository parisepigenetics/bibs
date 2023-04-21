---
layout: page
title: Nanopore-seq analysis on IFB
description: Nanopore sequencing analysis on IFB
order: 1
---

<img src="{{site.baseurl}}/images/banner.png" alt="drawing" width="600"/>

# Nanopore sequencing analysis
{:.no_toc}
Author: Magali Hennion.  
Last update : April 2023.  
Collaboration between Laure Ferry (EpiG) and Magali Hennion (BiBs), Epigenetics and Cell Fate lab.

---
# Table of content
{:.no_toc}

- TOC
{::options toc_levels="1,2" /}
{:toc}

---
# Basecalling

## Option 1: Directly on MinKnow Software

## Option 2: After the run 

This can be necessery to test alternative models, especially the SUP and HAC. 

- Open the Power Shell and type

> "C:\Program Files\OxfordNanopore\MinKNOW\guppy\bin\guppy_basecaller.exe" --input_path C:\data\Nanopore\RUN\PATHto\fast5 --save_path  C:\data\Nanopore\RUN --config dna_r10.4.1_e8.2_400bps_modbases_5mc_cg_fast.cfg --chunks_per_runner 160 --device cuda:all --align_ref C:\data\Nanopore\References\mm39.fa

It is possible to use other config `cfg` file. 
Look at ONT resources for the analysis: 
https://nanoporetech.com/support/nanopore-sequencing-data-analysis

---
# Measure number of duplex reads using guppy duplex

## Install the tool 
To do only once. Done on Angus, it is doable on any Linux computer or Windows using Ubuntu shell. 
```
(base) angus@angus:~$ python -m venv venv --prompt duplex
(base) angus@angus:~$ . venv/bin/activate
(duplex) (base) angus@angus:~$ pip install duplex_tools
```
## Run the tool
(after `$ . venv/bin/activate`)
```
(duplex) (base) angus@angus:~$ duplex_tools pairs_from_summary /mnt/c/data/Nanopore/2023_01_26_TKO/sequencing_summary.txt /mnt/c/data/Nanopore/2023_01_26_TKO/
```

---
# Basic QC on IFB cluster
See the [introduction to IFB cluster]({{site.baseurl}}/cluster/ifb/#/cluster). Connect to the Jupyter Hub: https://jupyterhub.cluster.france-bioinformatique.fr. 

The file necessary for the basic QC is `sequencing_summary.txt`. Upload this file to the cluster. 

Open `Template_basicQC_v1.0.ipynb` and save as `RUNID_basicQC_v1.0.ipynb`. The run the cells adapting the path to your `sequencing_summary.txt`. 

`Template_basicQC_v1.0.ipynb` can downloaded [here]({{site.baseurl}}/documents/Template_basicQC_v1.0.ipynb).

---
# Methylation analysis

## Copy the processed data to the cluster

Open Ubuntu shell and type: 

```
cd /mnt/c/data/Nanopore/
```

Copy the bamfiles:

```
scp -rp RUN/PATHtoBam hennion@ipop-up.rpbs.univ-paris-diderot.fr:/shared/projects/wgbs_flow/Nanopore
```
For instance:
```
(base) angus@angus:~$ scp -pr /mnt/e/Data/Nanopore/RUNS/20230227_J1_mouse_ES_WT/no_sample/20230227_1642_MN41445_FAW03950_80c3709b/bam_pass/ hennion@ipop-up.rpbs.univ-paris-diderot.fr:/shared/projects/wgbs_flow/Nanopore_data/20230227_J1_mouse_ES_WT 
```


## Conda env on the iPOP-UP cluster 
See the [introduction to iPOP-UP cluster]({{site.baseurl}}/cluster/ipopup/#/cluster). 

To do only once:

```
[hennion @ ipop-up 15:40]$ Nanopore_data : conda create -n nanopore
[hennion @ ipop-up 15:42]$ Nanopore_data : conda activate nanopore
(nanopore) [hennion @ ipop-up 15:42]$ Nanopore_data : conda install -c conda-forge mamba
(nanopore) [hennion @ ipop-up 15:47]$ Nanopore_data : mamba install -c bioconda samtools
(nanopore) [hennion @ ipop-up 15:51]$ Nanopore_data : mamba install -c epi2melabs epi2melabs
(nanopore) [hennion @ ipop-up 15:58]$ Nanopore_data : conda config --add channels conda-forge
(nanopore) [hennion @ ipop-up 15:59]$ Nanopore_data : mamba install -c bioconda htslib=1.14 
(nanopore) [hennion @ ipop-up 15:51]$ Nanopore_data : mamba install -c epi2melabs modbam2bed
```
**TODO MAG: make a singularity env.**

## Convert bam to bed file

You need to copy the reference fasta from the banks (as the tool tries to write in the same folder which is locked in the banks). 

```
[hennion @ ipop-up 16:17]$ Nanopore_data : cp /shared/banks/mus_musculus/mm39/fasta/* references/ 
```

```
[hennion @ ipop-up 16:15]$ Nanopore_data : sbatch modbam2bed.sh 
Submitted batch job 508442
```
with modbam2bed.sh 
```sh
#!/bin/bash

################################ Slurm options #################################

### Job name
#SBATCH --job-name=modbam2bed

### Limit run time "days-hours:minutes:seconds"
#SBATCH --time=24:00:00

### Requirements
#SBATCH --partition=ipop-up
#SBATCH --cpus-per-task=8
#SBATCH --mem-per-cpu=10GB

### Email
##SBATCH --mail-user=email@address
##SBATCH --mail-type=ALL

### Output
#SBATCH --output=modbam2bed-%j.out
##SBATCH --error=modbam2bed-%j.err

###################   TO MODIFY according to the run   #########################

OUTPUTDIR="BED_modifications"
REF="references/mm39.fa"
DATA_FOLDER="2023_01_26_TKO"
SAMPLE="TKO"

###############################    code     ####################################

# output info about the job
echo '########################################'
echo 'Date:' $(date --iso-8601=seconds)
echo 'User:' $USER
echo 'Host:' $HOSTNAME
echo 'Job Name:' $SLURM_JOB_NAME
echo 'Job Id:' $SLURM_JOB_ID
echo 'Directory:' $(pwd)
echo '########################################'

start0=`date +%s`

# load conda env
source /shared/home/${USER}/.bashrc
conda activate nanopore

# create output folder
mkdir -p ${OUTPUTDIR}

# merge bam files
samtools merge --threads 8 - ${DATA_FOLDER}/*.bam | samtools sort --threads 8 -o ${DATA_FOLDER}/${SAMPLE}_Merged.bam

# index merged bam
samtools index ${DATA_FOLDER}/${SAMPLE}_Merged.bam

# convert to BED file
modbam2bed --aggregate -e -m 5mC --cpg -t 8 $REF ${DATA_FOLDER}/${SAMPLE}_Merged.bam > ${OUTPUTDIR}/${SAMPLE}_Merged.cpg.bed
mv mod-counts.cpg.acc.bed ${OUTPUTDIR}/${SAMPLE}_mod-counts.cpg.acc.bed

echo '########################################'
echo 'Job finished' $(date --iso-8601=seconds)
end=`date +%s`
runtime=$((end-start0))
minute=60
echo "---- Total runtime $runtime s ; $((runtime/minute)) min ----"
```

## Methylation notebook on IFB cluster

The file necessary for the notebook analysis is `SAMPLE_Merged.cpg.bed`.

Open `Template_methylation_v1.0.ipynb` and save as `RUNID_methylation_v1.0.ipynb`. The run the cells adapting the path to your `SAMPLE_Merged.cpg.bed`. 

`Template_methylation_v1.0.ipynb` can downloaded [here]({{site.baseurl}}/documents/Template_methylation_v1.0.ipynb).



