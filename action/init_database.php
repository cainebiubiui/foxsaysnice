<?php

$cs_order = 'create table if not exists cs_order(
	id int primary key auto_increment,
	name varchar(20),
	price int,
	size varcahr(255),
	address varchar(255),
	phone varchar(16),
	info text,
	time datetime
	) default charset=utf8;';

$cs_data = 'create table if not exists cs_data(
	id int primary key auto_increment,
	name varchar(20),
	price int,
	size varchar(100),
	info text,
	uploadtime datetime,
	who varchar(20)
	) default charset=utf8;';

$link = new mysqli('localhost', 'root' , 'caine', 'test');

$m = $link->query($cs_order);
echo $m;

?>