#!/bin/bash

################################ Slurm options #################################

### Job name
#SBATCH --job-name=ChIP_nf

### Output
#SBATCH --output=%x-%j.out  # both STDOUT and STDERR

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

## Export Java path 
export JAVA_HOME=/shared/software/conda/envs/nextflow-21.10.6 # same module version as below

# load Nextflow environment module
module purge
module load nextflow/21.10.6 # find a nextflow module version 21  

# Run a the chipseq workflow on nf-core test dataset
nextflow run chipseq -profile ipop_up,test --outdir chip 

echo '########################################'
echo 'Job finished' $(date --iso-8601=seconds)
end=`date +%s`
runtime=$((end-start0))
minute=60
echo "---- Total runtime $runtime s ; $((runtime/minute)) min ----" 
