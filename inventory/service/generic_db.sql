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