---
layout: page
title: IFB
description: how to use the IFB core cluster
order: 1
---

<img src="{{site.baseurl}}/images/banner.png" alt="drawing" width="400"/>

# Using IFB core cluster 
---
## Resources 
  - Create and manage your [account](https://my.cluster.france-bioinformatique.fr/manager2/login).  
  - Community [support](https://community.cluster.france-bioinformatique.fr). Nice forum where you can get the latests news, ask for help, or why not give help!   
  - [Full Documentation](https://ifb-elixirfr.gitlab.io/cluster/doc/) to learn how to use properly the cluster.
  - [Jupyter Hub](https://jupyterhub.cluster.france-bioinformatique.fr). Easy way to navigate in your folders, run notebooks, etc...
  - [R Studio](https://rstudio.cluster.france-bioinformatique.fr/) IFB online implementation.   


---
## Get an account on IFB core cluster and create a project

We highly recommend to first read at least the [Quick Start](https://ifb-elixirfr.gitlab.io/cluster/doc/quick-start/) of the cluster [documentation](https://ifb-elixirfr.gitlab.io/cluster/doc/). 

- To ask for an account you have to go to [my.cluster.france-bioinformatique.fr](https://my.cluster.france-bioinformatique.fr/manager2/login), click on `create an account` and fill the form. You will then shortly receive an email to activate your account.  
- Once your account is active, you have to connect to [my.cluster.france-bioinformatique.fr/manager2/project](https://my.cluster.france-bioinformatique.fr/manager2/project) in order to create a new project. You will then receive an email when it's done (few hours usually). 
- [Facultative] If your data are not sensitive and you encounter difficulties, you can give Magali access to your project by adding the user `mhennion` on the [project manager webpage](https://my.cluster.france-bioinformatique.fr/manager2/project). You can remove it anytime. 


---
## Connect to IFB core cluster
You can connect to IFB server either via `ssh` or using the Jupyter Hub from IFB, which facilitates a lot file navigation. 

### Easy connection : use the Jupyter Hub!
You can connect to [IFB Jupyter Hub](https://jupyterhub.cluster.france-bioinformatique.fr/) and enter your login and password. On the left pannel, you can navigate to your project (`/shared/projects/YourProjectName`). 


### SSH connection 
You can also use your terminal and type the following command replacing `username` by your IFB username. 

```bash
You@YourComputer:~/PathTo/RNAseqProject$ ssh -o "ServerAliveInterval 10" -X username@core.cluster.france-bioinformatique.fr
```

You will have to enter your password, and then you'll be connected to your `home` directory. Here you can run small tests, but everything related to a specific project should be done in the corresponding folder. Once your project is created you can access it on IFB core cluster at `/shared/projects/YourProjectName`. 

```
username@core.cluster.france-bioinformatique.fr's password: 
Last login: Wed Nov 24 11:05:31 2021 from 91-166-226-46.subs.proxad.net
#############################################################################
##   Bienvenue sur le Cluster IFB Core                                     ##
##                                                                         ##
##   Pour toute question, demande de support, d’installation d’outils      ##
##   ou d’aide sur une thématique, un outil ou un paramètre,               ##
##   rejoignez-nous sur:                                                   ##
##        https://community.france-bioinformatique.fr                      ##
##                                                                         ##
##   ************************  Account demo  *************************     ##  
##                                                                         ##
##   A partir du 24 nov 2021 tous les nouveaux comptes sont associés       ##
##   à l'account "demo" qui est limité à 50 heures de calcul.              ##
##   L'account par defaut est aussi demo quand vous êtes supprimés         ##
##   d'un projet.                                                          ##
##   Pour utiliser votre projet comme account slurm utiliser               ##
##   l'option -A de srun et sbatch                                         ##
##                                                                         ##
##   srun -A mon_projet ma_commande                                        ##
##                                                                         ##
##   ******************************************************************    ##
##                                                                         ##
##                                                                         ##
##   L'équipe de support Cluster IFB Core                                  ##
#############################################################################
project1 [###-----------------]     401 /    2048 GB
project2 [##########----------]     538 /    1024 GB
project3 [--------------------]       4 /     250 GB
Update: 2021-11-25 10:00 - default account in bold - More info: status_bars --help
[username@clust-slurm-client ~]$ 
```
You see here your projects, with the disk space available and used. 

You can now go to your project using `cd`.

```
[username@clust-slurm-client ~]$ cd /shared/projects/YourProjectName
```

---
