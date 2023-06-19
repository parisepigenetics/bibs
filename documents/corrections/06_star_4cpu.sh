#!/bin/bash

### SBATCH OPTIONS ###
#SBATCH --partition=ipop-up
#SBATCH --job-name=Alignment
#SBATCH --output=star-alignment-%j.out
#SBATCH --error=star-alignment-%j.err
#SBATCH --mem=30G
#SBATCH --cpus-per-task=4

### MODULES ###
module purge
module load star/2.7.5a

### VARIABLES ###
pathToIndex=/shared/banks/mus_musculus/mm39/star-2.7.5a
pathToFastq1=/shared/projects/training/test_fastq/D192red_R1.fastq.gz
pathToFastq2=/shared/projects/training/test_fastq/D192red_R2.fastq.gz
outputFileName=STAR_results/D192red

### COMMANDS ###
STAR --genomeDir $pathToIndex \
--readFilesIn $pathToFastq1 $pathToFastq2 \
--outFileNamePrefix $outputFileName \
--readFilesCommand zcat \
--runThreadN $SLURM_CPUS_PER_TASK   # use the Slurm variable to adjust the number of threads to available CPUs 


