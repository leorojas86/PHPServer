CREATE DATABASE groups;

USE groups;

CREATE TABLE `groups`
(
  `guid` char(36) NOT NULL,
  `parent_group_guid` char(36) DEFAULT NULL,
  `data` text DEFAULT NULL,
  PRIMARY KEY (guid)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
