#!/bin/bash

################################ Slurm options #################################

### Job name
#SBATCH --job-name=nf-core

### Output
#SBATCH --output=%x-%j.out  # both STDOUT and STDERR

### Requirements
#SBATCH --partition= ??

################################################################################

echo '########################################'
echo 'Date:' $(date --iso-8601=seconds)
echo 'User:' $USER
echo 'Host:' $HOSTNAME
echo 'Job Name:' $SLURM_JOB_NAME
echo 'Job Id:' $SLURM_JOB_ID
echo 'Directory:' $(pwd)
echo '########################################'
echo 'nf-core demo'


start0=`date +%s`

# load Nextflow environment module
module purge
module load ?? # find a nextflow module version 24

# Run a the demo workflow
nextflow run ?? -profile ?? --input ?? --outdir ??

echo '########################################'
echo 'Job finished' $(date --iso-8601=seconds)
end=`date +%s`
runtime=$((end-start0))
minute=60
echo "---- Total runtime $runtime s ; $((runtime/minute)) min ----"
