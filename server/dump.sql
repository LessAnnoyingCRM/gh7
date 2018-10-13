/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping structure for table gh7.event
CREATE TABLE IF NOT EXISTS `event` (
  `EventId` int(11) NOT NULL AUTO_INCREMENT,
  `MatchId` int(11) NOT NULL,
  `Location` varchar(250) DEFAULT NULL,
  `EventDate` date NOT NULL,
  `DateConfirmed` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`EventId`),
  KEY `MatchId` (`MatchId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Dumping data for table gh7.event: ~1 rows (approximately)
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` (`EventId`, `MatchId`, `Location`, `EventDate`, `DateConfirmed`) VALUES
	(1, 1, '3325 Brookview Dr', '2018-10-16', NULL);
/*!40000 ALTER TABLE `event` ENABLE KEYS */;


-- Dumping structure for table gh7.language
CREATE TABLE IF NOT EXISTS `language` (
  `LanguageId` int(11) NOT NULL AUTO_INCREMENT,
  `LanguageName` varchar(50) NOT NULL,
  PRIMARY KEY (`LanguageId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Dumping data for table gh7.language: ~3 rows (approximately)
/*!40000 ALTER TABLE `language` DISABLE KEYS */;
INSERT INTO `language` (`LanguageId`, `LanguageName`) VALUES
	(1, 'English'),
	(2, 'Español'),
	(3, 'Русский');
/*!40000 ALTER TABLE `language` ENABLE KEYS */;


-- Dumping structure for table gh7.match
CREATE TABLE IF NOT EXISTS `match` (
  `MatchId` int(11) NOT NULL AUTO_INCREMENT,
  `GuestId` int(11) NOT NULL,
  `HostId` int(11) NOT NULL,
  `DateGuestApproved` datetime DEFAULT NULL,
  `DateHostMatched` datetime DEFAULT NULL,
  `DateUnmatched` datetime DEFAULT NULL,
  `DateLastPresented` datetime DEFAULT NULL,
  PRIMARY KEY (`MatchId`),
  KEY `GuestId` (`GuestId`),
  KEY `HostId` (`HostId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Dumping data for table gh7.match: ~1 rows (approximately)
/*!40000 ALTER TABLE `match` DISABLE KEYS */;
INSERT INTO `match` (`MatchId`, `GuestId`, `HostId`, `DateGuestApproved`, `DateHostMatched`, `DateUnmatched`, `DateLastPresented`) VALUES
	(1, 2, 1, '2018-10-11 01:57:39', '2018-10-13 01:57:43', NULL, '2018-10-11 01:57:49');
/*!40000 ALTER TABLE `match` ENABLE KEYS */;


-- Dumping structure for table gh7.message
CREATE TABLE IF NOT EXISTS `message` (
  `MessageId` int(11) NOT NULL AUTO_INCREMENT,
  `SendingUserId` int(11) NOT NULL,
  `MatchId` int(11) NOT NULL,
  `DateSent` datetime DEFAULT NULL,
  `RecordingFile` varchar(250) NOT NULL,
  PRIMARY KEY (`MessageId`),
  KEY `UserId` (`SendingUserId`),
  KEY `MatchId` (`MatchId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table gh7.message: ~0 rows (approximately)
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
/*!40000 ALTER TABLE `message` ENABLE KEYS */;


-- Dumping structure for table gh7.user
CREATE TABLE IF NOT EXISTS `user` (
  `UserId` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(250) NOT NULL,
  `Email` varchar(250) NOT NULL,
  `Password` varchar(250) NOT NULL,
  `DateCreated` datetime NOT NULL,
  `DateArchived` datetime DEFAULT NULL,
  `Profile` longtext,
  `Picture` varchar(250) DEFAULT NULL,
  `IsHost` tinyint(1) NOT NULL,
  PRIMARY KEY (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Dumping data for table gh7.user: ~2 rows (approximately)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`UserId`, `Name`, `Email`, `Password`, `DateCreated`, `DateArchived`, `Profile`, `Picture`, `IsHost`) VALUES
	(1, 'Mitch Eagles', 'mitch.eagles@lessannoyingcrm.com', '$2a$92$VL5I8lFuvLUfTteV2S2h5uJRdbepSbm5PiCzBceFUP8J42q/s/wxq', '2018-10-13 01:17:53', NULL, NULL, NULL, 1),
	(2, 'Olga K', 'olya@gmail.com', '$2a$92$VL5I8lFuvLUfTteV2S2h5uJRdbepSbm5PiCzBceFUP8J42q/s/wxq', '2018-10-13 01:56:29', NULL, NULL, NULL, 0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;


-- Dumping structure for table gh7.user_language
CREATE TABLE IF NOT EXISTS `user_language` (
  `UserId` int(11) NOT NULL,
  `LanguageId` int(11) NOT NULL,
  `Ranking` int(11) NOT NULL COMMENT 'Ranking from 1-3',
  KEY `UserId` (`UserId`,`LanguageId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table gh7.user_language: ~4 rows (approximately)
/*!40000 ALTER TABLE `user_language` DISABLE KEYS */;
INSERT INTO `user_language` (`UserId`, `LanguageId`, `Ranking`) VALUES
	(1, 1, 3),
	(1, 2, 1),
	(2, 1, 2),
	(2, 3, 3);
/*!40000 ALTER TABLE `user_language` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
