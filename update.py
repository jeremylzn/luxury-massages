import paramiko, os, pathlib, subprocess, zipfile, time


def restartApp():
        client = paramiko.SSHClient()
        client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        client.connect(hostname=HOST, username=USERNAME, password=PASSWORD, port=PORT)
        commands = ["unzip /var/www/luxury-massages.com/html/dist.zip -d /var/www/luxury-massages.com/html", "pm2 restart index"]
        for command in commands:
            print("=" * 50, command, "=" * 50)
            stdin, stdout, stderr = client.exec_command(command)
            print(stdout.read().decode())
            err = stderr.read().decode()
            if err:
                print(err)

def before_update():
        client = paramiko.SSHClient()
        client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        client.connect(hostname=HOST, username=USERNAME, password=PASSWORD, port=PORT)
        commands = ["rm -r /var/www/luxury-massages.com/html/dist", "rm /var/www/luxury-massages.com/html/dist.zip"]
        for command in commands:
            print("=" * 50, command, "=" * 50)
            stdin, stdout, stderr = client.exec_command(command)
            print(stdout.read().decode())
            err = stderr.read().decode()
            if err:
                print(err)

def zipdir(path, ziph):
    # ziph is zipfile handle
    for root, dirs, files in os.walk(path):
        for file in files:
            ziph.write(os.path.join(root, file), 
                       os.path.relpath(os.path.join(root, file), 
                                       os.path.join(path, '..')))

content = [f for f in os.listdir(str(pathlib.Path(__file__).parent.absolute())) if not f == 'node_modules' and not f == '02_client']


target_path = '/var/www/luxury-massages.com/html/'
source_path = str(pathlib.Path(__file__).parent.absolute()) + '/'

HOST = '161.97.157.17'
PORT = 22
USERNAME = 'root'
PASSWORD = 'JHBKJ64smqixefbN'

before_update()

for f in content:
    if os.path.isfile(f):
        print("scp", source_path + f, USERNAME + '@' + HOST + ':' + target_path)
        commands = ["scp", source_path + f, USERNAME + '@' + HOST + ':' + target_path]
    else:
        print('zip and send')
        zipf = zipfile.ZipFile(f + '.zip', 'w', zipfile.ZIP_DEFLATED)
        zipdir(source_path + f + '/', zipf)
        zipf.close()
        commands = ["scp ", source_path + f  + '.zip', USERNAME + '@' + HOST + ':' + target_path + ';']
        time.sleep(1)

    subprocess.run(commands)

restartApp()
