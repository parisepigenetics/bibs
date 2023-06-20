---
layout: page
title: Methylator
description: DNA methylation analysis workflow
order: 1
---

<img src="{{site.baseurl}}/images/banner.png" alt="drawing" width="600"/>

---
# DNA methylation analysis using Methylator
{:.no_toc}
#### Detailed tutorial
{:.no_toc}

<small>Maintained by [BiBs](mailto:bibsATparisepigenetics.com). Last update : 20/06/2023. Methylator v0.1. </small>  

This is a BETA version of the workflow, and of this documentation! There is no guarantee!!! 
{:.ui.large.warning.message}

If you use this workflow to analyse your data, don't forget to **acknowledge BiBs** in all your communications ! 
{:.ui.large.warning.message}
<span>{% include icon.liquid id='check-circle' %} <b>EDC people</b></span><br> "We thank the Bioinformatics and Biostatistics Core Facility, Paris Epigenetics and Cell Fate Center for bioinformatics support."
{: .ui.success.message}
<span>{% include icon.liquid id='check-circle' %} <b>External users</b></span><br> "We thank the Bioinformatics and Biostatistics Core Facility, Paris Epigenetics and Cell Fate Center for sharing their analysis workflows."
{: .ui.success.message}

Implemented by [BiBs-EDC](https://parisepigenetics.github.io/bibs/), this workflow for DNA methylation data analysis runs effectively on both IFB and iPOP-UP clusters. If you encounter troubles or need additional tools or features, you can create an issue on the [GitHub repository](https://github.com/parisepigenetics/Methylator/issues), email directly [BiBs](mailto:bibsATparisepigenetics.com), or pass by the 366b room.  
{:.larger.text}


---
# Table of content
{:.no_toc}

- TOC
{::options toc_levels="1,2" /}
{:toc}

---
# Your analysis in a nutshell
- Get an [account](#get-an-account-on-ifb-core-cluster-and-create-a-project) on a cluster and create a project
- [Transfer your data](#transfer-your-data) to the cluster
- [Clone](#methylator-installation-and-description) Methylator [repository](https://github.com/parisepigenetics/Methylator)
- [Modify](#preparing-the-run) `metadata.tsv` and `config_main.yaml`
- Run the [workflow](#running-the-workflow) typing `sbatch Workflow.sh`
- Look at the [results](#workflow-results)

Here is a simplified scheme of the workflow. The main steps are indicated in the blue boxes. Methylator will allow you to choose which steps you want to execute for your project. In the green circles are the input files you have to give for the different steps. 

<img src="Tuto_pictures/methylator_chart.png" alt="drawing" width="800"/>

[![Back to toc][1]][2]

---
---

# Resources

- iPOP-UP 
  - Documentation [coming soon!]
  - Community [support](https://discourse.rpbs.univ-paris-diderot.fr/c/ipop-up) 

- IFB  
  - Create and manage your [account](https://my.cluster.france-bioinformatique.fr/manager2/login)  
  - Community [support](https://community.cluster.france-bioinformatique.fr)   
  - [Documentation](https://ifb-elixirfr.gitlab.io/cluster/doc/)
  - [Jupyter Hub](https://jupyterhub.cluster.france-bioinformatique.fr)  

- Tools implemented
  - [FastQC](https://www.bioinformatics.babraham.ac.uk/projects/fastqc/)
  - [MultiQC](https://multiqc.info/docs/)
  - [Trim Galore](https://www.bioinformatics.babraham.ac.uk/projects/trim_galore/)
  - [Samtools](http://www.htslib.org/doc/samtools.html)
  - [deepTools](https://deeptools.readthedocs.io/en/develop/)
  - [Qualimap](http://qualimap.bioinfo.cipf.es/doc_html/index.html)
  - ???
 
[![Back to toc][1]][2]

---
---

# Before starting : create an account and a project on your favorite cluster

Please find instructions using the links below  
- [IFB core cluster]({{site.baseurl}}/cluster/ifb/#/cluster)

- [iPOP-UP cluster]({{site.baseurl}}/cluster/ipopup/#/cluster)


---
# Methylator installation and description

In order to install Methylator, you  have to clone the Methylator GitHub repository to your cluster project. 

If you're using the Jupyter Hub on IFB, you can open a **Terminal** by clicking on the corresponding icon. 

<img src="Tuto_pictures/JupyterHub.png" alt="drawing" width="700"/>

Before clonning Methylator, go to your project using the `cd` command.

```
[username @ cpu-node-12 ]$ cd /shared/projects/YourProjectName
```
Now you can clone the repository (use `-b v0.1` to specify the version). 
```bash
[username@clust-slurm-client YourProjectName]$ git clone https://github.com/parisepigenetics/Methylator
Cloning into 'Methylator'...
remote: Enumerating objects: 670, done.
remote: Counting objects: 100% (42/42), done.
remote: Compressing objects: 100% (41/41), done.
remote: Total 670 (delta 1), reused 31 (delta 1), pack-reused 628
Receiving objects: 100% (670/670), 999.24 MiB | 32.76 MiB/s, done.
Resolving deltas: 100% (315/315), done.
Checking out files: 100% (84/84), done.
```
Enter `Methylator` directory (`cd`) and look at the files using `tree` or `ls`.
```
[username@clust-slurm-client YourProjectName]$ cd Methylator
[username@clust-slurm-client Methylator]$ tree -L 2
.
????????????????
```

Methylator is launched as a python script named `main_cluster.py` which calls the workflow manager named [Snakemake](https://snakemake.readthedocs.io/en/stable/snakefiles/rules.html). Snakemake will execute rules that are defined in `workflow/xxx.rules` and distribute the corresponding jobs to the computing nodes via [SLURM](https://ifb-elixirfr.gitlab.io/cluster/doc/slurm_user_guide/). 

<img src="Tuto_pictures/cluster_chart.pdf.png" alt="drawing" width="500"/>


 On the cluster, the main python script is launched via the shell script `Workflow.sh`, which basically contains only one command `python main_cluster.py` (+ loading of basic modules and information about the run).

[![Back to toc][1]][2]

----

# Adapt to your cluster
A configuration file with the specifity of your cluster is needed. It has to be named `configs/cluster_config.yaml`. Predefined files are available for IFB and iPOP-UP clusters. 

For IFB, you should type: 
```
cp configs/cluster_config_ifb.yaml configs/cluster_config.yaml
```
For iPOP-UP: 
```
cp configs/cluster_config_ipop.yaml configs/cluster_config.yaml
```
For other clusters, you have to edit the file yourself... 

----

# Quick start with the test dataset
Before running your analyses you can use the test dataset to make and check your installation. 
First copy the configuration file corresponding to the test. 
```
[username@clust-slurm-client Methylator]$ cp TestDataset/configs/config_main.yaml configs/
```
Then start the workflow. 
```
[username@clust-slurm-client Methylator]$ sbatch Workflow.sh wgbs
```

This will run the quality control of the raw FASTQ. See [FASTQ quality control](#fastq-quality-control) for detailed explanations. If everything goes find you will see the results in `TestDataset/results/Test1/fastqc`. See also [how to follow your jobs](#how-to-follow-your-jobs) to know how to check that the run went fine.  
You can now move on with your own data, or run the rest of the workflow on the test dataset. To do so you have to modify `configs/config_main.yaml` turning `QC` entry from "yes" to "no". If you don't know how to do that, see [Preparing the run](#preparing-the-run). Then restart the workflow. 
```
[username@clust-slurm-client Methylator]$ sbatch Workflow.sh wgbs
```
Detailed explanation of the outputs are available in [Workflow results](#workflow-results). 

[![Back to toc][1]][2]

----

# Transfer your data
If you want to use your own data, you should transfer the FASTQ files into your project folder `/shared/projects/YourProjectName` before doing your analysis. Alternatively the workflow allows you to download data from [SRA](https://www.ncbi.nlm.nih.gov/sra/docs/sradownload/) simply giving the `SRRxxx` IDs, see below [metadata.tsv](#metadata-tsv). 

## FASTQ names
{:.no_toc}
The workflow is expecting **gzip-compressed FASTQ files** with names formatted as   
- `SampleName_R1.fastq.gz` and `SampleName_R2.fastq.gz` for pair-end data, 
- `SampleName.fastq.gz` for single-end data. 

If your files are not fitting this format, please see [how to correct the names of a batch of FASTQ files](#quickly-change-fastq-names). 

## Generate md5sum
{:.no_toc}
It is highly recommended to check the [md5sum](https://en.wikipedia.org/wiki/Md5sum) for big files. If your raw FASTQ files are on your computer in `PathTo/MethylProject/Fastq/`, you type in a terminal: 

```
You@YourComputer:~$ cd PathTo/MethylProject
You@YourComputer:~/PathTo/MethylProject$ md5sum Fastq/* > Fastq/fastq.md5
```

## Copy to the cluster
{:.no_toc}
You can then copy the `Fastq` folder to the cluster using `rsync`, replacing `username` by your login: 

```
You@YourComputer:~/PathTo/MethylProject$ rsync -avP  Fastq/ username@core.cluster.france-bioinformatique.fr:/shared/projects/YourProjectName/Raw_fastq
```

In this example the FASTQ files are copied from `PathTo/MethylProject/Fastq/` on your computer into a folder named `Raw_fastq` in your project folder on IFB core cluster. On iPOP-UP cluster, only the address is different: 

```
You@YourComputer:~/PathTo/MethylProject$ rsync -avP  Fastq/ username@ipop-up.rpbs.univ-paris-diderot.fr:/shared/projects/YourProjectName/Raw_fastq
```

Feel free to name your folders as you want! 
You will be asked to enter your password, and then the transfer will begin. If it stops before the end, rerun the last command, it will only add the incomplete/missing files. 

## Check md5sum
{:.no_toc}
After the transfer, connect to the cluster ([IFB](#connect-to-ifb-core-cluster), [iPOP-UP](#connect-to-ipop-up-cluster)) and check the presence of the files in `Raw_fastq` using `ls` or `ll` command. 

```
[username@clust-slurm-client YourProjectName]$ ll Raw_fastq
```

Check that the transfer went fine using `md5sum`.

```
[username@clust-slurm-client YourProjectName]$ cd Raw_fastq
[username@clust-slurm-client Raw_fastq]$ md5sum -c fastq.md5
```

[![Back to toc][1]][2]

---

# Preparing the run

There are **2 files that you have to modify** before running your analysis (`metadata.tsv` and `config_main.yaml` in the `configs` folder). 

To modify the text files from the terminal you can use **vi** or **nano** on iPOP-UP cluster,  plus **emacs** and **gedit** (the last one being easier to use) on IFB. 


<span>{% include icon.liquid id='exclamation-triangle' %} <b>Nota</b></span><br> In order to use **gedit**, be sure that you included `-X` when connecting to the IFB cluster (`-X` option is necessary to run graphical applications remotely). See [common errors](#error-starting-gedit-on-ifb).
{:.ui.info.message}

<span>{% include icon.liquid id='lightbulb-outline' %} <b>Tip</b></span><br> In order to navigate easily in your files with your regular file manager, you can mount your project folder as a disk on your local system. Please follow the instructions for [Windows]({{site.baseurl}}/cluster/tips/mounting_win) or [Linux]({{site.baseurl}}/cluster/tips/mounting_linux). This way, you can modify your files directly using any local text editor.
{:.ui.success.message}

You can also work on your computer and copy the files to the cluster using the `scp` command or the graphic interface FileZilla. 

<span>{% include icon.liquid id='exclamation-triangle' %} <b>Caution</b></span><br> Never use word processor (like Microsoft Word or LibreOffice Writer) to modify your code and never copy/past code to/from those softwares. Use only **text editors** and **UTF-8 encoding**.
{:.ui.large.warning.message}

You can find useful help to manage your data on [IFB core documentation](https://ifb-elixirfr.gitlab.io/cluster/doc/data/). 

If you're using the IFB Jupyter Hub, it's **easier** as text and table editors are included, you just have to double click on the file you want to edit, modify and save it using the menu File/Save or Ctrl+S. 


## metadata.tsv

The experimental description is set up in `config/metadata.tsv`: 

```
[username@clust-slurm-client Methylator]$ cat configs/metadata.tsv 
sample	group
D197-D192T27	J0_WT
D197-D192T28	J0_WT
D197-D192T29	J0_WT
D197-D192T30	J0_KO
D197-D192T31	J0_KO
D197-D192T32	J0_KO
D197-D192T33	J10_WT
D197-D192T34	J10_WT
D197-D192T35	J10_WT
D197-D192T36	J10_KO
D197-D192T37	J10_KO
D197-D192T38	J10_KO
```   

<span>{% include icon.liquid id='exclamation-triangle' %} <b>Important</b></span><br> The columns have to be **tab-separated** and the header to remain unchanged.
{:.ui.large.warning.message}

On Jupyter Hub:  

<img src="Tuto_pictures/metadata.png" alt="drawing" width="700"/>

The first column contains the **sample** names that have to **correspond to the FASTQ names** (for instance here D197-D192T27_R1.fastq.gz). The second column describes the **group** the sample belongs to and will be used for differential expression analysis. You can rename or move that file, as long as you adapt the `METAFILE` entry in `config_main.yaml` (see below).  

<span>{% include icon.liquid id='lightbulb-outline' %} <b>Tip</b></span><br> It is also possible to download and use directly SRA data! That's easy, just enter the SRRxxxx IDs in the first column instead of the sample names! 
{:.ui.success.message}

## config_main.yaml
 
The configuration of the workflow (see [step by step description](#running-your-analysis-step-by-step) below) is done in `config/config_main.yaml`. This is the most important file. It controls the workflow and many tool parameters. 

<span>{% include icon.liquid id='exclamation-triangle' %} <b>Important</b></span><br> The [yaml format](https://yaml.org/) is `key:[space]value`. The space is mandatory.
{:.ui.large.warning.message}

The configuration file contains 3 parts:  

### 1) Define a project name and the steps of the workflow you want to run

```yaml
[username@clust-slurm-client Methylator]$ cat configs/config_main.yaml 
# Project name
PROJECT: Awesome_experience


???????????????????
```

<span>{% include icon.liquid id='exclamation-triangle' %} <b>Important</b></span><br> if `QC` or `SRA` is set to `yes`, the workflow will stop after the QC to let you decide whether you want to trim your raw data or not. In order to run the rest of the workflow, you have to set both `QC` and `SRA` to `no`.
{:.ui.large.warning.message}

### 2) Shared parameters   
Here you define where the FASTQ files are stored, where is the file describing the experimental set up, the name and localization of the folders where the results will be saved. The results (detailed in [Workflow results](#workflow-results)) are separated into two folders:  
- the **big files**: trimmed FASTQ, bam files are in an specific folder defined at `BIGDATAPATH`
- the **small files**: QC reports, count tables, BigWig, etc. are in the final result folder defined at `RESULTPATH`  
Examples are given in the configuration file, but you're free to name and organise them as you want. **Be sure to include the full path** (starting from `/`). Here you also precise if your data are paired-end or single-end and the number of CPUs you want to use for your analysis. 

<span>{% include icon.liquid id='exclamation-triangle' %} <b>Important</b></span><br> We haven't tested single-end data yet, there might be bugs. Please let [us](mailto:bibsATparisepigenetics.com) know if you test it.
{:.ui.warning.message}

```yaml
# ================== Shared parameters for some or all of the sub-workflows ==================

## key file if the data is stored remotely, otherwise leave it empty
KEY: 

## the path to fastq files
READSPATH: /shared/projects/YourProjectName/Raw_fastq
????????????
```

### 3) Configuration of the specific tools  
Here you precise parameters that are specific to one of the steps of the workflow. See detailed description in [step by step analysis](#running-your-analysis-step-by-step).

```yaml
??????
```

[![Back to toc][1]][2]

---------------

# Running your analysis step by step

When the configuration files are ready, you can start the run by `sbatch Workflow.sh wgbs`.

```
[username@clust-slurm-client Methylator]$ sbatch Workflow.sh wgbs
```

Please see below detailed explanation. 

## FASTQ quality control (eventually after SRA data retrieval)

Prerequisite:   
- Using your own data: your FASTQ files are on the cluster, in our example in `/shared/projects/YourProjectName/Raw_fastq` (but you can name your folders as you want, as long as you adjust the `READSPATH` parameter in `config_main.yaml`). 
- You have modified `config/metadata.tsv` according to your experimental design (with sample names or SRR identifiers).

Now you have to check in `config/config_main.yaml` that: 

- you gave a project name

```yaml
# Project name
PROJECT: EXAMPLE
```

- In `Control of the workflow`, `QC` or `SRA` is set to `yes`:

If you want to download data from SRA, set `SRA` to `yes`. The QC will follow automatically. If you use your own data, put `QC` to `yes` and `SRA` to `no`.  

```yaml
## Do you want to download FASTQ files from public from Sequence Read Archive (SRA) ? 
SRA: no  # "yes" or "no". If set to "yes", the workflow will stop after the QC to let you decide whether you want to trim your raw data or not. In order to run the rest of the workflow, you have to set it to "no".

## Do you need to do quality control?
QC: yes  # "yes" or "no". If set to "yes", the workflow will stop after the QC to let you decide whether you want to trim your raw data or not. In order to run the rest of the workflow, you have to set it to "no".
```

The rest of the part `Control of the workflow` will be **ignored**. The software will stop after the QC to give you the opportunity to decide if trimming is necessary or not. 

- The shared parameters are correct (paths to the FASTQ files, metadata.tsv, result folders, single or paired-end data). 

```yaml
## the path to fastq files
READSPATH: /shared/projects/YourProjectName/Raw_fastq

## the meta file describing the experiment settings
METAFILE: /shared/projects/YourProjectName/Methylator/configs/metadata.tsv

## paths for intermediate and final results
BIGDATAPATH: /shared/projects/YourProjectName/Methylator/data # for big files
RESULTPATH: /shared/projects/YourProjectName/Methylator/results

???????????
```

When this is done, you can start the QC by running:

```
[username@clust-slurm-client Methylator]$ sbatch Workflow.sh wgbs
```

You can check if your job is running using squeue.

```
[username@clust-slurm-client Methylator]$ squeue --me
```

You should also check SLURM output files. See [Description of the log files](#description-of-the-log-files). 

## FastQC results

If everything goes fine, fastQC results will be in `results/EXAMPLE/fastqc/`. For every sample you will have something like:

```
[username@clust-slurm-client Methylator]$ ll results/EXAMPLE/fastqc
total 38537
-rw-rw----+ 1 username username  640952 May 11 15:16 Sample1_forward_fastqc.html
-rw-rw----+ 1 username username  867795 May 11 15:06 Sample1_forward_fastqc.zip
-rw-rw----+ 1 username username  645532 May 11 15:16 Sample1_reverse_fastqc.html
-rw-rw----+ 1 username username  871080 May 11 15:16 Sample1_reverse_fastqc.zip
```

Those are individual fastQC reports. [MultiQC](https://multiqc.info/docs/) is called after FastQC, so you will also find `report_quality_control.html` that is a summary for all the samples. 
You can copy those reports to your computer by typing (in a new local terminal):

```
You@YourComputer:~$ scp -pr username@core.cluster.france-bioinformatique.fr:/shared/projects/YourEXAMPLE/Methylator/results/EXAMPLE/fastqc PathTo/WhereYouWantToSave/
```
or look at them directly in the Jupyter Hub.  
It's time to decide if how much trimming you need. Trimming is generally necessary with WGBS or RRBS data. 

<span>{% include icon.liquid id='info-circle' %} <b>Satisfactory data quality? </b></span><br>In principle you can now run all the rest of the pipeline at once. To do so you have set SRA and QC to "no" and to configure the other parts of `config_main.yaml`.
{: .ui.large.info.message}


## Trimming
??????? faire le trimming tout le temps????????

If you put `TRIMMED: no`, there will be no trimming and the original FASTQ sequences will be mapped. 

If you put `TRIMMED: yes`, [Trim Galore](https://github.com/FelixKrueger/TrimGalore/blob/master/Docs/Trim_Galore_User_Guide.md) will remove low quality and very short reads, and cut the adapters. If you also want to remove a fixed number of bases in 5' or 3', you have to configure it. For instance if you want to remove the first 10 bases: 

```yaml
???????

# ================== Configuration for trimming ==================

## Number of trimmed bases
## put "no" for TRIM3 and TRIM5 if you don't want to trim a fixed number of bases.
TRIM5: 10 #  integer or "no", remove N bp from the 5' end of reads. This may be useful if the qualities were very poor, or if there is some sort of unwanted bias at the 5' end. 
TRIM3: no # integer or "no", remove N bp from the 3' end of reads AFTER adapter/quality trimming has been performed. 
```

## Mapping

At this step you have to provide the path to your genome index as well as to a GTF annotation file and a BED file with CpG island coordinates. 

<span>{% include icon.liquid id='info-circle' %} <b>Use common banks!</b></span><br>Some reference files are shared between cluster users. Before downloading a new reference, check what is available at `/shared/bank/` (IFB) or `/shared/banks/` (iPOP-UP).
{: .ui.large.info.message}

```bash
[username@clust-slurm-client ~]$ tree -L 2 /shared/bank/homo_sapiens/
/shared/bank/homo_sapiens/
├── GRCh37
│   ├── bowtie2
│   ├── fasta
│   ├── gff
│   ├── star -> star-2.7.2b
│   ├── star-2.6
│   └── star-2.7.2b
├── GRCh38
│   ├── bwa
│   ├── fasta
│   ├── gff
│   ├── star -> star-2.6.1a
│   └── star-2.6.1a
├── hg19
│   ├── bowtie
│   ├── bowtie2
│   ├── bwa
│   ├── fasta
│   ├── gff
│   ├── hisat2
│   ├── picard
│   ├── star -> star-2.7.2b
│   ├── star-2.6
│   └── star-2.7.2b
└── hg38
    ├── bowtie2
    ├── fasta
    ├── star -> star-2.7.2b
    ├── star-2.6
    └── star-2.7.2b

30 directories, 0 files
```

If you don't find what you need, you can ask for it on [IFB](https://community.france-bioinformatique.fr/) or [iPOP-UP](https://discourse.rpbs.univ-paris-diderot.fr/c/ipop-up) community support. In case you don't have a quick answer, you can download (for instance [here](http://refgenomes.databio.org/)) or produce the indexes you need in your folder (and remove it when it's available in the common banks). Copy the path to the file you need and then paste the link to `wget`. When downloading is over, you might have to decompress the file. 

```
[username@clust-slurm-client Methylator]$ wget ???????
[username@clust-slurm-client index]$ tar -zxvf ???? 
```

- **GTF** files can be downloaded from [GenCode](https://www.gencodegenes.org/) (mouse and human), [ENSEMBL](https://www.ensembl.org/info/data/ftp/index.html), [NCBI](https://www.ncbi.nlm.nih.gov/assembly/) (RefSeq, help [here](https://www.ncbi.nlm.nih.gov/genome/doc/ftpfaq/#files)), ...
Similarly you can download them to the server using `wget`. 

- **CpG Islands** from [UCSC Table](https://genome.ucsc.edu/cgi-bin/hgTables) ????

<span>{% include icon.liquid id='info-circle' %} <b>Fill common banks!</b></span><br>Don't forget to give the links to the new references you made/downloaded to [IFB](https://community.france-bioinformatique.fr/) or to [iPOP-UP](https://discourse.rpbs.univ-paris-diderot.fr/c/ipop-up) support so that they can add them to the common banks.
{: .ui.info.message}


Be sure you give the right path to those files and adjust the other settings to your need: 


```yaml
# ================== Control of the workflow ==================
??????????

```

For an easy visualisation on a genome browser, BigWig files are generated. 



As at the moment the default project quota in 250 Go you might be exceeding the space you have (and may or may not get error messages...). So if the mapping fails, try removing files to get more space, or ask to increase your quota on [IFB Community support](https://community.cluster.france-bioinformatique.fr) or [iPOP-UP Community support](https://discourse.rpbs.univ-paris-diderot.fr/c/ipop-up). To see the space you have you can run:

``` 
[username@clust-slurm-client Methylator]$ du -h --max-depth=1 /shared/projects/YourProjectName/
```

and

```
[username@clust-slurm-client Methylator]$ lfsgetquota YourProjectName
```


## Differential methylation analysis

Finally you have to set the parameters for the differential methylation analysis. You have to define the comparisons you want to do (pairs of conditions). 

```yaml
COMPARISON : [["WT","1KO"], ["WT","DKO"], ["1KO","DKO"]] 

```


## Start the workflow

When the configuration files are fully adapted to your experimental set up and needs, you can **start the workflow** by running:

```
[username@clust-slurm-client Methylator]$ sbatch Workflow.sh wgbs
```

[![Back to toc][1]][2]

---

# Description of the log files 

The first job is the main script. This job will call one or several snakefiles (`.rules` files) that define small workflows of the individual steps. There are SLURM outputs at the 3 levels. 
- [Main script](#main-script)
- [Snakefiles](#snakefiles)
- [Individual tasks](#individual-tasks)

The configuration of the run and the timing are also saved:

- [Configuration and timing](#4-configuration-and-timing)

**Where to find those outputs and what do they contain?**

## Main script

 The output is in `slurm_output` and named `Methylator-xxx.out` (default) or in the specified folder if you modified `Workflow.sh`. A copy is also available in the `logs` folder. It contains global information about your run. 
Typically the main job output looks like :

```
[username@clust-slurm-client Methylator]$ cat slurm_output/Methylator-???.out 

??? 

```
You can see at the end if this file if an error occured during the run. See [Errors](#having-errors).

## Snakefiles
 There are 4 snakefiles (visible in the `workflow` folder) that correspond to the different steps of the analysis:
  - fastq_dump_QC.rules (QC)
  - trim.rules (reads trimming/filtering)
  - mapping.rules (mapping)
  - methylator.rules (statistical analysis)

The SLURM outputs of those different steps are stored in the `logs` folder and named as the date plus the corresponding snakefile: for instance
`20230615T1540_trim.txt` or  `20230615T1540_mapping.txt`. 

Here is a description of one of those files (splitted): 


- Building the DAG (directed acyclic graph): Define the jobs that will be launched and in which order.

```
Building DAG of jobs...
Using shell: /usr/bin/bash
Provided cluster nodes: 30

???
```

- Start the first job (or jobs if there are several independant jobs). The rule is indicated, with the expected outputs. For the first steps one job is started per sample. 

```
????

```

You have here the corresponding **job ID**. You can follow that particular job in `slurm-7908074.out`. 

- End of that job, start of the next one:

```
[Tue May 12 17:48:30 2020]
Finished job 4.
1 of 5 steps (20%) done

[Tue May 12 17:48:30 2020]
rule trimstart:
    input: /shared/projects/lxactko_analyse/RASflow/data/LXACT_1-test/trim/reads/Test_forward.fastq.gz, /shared/projects/lxactko_analyse/RASflow/data/LXACT_1-test/trim/reads/Test_reverse.fastq.gz
    output: /shared/projects/lxactko_analyse/RASflow/data/LXACT_1-test/trim/Test_forward.91bp_3prime.fq.gz, /shared/projects/lxactko_analyse/RASflow/data/LXACT_1-test/trim/Test_reverse.91bp_3prime.fq.gz
    jobid: 3
    wildcards: sample=Test

Submitted DRMAA job 3 with external jobid 7908075.
```

- At the end of the job, it removes temporary files if any:

```
Removing temporary output file /shared/projects/lxactko_analyse/RASflow/data/LXACT_1-test/trim/reads/Test_forward.fastq.gz.
Removing temporary output file /shared/projects/lxactko_analyse/RASflow/data/LXACT_1-test/trim/reads/Test_reverse.fastq.gz.
[Tue May 12 17:49:10 2020]
Finished job 3.
2 of 5 steps (40%) done
```

- And so on... Finally:

```
[Tue May 12 17:51:10 2020]
Finished job 0.
5 of 5 steps (100%) done
Complete log: /shared/mfs/data/projects/lxactko_analyse/RASflow/.snakemake/log/2020-05-12T174816.622252.snakemake.log
```


## Individual tasks
Every job generate a `slurm-JOBID.out` file. It is localised in the working directory as long as the workflow is running. It is then moved to the `slurm_output` folder. SLURM output specifies the rule, the sample (or samples) involved, and gives outputs specific to the tool:  

```
[username@clust-slurm-client Methylator]$ cat slurm_output/
??????

```
## Configuration and timing

Three extra files can be found in the `logs` folder:

- A log file named `20230526T1623_running_time.txt` stores **running times.**  

```
[username@clust-slurm-client Methylator]$ cat logs/20230526T1623_running_time.txt 

Project name: Test
Start time: Fri May 26 16:23:34 2023
Time of running trimming: 0:00:53
Time of running genome alignment: 0:02:55
Finish time: Fri May 26 16:30:09 2023
```

- A log file named `20230526T1623_configuration.txt` keeps a track of the **configuration of the run** (`config_main.yaml` followed by `metadata.tsv`, the environment contained in the Apptainer image with all tool versions, and resource configuration `workflow/cluster.yaml`) ?????A changer en resources.yaml ??????? 

```yaml
[username@clust-slurm-client Methylator]$: cat logs/20230526T1623_configuration.txt 
 
??????????
```
- A log file named `20200925T1057_free_disk.txt` stores the disk usage during the run (every minute, the remaining space is measured). 
```
# quota:1 limit:1.5
time	free_disk
20210726T1611	661
20210726T1612	660
20210726T1613	660
20210726T1614	660
20210726T1615	660
20210726T1616	660
```
If a run stops with no error, it can be that you don't have enough space in your project. You can see in this file that the free disk tends to 0. 


[![Back to toc][1]][2]

---

# Workflow results

The results are separated into two folders : 
- the big files : trimmed FASTQ, BAM files, RData objects are in the data folder defined in `configs/config_main.yaml` at `BIGDATAPATH`

```yaml
## paths for intermediate and final results
BIGDATAPATH: /shared/projects/YourProjectName/Methylator/Big_Data # for big files
```

```
[username@clust-slurm-client Methylator]$ tree -L 2 Big_Data/EXAMPLE/
Big_Data/EXAMPLE/

???


    ...
```

- the small files: QC reports, BigWig, Analysis reports, etc. are in the final result folder defined in `configs/config_main.yaml` at `RESULTPATH`

```yaml
RESULTPATH: /shared/projects/YourProjectName/Methylator/Results
```

```bash
[username@clust-slurm-client Methylator]$ tree -L 2 Results/EXAMPLE/

???????
```

This way you can **get all the results** on your computer by running (from your computer):

```
You@YourComputer:~$ scp -pr username@core.cluster.france-bioinformatique.fr:/shared/projects/YourProjectName/Methylator/results/EXAMPLE/ PathTo/WhereYouWantToSave/
```

and the huge files will stay on the server. You can of course download them as well if you have space (and this is recommended for the long term). 

## Final report

??? AJUSTER ??? 
A report named as `20210727T1030_report.html` summarizes your experiment and your results. You'll find links to fastQC results, to mapping quality report, to exploratory analysis of all the samples and finally to pairwise differential expression analyses. Interactive plots are included in the report. They are very helpful to dig into the results. 

TODO???
A compressed archive named `20210727T1030_report.tar.bz2` is also generated and contains the report and the targets of the different links, excluding big files to make it small enough to be sent to your collaborators. 

<span>{% include icon.liquid id='lightbulb-outline' %} <b>Tip for Windows users</b></span><br> Unlike Linux and Mac, the `tar.bz2` format is not natively supported by Windows, but you can use the free [PeaZip](https://peazip.github.io/) or [7-zip](https://www.7-zip.org/) softwares to decompress the `xxx_report.tar.bz2` archive. 
{:.ui.success.message}

An example of report is visible [here](ADD A REPORT). 

Detailed description of all the outputs of the workflow is included below. 

## Trimmed reads
After trimming, the FASTQ are stored in the data folder defined in `configs/config_main.yaml` at `BIGDATAPATH:`. 

In this examples the trim FASTQ files will be stored in `/shared/projects/YourProjectName/Methylator/data/EXAMPLE/trim/`. They are named
- Sample1_R1_val_1.fq
- Sample1_R2_val_2.fq

### Trimming report
In `results/EXAMPLE/trimming` you'll find trimming reports such as `Sample1_forward.fastq.gz_trimming_report.txt` for each samples. You'll find information about the tools and parameters, as well as trimming statistics:

```
SUMMARISING RUN PARAMETERS
==========================
Input filename: /shared/projects/wgbs_flow/Nanopore_data/ONT_data/rrms_2022.07/bisulfite/raw_data/COLO1_R1.fq.gz
Trimming mode: paired-end
Trim Galore version: 0.6.7
Cutadapt version: 4.2
Python version: could not detect
Number of cores used for trimming: 4
Quality Phred score cutoff: 28
Quality encoding type selected: ASCII+33
Using Illumina adapter for trimming (count: 37651). Second best hit was Nextera (count: 0)
Adapter sequence: 'AGATCGGAAGAGC' (Illumina TruSeq, Sanger iPCR; auto-detected)
Maximum trimming error rate: 0.1 (default)
Minimum required adapter overlap (stringency): 1 bp
Minimum required sequence length for both reads before a sequence pair gets removed: 20 bp
All Read 1 sequences will be trimmed by 10 bp from their 5' end to avoid poor qualities or biases
All Read 2 sequences will be trimmed by 10 bp from their 5' end to avoid poor qualities or biases (e.g. M-bias for BS-Seq applications)
All Read 1 sequences will be trimmed by 9 bp from their 3' end to avoid poor qualities or biases
All Read 2 sequences will be trimmed by 9 bp from their 3' end to avoid poor qualities or biases
Running FastQC on the data once trimming has completed
Output file will be GZIP compressed


This is cutadapt 4.2 with Python 3.7.12
Command line parameters: -j 4 -e 0.1 -q 28 -O 1 -a AGATCGGAAGAGC /shared/projects/wgbs_flow/Nanopore_data/ONT_data/rrms_2022.07/bisulfite/raw_data/COLO1_R1.fq.gz
Processing single-end reads on 4 cores ...
Finished in 148.610 s (3.960 µs/read; 15.15 M reads/minute).

=== Summary ===

Total reads processed:              37,527,910
Reads with adapters:                19,815,625 (52.8%)
Reads written (passing filters):    37,527,910 (100.0%)

Total basepairs processed: 1,876,395,500 bp
Quality-trimmed:              11,610,210 bp (0.6%)
Total written (filtered):  1,798,598,760 bp (95.9%)

=== Adapter 1 ===

Sequence: AGATCGGAAGAGC; Type: regular 3'; Length: 13; Trimmed: 19815625 times

Minimum overlap: 1
No. of allowed errors:
1-9 bp: 0; 10-13 bp: 1

Bases preceding removed adapters:
  A: 49.8%
  C: 24.1%
  G: 13.9%
  T: 12.2%
  none/other: 0.0%

Overview of removed sequences
length	count	expect	max.err	error counts
1	14655096	9381977.5	0	14655096
2	252919	2345494.4	0	252919
3	408890	586373.6	0	408890
[...]

RUN STATISTICS FOR INPUT FILE: /shared/projects/wgbs_flow/Nanopore_data/ONT_data/rrms_2022.07/bisulfite/raw_data/COLO1_R1.fq.gz
=============================================
37527910 sequences processed in total
```

This information is summarized in the MultiQC report, see  below. 

### FastQC of trimmed reads
After the trimming, fastQC is automatically run on the new FASTQ and the results are also in the folder `results/EXAMPLE/fastqc_trimming/`:
- Sample1_R1_trimmed_fastqc.html
- Sample1_R1_trimmed_fastqc.zip
- Sample1_R2_trimmed_fastqc.html
- Sample1_R2_trimmed_fastqc.zip

As previously **MultiQC** gives a summary for all the samples :  `results/EXAMPLE/fastqc_trimming/report_quality_control_after_trimming.html`. You'll find information from the trimming report (for instance you can rapidly see the % of trim reads for the different samples) as well as from fastQC. It is included in the final report (ie `????.html`). 

## Mapped reads
The mapped reads are stored as deduplicated, sorted bam in the data folder, in our example in `Big_Data/EXAMPLE/mapping_BOWTIE2/Deduplicate/`, together with their `.bai` index. They can be visualized using a genome browser such as [IGV](http://software.broadinstitute.org/software/igv/home) but this is not very convenient as the files are heavy. [BigWig](https://deeptools.readthedocs.io/en/develop/content/tools/bamCoverage.html) files, that summarize the information converting the individual read positions into a number of reads per bin of a given size, are more adapted. 

## BigWig
To facilitate visualization on a genome browser, [BigWig](https://deeptools.readthedocs.io/en/develop/content/tools/bamCoverage.html) files are generated (window size of xx ?? bp). There are in `???? `. 

If not already done, you can specifically get the BigWig files on your computer running:

```
You@YourComputer:~$ scp -pr username@core.cluster.france-bioinformatique.fr:/shared/projects/YourProjectName/Methylator/??????, PathTo/WhereYouWantToSave/
```

Snapshot of BigWig tracks visualized on [IGV](http://software.broadinstitute.org/software/igv/home). TODO

<img src="Tuto_pictures/igv_WGBS.png" alt="drawing" width="600"/>


## Mapping QC
[Qualimap](http://qualimap.bioinfo.cipf.es/) is used to check the mapping quality. You'll find qualimap reports in `Results/EXAMPLE/mapping_BOWTIE2/alignmentQC`. Those reports contain a lot of information:
- information about the mapper
- number and % of mapped reads/pairs
- number of indels and mismatches
- coverage per chromosome
- insert size histogram
- ...  

Once again **MultiQC** aggregates the results of all the samples and you can have a quick overview by looking at `Results/EXAMPLE/mapping_BOWTIE2/multiqc/report_mapping_bismark.html` or in the final report (ie `????_report.html`). 

## ?????

## Differential methylation results

Differential methylation results are in `???`.

```
???
```


All those plots are included in the [final report](#final-report). 

<br>

[![Back to toc][1]][2]

---
---

# Extra help! 

## How to follow your jobs

### Running jobs

You can check the jobs that are running using `squeue`.

```
[username@clust-slurm-client Methylator]$ squeue --me
```


### Information about past jobs

The `sacct` command gives you information about past and running jobs. The documentation is [here](https://slurm.schedmd.com/sacct.html). You can get different information with the `--format` option. For instance: 

```
[username@clust-slurm-client Methylator]$ sacct --format=JobID,JobName,Start,CPUTime,MaxRSS,ReqMeM,State
       JobID    JobName               Start    CPUTime     MaxRSS     ReqMem      State 
------------ ---------- ------------------- ---------- ---------- ---------- ---------- 
...
9875767          BigWig 2020-07-27T16:02:48   00:00:59               80000Mn  COMPLETED 
9875767.bat+      batch 2020-07-27T16:02:48   00:00:59     87344K    80000Mn  COMPLETED 
9875768         BigWigR 2020-07-27T16:02:51   00:00:44               80000Mn  COMPLETED 
9875768.bat+      batch 2020-07-27T16:02:51   00:00:44     85604K    80000Mn  COMPLETED 
9875769             PCA 2020-07-27T16:02:52   00:01:22                2000Mn  COMPLETED 
9875769.bat+      batch 2020-07-27T16:02:52   00:01:22    600332K     2000Mn  COMPLETED 
9875770         multiQC 2020-07-27T16:02:52   00:01:16                2000Mn  COMPLETED 
9875770.bat+      batch 2020-07-27T16:02:52   00:01:16    117344K     2000Mn  COMPLETED 
9875773        snakejob 2020-07-27T16:04:35   00:00:42                2000Mn  COMPLETED 
9875773.bat+      batch 2020-07-27T16:04:35   00:00:42     59360K     2000Mn  COMPLETED 
9875774             DEA 2020-07-27T16:05:25   00:05:49                2000Mn    RUNNING 
```

Here you have the job ID and name, its starting time, its running time, the maximum RAM used, the memory you requested (it has to be higher than MaxRSS, otherwise the job fails, but not much higher to allow the others to use the resource), and job status (failed, completed, running). 

**Add `-S MMDD` to have older jobs (default is today only).** 

```
[username@clust-slurm-client Methylator]$ sacct --format=JobID,JobName,Start,CPUTime,MaxRSS,ReqMeM,State -S 0518
```

### Cancelling a job
If you want to cancel a job: scancel job number

```
[username@clust-slurm-client Methylator]$ scancel 8016984
```

Nota: when snakemake is working on a folder, this folder is locked so that you can't start another DAG and create a big mess. If you cancel the main job, snakemake won't be able to unlock the folder (see [below](#folder-locked)). 

## Having errors? 
To quickly check if everything went fine, you have to check the main log. If everything went fine you'll have :

```
???
```

If not, you'll see a summary of the errors: 
```
??????
```

And you can check the problem looking as the specific log file, here `logs/20231104T0921_mapping.txt` 
```
???
```
You can have the description of the error in the SLURM output corresponding to the external jobid, here 13605307: 

```
[username @ clust-slurm-client Methylator]$ cat slurm_output/slurm-13605307.out
```

## Common errors

### Error starting gedit on IFB
If you encounter an error starting gedit

```
[unsername @ clust-slurm-client 16:04]$ ~ : gedit toto.txt
(gedit:6625): Gtk-WARNING **: cannot open display: 
```

Be sure to include `-X` when connecting to the cluster (`-X` option is necessary to run graphical applications remotely).
Use : 

```
You@YourComputer:~$ ssh -X unsername@core.cluster.france-bioinformatique.fr
```

or 

```
You@YourComputer:~$ ssh -X -o "ServerAliveInterval 10" unsername@core.cluster.france-bioinformatique.fr
```

The option `-o "ServerAliveInterval 10"` is facultative, it keeps the connection alive even if you're not using your shell for a while. 


### Initial QC fails

If you don't get MultiQC `report_quality_control.html` report in `results/EXAMPLE/fastqc`, you may have some fastq files not fitting the required format:
- SampleName_R1.fastq.gz and SampleName_R2.fastq.gz for pair-end data, 
- SampleName.fastq.gz for single-end data.

Please see [how to correct a batch of FASTQ files](#quickly-change-fastq-names). 



### Memory 
I set up the memory necessary for each rule, but it is possible that big datasets induce a memory excess error. In that case the job stops and you get in the corresponding Slurm output something like this: 

```
slurmstepd: error: Job 8430179 exceeded memory limit (10442128 > 10240000), being killed
slurmstepd: error: Exceeded job memory limit
slurmstepd: error: *** JOB 8430179 ON cpu-node-13 CANCELLED AT 2020-05-20T09:58:05 ***
Will exit after finishing currently running jobs.
```

In that case, you can increase the memory request by modifying in `workflow/resources.yaml` the `mem` entry corresponding to the rule that failed. 

```yaml
[username@clust-slurm-client Methylator]$ cat workflow/resources.yaml
__default__:
  mem: 500
  name: rnaseq
  cpus: 1

qualityControl:
  mem: 6000
  name: QC
  cpus: 2

trim:
  mem: 6000
  name: trimming
  cpus: 8
...  
```

If the rule that failed is not listed here, you can add it respecting the format. And restart your workflow. 

### Folder locked

When snakemake is working on a folder, this folder is locked so that you can't start another DAG and create a big mess. If you cancel the main job, snakemake won't be able to unlock the folder and next time you run `Workflow.sh wgbs`, you will get the following error:

```
Error: Directory cannot be locked. Please make sure that no other Snakemake process is trying to create the same files in the following directory:
/shared/mfs/data/projects/awesome/Methylator
If you are sure that no other instances of snakemake are running on this directory, the remaining lock was likely caused by a kill signal or a power loss. It can be removed with the --unlock argument.
```

In order to remove the lock, run:

```
[username@clust-slurm-client Methylator]$ sbatch Unlock.sh
```

Then you can restart your workflow. 


### Storage space
Sometimes you may reach the quota you have for your project. To check the quota, run: 

```
[username@clust-slurm-client Methylator]$ lfsgetquota YourProjectName
```

In principle it should raise an error, but sometimes it doesn't and it's hard to find out what is the problem. So if a task fails with no error (typically during mapping), try to make more space (or ask for more space on [IFB Community support](https://community.cluster.france-bioinformatique.fr) or [iPOP-UP Community support](https://discourse.rpbs.univ-paris-diderot.fr/c/ipop-up)) before trying again. 



## Good practice
- Always save **job ID** or the **dateTtime** (ie 20230615T1540) in your notes when launching `Workflow.sh wgbs`. It's easier to find the outputs you're interested in days/weeks/months/years later.


## Juggling with several projects

TODO : rename image to methylator.simg ????

If you work on several projects [as defined by cluster documentation], you can either
- have one independant installation of Methylator / project with its own Singularity Image (2 Go). To do that, git clone Methylator repository in each project. 
- have an independant Methylator folder, but share the Singularity Image.  To do that, git clone Methylator repository in each project, but, before running any analysis, create a symbolic link of `wgbsflow.simg` from your first project:
```
[username@clust-slurm-client PROJECT2]$ cd Methylator
[username@clust-slurm-client Methylator]$ ln -s /shared/projects/YourFirstProjectName/Methylator/wgbsflow.simg/ wgbsflow.simg
```
- Have only one Methylator folder and start all your analysis from the same project, but reading input files and writing result files in a different project. 


## Tricks 

### Make aliases
To save time avoiding typing long commands again and again, you can add aliases to your `.bashrc` file (change only the aliases, unless you know what you're doing). 

``` 
[username@clust-slurm-client ]$ cat ~/.bashrc 
# .bashrc

# Source global definitions
if [ -f /etc/bashrc ]; then
	. /etc/bashrc
fi

# Uncomment the following line if you don't like systemctl's auto-paging feature:
# export SYSTEMD_PAGER=

# User specific aliases and functions

alias qq="squeue -u username"
alias sa="sacct --format=JobID,JobName,Start,CPUTime,MaxRSS,ReqMeM,State"
alias ll="ls -lht --color=always"
```

It will work next time you connect to the server. When you type `sa`, you will get the command `sacct --format=JobID,JobName,Start,CPUTime,MaxRSS,ReqMeM,State` running. 

### Quickly change fastq names

It is possible to quickly rename all your samples using `mv`. For instance if your samples are named with dots instead of underscores and without `R`: 

```
[username@clust-slurm-client Raw_fastq]$ ls
D192T27.1.fastq.gz  
D192T27.2.fastq.gz  
D192T28.1.fastq.gz  
D192T28.2.fastq.gz  
D192T29.1.fastq.gz  
D192T29.2.fastq.gz  
D192T30.1.fastq.gz  
D192T30.2.fastq.gz  
D192T31.1.fastq.gz  
D192T31.2.fastq.gz  
D192T32.1.fastq.gz  
D192T32.2.fastq.gz  
```

You can modify them using `mv` and a loop on sample numbers. 

```
[username@clust-slurm-client Raw_fastq]$ for i in `seq 27 32`; do mv D192T$i\.1.fastq.gz D192T$i\_R1.fastq.gz; done
[username@clust-slurm-client Raw_fastq]$ for i in `seq 27 32`; do mv D192T$i\.2.fastq.gz D192T$i\_R2.fastq.gz; done
```

Now sample names are OK:

```
[username@clust-slurm-client Raw_fastq]$ ls
D192T27_R1.fastq.gz  
D192T27_R2.fastq.gz  
D192T28_R1.fastq.gz  
D192T28_R2.fastq.gz  
D192T29_R1.fastq.gz  
D192T29_R2.fastq.gz  
D192T30_R1.fastq.gz  
D192T30_R2.fastq.gz  
D192T31_R1.fastq.gz  
D192T31_R2.fastq.gz  
D192T32_R1.fastq.gz  
D192T32_R2.fastq.gz  
```

[![Back to toc][1]][2]



[1]:  {{site.baseurl}}/images/toc_icon.png
[2]:  #table-of-content "Back to table of content"
