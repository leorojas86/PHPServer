CREATE DATABASE files;

USE files;

CREATE TABLE `files` 
(
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `type` int(11) NOT NULL,
  `owner_id` bigint(20) NOT NULL,
  `creation_date` datetime DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;