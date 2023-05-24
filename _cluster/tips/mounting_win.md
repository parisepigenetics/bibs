---
layout: page
title: Easy navigation on iPOP-UP (Windows) 
description: Navigating on iPOP-UP server on Windows
order: 2
---

<img src="{{site.baseurl}}/images/banner.png" alt="drawing" width="600"/>

# Navigating on iPOP-UP server on Windows 10

---
## Download and install WinFsp and SSHFS-Win

Full documentation available at https://github.com/billziss-gh/sshfs-win.

1. Install the latest version of [WinFsp](https://github.com/billziss-gh/winfsp/releases/latest).
Download the `.msi` file and install with your regular wizard. You will be asked which components you want to install. The `Core` component is sufficient. 

2. Install the latest version of [SSHFS-Win](https://github.com/billziss-gh/sshfs-win/releases).
Download the `.msi` file and install with your regular wizard.

---
## Mount the distant server 

- Open a terminal
- Type 
    ```
    net use x: \\sshfs\username@ipop-up.rpbs.univ-paris-diderot.fr\..\..\..\shared\projects\awesome  
    ```

Replacing `username` by your login (family name usually) and `awesome` by your project name. You can use another letter than `x` as your mounting point. 

- Enter your iPOP-UP login and password when asked. 

Your terminal should look like (in French) : 

    
    C:\Users\etudiant>net use x: \\sshfs\hennion@ipop-up.rpbs.univ-paris-diderot.fr\..\..\..\shared\projects\cotech                
    Le mot de passe n'est pas valide pour \\sshfs\hennion@ipop-up.rpbs.univ-paris-diderot.fr\..\..\..\shared\projects\cotech.

    Entrez le nom d'utilisateur de « sshfs » : hennion                                                                      
    Entrez le mot de passe de sshfs : 
    La commande s'est terminée correctement.
    

or in English: 

    
    C:\Users\etudiant>net use x: \\sshfs\hennion@ipop-up.rpbs.univ-paris-diderot.fr\..\..\..\shared\projects\cotech
    The password is invalid for \\sshfs\hennion@ipop-up.rpbs.univ-paris-diderot.fr\..\..\..\shared\projects\cotech.

    Enter the username for 'sshfs': hennion
    Enter the password for sshfs:
    The command completed successfully.
    


- You'll find your project folder in your file navigator.  

<img src="Done_eng.png" alt="drawing" width="600"/>

---
## Edit your files

You can now modify your files directly using a text editor. Be careful, never use word processor (like Microsoft Word or LibreOffice Writer) to modify your code and never copy/past code to/from those softwares. Use **only text editors** and **UTF-8 encoding**. Ensure that the "End of Line Sequence" is **LF** (UNIX-style, and not CR LF), otherwise you might have errors when executing your scripts. For instance if a Slurm sbatch file is not correctly formatted, you will have:
```
sbatch: error: Batch script contains DOS line breaks (\r\n) 
sbatch: error: instead of expected UNIX line breaks (\n).
```
Most text editors can be configured to use UTF-8 encoding and UNIX-style line endings. 


---
## Disconnect

The server will be disconnected when you switch off your computer or log out. You will just have to type your password to reconnect. You can also remove completly the mounting point by right clicking on it in "This PC" ("Ce PC" in French). This is recommended if you use a computer shared between several users. 

<span>{% include icon.liquid id='exclamation-triangle' %} <b>Security warning</b></span><br>
Never leave your computer unsupervised with your session open and iPOP-UP server connected.  
{:.ui.large.warning.message}


---
---