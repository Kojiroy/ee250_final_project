FROM mysql:latest

RUN mkdir -p /var/log/mysql/
RUN touch /var/log/mysql/mysqld.log

COPY ./my.cnf /etc/mysql/my.cnf
COPY ./mysql-init.sql /docker-entrypoint-initdb.d/mysql-init.sql

RUN chmod +x /etc/mysql/my.cnf && chmod +x /etc/mysql/my.cnf /docker-entrypoint-initdb.d/mysql-init.sql
RUN cd / && ls && ls /etc/mysql && ls /docker-entrypoint-initdb.d
RUN cd /docker-entrypoint-initdb.d && cat mysql-init.sql