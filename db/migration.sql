create table if not exists user (
    id int not null primary key auto_increment,
    name varchar(255),
    username varchar(255) not null unique,
    password varchar(255) not null
);