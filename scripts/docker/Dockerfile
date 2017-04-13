FROM ubuntu

CMD echo "----- Updating apt get"
RUN apt update

CMD echo "----- Installing net tools"
RUN apt install net-tools --yes

CMD echo "----- Installing vim editor"
RUN apt install vim --yes

CMD echo "----- Installing git"
RUN apt install git --yes

CMD echo "----- Downloading repo"
RUN git clone https://github.com/leorojas86/PHPServer.git

CMD echo "----- Installing lamp"
RUN sh PHPServer/scripts/lamp/1_install_lamp.sh

CMD echo "----- Setting up lamp"
RUN sh PHPServer/scripts/lamp/2_setup_lamp.sh

CMD echo "----- Starting services"
RUN service apache2 start
RUN service mysql start
