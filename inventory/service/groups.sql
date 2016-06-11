CREATE DATABASE groups;

USE groups;

CREATE TABLE `groups` 
(
  `id` bigint(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `type` int(11) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `parent_group_id` bigint(20) DEFAULT NULL,
  `data` text DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=780 DEFAULT CHARSET=latin1;