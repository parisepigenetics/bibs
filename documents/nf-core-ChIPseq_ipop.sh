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
nextflow run nf-core/chipseq -name chip_ko -profile ipop-up -params-file nf-params.json

echo '########################################'
echo 'Job finished' $(date --iso-8601=seconds)
end=`date +%s`
runtime=$((end-start0))
minute=60
echo "---- Total runtime $runtime s ; $((runtime/minute)) min ----" 
