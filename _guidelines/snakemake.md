---
layout: page
title: Snakemake dev
description: Tips for Snakemake workflow development
order: 1
---

<img src="{{site.baseurl}}/images/banner.png" alt="drawing" width="600"/>

# Tips for Snakemake workflow development

# Building a dag to understand a wokflow
On a cluster, need for Snakemake and Graphviz modules. 

```
[hennion @ ipop-up 12:45]$ : module load graphviz/2.40.1 snakemake/7.32.4
[hennion @ ipop-up 13:48]$ : srun snakemake --profile=configs/ --dag | dot -Tpng > dag.png
```
See also : --rulegraph 

## Of notes

### 1st rule must be the target

By default snakemake executes the first rule in the snakefile. This gives rise to pseudo-rules at the beginning of the file that can be used to define build-targets similar to GNU Make:
```
rule all:
  input:
    expand("{dataset}/file.A.txt", dataset=DATASETS)
```
Here, for each dataset in a python list DATASETS defined before, the file {dataset}/file.A.txt is requested. In this example, Snakemake recognizes automatically that these can be created by multiple applications of the rule complex_conversion shown above.
It is possible to overwrite this behavior to use the first rule as a default target, by explicitly marking a rule as being the default target via the default_target directive:
```
rule xy:
    input:
        expand("{dataset}/file.A.txt", dataset=DATASETS)
    default_target: True
```
Regardless of where this rule appears in the Snakefile, it will be the default target. Usually, it is still recommended to keep the default target rule (and in fact all other rules that could act as optional targets) at the top of the file, such that it can be easily found. 

# Migration to Snakemake 8

See the [notes](https://snakemake.readthedocs.io/en/latest/getting_started/migration.html#migrating-to-snakemake-8) from Snakemake developers. 

[Plugin catalog] (https://snakemake.github.io/snakemake-plugin-catalog/)
