FROM ubuntu

CMD echo "----- Updating apt get"
RUN apt update

CMD echo "----- Installing git"
RUN apt-get install -y git

CMD echo "----- Downloading repo"
RUN git clone https://github.com/leorojas86/PHPServer.git

CMD echo "----- Installing lamp"
RUN cd PHPServer/scripts/lamp
RUN ls
RUN sh /1_setup_lamp.sh
