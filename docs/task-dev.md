# Process for task development
## Create a branch
1) in 'main', click 'View all branches'. Or go to [View all branches](https://github.com/Project-1-TD3/Project-1-TD3.github.io/branches).
2) Click 'New branch'
3) The name of the branch is in the following format Users/%username%/%taskname%. <username> is the name of the dev (ex: justine, thierry, julien or radwan), task name is the name of task (no spaces, ex: js-add-to-do-list, html-create-page, css-create-styles,...)
## get the branch on local
4) on local pc, type the commands
   - git clone --branch Users/%username%/%taskname% git@github.com:Project-1-TD3/Project-1-TD3.github.io.git ./%taskname%
   - cd ./%taskname
   - code .
## register modifications
6) execute the following commands
   - git add ...
   - git commit -m "explicit message"
   - git push
## create pull request
7) go to [Pull requests](https://github.com/Project-1-TD3/Project-1-TD3.github.io/pulls).
8) Click 'New pull request'
