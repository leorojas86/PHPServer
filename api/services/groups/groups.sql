CREATE DATABASE groups;

USE groups;

CREATE TABLE `groups` 
(
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `parent_group_id` bigint(20) DEFAULT NULL,
  `data` text DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;