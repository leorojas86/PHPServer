-- phpMyAdmin SQL Dump
-- version 4.4.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: May 07, 2016 at 05:39 AM
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
  `data` varchar(1000) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=145 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `name`, `type`, `user_id`, `parent_group_id`, `data`, `creation_date`) VALUES
(1, 'sdsds', 1, 8, 44, NULL, '0000-00-00 00:00:00'),
(42, 'RootGroup', 0, 8, 0, NULL, '0000-00-00 00:00:00'),
(44, 'test111', 0, 8, 42, NULL, '0000-00-00 00:00:00'),
(50, 'RootGroup', 0, 10, 0, NULL, '0000-00-00 00:00:00'),
(60, 'sss', 1, 8, 42, '{"files":["8 FFE15079-8D91-4D69-ACBA-D2B12B623DF2.jpg"]}', '0000-00-00 00:00:00'),
(61, 'ff', 0, 8, 42, NULL, '0000-00-00 00:00:00'),
(65, 'ddddd', 1, 8, 44, NULL, '0000-00-00 00:00:00'),
(67, 'sdsd', 0, 8, 44, NULL, '0000-00-00 00:00:00'),
(68, 'sdsd', 0, 8, 67, NULL, '0000-00-00 00:00:00'),
(70, 'ssss', 0, 8, 61, NULL, '0000-00-00 00:00:00'),
(71, 'ssaaa', 1, 8, 42, '{"files":["8 EF6B02E7-0A25-45B7-8AA4-7C7B0E90318D.jpg"]}', '0000-00-00 00:00:00'),
(73, 'sasdds', 1, 8, 42, NULL, '0000-00-00 00:00:00'),
(74, 'aasddsdsa', 1, 8, 42, '{"files":["8 DE156F8C-343F-4DCD-A022-0466A212483E.jpg"]}', '0000-00-00 00:00:00'),
(76, 'sdasddddd', 0, 8, 76, NULL, '0000-00-00 00:00:00'),
(79, 'fdffddf', 0, 8, 70, NULL, '0000-00-00 00:00:00'),
(80, 'RootGroup', 0, 14, 0, NULL, '0000-00-00 00:00:00'),
(81, 'r5trtt', 1, 14, 80, NULL, '0000-00-00 00:00:00'),
(82, 'vgvh', 0, 8, 79, NULL, '0000-00-00 00:00:00'),
(83, 'RootGroup', 0, 0, 0, NULL, '0000-00-00 00:00:00'),
(84, 'dd', 1, 8, 42, NULL, '0000-00-00 00:00:00'),
(86, 'dfdf', 1, 8, 42, NULL, '0000-00-00 00:00:00'),
(87, 'dddd', 0, 8, 61, NULL, '0000-00-00 00:00:00'),
(88, 'sssssaaaaa', 1, 8, 42, NULL, '0000-00-00 00:00:00'),
(89, 'sssssaaaaaa', 0, 8, 89, NULL, '0000-00-00 00:00:00'),
(90, 'ddd', 1, 0, 83, NULL, '0000-00-00 00:00:00'),
(91, 'asdasd', 0, 0, 83, NULL, '0000-00-00 00:00:00'),
(92, 'sdddsssss', 1, 0, 91, NULL, '0000-00-00 00:00:00'),
(93, 'new', 1, 8, 76, NULL, '0000-00-00 00:00:00'),
(94, 'w', 1, 8, 42, NULL, '0000-00-00 00:00:00'),
(95, 'w', 1, 8, 42, NULL, '0000-00-00 00:00:00'),
(96, 'w', 1, 8, 42, NULL, '0000-00-00 00:00:00'),
(98, 'w', 1, 8, 42, NULL, '0000-00-00 00:00:00'),
(99, 'w', 1, 8, 70, NULL, '0000-00-00 00:00:00'),
(100, 'w', 1, 8, 42, NULL, '0000-00-00 00:00:00'),
(101, 'w', 1, 8, 42, NULL, '0000-00-00 00:00:00'),
(102, 'w', 1, 8, 42, NULL, '0000-00-00 00:00:00'),
(104, 'w', 1, 8, 42, NULL, '0000-00-00 00:00:00'),
(105, 'w', 1, 8, 42, NULL, '0000-00-00 00:00:00'),
(106, 'w', 1, 8, 42, NULL, '0000-00-00 00:00:00'),
(107, 'w', 1, 8, 42, '{"files":["8 35B5C1B1-9A94-4F4F-8F5D-37B1320A06BF.jpg","8 AE48ACF0-1032-4BD2-AF23-C84C73C0AB56.jpg"]}', '0000-00-00 00:00:00'),
(108, 'w', 1, 8, 42, NULL, '0000-00-00 00:00:00'),
(109, 'w', 1, 8, 42, NULL, '0000-00-00 00:00:00'),
(110, 'w', 1, 8, 42, NULL, '0000-00-00 00:00:00'),
(111, 'w', 1, 8, 42, NULL, '0000-00-00 00:00:00'),
(112, 'w', 1, 8, 42, NULL, '0000-00-00 00:00:00'),
(113, 'w', 1, 8, 42, NULL, '0000-00-00 00:00:00'),
(114, 'w', 1, 8, 42, NULL, '0000-00-00 00:00:00'),
(115, 'w', 1, 8, 42, NULL, '0000-00-00 00:00:00'),
(116, 'w', 1, 8, 42, NULL, '0000-00-00 00:00:00'),
(117, 'w', 1, 8, 42, '{"files":["8 23F3409B-8F63-495F-8A1E-D6B2EE9359CA.jpg"]}', '0000-00-00 00:00:00'),
(118, 'w', 1, 8, 42, NULL, '0000-00-00 00:00:00'),
(119, '1', 1, 8, 42, NULL, '0000-00-00 00:00:00'),
(124, 'a', 1, 8, 42, NULL, '0000-00-00 00:00:00'),
(126, 'a', 1, 8, 42, NULL, '0000-00-00 00:00:00'),
(127, 'a', 1, 8, 42, NULL, '0000-00-00 00:00:00'),
(128, 'a', 1, 8, 42, NULL, '0000-00-00 00:00:00'),
(129, 'a', 1, 8, 42, NULL, '0000-00-00 00:00:00'),
(130, 'a', 1, 8, 42, NULL, '0000-00-00 00:00:00'),
(136, 'ana', 0, 8, 42, NULL, '0000-00-00 00:00:00'),
(137, 'leo', 1, 8, 136, NULL, '0000-00-00 00:00:00'),
(139, 'c', 1, 8, 42, NULL, '0000-00-00 00:00:00'),
(140, 'c2', 1, 8, 42, NULL, '0000-00-00 00:00:00'),
(142, 'eee', 1, 8, 44, NULL, '0000-00-00 00:00:00'),
(143, 'cccc', 1, 8, 42, NULL, '2016-05-06 00:00:00'),
(144, 'hhh', 1, 8, 42, NULL, '2016-05-06 21:39:05');

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `id` bigint(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `type` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`id`, `name`, `type`) VALUES
(1, 'asda', 0),
(2, 'as', 0),
(3, 'da', 0),
(4, 'sds', 0),
(5, 'dsss', 0),
(6, 'ads', 0),
(7, 'dsd', 0),
(8, 'd', 0),
(9, 'a', 0),
(10, 's', 0),
(11, 'sss', 0),
(12, 'ssss', 0),
(13, 'ssss1', 0),
(14, 'bat', 0),
(15, 'null', 0),
(16, 'rfff', 0),
(17, 'ghh', 0),
(18, 'ooo', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tags_per_groups`
--

CREATE TABLE `tags_per_groups` (
  `group_id` bigint(20) NOT NULL,
  `tag_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tags_per_groups`
--

INSERT INTO `tags_per_groups` (`group_id`, `tag_id`) VALUES
(73, 17),
(74, 16),
(95, 14),
(119, 15),
(140, 18);

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
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=145;
--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=15;