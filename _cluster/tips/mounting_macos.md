---
layout: page
title: Easy navigation on iPOP-UP (Mac OS)
description: Navigating on iPOP-UP server on Mac OS
---

<img src="{{site.baseurl}}/images/banner.png" alt="drawing" width="600"/>

# Navigating on iPOP-UP server on Mac OS 

---
## Create a mounting point 

You can create a mounting point on your computer that point to your project on iPOP-UP server.  

### Install macFUSE and SSHFS

Documentation on [osxfuse website](https://osxfuse.github.io/). I tested only with SSHFS 2.5.0 and macFUSE 4.5.0. 

Download the dmg files and install them. 

### Allow system extension in Security and Privacy

### Create a directory

In a terminal, you first create a directory on your computer. It will be the mounting point for your project folder. In the terminal type:
```
mkdir ipop_mount_point
```
or create the folder using `Finder`. 

### Create the connection with `sshfs` 
For safety reason, this has to be done each time you open your session.

If you are using an admin account: 
```
sshfs -o allow_other,defer_permissions,volname=iPOP-UP username@ipop-up.rpbs.univ-paris-diderot.fr:/shared/projects/awesome ipop_mount_point
```

Otherwise you have to switch to an admin account first and use sudo: 

```
su admin_account
```
Enter the associated password, then mount the disk: 
```
sudo sshfs -o allow_other,defer_permissions,volname=iPOP-UP username@ipop-up.rpbs.univ-paris-diderot.fr:/shared/projects/awesome ipop_mount_point
```
For instance: 
```
umr_user@openroam-prg-lm-1-146-182 ~ % su mi
Password:
mi@openroam-prg-lm-1-146-182 umr_user % sudo sshfs -o allow_other,defer_permissions hennion@ipop-up.rpbs.univ-paris-diderot.fr:/shared/projects/bi4edc ipop
Password:
The authenticity of host 'ipop-up.rpbs.univ-paris-diderot.fr (81.194.29.40)' can't be established.
ED25519 key fingerprint is SHA256:f/k86uKA1/tC/WXHPyd+g/ldN+2lttUqPX4D3mXkgKU.
This key is not known by any other names
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
hennion@ipop-up.rpbs.univ-paris-diderot.fr's password:
```
Open the `Finder` and go to the folder you created as mounting point, it will now appear as a disk named `iPOP-UP`. Inside, you will see the files from your project. 

---
## Edit your files

You can now modify your files directly using a text editor. Be careful, never use word processor (like Microsoft Word or LibreOffice Writer) nor Rich text editors to modify your code and never copy/past code to/from those softwares. Use **only text editors** and **UTF-8 encoding**. On MacOS, you can use `TextEdit` software with `Plain text` formatting (option in Preference for new files, `Format` menu for the current file). 


---
## Disconnect

The server will be disconnected when you switch off your computer or log out. 

You can also disconnect your sshfs mounting point using `umount`. Following the previous example: 

```
umount ipop_mount_point
```
`ipop_mount_point` folder is not linked anymore to the server. 

<span>{% include icon.liquid id='exclamation-triangle' %} <b>Security warning</b></span><br>
Never leave your computer unsupervised with your session open and iPOP-UP server connected.  
{:.ui.large.warning.message}



---
---