---
layout: page
title: SLURM basics
description: Useful commands to work with SLURM 
order: 1
---

<img src="{{site.baseurl}}/images/banner.png" alt="drawing" width="600"/>

# Slurm documentation
You'll find much more information on [Slurm](https://slurm.schedmd.com/) website. 

# Trainings

BiBs and iPOP-UP organize trainings to help you to use iPOP-UP HPC resource. Slurm basics are presented, see the slides [here]({{site.baseurl}}/documents/Cluster_formation_iPOP_UP.pdf), as well as [exemplary sbatch scripts]({{site.baseurl}}/documents/corrections.zip) as corrections of the exercices.  

---

# How to start a job

You'll find some examples of scripts in [IFB cluster quick start guide](https://ifb-elixirfr.gitlab.io/cluster/doc/quick-start/).  


Using iPOP-UP cluster, the only difference is that you have to use the `ipop-up` partition when starting a job. You can define it using `srun` : 
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

It is possible to start an interactive session specifying the resource you need. 

```
[username @ ipop-up 16:53]$ ~ : srun -p ipop-up --mem 6GB --cpus-per-task 10 --pty bash
[username @ cpu-node130 16:53]$ ~ :
```
You are now connected to a computation node (here named `cpu-node130`), with 6 GB of RAM and 10 CPUs just for you! You can even choose your node using `--nodelist cpu-node131`. This can be useful to check is one of your jobs is properly running.  

```
[username @ ipop-up 17:05]$ ~ : srun -p ipop-up --nodelist cpu-node131 --pty bash
[username @ cpu-node131 17:05]$ ~ : top
 top - 17:05:08 up 73 days,  6:26,  0 users,  load average: 0.00, 0.01, 0.05
Tasks: 1411 total,   1 running, 1410 sleeping,   0 stopped,   0 zombie
%Cpu(s):  0.0 us,  0.0 sy,  0.0 ni,100.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
KiB Mem : 26361312+total, 24462500+free, 10587068 used,  8401040 buff/cache
KiB Swap:  4194300 total,  4039428 free,   154872 used. 25210102+avail Mem 
PID USER      PR  NI    VIRT    RES    SHR S  %CPU %MEM     TIME+ COMMAND   
115414 hennion   20   0  174156   3804   1628 R   0.7  0.0   0:00.30 top                                                                                             
...
```

Press `Ctrl+D` or type `exit` to go back to the login node. 
```
[hennion @ cpu-node131 17:10]$ ~ : exit
[hennion @ ipop-up 17:10]$ ~ :
```
---

# How to follow your jobs

## Running jobs

You can check the jobs that are running using `squeue`.

Only your jobs: 
```
[username@ipop-up]$ squeue -u username
```
All ipop-up jobs:
```
[username@ipop-up]$ squeue -p ipop-up
```

## Cancelling a job

If you want to cancel a job: `scancel job_number`

```
[username@ipop-up]$ scancel 8016984
```

## Information about past jobs

### sacct 

The `sacct` command gives you information about past and running jobs. The documentation is [here](https://slurm.schedmd.com/sacct.html). You can get different information with the `--format` option. For instance: 

```
[username@ipop-up]$ sacct --format=JobID,JobName,Start,CPUTime,MaxRSS,ReqMeM,State
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

<span>{% include icon.liquid id='lightbulb-outline' %} <b>Tip</b></span><br> Use an alias instead of typing this super long command! [Instructions here]({{site.baseurl}}/cluster/tips/#make-aliases)!
{:.ui.success.message}

**Add `-S MMDD` to have older jobs** (default is today only).

```
[username@ipop-up]$ sacct --format=JobID,JobName,Start,CPUTime,MaxRSS,ReqMeM,State -S 0518
```



### seff
The `seff` command gives you information about past jobs. It sumarizes the cores and memory you asked for, and the real usage. It is very useful to ensure that the resource you book corresponds to the real need. 

```
[hennion@ipop-up]$ bi4edc : seff 239790
Job ID: 239790
Cluster: production
User/Group: hennion/umr7216
State: COMPLETED (exit code 0)
Nodes: 1
Cores per node: 4
CPU Utilized: 00:12:50
CPU Efficiency: 85.18% of 00:15:04 core-walltime
Job Wall-clock time: 00:03:46
Memory Utilized: 25.24 GB
Memory Efficiency: 84.12% of 30.00 GB
```