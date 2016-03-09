-- phpMyAdmin SQL Dump
-- version 4.4.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Mar 09, 2016 at 03:30 AM
-- Server version: 5.5.42
-- PHP Version: 7.0.0

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
  `data` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=135 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `name`, `type`, `user_id`, `parent_group_id`, `data`) VALUES
(1, 'sdsds', 1, 8, 44, NULL),
(42, 'RootGroup', 0, 8, 0, NULL),
(44, 'test111', 0, 8, 42, NULL),
(50, 'RootGroup', 0, 10, 0, NULL),
(60, 'sss', 1, 8, 42, '555sss'),
(61, 'dfdfdf', 0, 8, 42, NULL),
(65, 'ddddd', 1, 8, 44, 'nullsdd'),
(67, 'sdsd', 0, 8, 44, NULL),
(68, 'sdsd', 0, 8, 67, NULL),
(70, 'ssss', 0, 8, 42, NULL),
(71, 'ssaaa', 1, 8, 42, NULL),
(73, 'sasdds', 1, 8, 42, 'nullsss'),
(74, 'aasddsdsa', 1, 8, 42, NULL),
(76, 'sdasddddd', 0, 8, 76, NULL),
(79, 'fdffddf', 0, 8, 70, NULL),
(80, 'RootGroup', 0, 14, 0, NULL),
(81, 'r5trtt', 1, 14, 80, NULL),
(82, 'vgvh', 0, 8, 79, NULL),
(83, 'RootGroup', 0, 0, 0, NULL),
(84, 'dd', 1, 8, 42, NULL),
(85, 'sds', 0, 8, 42, NULL),
(86, 'dfdf', 1, 8, 42, NULL),
(87, 'dddd', 0, 8, 61, NULL),
(88, 'sssssaaaaa', 1, 8, 42, NULL),
(89, 'sssssaaaaaa', 0, 8, 89, NULL),
(90, 'sadasd', 1, 0, 83, 'www'),
(91, 'asdasd', 0, 0, 83, NULL),
(92, 'sdddsssss', 1, 0, 91, NULL),
(93, 'new', 1, 8, 76, NULL),
(94, 'w', 1, 8, 42, NULL),
(95, 'w', 1, 8, 42, NULL),
(96, 'w', 1, 8, 42, NULL),
(97, 'w', 1, 8, 42, NULL),
(98, 'w', 1, 8, 42, NULL),
(99, 'w', 1, 8, 42, NULL),
(100, 'w', 1, 8, 42, NULL),
(101, 'w', 1, 8, 42, NULL),
(102, 'w', 1, 8, 42, NULL),
(104, 'w', 1, 8, 42, NULL),
(105, 'w', 1, 8, 42, NULL),
(106, 'w', 1, 8, 42, NULL),
(107, 'w', 1, 8, 42, NULL),
(108, 'w', 1, 8, 42, NULL),
(109, 'w', 1, 8, 42, NULL),
(110, 'w', 1, 8, 42, NULL),
(111, 'w', 1, 8, 42, NULL),
(112, 'w', 1, 8, 42, NULL),
(113, 'w', 1, 8, 42, NULL),
(114, 'w', 1, 8, 42, NULL),
(115, 'w', 1, 8, 42, NULL),
(116, 'w', 1, 8, 42, NULL),
(117, 'w', 1, 8, 42, NULL),
(118, 'w', 1, 8, 42, NULL),
(119, '1', 1, 8, 42, NULL),
(124, 'a', 1, 8, 42, NULL),
(126, 'a', 1, 8, 42, NULL),
(127, 'a', 1, 8, 42, NULL),
(128, 'a', 1, 8, 42, NULL),
(129, 'a', 1, 8, 42, NULL),
(130, 'a', 1, 8, 42, NULL),
(131, 'a', 1, 8, 42, NULL),
(132, 'a', 1, 8, 42, NULL),
(133, 'a', 1, 8, 42, NULL),
(134, 'sss', 0, 8, 85, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `id` bigint(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tags_per_groups`
--

CREATE TABLE `tags_per_groups` (
  `group_id` bigint(20) NOT NULL,
  `tag_id` bigint(20) NOT NULL
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fb_id`, `email`, `password`, `name`, `data`) VALUES
(8, NULL, 'leo', 'leo', 'leo', NULL),
(9, NULL, 'leo2', 'leo2', 'leo2', NULL),
(10, NULL, 'leos', 'leos', 'leos', NULL),
(11, NULL, '3', '3', '3', NULL),
(12, NULL, '5', '5', '5', NULL),
(13, NULL, 'leo1', 'leo1', 'leo1', NULL),
(14, NULL, 'leod', 'leod', 'leod', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tags_per_groups`
--
ALTER TABLE `tags_per_groups`
  ADD PRIMARY KEY (`group_id`,`tag_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=135;
--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=15;