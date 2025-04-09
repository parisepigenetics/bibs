---
layout: page
title: Nanopore data analysis
description: Nanopore data analysis
order: 1
---

<img src="{{site.baseurl}}/images/banner.png" alt="drawing" width="600"/>

# Nanopore sequencing analysis
{:.no_toc}
Author: Magali Hennion.  
Last update : April 2025.  
Collaboration between Laure Ferry (EpiG) and Magali Hennion (BiBs), with the help of Margherita Mori, Olivier Kirsh, Mélina Farshchi and Elouan Bethuel, Epigenetics and Cell Fate lab.

---
# Table of content
{:.no_toc}

- TOC
{::options toc_levels="1,2" /}
{:toc}

---
# Basecalling
If adaptive sampling is not used, the basecalling can be done during the run with SUP or HAC mode. Configure MinKnow at the start of the run to include basecalling +/- 5mC/5hmC detection +/- mapping providing a reference FASTA file. Since october 2023, MinKnow uses [Dorado](https://github.com/nanoporetech/dorado) instead of Guppy for the basecalling. 
The different basecalling models can be found on [this page](https://github.com/nanoporetech/dorado/?tab=readme-ov-file#dna-models). 

If you need to rebasecall after the run (other model, SUP mode, ...) you can do it on Angus or P2 computer using MinKnow (Start -> Analysis) or Dorado using command lines, or you can use the GPUs on iPOP-UP or IFB clusters (faster, but require disk space). 

Look at ONT resources for the analysis: 
[https://nanoporetech.com/support/nanopore-sequencing-data-analysis](https://nanoporetech.com/support/nanopore-sequencing-data-analysis).

## Basecalling on the cluster

### Copy the pod5 files
To copy the data from Angus/P2 to a cluster, open Ubuntu shell. 
To go the the RUNS folder, use `cd`. Windows disks are mounted in `/mnt/` + letter of the disk (`c` for `C:`). 

```
cd /mnt/e/Data/Nanopore/RUNS
```
Run `scp` or (better) `rsync` to copy to the cluster. 

```
(base) angus@angus:~$ scp -r /mnt/e/Data/Nanopore/RUNS/2024xxxx/PATH2/pod5folder/ username@ipop-up.rpbs.univ-paris-diderot.fr:/shared/projects/nano4edc/RUNID
```
or 
```
(base) angus@angus:~$ rsync -avP /mnt/e/Data/Nanopore/RUNS/2024xxxx/PATH2/pod5folder/ username@ipop-up.rpbs.univ-paris-diderot.fr:/shared/projects/nano4edc/RUNID
```
Nota: if you put a `/` at the end of the **source** (as here), the content of `pod5folder` folder with be copied into the `RUNID` folder. If you don't put the `/`, the folder `pod5folder` will be created in the `RUNID` folder. A `/` at the end of the destination has no incidence. 

For the IFB cluster use `username@core.cluster.france-bioinformatique.fr:/shared/projects/YourProject/`. 

### Basecalling

#### Download Dorado
If you you don't have Dorado binaries, you have to download them using: 
```
[hennion @ ipop-up 11:38]$ Dorado : wget https://cdn.oxfordnanoportal.com/software/analysis/dorado-0.7.2-linux-x64.tar.gz
[hennion @ ipop-up 11:39]$ Dorado : tar -xvf dorado-0.7.2-linux-x64.tar.gz
```
Replacing `0.7.2` by the version you want. See [Dorado Github repository](https://github.com/nanoporetech/dorado).

#### Download the appropriate model

The different basecalling models can be found on [this page](https://github.com/nanoporetech/dorado/?tab=readme-ov-file#dna-models). To download a model, run the following command. 
```
[hennion @ ipop-up 21:47]$ Dorado : dorado-0.7.2-linux-x64/bin/dorado download --model dna_r10.4.1_e8.2_400bps_sup@v4.1.0
```
#### Start the basecalling

You can adapt and use the following sbatch file `Dorado_RUNID.sh` (iPOP-UP cluster). This example is made for several samples to process at the same time and uses arrays. It can be simplified if you have only one sample.  
```sh
#!/bin/bash

################################ Slurm options #################################

### Job name
#SBATCH --job-name=Dorado

### Output
#SBATCH --output=%x-%j.out  # both STDOUT and STDERR

### Limit run time "days-hours:minutes:seconds"
#SBATCH --time=24:00:00

### Requirements
#SBATCH --partition=ipop-up
#SBATCH --gres=gpu:3
#SBATCH --mem-per-gpu=30GB
#SBATCH --array=1-9

################################################################################

echo '########################################'
echo 'Date:' $(date --iso-8601=seconds)
echo 'User:' $USER
echo 'Host:' $HOSTNAME
echo 'Job Name:' $SLURM_JOB_NAME
echo 'Job Id:' $SLURM_JOB_ID
echo 'Directory:' $(pwd)
echo '########################################'
echo '-------------------------'

start0=`date +%s`

# basecalling

DORADO="dorado-0.5.3-linux-x64/bin/dorado basecaller"
REF="DNAjc9WT_SpeI.fa"
MODELE="dna_r10.4.1_e8.2_400bps_sup@v4.3.0" #https://github.com/nanoporetech/dorado/?tab=readme-ov-file#dna-models
MODIF="5mCG_5hmCG"
POD5FOLDER="pod5_all"
SAMPLE="barcode0$SLURM_ARRAY_TASK_ID"

echo "GPU: $CUDA_VISIBLE_DEVICES"

echo "$DORADO $MODELE $POD5FOLDER/$SAMPLE --modified-bases $MODIF --reference $REF > $SAMPLE.Dorado5.3.SUP.bam"

$DORADO $MODELE $POD5FOLDER/$SAMPLE --modified-bases $MODIF --reference $REF > $SAMPLE.Dorado5.3.SUP.bam

echo '########################################'
echo 'Job finished' $(date --iso-8601=seconds)
end=`date +%s`
runtime=$((end-start0))
minute=60
echo "---- Total runtime $runtime s ; $((runtime/minute)) min ; $((runtime/minute/minute)) h ----"
```
When ready you can run it using the following command. 

```
sbatch Dorado_RUNID.sh
```
More information about the use of the clusters can be found at [https://parisepigenetics.github.io/bibs/cluster/slurm/#/cluster/](https://parisepigenetics.github.io/bibs/cluster/slurm/#/cluster/). 

### Demultiplexing

## Basecalling on the local computer (command line)
You can also use Dorado on P2 computer which has a powerful graphics card. 
Nota: if you download directly Dorado on the computer there will be errors in creating symbolic links when decompressing. To overcome this problem, I download and decompress Dorado on a cluster and download the obtained folder to the local computer.  

```
promethion@edc-056:/mnt/d/Nanopore$ dorado-0.9.5-linux-x64/bin/dorado basecaller sup,5mCG_5hmCG 20250402_HCT116_AS_J4_P2/HCT116-D1_J4_Pool/test_calling
```
With demultiplexing (add --kit-name)
```
promethion@edc-056:/mnt/d/Nanopore$ dorado-0.9.5-linux-x64/bin/dorado basecaller sup,5mCG_5hmCG 20250402_HCT116_AS_J4_P2/HCT116-D1_J4_Pool/test_calling --reference References/hg38.mmi  --min-qscore 10 --kit-name EXP-NBD114-24 > 20250402_HCT116_AS_J4_P2/HCT116-D1_J4_Pool/dorado_test_mux.bam
```
Then separate the big bma into one file / sample:
```
promethion@edc-056:/mnt/d/Nanopore$ dorado-0.9.5-linux-x64/bin/dorado demux --output-dir 20250402_HCT116_AS_J4_P2/HCT116-D1_J4_Pool/dorado_demux --no-classify 20250402_HCT116_AS_J4_P2/HCT116-D1_J4_Pool/dorado_test_mux.bam
```

---
# Basic QC on IFB or iPOP-UP cluster [TO UPDATE]
See the [introduction to IFB cluster]({{site.baseurl}}/cluster/ifb/#/cluster) or [introduction to iPOP-UP cluster]({{site.baseurl}}/cluster/ipopup/#/cluster). Connect to [IFB ondemand](https://ondemand.cluster.france-bioinformatique.fr/) or to the [iPOP-UP Jupyter Hub](https://jupyterhub.rpbs.univ-paris-diderot.fr). You need **20 Go** to run the analysis, so you have to increase the RAM when starting your Jupyter session. 
For now we work in `edc_nanopore` or `nano4edc` projects. 

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
The file necessary for the basic QC is `sequencing_summary.txt` obtained **AFTER** basecalling. Upload this file to the cluster. 

Open `Template_basicQC_v1.2.ipynb` and save as `RUNID_basicQC_v1.2.ipynb`. Then run the cells adapting the path to your `sequencing_summary.txt` and choosing the name of your HTML report. 

`Template_basicQC_v1.2.ipynb` can downloaded [here]({{site.baseurl}}/documents/Template_basicQC_v1.2.ipynb). 

For adaptive sampling, use `Template_QC_adaptive_v1.0.ipynb`. 

---
# Methylation analysis

## Copy the BAM files to the cluster

If the basecalling was done on Angus, you need to copy the BAM files to the cluster. 

Open Ubuntu shell and copy the BAM files to the cluster (here only pass files)

```
rsync -av /mnt/e/Data/Nanopore/RUNS/2023XXX_runID/basecalled/pass/*bam ferry@ipop-up.rpbs.univ-paris-diderot.fr:/shared/projects/nano4edc/BAM_files/2023XXX_runID
```

## Run Methylator

As the workflow is under development, get the last version before running...

Modify the configuration files (`config_nanopore.yaml` and `metadata.tsv` in `configs` folder). You can rename  `metadata.tsv` (here to `metadata_rrms.tsv`) and adjust the path in `config_nanopore.yaml`. 

Here is an example of `config_nanopore.yaml` [TO UPDATE]

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
The sample have to be the name of the folder containing the BAM files. 

When the configuration is fine, start the workflow using the command `sbatch WGBSworkflow.sh nanopore`. 

For instance: 
```
[hennion @ ipop-up 14:29]$ WGBSflow : sbatch WGBSworkflow.sh nanopore
Submitted batch job 1159358`
```
Cross your fingers. 

See the beautiful [documentation](https://methylator.readthedocs.io/en/latest/). 


# DNAscent for EDU detection [TO UPDATE POD5 and Dorado work directly now]

[Example workflow](https://dnascent.readthedocs.io/en/latest/workflows.html#example-workflow)

## Convert POD5 to FAST5 (not necessary)

Since DNAscent still doesn't support the POD5 format (coming soon), conversion is necessary for recent runs. You can use the following script (adapting it to your data).

```sh
#!/bin/bash

################################ Slurm options #################################

### Job name
#SBATCH --job-name=pod5

### Limit run time "days-hours:minutes:seconds"
#SBATCH --time=24:00:00

### Requirements
#SBATCH --partition=ipop-up

### Output
#SBATCH --output=pod5-%j.out

### Array
#SBATCH --array=1-9
#SBATCH --mem=15G

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

# make fast5 for DNAscent
module load pod5/0.2.0

SAMPLE="barcode0$SLURM_ARRAY_TASK_ID"

pod5 convert to_fast5 pod5_all/$SAMPLE/* -o FAST5/$SAMPLE


echo '########################################'
echo 'Job finished' $(date --iso-8601=seconds)
end=`date +%s`
runtime=$((end-start0))
minute=60
echo "---- Total runtime $runtime s ; $((runtime/minute)) min ----"
```

## Guppy basecalling

Since DNAscent still doesn't support Dorado format (coming soon), a basecalling by Guppy of previous FAST5 files is necessary. The recommanded model is `dna_r10.4.1_e8.2_400bps_5khz_hac.cfg`. You can use the following script (adapting it to your data).

```sh
#!/bin/bash

################################ Slurm options #################################

### Job name
#SBATCH --job-name=guppy

### Limit run time "days-hours:minutes:seconds"
##SBATCH --time=24:00:00

### Requirements
#SBATCH --partition=ipop-up
#SBATCH --gres=gpu:1
#SBATCH --mem-per-gpu=30GB

### Output
#SBATCH --output=guppy-%j.out

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

module load guppy/6.5.7-gpu

echo "CUDA DEVICES :$CUDA_VISIBLE_DEVICES"

# guppy with dna_r10.4.1_e8.2_400bps_5khz_hac.cfg as recommended for DNAscent

SAMPLE="UVplus"

echo "guppy_basecaller -i FAST5/$SAMPLE -s Guppy/$SAMPLE --num_callers 8 --gpu_runners_per_device 8 --device 'cuda:$CUDA_VISIBLE_DEVICES' --config dna_r10.4.1_e8.2_400bps_5khz_hac.cfg"

guppy_basecaller -i FAST5/$SAMPLE -s Guppy/$SAMPLE --num_callers 8 --gpu_runners_per_device 8 --device "cuda:$CUDA_VISIBLE_DEVICES" --config dna_r10.4.1_e8.2_400bps_5khz_hac.cfg


echo '########################################'
echo 'Job finished' $(date --iso-8601=seconds)
end=`date +%s`
runtime=$((end-start0))
minute=60
echo "---- Total runtime $runtime s ; $((runtime/minute)) min ----"
```

## Mapping 

A mapping of the reads using Minimap2 is required. You can use this script. 
```sh
#!/bin/bash

################################ Slurm options #################################

### Job name
#SBATCH --job-name=mapping

### Limit run time "days-hours:minutes:seconds"
#SBATCH --time=24:00:00

### Requirements
#SBATCH --partition=ipop-up
#SBATCH --mem=30GB


### Output
#SBATCH --output=mapping-%j.out

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

module load minimap2/2.24 samtools/1.18
module list

REF="/shared/banks/genomes/homo_sapiens/hg38/fasta/hg38.fa"
SAMPLE="UVplus"
PASSorFAIL="pass"

prefix="Guppy/${SAMPLE}_$PASSorFAIL"

echo "Mapping on $REF ."

# following https://dnascent.readthedocs.io/en/latest/workflows.html
cat Guppy/$SAMPLE/$PASSorFAIL/*.fastq > $prefix.fastq
minimap2 -ax map-ont -o $prefix.sam $REF $prefix.fastq
samtools view -Sb -o $prefix.bam $prefix.sam
samtools sort -o $prefix.sorted.bam $prefix.bam 
samtools index $prefix.sorted.bam
samtools flagstat $prefix.sorted.bam

# idem with fail reads
PASSorFAIL="fail"

prefix="Guppy/${SAMPLE}_$PASSorFAIL"

# following https://dnascent.readthedocs.io/en/latest/workflows.html
cat Guppy/$SAMPLE/$PASSorFAIL/*.fastq > $prefix.fastq
minimap2 -ax map-ont -o $prefix.sam $REF $prefix.fastq
samtools view -Sb -o $prefix.bam $prefix.sam
samtools sort -o $prefix.sorted.bam $prefix.bam 
samtools index $prefix.sorted.bam
samtools flagstat $prefix.sorted.bam

echo '########################################'
echo 'Job finished' $(date --iso-8601=seconds)
end=`date +%s`
runtime=$((end-start0))
minute=60
echo "---- Total runtime $runtime s ; $((runtime/minute)) min ----"
```

## DNAscent
Finally DNAscent can be run! Here is an examplary script. As I had trouble to do the installation on the cluster, I made an Apptainer Image to run DNAscent (dnascent.sif), ensure you have it before starting. 

```sh
#!/bin/bash

################################ Slurm options #################################

### Job name
#SBATCH --job-name=dnascent

### Limit run time "days-hours:minutes:seconds"
#SBATCH --time=24:00:00

### Requirements
#SBATCH --partition=ipop-up

### Output
#SBATCH --output=%x-%j.out

### resources
#SBATCH --mem=100G
#SBATCH --cpus-per-task=16


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

SAMPLE="UVplus"
REF="/shared/banks/genomes/homo_sapiens/hg38/fasta/hg38.fa"

echo "Processing $SAMPLE using as reference $REF ..."

# index made from the sequencing summary file (from Guppy)
singularity exec dnascent.sif /DNAscent/bin/DNAscent index -f FAST5/$SAMPLE/ -s Guppy/$SAMPLE/sequencing_summary.txt -o $SAMPLE.DNAscent.index
echo "Index done."
# detection on FAIL reads
singularity exec dnascent.sif /DNAscent/bin/DNAscent detect -b Guppy/${SAMPLE}_fail.sorted.bam -r $REF -i $SAMPLE.DNAscent.index -o ${SAMPLE}.fail.DNAscent.detect -t 16
echo "Detection in fail reads done."
# detection on PASS reads
singularity exec dnascent.sif /DNAscent/bin/DNAscent detect -b Guppy/${SAMPLE}_pass.sorted.bam -r $REF -i $SAMPLE.DNAscent.index -o ${SAMPLE}.pass.DNAscent.detect -t 16
echo "Detection in pass reads done."


echo '########################################'
echo 'Job finished' $(date --iso-8601=seconds)
end=`date +%s`
runtime=$((end-start0))
minute=60
echo "---- Total runtime $runtime s ; $((runtime/minute)) min ----"
```
It generates big table with, for each reads, at each T position, a probability to be EdU (col 2) and a probability to be BrdU (col 3). 

```
[hennion @ cpu-node130 15:15]$ DNAscent_detect : head -20 UVplus.fail.DNAscent.detect
#Alignment Guppy/UVplus_fail.sorted.bam
#Genome /shared/banks/genomes/homo_sapiens/hg38/fasta/hg38.fa
#Index UVplus.DNAscent.index
#Threads 16
#Compute CPU
#Mode CNN
#MappingQuality 20
#MappingLength 1000
#SystemStartTime 27/05/2024 09:15:22
#Software /DNAscent/
#Version 4.0.1
#Commit 18865e9d496efc089251b313f62202fe3a604880
>8f9cebe9-e1d2-4a68-96f5-27dcfa34ab6b chr1 1114735 1116023 fwd
1114739 0.122758        0.025606        AACATCCCA
1114756 0.159209        0.035094        CCCCTACCC
1114761 0.358214        0.060606        ACCCTGGGG
1114767 0.316088        0.048011        GGGCTCAAA
1114778 0.012539        0.010591        CGGCTCCCT
1114782 0.187251        0.025960        TCCCTCTGC
1114784 0.225671        0.031533        CCTCTGCGA
```

## Exploration of those results
You can adapt the Jupyter Notebook `DNAscent_explo.ipynb` to visualise EdU amount in your reads. 
