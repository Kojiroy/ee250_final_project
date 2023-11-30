# echo input container id
# read container_id
# sudo docker rm ${container_id} -f
sudo docker rm $1 -f
./rebuild_docker.sh