-- phpMyAdmin SQL Dump
-- version 4.2.5
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: Oct 22, 2014 at 04:02 AM
-- Server version: 5.5.38
-- PHP Version: 5.5.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=49 ;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `name`, `type`, `user_id`, `parent_group_id`, `tags`, `data`) VALUES
(42, 'RootGroup', 0, 8, 0, NULL, NULL),
(43, 'New Group', 0, 8, 42, NULL, NULL),
(44, 'New Group', 0, 8, 42, NULL, NULL),
(45, '1', 0, 8, 43, NULL, NULL),
(46, '2', 0, 8, 43, NULL, NULL),
(47, '3', 0, 8, 46, NULL, NULL),
(48, '4', 0, 8, 46, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` bigint(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `type` int(11) NOT NULL,
  `value` int(11) NOT NULL,
  `parent_group_id` bigint(20) NOT NULL,
  `tags` varchar(300) DEFAULT NULL,
  `data` varchar(2000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fb_id`, `email`, `password`, `name`, `data`) VALUES
(8, NULL, 'leo', 'leo', 'leo', NULL);

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
MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=49;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;