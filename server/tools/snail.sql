drop table if exists book;
create table book(
    id int not null auto_increment primary key,
    isbn varchar(20) not null,
    openid varchar(50) not null,
    title varchar(100) not null,
    image varchar(100),
    alt varchar(100) not null,
    publisher varchar(100) not null,
    summary varchar(1000) not null,
    count int(10)  not null default 0,
    price varchar(100),
    rate float,
    tags varchar(200),
    author varchar(100)
);
drop table if exists comments;
create table comments(
    id int not null auto_increment primary key,
    openid varchar(100) not null,
    bookid varchar(10) not null,
    comment varchar(200) not null,
    phone varchar(50),
    location varchar(50)
);