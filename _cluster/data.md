---
layout: page
title: Data transfer
description: Guidelines to transfer big data to a HPC cluster 
order: 1
---

<img src="{{site.baseurl}}/images/banner.png" alt="drawing" width="600"/> 

# Transfer your data
Before doing your analysis, you should transfer the FASTQ files into your project folder `/shared/projects/YourProjectName`. 

## FASTQ names
{:.no_toc}
EDC workflows are expecting **gzip-compressed FASTQ files** with names formatted as   
- `SampleName_R1.fastq.gz` and `SampleName_R2.fastq.gz` for pair-end data, 
- `SampleName.fastq.gz` for single-end data. 

If your files are not fitting this format, please see [how to correct the names of a batch of FASTQ files]({{site.baseurl}}/cluster/tips/#quickly-change-fastq-names). 

## Generate md5sum
{:.no_toc}
It is highly recommended to check the [md5sum](https://en.wikipedia.org/wiki/Md5sum) for big files. If your raw FASTQ files are on your computer in `PathTo/RNAseqProject/Fastq/`, you type in a terminal: 

```
You@YourComputer:~$ cd PathTo/RNAseqProject
You@YourComputer:~/PathTo/RNAseqProject$ md5sum Fastq/* > Fastq/fastq.md5
```

## Copy to the cluster
{:.no_toc}
You can then copy the `Fastq` folder to the cluster using `rsync`, replacing `username` by your login: 

```
You@YourComputer:~/PathTo/RNAseqProject$ rsync -avP  Fastq/ username@core.cluster.france-bioinformatique.fr:/shared/projects/YourProjectName/Raw_fastq
```

In this example the FASTQ files are copied from `PathTo/RNAseqProject/Fastq/` on your computer into a folder named `Raw_fastq` in your project folder on IFB core cluster. On iPOP-UP cluster, only the address is different: 

```
You@YourComputer:~/PathTo/RNAseqProject$ rsync -avP  Fastq/ username@ipop-up.rpbs.univ-paris-diderot.fr:/shared/projects/YourProjectName/Raw_fastq
```


Feel free to name your folders as you want! 
You will be asked to enter your password, and then the transfer will begin. If it stops before the end, rerun the last command, it will only add the incomplete/missing files. 

## Check md5sum
{:.no_toc}
After the transfer, connect to the cluster ([IFB]({{site.baseurl}}/cluster/ifb/#/cluster), [iPOP-UP]({{site.baseurl}}/cluster/ipopup/#/cluster)) and check the presence of the files in `Raw_fastq` using `ls` command. 

```
[username@clust-slurm-client YourProjectName]$ ls Raw_fastq
```

Check that the transfer went fine and that all files are complete using `md5sum`.

```
[username@clust-slurm-client YourProjectName]$ cd Raw_fastq
[username@clust-slurm-client Raw_fastq]$ md5sum -c fastq.md5
```


---
<small>Author : [Magali Hennion](mailto:magali.hennion@cnrs.fr)  
Last update : 26/10/2023</small>