#!/bin/bash

### SBATCH OPTIONS ###
#SBATCH --partition=ipop-up
#SBATCH --array=0-1
#SBATCH --output=basename_%A_%a.out

### VARIABLES ###
PATH2="/shared/banks/mus_musculus/test_fastq/"

### COMMANDS ###
echo "Hello I am the task number $SLURM_ARRAY_TASK_ID \
from the job array $SLURM_ARRAY_JOB_ID."

# go to the fastq directory and list of fastq.gz files found
cd $PATH2 
FQ=(*fastq.gz)
echo "The list of fastq files is ${FQ[@]}."

# select the basename cutting off ".fastq.gz" from the nth element of FQ list, n being the task number
INPUT=$(basename -s .fastq.gz "${FQ[$SLURM_ARRAY_TASK_ID]}")
echo "I will process $INPUT."
