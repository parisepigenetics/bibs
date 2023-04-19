---
layout: page
title: Nanopore-seq analysis
description: Nanopore sequencing analysis
order: 1
---

<img src="{{site.baseurl}}/images/banner.png" alt="drawing" width="600"/>

# Nanopore sequencing analysis
Author: Magali Hennion.  
Last update : April 2023.  
Collaboration between Laure Ferry (EpiG) and Magali Hennion (BiBs), Epigenetics and Cell Fate lab.


# Basecalling

## Option 1: Directly on MinKnow Software

## Option 2: After the run 

This can be necessery to test alternative models, especially the SUP and HAC. 

- Open the Power Shell and type

> "C:\Program Files\OxfordNanopore\MinKNOW\guppy\bin\guppy_basecaller.exe" --input_path C:\data\Nanopore\RUN\PATHto\fast5 --save_path  C:\data\Nanopore\RUN --config dna_r10.4.1_e8.2_400bps_modbases_5mc_cg_fast.cfg --chunks_per_runner 160 --device cuda:all --align_ref C:\data\Nanopore\References\mm39.fa

It is possible to use other config `cfg` file. 
Look at ONT resources for the analysis: 
https://nanoporetech.com/support/nanopore-sequencing-data-analysis


# Measure number of duplex reads using guppy duplex

## Install the tool 
To do only once. Done on Angus, doable on your own computer too.
```
(base) angus@angus:~$ python -m venv venv --prompt duplex
(base) angus@angus:~$ . venv/bin/activate
(duplex) (base) angus@angus:~$ pip install duplex_tools
```
## Run the tool
(after `. venv/bin/activate`)
```
(duplex) (base) angus@angus:~$ duplex_tools pairs_from_summary /mnt/c/data/Nanopore/2023_01_26_TKO/sequencing_summary.txt /mnt/c/data/Nanopore/2023_01_26_TKO/
```

# Run the Jupyter notebooks on a personal computer 
Done on Angus and on my PC. It is doable on your computer using Ubuntu shell. 

If mamba is not installed run : 
```
conda install -c conda-forge mamba
```
Create the env for notebooks with appropriate tools
```
(base) [mag @ BI-platform 11:07]$ ~ : mamba env create -f nanopore_jupyter.yaml 
```
with nanopore_jupyter.yaml 
```yaml
name: nanopore_jupyter
channels:
  - epi2melabs
  - conda-forge
  - bioconda
  - defaults
dependencies:
# bioconda channel installs
  - samtools
  - aplanat
# epi2melabs 
  - epi2melabs
  - modbam2bed
# others
  - ipykernel
  - ipywidgets
```

Add the env to jupyter notebooks: 
```
(base) [mag @ BI-platform 11:09]$ ~ : conda activate nanopore_jupyter
(nanopore_jupyter) [mag @ BI-platform 11:09]$ ~ : python3 -m ipykernel install --user --name nanopore_jupyter --display-name "nanopore_analysis"
```

# Basic QC

The file necessary for the basic QC is `sequencing_summary.txt`.

## Start jupyter lab
```
(base) angus@angus:~$ conda activate nanopore_jupyter
(nanopore_jupyter) angus@angus:~$ jupyter lab
```
Open `Template_basicQC.ipynb` and save as `RUNID_basicQC.ipynb`. The run the cells adapting the path to your `sequencing_summary.txt`. 

**TODO MH: convert `Documents/Plateforme_BI/Nanopore/basicQC_EdU_run1.ipynb` to `Template_basicQC.ipynb`**


# Methylation analysis

**modbam2bed also possible locally or not??? TODO MH: test on Angus**
The bam files have to be combined before running the notebook. 
For now done on the cluster. See if possible locally or not, and check time necessary. 

## Copy the processed data to the cluster : 

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


## Conda env on the cluster 
To do only once. 

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
**TODO: make a singularity env.**

## Convert bam to bed file

I need to copy the fasta mm39 as it tries to write in the same folder (lock in banks)

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

################################################################################

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

OUTPUTDIR="BED_modifications"
REF="references/mm39.fa"
DATA_FOLDER="2023_01_26_TKO"
SAMPLE="TKO"

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

## Copy the output file to your computer

The file necessary for the notebook analysis is `SAMPLE_Merged.cpg.bed`.

## Start Jupyter lab locally
```
(base) [mag @ BI-platform 12:18]$ ~ : conda activate nanopore_jupyter
(nanopore_jupyter) [mag @ BI-platform 12:18]$ ~ : jupyter lab
```

## Methylation notebook

Open `Template_methylation.ipynb` and save as `RUNID_methylation.ipynb`. The run the cells adapting the path to your SAMPLE_Merged.cpg.bed. 

**TODO: convert `Documents/Plateforme_BI/Nanopore/methylation_Mmori.ipynb` to `Template_methylation.ipynb`**




