FROM ubuntu

CMD echo "----- Updating apt get"
RUN apt update

CMD echo "----- Installing net tools"
RUN apt install net-tools

CMD echo "----- Installing git"
RUN apt-get install -y git

CMD echo "----- Downloading repo"
RUN git clone https://github.com/leorojas86/PHPServer.git

CMD echo "----- Installing lamp"
RUN sh PHPServer/scripts/lamp/1_install_lamp.sh

CMD echo "----- Setting up lamp"
RUN sh PHPServer/scripts/lamp/2_setup_lamp.sh
