---
layout: page
title: Easy navigation on iPOP-UP (Linux)
description: Navigating on iPOP-UP server on Linux
---

<img src="{{site.baseurl}}/images/banner.png" alt="drawing" width="600"/>

# Navigating on iPOP-UP server on Linux

---
## With Dolphin

You can directly connect via sftp. To do so, you just have to type in the navigation bar: 
```
sftp://username@ipop-up.rpbs.univ-paris-diderot.fr:/shared/projects/awesome  
```
Replacing `username` by your login (family name usually) and `awesome` by your project name. And press enter. 

You will be asked for your password, and that's it! 

<img src="dolphin.png" alt="drawing" width="600"/>

You can save the link into your favorite locations on the left side. To do so, just drag and drop the folder of interest. 

---
## With any file manager

You can create a mounting point on your computer that point to your project on iPOP-UP server.  
In a terminal, you first create a directory on your computer. It will be the mounting point for your project folder. Then you create the connection with `sshfs`. 

```
mkdir ipop_mount_point
sshfs username@ipop-up.rpbs.univ-paris-diderot.fr:/shared/projects/awesome ipop_mount_point
```
For example: 

```
[mag @ BI-platform 16:28]$ ~ : mkdir ipop_mount_point
[mag @ BI-platform 16:28]$ ~ : sshfs hennion@ipop-up.rpbs.univ-paris-diderot.fr:/shared/projects/cotech ipop_mount_point
[mag @ BI-platform 16:28]$ ~ : ll ipop_mount_point/
total 72
drwxrws---   1 root 6000  4096 21 janv. 14:47 ./
drwxr-xr-x 117 mag  mag  12288  1 mars  16:24 ../
drwxr-xr-x   1 2020 2001  4096 28 sept. 16:27 ATACseq_nf-core/
drwxrws---   1 2020 6000  4096 24 sept. 10:34 ATACseq_tuto/
...
```
If you go to the folder `ipop_mount_point` with any file manager, you will see the files from your project. 

<img src="mounting_point.png" alt="drawing" width="600"/>



---
## Edit your files

You can now modify your files directly using a text editor. Be careful, never use word processor (like Microsoft Word or LibreOffice Writer) to modify your code and never copy/past code to/from those softwares. Use **only text editors** and **UTF-8 encoding**. 


---
## Disconnect

The server will be disconnected when you switch off your computer or log out. If you have saved the link in Dolphin, you will just have to type your password to reconnect.

You can disconnect your sshfs mounting point using `umount`. Following the previous example: 

```
[mag @ BI-platform 16:32]$ ~ : umount ipop_mount_point
[mag @ BI-platform 16:34]$ ~ : ll ipop_mount_point/
total 16
drwxr-xr-x   2 mag mag  4096  1 mars  16:24 ./
drwxr-xr-x 117 mag mag 12288  1 mars  16:38 ../
```
`ipop_mount_point` folder is not linked anymore to the server. 

Never leave your computer unsupervised with your session open and iPOP-UP server connected.  


---
---