#!/bin/bash

### SBATCH OPTIONS ###
#SBATCH --partition=ipop-up
#SBATCH --job-name=Alignment
#SBATCH --output=star-alignment-%j.out
#SBATCH --error=star-alignment-%j.err
#SBATCH --mem=25G # increase memory to 25G

### MODULES ###
module purge
module load star/2.7.5a # find appropriate STAR module (2.7.5a)

### VARIABLES ###
pathToIndex=/shared/banks/mus_musculus/mm39/star-2.7.5a # look for the path of the index for mus musculus (mm39) made for STAR 
pathToFastq1=/shared/projects/training/test_fastq/D192red_R1.fastq.gz # look in /shared/projects/training/test_fastq to get the path to the R1 fastq.gz file
pathToFastq2=/shared/projects/training/test_fastq/D192red_R2.fastq.gz # look in /shared/projects/training/test_fastq to get the path to the R2 fastq.gz file
outputFileName=STAR_results/D192red # choose your output file name

### COMMANDS ###
STAR --genomeDir $pathToIndex \
--readFilesIn $pathToFastq1 $pathToFastq2 \
--outFileNamePrefix $outputFileName \
--readFilesCommand zcat

