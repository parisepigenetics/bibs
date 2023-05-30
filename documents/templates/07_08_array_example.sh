#!/bin/bash

### SBATCH OPTIONS ###
#SBATCH --partition=ipop-up
#SBATCH --array= ?? # to adjust to select the samples to process (here all 6)
#SBATCH --output=HelloArray_%A_%a.out  # "%A" will be replaced by the job ID and "%a" by the task number
#SBATCH --job-name=ArrayExample

### VARIABLES ###
SAMPLE_LIST=(S01 S02 S03 S04 S05 S06)
SAMPLE=${SAMPLE_LIST[$SLURM_ARRAY_TASK_ID]} # take the nth element of the list, n being the task number

### COMMANDS ###
echo "Hello I am the task number $SLURM_ARRAY_TASK_ID from the job array $?." # $? Look for the Slurm variable for the job ID. 
sleep 20
echo "And I will process sample $SAMPLE."
