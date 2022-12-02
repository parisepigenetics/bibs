---
layout: page
title: Snakemake dev
description: Tips for Snakemake workflow development
order: 1
---

<img src="{{site.baseurl}}/images/banner.png" alt="drawing" width="600"/>

# Tips for Snakemake workflow development

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
