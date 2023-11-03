---
layout: page
title: Bitwarden password manager
description: Guidelines to use Bitwarden as a password manager
order: 1
---

<img src="{{site.baseurl}}/images/banner.png" alt="drawing" width="600"/>

# Why using a password manager
Given that
- it is not safe to use the same password on multiple websites, computers, data servers, ...
- your brain can memorise many passwords, but probably not as many as you need (I have >200 passwords...), 
the use of a password manager is strongly recommended! 

# Why I chose Bitwarden
- Cross platform access for mobile, browser, and desktop apps
- Vaults accessible online and locally
- End-to-end encryption
- Easy import from other password managers
- Straightforward use
- Free and open-source software


# Create an account
- Go to https://vault.bitwarden.com/#/register and fill in the formular. You will receive an email to activate your account. 
- Choose a very strong master keypass (do not write it down, remember it!). Please see our [tips to choose a password]({{site.baseurl}}/guidelines/password/#/guidelines) you can remember. You can also find online many other tips (for instance [here](https://www.howtogeek.com/195430/how-to-create-a-strong-password-and-remember-it/)). 
- You can add a sentence to help you recover your password (don't be too explicite!). 

<span>{% include icon.liquid id='exclamation-triangle' %} <b>Attention!</b></span><br> There is no way to recover the master password if you forget it!
{:.ui.info.message}

# Install your Web Browser extention
- Go to the [download page](https://bitwarden.com/download/) and click on your favorite browser.
The supported ones are :  
        - Google Chrome  
        - Safari  
        - Mozilla Firefox  
        - Micosoft Edge  
        - Opera  
        - Vivaldi  
        - Brave  
        - Tor Browser  

- Configure your extension by clicking on parameters, one important thing is the time your vault stays open. To be safe keep this time low such as 15 min, and be sure no one has access to your computer in the meantime! 

# Import your passwords
See the [documentation](https://bitwarden.com/help/import-data/) to import from Firefox, Google Chrome, LastPass, etc. your passwords, and save a lot of time! 
Don't forget to delete passwords from your web browsers as they are not safely stored there. 

# Enjoy Bitwarden
- Navigating on Internet, each time you open a page requiring login and password, Bitwarden will be just magic! Enter your master password, and you will be able to past immediately login and password by a simple click. For new websites, it will offer you the possibility to save login and password (and it can generate safe randomized passwords, that you don't have to memorise!).  
- You can also save other codes, computer passwords, etc... on Bitwarden by clicking on the `+` button. 
- Wherever you go (as long as you have an internet access), you can login to [https://vault.bitwarden.com/](https://vault.bitwarden.com/) with your email and master password and you will have access to all your logins and passwords.

# Go further
Here is how I use it, but you can do much more with Bitwarden, please refer to the [documentation](https://bitwarden.com/help/). You can : 
- Install and use the desktop app
- Set up two-step login
- Organise your passwords in folders
- Share passwords accross users 
- Other advanced features (Premium or Family account not free, but cheap)

# Resources
- [Bitwarden website](https://bitwarden.com)
- Tutorial in French [it-connect](https://www.it-connect.fr/comment-gerer-ses-mots-de-passe-avec-bitwarden/)


---
<small>Author : [Magali Hennion](mailto:magali.hennion@cnrs.fr)  
Last update : 30/10/2023</small>