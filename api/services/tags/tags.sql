CREATE DATABASE tags;

USE tags;

CREATE TABLE `tags` 
(
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `tags_per_id` 
(
  `tag_id` bigint(20) NOT NULL,
  `id` bigint(20) NOT NULL, -- id associated to the tag
  `type` int(11) NOT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=latin1;