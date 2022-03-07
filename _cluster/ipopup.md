---
layout: page
title: iPOP-UP
description: how to use the cluster
order: 1
---

<img src="{{site.baseurl}}/images/banner.png" alt="drawing" width="400"/>

# Using iPOP-UP core cluster 

A complete documentation is currently under construction. For now you can refer to the [IFB core cluster documentation](https://ifb-elixirfr.gitlab.io/cluster/doc/) as the iPOP-UP cluster is very similar and uses SLURM as well. 

Below are the specificities of the iPOP-UP cluster.

---
## Ask for an account and a project

If you had an account on the "old" RPBS cluster, your login and password are unchanged. Otherwise we'll create a new account for you. In any case you have to ask for a project. 

Of note: 
- you can have several projects
- you can share a project between several collaborators. All collaborators will have the read and write permissions on the project. 

To create an account and/or a project, write an email to [BiBs](mailto:bibsATparisepigenetics.com) with the following information: 
- NAME, Surname 
- Unit
- Email (institutional adress)
- Projet name (acronym) 
- Required disk space (an estimation) 
- Data type  
- [Facultative] Username of collaborators for this project

We'll create your account and/or project in the following hours/days. Once your account is ready, you'll receive an email with your password.

---

## Connect to iPOP-UP cluster

Server : **ipop-up.rpbs.univ-paris-diderot.fr**

 You can connect to iPOP-UP server only via `ssh` for now. To do so, use your terminal and type the following command replacing `username` by your iPOP-UP username (last name in lower case usually). 

```bash
You@YourComputer:~/PathTo/RNAseqProject$ ssh username@ipop-up.rpbs.univ-paris-diderot.fr
```

You will have to enter your password and then you'll be connected. 

**Tip!** Once connected, you can change your password using the `passwd` command. 


```
You@YourComputer:~/PathTo/RNAseqProject$ ssh username@ipop-up.rpbs.univ-paris-diderot.fr
#################################################################
#           _ _____   ____  _____        _    _ _____           #
#          (_)  __ \ / __ \|  __ \      | |  | |  __ \          #
#           _| |__) | |  | | |__) |_____| |  | | |__) |         #
#          | |  ___/| |  | |  ___/______| |  | |  ___/          #
#          | | |    | |__| | |          | |__| | |              #
#          |_|_|     \____/|_|           \____/|_|              #
#                                                               #
#      Hosted by:                                               #
#      Ressource Parisienne en Bioinformatique Structurale      #
#               ---------------------------                     #
#          All connections are monitored and recorded.          #
#   Disconnect IMMEDIATELY if you are not an authorized user!   #
#                                                               #
#################################################################
username@ipop-up.rpbs.univ-paris-diderot.fr's password: 
Last login: Tue Jan 25 15:21:45 2022 from 172.28.18.162
Bienvenue sur le cluster iPOP-UP.

Pour toute question ou demande de support, rejoignez-nous sur le forum de RPBS : https://discourse.rpbs.univ-paris-diderot.fr

Pour changer le compte projet par défaut : sacctmgr update user $USER set defaultaccount=<project-name>
project1 [--------------------]       3 /    1024 GB
project2 [#-------------------]     913 /   10240 GB
Update: 2022-01-21 16:00 - default account in bold - More info: status_bars --help
[username@ipop-up ~]$
```

Once your project is created you will see it in the list, with the used and available disk space. You can access it at `/shared/projects/YourProjectName` using the `cd` command.

```
[username@ipop-up ~]$ cd /shared/projects/YourProjectName
```

**Tip!** In order to navigate easily in your files with your regular file manager, you can mount your project folder as a disk on your local system. Please follow the instructions: 
- [Mounting iPOP-UP server on Windows]({{site.baseurl}}/cluster/tips/mounting_win) 
- [Mounting iPOP-UP server on Linux]({{site.baseurl}}/cluster/tips/mounting_linux)


---

## Launch jobs

The scheduler is [SLURM](https://slurm.schedmd.com/). You'll find some examples of scripts in [IFB cluster quick start guide](https://ifb-elixirfr.gitlab.io/cluster/doc/quick-start/).  

The only difference is that you have to use the `ipop-up` partition when starting a job. You can define it using `srun` : 
```
srun -p ipop-up my_commande 
```
or  `sbatch` : 

```
sbatch -p ipop-up my_sbatch_script.sh
```

or directly in your sbatch script adding the line : 

```sh
#SBATCH --partition=ipop-up
```

---
## Join the community forum 

iPOP-UP community forum is available at https://discourse.rpbs.univ-paris-diderot.fr/c/ipop-up/. Please register in order to stay updated and use the forum to ask for help or new reference files. 

---

## Where to find banks?

In order to avoid having dozens of copies of the human or mouse genome on the cluster, shared reference files are available in `/shared/banks`. This folder contains :
- reference genome FASTA files
- aligner (STAR, HISAT2, BWA, ...) indexes
- annotation (GTF, GFF) files, ... 

Before running your analysis, please check if your reference is available in `shared/banks`. If not, let us know what you need [by email](mailto:bibsATparisepigenetics.com) or on the [community forum](https://discourse.rpbs.univ-paris-diderot.fr/c/ipop-up/) and we'll add it quickly. 


---
