CREATE DATABASE auth;

USE auth;

CREATE TABLE `users` 
(
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fb_id` bigint(20) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `data` text DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;