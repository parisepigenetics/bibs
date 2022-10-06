---
layout: page
title: ENA submission
description: Guidelines to submit raw sequences to the European Nucleotide Archive 
order: 1
---

<img src="{{site.baseurl}}/images/banner.png" alt="drawing" width="600"/>

# ENA submission

The European Nucleotide Archive provides a [general guide](
https://ena-docs.readthedocs.io/en/latest/submit/general-guide.html) where all the information you need is available. As it is quite long and complicated. Below is a summary of the different steps one has to follow to put raw FASTQ files into the ENA.

## 1. Transfer the data 

You must upload data files, typically compressed FASTQ files (xxx.fastq.gz), into your private Webin file upload area at EMBL-EBI before you can submit the files through the Webin submission service. 

You have several options:
- Webin File Uploader
- FileZilla
- command line FTP client (Linux or Mac)
- Windows File Explorer

The [documentation](https://ena-docs.readthedocs.io/en/latest/submit/fileprep/upload.html) is well done, please refer to it. 
If you don't manage, don't hesitate to contact us at [bibsATparisepigenetics.com](mailto:bibsATparisepigenetics.com).

## 2. Register the study, samples and runs

The easiest is the Interactive submission. See [documentation]( 
https://ena-docs.readthedocs.io/en/latest/submit/general-guide/interactive.html). 

There are two Webin Portal services: one for test submissions and another for production (real) submissions. The test service allows you to trial the interface in a consequence-free manner. Any submissions made to the test service will be removed by the following day.

- Test service URL: https://wwwdev.ebi.ac.uk/ena/submit/webin/login
- Production service URL: https://www.ebi.ac.uk/ena/submit/webin/login


If you don't have one, you must create a **Webin account** at https://www.ebi.ac.uk/ena/submit/webin/accountInfo. 

Then login to your account at https://www.ebi.ac.uk/ena/submit/webin/login.

### Register Study

The first thing is to register a study, also called project, that will gather different samples and sequencing files. See [documentation](https://ena-docs.readthedocs.io/en/latest/submit/study.html). 

- From https://www.ebi.ac.uk/ena/submit/webin/ click on `Register Study`.
- Then add a release date, a name to the study, a descriptive title and an abstract. 
- Save

Of note, once the corresponding paper is published, you should add the Pubmed ID to the study. 

### Register Samples
Then, you can register the samples of the project. Several experiments (or runs) can be attributed to one sample, for instance if you sequence twice the same sample. See [documentation](
https://ena-docs.readthedocs.io/en/latest/submit/samples.html).

- From https://www.ebi.ac.uk/ena/submit/webin/ click on `Register Samples`. 
- Click on `Download spreadsheet to register samples`
- Select the appropriate checklist, often "ENA default sample checklist"
- File in the checklist. Please see an example [here]({{site.baseurl}}/documents/checklist.tsv). 
- Upload the checklist after cliking on 
`Upload filled spreadsheet to register samples`.
If everything goes fine, you can save accessions at this step.

### Register the reads (FASTQ files)

Finally, you can register your reads (FASTQ files) to make the link with the files you have uploaded at the beginning. See [documentation](https://www.ebi.ac.uk/ena/submit/webin/read-submission). 

- From https://www.ebi.ac.uk/ena/submit/webin/ click on `Submit Reads`. 
- Click on `Download spreadsheet template for Read submission` and choose the appropriate template. 
- File in the spreadsheet. Please see an example [here]({{site.baseurl}}/documents/reads.tsv). 
- Upload the spreadsheet by cliking on 
`Upload filled spreadsheet template for Read submission`.

### Check that everything went fine
On the [main page](https://www.ebi.ac.uk/ena/submit/webin/), click on `Studies Report`
You should see the different studies linked to your Webin account. 
Then on `Action`, you can select `Show runs`. 
You should see the experiments you have defined. Then on `Action`, you can select `Show submitted files` and see the names of the FASTQ files you have uploaded. 

To go quickly to the run, you can click on `Run Files Report` directly from the [main page](https://www.ebi.ac.uk/ena/submit/webin/). 

In the column `Archive status`, the new files should have `File submitted`. It will then turn to `File archived`.

### Status
Data release is controlled from the level of study objects. When a study is made public, all samples, experiments, runs and analyses associated with it are also made public. 

### Add new samples to an existing study

Follow all the steps except `Register Study`. And put the correct study name in the spreadsheet for Read submission. 

Right after submission the data is private. If the study is `public`, the new samples will turn public within a few days (??). 
