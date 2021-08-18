import subprocess
import sys
import os.path
import os
import time
from config import *


def build():
    CURRENT_DIRECTORY = os.getcwd()
    print(CURRENT_DIRECTORY)
    ANGULAR_PROJECT_PATH = os.path.join(CURRENT_DIRECTORY, '02_client')
    print("cd " + ANGULAR_PROJECT_PATH + " && ng build --prod")
    builder = subprocess.check_output(["cd " + ANGULAR_PROJECT_PATH, "ng build --prod"])
    print(builder)


def git_push():
    try:
        gitadd = subprocess.check_output(["git", "add", "."])
        print(gitadd)
        gitcommit = subprocess.check_output(["git", "commit", "-m", '"update to server"'])
        print(gitcommit)
        gitpush = subprocess.check_output(["git", "push", "https://" + get_git_data()["user"] + ":" + get_git_data()["password"] + "@github.com/" + get_git_data()["user"] + "/" + get_git_data()["repo"] + ".git"])
        print(gitpush)
    except Exception as e:
        print(e)


def ssh_update():
    ssh = connection_ssh_server()
    commands = ["cd /var/www/luxury-massages.com  ; git pull https://" + get_git_data()["user"] + ":" + get_git_data()["password"] + "@github.com/" + get_git_data()["user"] + "/" + get_git_data(
    )["repo"] + ".git", "pm2 restart 1"]
    for command in commands:
        print("=" * 50, command, "=" * 50)
        stdin, stdout, stderr = ssh.exec_command(command)
        print(stdout.read().decode())
        err = stderr.read().decode()
        if err:
            print(err)


# build()
git_push()
ssh_update()
