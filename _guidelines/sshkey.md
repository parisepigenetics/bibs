---
layout: page
title: SSH key
description: Generate SSH key for GitHub or GitLab
order: 1
---

<img src="{{site.baseurl}}/images/banner.png" alt="drawing" width="600"/>


# Generate SSH key to access private repositories

## Generate a SSH key

On your terminal (from your personnal computer or from the cluster), type:  

```
ssh-keygen
```
This will create a folder in your home directory called `.ssh` containing a file named `id_rsa.pub`. 

## Add this public key on your Github account

- Copy the full line starting from "ssh-rsa..." in `.ssh/id_rsa.pub`.
- In Github, got to `Settings`, `SSH and GPG keys`. Then click on `New SSH key`. Give it a name and paste the line `ssh-rsa...`. Then click on `Add SSH key`. 

You're done! 

You can make several SSH keys from your different devices, or you can use the same one for all. In that case you have to copy your `.ssh` folder into the home directory of the other devices (for instance on the HPC clusters). 

---
<small>Author : [Magali Hennion](mailto:magali.hennion@cnrs.fr)  
Last update : 17/09/2024</small>
