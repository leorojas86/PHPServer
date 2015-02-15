-- phpMyAdmin SQL Dump
-- version 4.2.5
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: Feb 15, 2015 at 04:04 AM
-- Server version: 5.5.38
-- PHP Version: 5.5.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `fpl_projects`
--

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
`id` int(11) NOT NULL,
  `name` text,
  `project_owner_id` int(11) NOT NULL,
  `data` text
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=16 ;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`id`, `name`, `project_owner_id`, `data`) VALUES
(3, 'F2U', 1, NULL),
(11, 'Clue Dev Math', 3, '{\n "ProjectName"      : "Clue Dev Math",\n "JiraURL"          : "https://mightyplay.atlassian.net",\n "JiraProjectId"    : "CENDEVMATH",\n "JiraUser"         : "phpauth",\n "JiraUserPassword" : "ohWowThisI54L0ngPW!"\n}'),
(15, 'Clue Dev Math', 4, '{\n "JiraURL"          : "https://mightyplay.atlassian.net",\n "JiraProjectId"    : "CENDEVMATH",\n "JiraUser"         : "phpauth",\n "JiraUserPassword" : "ohWowThisI54L0ngPW!"\n}');

-- --------------------------------------------------------

--
-- Table structure for table `project_owner`
--

CREATE TABLE `project_owner` (
`id` int(11) NOT NULL,
  `name` text
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `project_owner`
--

INSERT INTO `project_owner` (`id`, `name`) VALUES
(4, 'Mightyplay');

-- --------------------------------------------------------

--
-- Table structure for table `project_version`
--

CREATE TABLE `project_version` (
`id` int(11) NOT NULL,
  `name` text NOT NULL,
  `project_id` int(11) NOT NULL,
  `data` text
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=12 ;

--
-- Dumping data for table `project_version`
--

INSERT INTO `project_version` (`id`, `name`, `project_id`, `data`) VALUES
(2, '1.0.0', 2, 'New Features:\n\n   asdasdasd\n   asdasd\n  a sad ad\n\nBug Fixing:\n\nKnown Issues:\n\nAdditional Notes:\n\nBuilds:'),
(3, '1.0.0', 4, 'New Features:\n\nBug Fixing:\n\nKnown Issues:\n\nAdditional Notes:\n\nBuilds:'),
(4, '1.0.0', 11, 'New Features:\n\n  {"JiraTicketId":"930"}\n\nBug Fixing:\n\nKnown Issues:\n\nAdditional Notes:\n\nBuilds:'),
(5, '1.0.1', 11, 'New Features:\n\n  Some Feature here!\n\nBug Fixing:\n\n  Some Bug here!\n\nKnown Issues:\n\nAdditional Notes:\n\nBuilds:'),
(6, '1.0.0', 13, 'New Features:\n\n  {"JiraTicketId":"1"} \n\nBug Fixing:\n\nKnown Issues:\n\nAdditional Notes:\n\nBuilds:'),
(7, '1.0.0', 14, 'New Features:\n\n  {"JiraTicketId":"321"} \n\nBug Fixing:\n\nKnown Issues:\n\nAdditional Notes:\n\nBuilds:'),
(8, '1.0.0', 15, 'New Features:\n\n {"JiraTicketId":"1"} \n\nBug Fixing:\n\nKnown Issues:\n\nAdditional Notes:\n\nBuilds:'),
(9, '1.0.1', 15, 'New Features:\n\nBug Fixing:\n\nKnown Issues:\n\nAdditional Notes:\n\nBuilds:'),
(10, '1.0.2', 15, 'New Features:\n\nBug Fixing:\n\nKnown Issues:\n\nAdditional Notes:\n\nBuilds:'),
(11, '2.0', 15, 'New Features:\n\nBug Fixing:\n\nKnown Issues:\n\nAdditional Notes:\n\nBuilds:\n\n    <a href="http://www.google.com">Google</a>');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `project`
--
ALTER TABLE `project`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `project_owner`
--
ALTER TABLE `project_owner`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `project_version`
--
ALTER TABLE `project_version`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `project_owner`
--
ALTER TABLE `project_owner`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `project_version`
--
ALTER TABLE `project_version`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=12;--
-- Database: `generic_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
`id` bigint(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `type` int(11) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `parent_group_id` bigint(20) DEFAULT NULL,
  `tags` varchar(300) DEFAULT NULL,
  `data` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=64 ;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `name`, `type`, `user_id`, `parent_group_id`, `tags`, `data`) VALUES
(42, 'RootGroup', 0, 8, 0, NULL, NULL),
(44, 'test1', 0, 8, 42, NULL, NULL),
(50, 'RootGroup', 0, 10, 0, NULL, NULL),
(54, '233', 1, 8, 42, NULL, '312'),
(55, '2323', 0, 8, 42, NULL, NULL),
(56, 'sasd', 0, 8, 42, NULL, NULL),
(57, 'ssss', 1, 8, 42, NULL, NULL),
(59, 'item', 1, 8, 56, NULL, NULL),
(60, 'sss', 1, 8, 42, NULL, NULL),
(61, '2332', 0, 8, 42, NULL, NULL),
(62, 'adasda', 0, 8, 55, NULL, NULL),
(63, 'asdasdasd', 0, 8, 62, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `id` bigint(20) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
`id` bigint(20) NOT NULL,
  `fb_id` bigint(20) DEFAULT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `data` varchar(2000) DEFAULT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=12 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fb_id`, `email`, `password`, `name`, `data`) VALUES
(8, NULL, 'leo', 'leo', 'leo', NULL),
(9, NULL, 'leo2', 'leo2', 'leo2', NULL),
(10, NULL, 'leos', 'leos', 'leos', NULL),
(11, NULL, '3', '3', '3', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `email` (`email`), ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=64;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=12;