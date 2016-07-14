CREATE DATABASE tags;

USE tags;

CREATE TABLE `text_tags` 
(
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `text` varchar(100) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `text_tags_per_id` 
(
  `text_tag_id` bigint(20) NOT NULL,  -- id associated to the text_tags table
  `id` bigint(20) NOT NULL, -- object id associated
  `type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;