#!/bin/bash

### SBATCH OPTIONS ###
#SBATCH --partition=ipop-up
#SBATCH --array=1-2 # # If 2 files, as sed index start at 1
#SBATCH --output=ls_sed_%A_%a.out
#SBATCH --job-name=Array_ls_sed

### VARIABLES ###
PATH2="/shared/banks/mus_musculus/test_fastq/"

### COMMANDS ###
echo "Hello I am the task number $SLURM_ARRAY_TASK_ID \
from the job array $SLURM_ARRAY_JOB_ID."

# get the list of fasqt.gz files in PATH2, and print the ith with sed, i being the task number
INPUT=$(ls $PATH2/*.f*q.gz | sed -n ${SLURM_ARRAY_TASK_ID}p)
echo "I will process $INPUT."
