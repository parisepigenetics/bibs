---
layout: page
title: Training
description: Exercices for the training (12/06/23)
order: 1
---

# iPOP-UP training: hands-on
{:.no_toc}

Date: 12/06/2023  
Trainers: Olivier Kirsh, Julien Rey, Magali Hennion

---
# Table of content
{:.no_toc}

- TOC
{::options toc_levels="1,2" /}
{:toc}

---
# Connect to the cluster
```
ssh username@ipop-up.rpbs.univ-paris-diderot.fr
```

## Warm-up

There is a `training` folder in the common banks, navigate to this folder and list what is inside. 

Then go to one of your projects and create a folder named `230612_training`. This is where you will do all the exercices. 

# Optional: use a file explorer

Using the file manager from GNOME, you can navigate easily on iPOP-UP file server. 
- Open the file manager `Fichiers`.
- Click on `Autres emplacements` on the side bar.
- In the bar `Connexion à un serveur`, type `sftp://ipop-up.rpbs.univ-paris-diderot.fr/` and press the enter key.
- Enter your login and password.  

This way, you can modify your files directly using any local text editor.

<span>{% include icon.liquid id='exclamation-triangle' %} <b>Be careful</b></span><br> Never use word processor (like Microsoft Word or LibreOffice Writer) to modify your code and never copy/past code to/from those softwares. Use **only text editors** and **UTF-8 encoding**.
{:.ui.warning.message}

<span>{% include icon.liquid id='lightbulb-outline' %} <b>Tip</b></span><br> For other systems, please see the instructions for [Windows]({{site.baseurl}}/cluster/tips/mounting_win) or [Linux]({{site.baseurl}}/cluster/tips/mounting_linux). 
{:.ui.success.message}



# Get information about the cluster

```
sinfo
```

# sbatch 

`sbatch` allows you to send an executable file to be ran on a computation node.

## Exercise 1: my first sbatch script

Starting from [01_02_flatter.sh]({{site.baseurl}}/documents/templates/01_02_flatter.sh), make a script named `flatter.sh` printing "What a nice training !"

Then run the script: 

```
sbatch flatter.sh
```
The output that should have appeared on your screen has been diverted to slurm-xxxxx.out but this name can be changed using SBATCH options. 

<img src="{{site.baseurl}}/images/flatter.png" alt="drawing" width="600"/>

## Exercise 2: my first SBATCH option

Modify `flatter.sh` to add this line:

```
#SBATCH -o flatter.out
```
then run it. Anything different ?


## Exercise 3: hostname

Run using sbatch the command `hostname` in a way that the sbatch outfile is called `hostname.out`. 

What is the output ? How does it differ from typing directly `hostname` in the terminal and why ?


# Useful sbatch options 1/2

| Options     | Flag | Function                                            |
|-------------|------|-----------------------------------------------------|
| −−partition | -p   | partition to run the job (mandatory)                |
| −−job-name  | -J   | give a job a name                                   |
| −−output    | -o   | output file name                                    |
| −−error     | -e   | error file name                                     |
| −−chdir     | -D   | set the working directory before running  |
| −−time      | -t   | limit the total run time (default : no limit)    |
| −−mem       |      | memory that your job will have access to (per node) |

To find out more, the Slurm manual `man sbatch` or [https://slurm.schedmd.com/sbatch.html](https://slurm.schedmd.com/sbatch.html).
    

# Modules
A lot of tools are installed on the cluster. To list them, use one of the following commands. 
```
module available
module avail
module av
```
You can limit the search for a specific tool, for example look for the different versions of multiqc on the cluster using `module av multiqc`.  

<img src="{{site.baseurl}}/images/multiqc.png" alt="drawing" width="600"/>

## To load a tool
```
module load tool/1.3
module load tool1 tool2 tool3
```
## To list the modules loaded
```
module list
```
## To remove all loaded modules
```
module purge
```
<span>{% include icon.liquid id='lightbulb-outline' %} <b>Tip</b></span><br> Load your modules within your "sbatch" file for consistency. 
{:.ui.success.message}



# Job handling and monitoring

## Exercise 4: follow your jobs

The `sleep` command : do nothing (delay) for the set number of seconds. 

Restart from [03_04_hostname_sleep.sh]({{site.baseurl}}/documents/templates/03_04_hostname_sleep.sh) and launch a simple job that will launch `sleep 600`.

## squeue

On your terminal, type 
```
squeue
``` 
<img src="{{site.baseurl}}/images/squeue.png" alt="drawing" width="700"/>

`ST` Status of the job.  
`R` = Running  
`PD` = Pending  

To see only iPOP-UP jobs
```
squeue -p ipop-up
```
To see only your jobs
```
squeue -u username
```

## scancel

To cancel a job which you started, use the `scancel` command followed by the jobID (Number given by SLURM, visible in squeue)

```
scancel jobID
```

## sacct

Re-run `sleep.sh` and type 
```
sacct
``` 
<img src="{{site.baseurl}}/images/sacct.png" alt="drawing" width="700"/>


You can pass the option `--format` to list the information that you want to display, including memory usage, time of running,...  
For instance
```
sacct --format=JobID,JobName,Start,Elapsed,CPUTime,NCPUS,NodeList,MaxRSS,ReqMeM,State
```

To see every options, run `sacct --helpformat`

## Job efficiency : seff

After the run, the `seff` command allows you to access information about the efficiency of a job.
```
seff <jobid>
```
<img src="{{site.baseurl}}/images/seff.png" alt="drawing" width="400"/>

# Bringing it all together

## Exercise 5 : Alignment

Run an alignment using STAR version 2.7.5a starting from [05_06_star.sh]({{site.baseurl}}/documents/templates/05_06_star.sh). 

- The FASTQ files to align are in `/shared/banks/mus_musculus/test_fastq`.  
- You need an index folder for STAR (version 2.7.5a) for the mouse mm39 genome, look for it in the banks.  
- You have to increase the RAM to 25G. 


## After the run
Check the resource that was used using `seff`.  


# Parallelization

# Useful sbatch options 2/2


| Options           | Default | Function                                                      |
|-------------------|---------|---------------------------------------------------------------|
| −−nodes           | 1       | Number of nodes required (or min-max)                         |
| −−nodelist        |         | Select one or several nodes                                   |
| −−ntasks-per-node | 1       | Number of tasks invoked on each node                          |
| −−mem             | 2GB     | Memory required per node                                      |
| −−cpus-per-task   | 1       | Number of CPUs allocated to each task                         |
| −−mem-per-cpu     | 2GB     | Memory required per allocated CPU                             |
| −−array           |         | Submit multiple jobs to be executed with identical parameters |

# Multi-threading

Some tools allow multi-threading, i.e. the use of several CPUs to accelerate one task. It is the case of STAR with the `--runThreadN` option. 

## Exercise 6: Alignment, parallel

Modify the previous sbatch file to use 4 threads to align the FASTQ files on the reference. Run and check time and memory usage.

# Use Slurm variables

The Slurm controller will set some variables in the environment of the batch script. They can be very useful. For instance, you can improve the previous script using `$SLURM_CPUS_PER_TASK`. 

The full list of variables is visible [here](https://slurm.schedmd.com/sbatch.html). 

# Job arrays
Job arrays allow to start the same job a lot of times (same executable, same resources). If you add the following line to your script, the job will be launch 6 times (at the same time), the variable `$SLURM_ARRAY_TASK_ID` taking the value 0 to 5. 

```
#SBATCH --array=0-5
```

## Exercice 7 : Job array

Starting from [07_08_array_example.sh]({{site.baseurl}}/documents/templates/07_08_array_example.sh), make a simple script launching 6 jobs in parallel. 

## Exercice 8 : fair resource sharing
It is possible to limit the number of jobs running at the same time using `%max_running_jobs` in `#SBATCH --array` option. 

Modify your script to run only 2 jobs at the time.  

# Job arrays examples

## Take all files matching a patern in a directory
Example
```sh
FQ=(*fastq.gz)
echo ${FQ[@]}
INPUT=$(basename -s .fastq.gz "${FQ[$SLURM_ARRAY_TASK_ID]}")
echo $INPUT
```

## List or find files to process 
You can use `ls` or `find` to identify the files to process and get the nth with `sed` (or `awk`)
```sh
#SBATCH --array=1-4   # If 4 files, as sed index start at 1
INPUT=$(ls $PATH2/*.fq.gz ` sed -n ${SLURM_ARRAY_TASK_ID}p)
echo $INPUT
```

# Job Array Common Mistakes

- The index of bash lists starts at 0
- Don't forget to have different output files for each task of the array
- Same with your log names (\%a or \%J in the name will do the trick)
- Do not overload the cluster! Please use \%50 (for example) at the end of your indexes to limit the number of tasks (here to 50) running at the same time. The 51st will start as soon as one finishes!
- The RAM defined using `#SBATCH --mem=25G` is for each task
    
# Complex workflows

<img src="{{site.baseurl}}/images/snakemake.png" alt="drawing" width="800"/>

Use workflow managers such as Snakemake or Nextflow. 
    
nf-core workflows can be used directly on the cluster. 

## Exercice 9: nf-core workflows

Starting from [09_nf-core.sh]({{site.baseurl}}/documents/templates/09_nf-core.sh), write a script running ChIP-seq workflow on test data. 

Some help can be found [here](https://parisepigenetics.github.io/bibs/edctools/workflows/nf-cores/#/edctools/). 



# Useful resources

- To find out more, read the SLURM manual : `man sbatch` or [https://slurm.schedmd.com/sbatch.html](https://slurm.schedmd.com/sbatch.html)
    
    
- Ask for help or signal problems on the cluster : [https://discourse.rpbs.univ-paris-diderot.fr/](https://discourse.rpbs.univ-paris-diderot.fr/)

- iPOP-UP cluster documentation: [https://ipop-up.docs.rpbs.univ-paris-diderot.fr/documentation/](https://ipop-up.docs.rpbs.univ-paris-diderot.fr/documentation/)

- BiBs practical guide: [https://parisepigenetics.github.io/bibs/cluster/ipopup](https://parisepigenetics.github.io/bibs/cluster/ipopup/#/cluster/)
    
# Thanks
- iPOP-UP's technical and steering comitees

<img src="{{site.baseurl}}/images/ipopup.png" alt="drawing" width="100"/> 

<img src="{{site.baseurl}}/images/RPBS.jpg" alt="drawing" width="150"/> 

<img src="{{site.baseurl}}/images/UniversiteLogo.png" alt="drawing" width="200"/> 

