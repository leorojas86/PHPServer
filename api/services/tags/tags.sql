CREATE DATABASE tags;

USE tags;

CREATE TABLE `objects`
(
  `guid` char(36) NOT NULL,
  PRIMARY KEY (guid)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `text_tags`
(
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `text` text NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `text_tags_per_guid`
(
  `text_tag_id` bigint(20) unsigned NOT NULL,  -- id associated to the text_tags table
  `guid` char(36) NOT NULL, -- object id associated
  `type` tinyint unsigned NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `date_tags_per_guid`
(
  `timespan` bigint(20) unsigned NOT NULL,
  `guid` char(36) NOT NULL, -- object id associated
  `type` tinyint unsigned NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `value_tags_per_guid`
(
  `value` float(20) signed NOT NULL,
  `guid` char(36) NOT NULL, -- object id associated
  `type` tinyint unsigned NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
