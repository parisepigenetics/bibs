---
layout: page
title: Tips and Tricks
description: Tips and Tricks to use the clusters
order: 1
---

<img src="{{site.baseurl}}/images/banner.png" alt="drawing" width="400"/>

# Small or big tips and tricks offered by your BiBs facility!
{:.no_toc}

---

# Table of content
{:.no_toc}

- TOC
{::options toc_levels="1" /}
{:toc}

---

# Mounting distant servers 

- [Navigating on iPOP-UP server on Windows](mounting_win) 
- [Navigating on iPOP-UP server on Linux](mounting_linux)

---

# Make aliases
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

---