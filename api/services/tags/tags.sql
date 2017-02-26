CREATE DATABASE tags;

USE tags;

CREATE TABLE `objects`
(
  `guid` char(36) NOT NULL,
  PRIMARY KEY (guid)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `text_tags`
(
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `text` varchar(100) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `text_tags_per_guid`
(
  `text_tag_id` bigint(20) NOT NULL,  -- id associated to the text_tags table
  `guid` char(36) NOT NULL, -- object id associated
  `type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `date_tags_per_guid`
(
  `date` datetime NOT NULL,
  `guid` char(36) NOT NULL, -- object id associated
  `type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `value_tags_per_guid`
(
  `value` float(20) NOT NULL,
  `guid` char(36) NOT NULL, -- object id associated
  `type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
