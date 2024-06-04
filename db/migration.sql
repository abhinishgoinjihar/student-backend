create table if not exists user (
    id int not null primary key auto_increment,
    name varchar(255),
    username varchar(255) not null unique,
    password varchar(255) not null
);

create table if not exists student (
  rollNo varchar(255) not null primary key,
  regNo varchar(255) not null unique,
  name varchar(255) not null,
  email varchar(255) not null unique,
  contact varchar(255) not null,
  address varchar(255) not null,
  faculty varchar(255) not null,
  gender enum('MALE','FEMALE','OTHERS') not null,
  dateOfBirth datetime not null,
  joinedDate datetime not null
)
