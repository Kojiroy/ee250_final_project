# echo input container id
# read container_id
cd /home/kojiroy/Documents/school/ee250/ee250_final_project/database/"MySQL Docker [broken]"
# sudo docker rm ${container_id} -f
sudo docker rm $1 -f
./rebuild_docker.sh
cd -