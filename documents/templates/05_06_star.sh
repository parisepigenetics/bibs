#!/bin/bash

### SBATCH OPTIONS ###
#SBATCH --partition=ipop-up
#SBATCH --job-name=Alignment
#SBATCH --output=star-alignment-%j.out
#SBATCH --error=star-alignment-%j.err
#SBATCH  # increase memory to 25G

### MODULES ###
module purge
module load  ?? # find appropriate STAR module (2.7.5a)

### VARIABLES ###
pathToIndex= ?? # look for the path of the index for mus musculus (mm39) made for STAR 
pathToFastq1= ?? # look in /shared/banks/mus_musculus/test_fastq to get the path to the R1 fastq.gz file
pathToFastq2= ?? # look in /shared/banks/mus_musculus/test_fastq to get the path to the R2 fastq.gz file
outputFileName= ?? # choose your output file name

### COMMANDS ###
STAR --genomeDir $pathToIndex \
--readFilesIn $pathToFastq1 $pathToFastq2 \
--outFileNamePrefix $outputFileName \
--readFilesCommand zcat

# --runThreadN ??  # exercice 6 use the Slurm variable to adjust the number of threads to available CPUs
