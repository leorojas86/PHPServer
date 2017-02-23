CREATE DATABASE users;

USE users;

CREATE TABLE `users`
(
  `guid` varchar(36) NOT NULL,
  `fb_id` bigint(20) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `rootGroupId` bigint(20) NOT NULL,
  `data` text DEFAULT NULL,
  PRIMARY KEY (guid)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
