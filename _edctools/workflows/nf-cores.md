---
layout: page
title: nf-core
description: nf-core workflows
order: 1
---

<img src="{{site.baseurl}}/images/banner.png" alt="drawing" width="600"/>


# How to run nf-cores workflows on IFB  and iPOP-UP clusters
{:.no_toc}

- TOC
{::options toc_levels="1,2,3" /}
{:toc}

---
## Resources
Please look at [nf-core website](https://nf-co.re/) to see existing workflows and their documentation. 

- [RNA-seq](https://nf-co.re/rnaseq)  
RNA sequencing analysis pipeline using STAR, RSEM, HISAT2 or Salmon with gene/isoform counts and extensive quality control.
- [Single-cell RNA-seq](https://nf-core/scrnaseq)  
A single-cell RNAseq pipeline for 10X genomics data
- [ChIP-seq](https://nf-co.re/chipseq)  
ChIP-seq peak-calling, QC and differential analysis pipeline.
- [Cut & Run](https://nf-co.re/cutandrun)  
Analysis pipeline for CUT&RUN and CUT&TAG experiments that includes QC, support for spike-ins, IgG controls, peak calling and downstream analysis.
- [Hi-C](https://nf-co.re/hic)  
Analysis of Chromosome Conformation Capture data (Hi-C)
- [methyl-seq](https://nf-co.re/methylseq)  
Methylation (Bisulfite-Sequencing) analysis pipeline using Bismark or bwa-meth + MethylDackel
- [ATAC-seq](https://nf-core/atacseq)  
ATAC-seq peak-calling, QC and differential analysis pipeline
- [And much more!](https://nf-co.re/pipelines)

In addition, some [useful tips from U-BDS](https://u-bds.github.io/training_guides/nf_core_tips.html). 

---

## Running workflows

In order to run the pipelines, you first need an account and a project on IFB core cluster or on iPOP-UP cluster. See the documentation for [IFB]({{site.baseurl}}/cluster/ifb/#/cluster) and [iPOP-UP]({{site.baseurl}}/cluster/ipopup/#/cluster). 

Below is a short description of the steps to run a workflow with a simple example of ChIPseq. Please refer to the full documentation of the workflow you want to use to set up the parameters correctly. 


In order to configure the workflow you have to create two files: 
- A **design file** in csv format that contains the sample names and paths to find the FASTQ. For instance: [design.csv]({{site.baseurl}}/documents/design.csv)

```
group,replicate,fastq_1,fastq_2,antibody,control
Neuron_K4me3,1,/shared/projects/bi4edc/ChIPseq/RawData/SRR2922213.fastq.gz,,H3K4me3,Neuron_H3
Neuron_K4me3,2,/shared/projects/bi4edc/ChIPseq/RawData/SRR2922214.fastq.gz,,H3K4me3,Neuron_H3
Non-neuron_K4me3,1,/shared/projects/bi4edc/ChIPseq/RawData/SRR2922215.fastq.gz,,H3K4me3,Non-neuron_H3
Non-neuron_K4me3,2,/shared/projects/bi4edc/ChIPseq/RawData/SRR2922216.fastq.gz,,H3K4me3,Non-neuron_H3
Neuron_H3,1,/shared/projects/bi4edc/ChIPseq/RawData/SRR2922277.fastq.gz,,,
Neuron_H3,2,/shared/projects/bi4edc/ChIPseq/RawData/SRR2922278.fastq.gz,,,
Non-neuron_H3,1,/shared/projects/bi4edc/ChIPseq/RawData/SRR2922279.fastq.gz,,,
Non-neuron_H3,2,/shared/projects/bi4edc/ChIPseq/RawData/SRR2922280.fastq.gz,,,
```
- A **configuration file** where you select the steps and options you want to run. For instance: [nf-params.json]({{site.baseurl}}/documents/nf-params.json)

```json
{
    "input": "design.csv",
    "single_end": "true",
    "fragment_size": 200,
    "seq_center": "Goe",
    "fasta": "/shared/bank/mus_musculus/mm10/fasta/mm10.fa",
    "gtf": "/shared/projects/bi4edc/gtf/gencode.vM4.annotation.gtf",
    "save_reference": "true",
    "save_macs_pileup": "true",
    "macs_gsize": "mm"
}
```

The `input` entry should be the design file you created before. 

Then the best is to create a sbatch file to launch the workflow. In this script you will load Nextflow module and then run the pipeline. All necessary tools will be downloaded automatically.  

### Example on IFB core cluster
Here is an example of sbatch file for IFB cluster: [nf-core-ChIPseq_IFB.sh]({{site.baseurl}}/documents/nf-core-ChIPseq_IFB.sh)
```sh
#!/bin/bash

################################ Slurm options #################################

### Job name
#SBATCH --job-name=ChIP_nf

### Output
#SBATCH --output=ChIP_nf-%j.out  # both STDOUT and STDERR
##SBATCH -o slurm.%N.%j.out  # STDOUT file with the Node name and the Job ID
##SBATCH -e slurm.%N.%j.err  # STDERR file with the Node name and the Job ID

### Limit run time "days-hours:minutes:seconds"
##SBATCH --time=24:00:00  (max with fast partition = 24h, but you can put less)

### Requirements
#SBATCH --partition=fast  # use 'long' if you need more than 24h. 
#SBATCH --nodes=1
#SBATCH --ntasks-per-node=1
#SBATCH --mem-per-cpu=5GB

################################################################################

echo '########################################'
echo 'Date:' $(date --iso-8601=seconds)
echo 'User:' $USER
echo 'Host:' $HOSTNAME
echo 'Job Name:' $SLURM_JOB_NAME
echo 'Job Id:' $SLURM_JOB_ID
echo 'Directory:' $(pwd)
echo '########################################'
echo 'ChIP_nf test 01'


start0=`date +%s`

## Load Nextflow environment module
module purge
module load nextflow/20.04.1

# Run a downloaded/git-cloned nextflow workflow 
nextflow run nf-core/chipseq -name trial01 -profile ifb_core -params-file nf-params.json

echo '########################################'
echo 'Job finished' $(date --iso-8601=seconds)
end=`date +%s`
runtime=$((end-start0))
minute=60
echo "---- Total runtime $runtime s ; $((runtime/minute)) min ----"
```
In the nexflow command, you have to give : 
- the name of the pipeline you want to launch (here `nf-core/chipseq`)
- the name of the run (of your choice, `-name` option)
- the profile to use, predefined for IFB (`-profile ifb_core`) 
- the configuration file you prepared (`-params-file`). 


From your project, you can now run in a terminal: 
```
[username @ clust-slurm-client 14:24]$ nf-core : sbatch -A YourProjectName nf-core-ChIPseq.sh
```
And the workflow should run! 
Be aware that some workflows generate a huge amount of data, be sure to have enough space in your project folder.  


### Example on iPOP-UP core cluster
Here is an example of sbatch file for iPOP-UP cluster: [nf-core-ChIPseq_ipop.sh]({{site.baseurl}}/documents/nf-core-ChIPseq_ipop.sh). 
```sh
#!/bin/bash

################################ Slurm options #################################

### Job name
#SBATCH --job-name=ChIP_nf

### Output
#SBATCH --output=ChIP_nf-%j.out  # both STDOUT and STDERR
##SBATCH -o slurm.%N.%j.out  # STDOUT file with the Node name and the Job ID
##SBATCH -e slurm.%N.%j.err  # STDERR file with the Node name and the Job ID

### Limit run time "days-hours:minutes:seconds"
##SBATCH --time=24:00:00

### Requirements
#SBATCH --partition=ipop-up
#SBATCH --mem=5GB

################################################################################

echo '########################################'
echo 'Date:' $(date --iso-8601=seconds)
echo 'User:' $USER
echo 'Host:' $HOSTNAME
echo 'Job Name:' $SLURM_JOB_NAME
echo 'Job Id:' $SLURM_JOB_ID
echo 'Directory:' $(pwd)
echo '########################################'
echo 'ChIP_nf test 01'


start0=`date +%s`

## Export Java paths and load Nextflow environment module
module purge
export JAVA_LD_LIBRARY_PATH=/shared/software/conda/envs/nextflow-21.04.0/lib/server
export JAVA_HOME=/shared/software/conda/envs/nextflow-21.04.0
module load nextflow/21.04.0 

# Run a downloaded/git-cloned nextflow workflow 
nextflow run nf-core/chipseq -name chip_ko -profile ipop_up -params-file nf-params.json

echo '########################################'
echo 'Job finished' $(date --iso-8601=seconds)
end=`date +%s`
runtime=$((end-start0))
minute=60
echo "---- Total runtime $runtime s ; $((runtime/minute)) min ----" 
```
In the nexflow command, you have to give : 
- the name of the pipeline you want to launch (here `nf-core/chipseq`)
- the name of the run (of your choice, `-name` option)
- the profile to use, predefined for iPOP-UP (`-profile ipop_up`) 
- the configuration file you prepared (`-params-file`). 


From your project, you can now run in a terminal: 
```
[username @ ipop-up 14:24]$ nf-core : sbatch nf-core-ChIPseq_ipop.sh.sh
```
And the workflow should run! 
Be aware that some workflows generate a huge amount of data, be sure to have enough space in your project folder.  

### Test dataset

nf-core provides some test datasets for each workflow: To use them, you just need to add `,test` to the `-profile` option. For instance: 

```bash
#!/bin/bash
#SBATCH --partition=ipop-up
#SBATCH --mem=4G

module purge
export JAVA_LD_LIBRARY_PATH=/shared/software/conda/envs/nextflow-21.04.0/lib/server
export JAVA_HOME=/shared/software/conda/envs/nextflow-21.04.0
module load nextflow/21.04.0 

nextflow run nf-core/atacseq  -profile ipop_up,test
```

## Databanks

A local copy of several genomes are available in `/shared/banks/` (iPOP-UP) or `/shared/bank/` (IFB) directory.

---
## Getting help
If you want to get help to configure or start a workflow, please contact [the platform](mailto:bibsATparisepigenetics.com). 

---
## Having errors? 
You'll find help to understand the errors at [https://nf-co.re/usage/troubleshooting](https://nf-co.re/usage/troubleshooting). 