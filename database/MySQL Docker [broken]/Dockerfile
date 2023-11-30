FROM mysql:8.0

RUN mkdir -p /var/log/mysql/
RUN touch /var/log/mysql/mysqld.log

RUN ls /var/log/mysql

RUN echo Hello

COPY ./my.cnf /etc/mysql/my.cnf
COPY ./mysql-init.sql /docker-entrypoint-initdb.d/mysql-init.sql

RUN cd / && ls && ls /etc/mysql && ls /docker-entrypoint-initdb.d
RUN cd / && file="$(ls -1 /etc/mysql)" && echo $file