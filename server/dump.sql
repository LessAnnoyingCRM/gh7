# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 192.168.33.16 (MySQL 5.5.61-0ubuntu0.14.04.1)
# Database: local
# Generation Time: 2018-10-13 23:03:27 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table event
# ------------------------------------------------------------

DROP TABLE IF EXISTS `event`;

CREATE TABLE `event` (
  `EventId` int(11) NOT NULL AUTO_INCREMENT,
  `MatchId` int(11) NOT NULL,
  `Location` varchar(250) DEFAULT NULL,
  `EventDate` date NOT NULL,
  `DateHostConfirmed` datetime DEFAULT NULL,
  `DateGuestConfirmed` datetime DEFAULT NULL,
  `EventHappened` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`EventId`),
  KEY `MatchId` (`MatchId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;

INSERT INTO `event` (`EventId`, `MatchId`, `Location`, `EventDate`, `DateHostConfirmed`, `DateGuestConfirmed`, `EventHappened`)
VALUES
	(1,1,'3325 Brookview Dr','2018-10-16',NULL,NULL,NULL);

/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table language
# ------------------------------------------------------------

DROP TABLE IF EXISTS `language`;

CREATE TABLE `language` (
  `LanguageId` int(11) NOT NULL AUTO_INCREMENT,
  `LanguageName` varchar(50) NOT NULL,
  PRIMARY KEY (`LanguageId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `language` WRITE;
/*!40000 ALTER TABLE `language` DISABLE KEYS */;

INSERT INTO `language` (`LanguageId`, `LanguageName`)
VALUES
	(1,'English'),
	(2,'Español'),
	(3,'Русский');

/*!40000 ALTER TABLE `language` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table pairing
# ------------------------------------------------------------

DROP TABLE IF EXISTS `pairing`;

CREATE TABLE `pairing` (
  `MatchId` int(11) NOT NULL AUTO_INCREMENT,
  `GuestId` int(11) NOT NULL,
  `HostId` int(11) NOT NULL,
  `DateGuestApproved` datetime DEFAULT NULL,
  `DateHostMatched` datetime DEFAULT NULL,
  `DateUnmatched` datetime DEFAULT NULL,
  `DateLastPresented` datetime DEFAULT NULL,
  PRIMARY KEY (`MatchId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `pairing` WRITE;
/*!40000 ALTER TABLE `pairing` DISABLE KEYS */;

INSERT INTO `pairing` (`MatchId`, `GuestId`, `HostId`, `DateGuestApproved`, `DateHostMatched`, `DateUnmatched`, `DateLastPresented`)
VALUES
	(2,1,2,NULL,NULL,NULL,NULL),
	(3,1,2,NULL,NULL,NULL,NULL);

/*!40000 ALTER TABLE `pairing` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table message
# ------------------------------------------------------------

DROP TABLE IF EXISTS `message`;

CREATE TABLE `message` (
  `MessageId` int(11) NOT NULL AUTO_INCREMENT,
  `SendingUserId` int(11) NOT NULL,
  `MatchId` int(11) NOT NULL,
  `DateSent` datetime DEFAULT NULL,
  `RecordingFile` varchar(250) NOT NULL,
  `DateArchived` datetime DEFAULT NULL,
  PRIMARY KEY (`MessageId`),
  KEY `UserId` (`SendingUserId`),
  KEY `MatchId` (`MatchId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table rating
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rating`;

CREATE TABLE `rating` (
  `EventId` int(11) NOT NULL,
  `RatingUser` int(11) NOT NULL,
  `RatedUser` int(11) NOT NULL,
  `Criterion` varchar(50) DEFAULT NULL,
  `RatingValue` int(11) DEFAULT NULL,
  `Note` longtext,
  `DateRated` datetime NOT NULL,
  KEY `EventId` (`EventId`),
  KEY `RatingUser` (`RatingUser`),
  KEY `RatedUser` (`RatedUser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`UserId`, `Name`, `Email`, `Password`, `DateCreated`, `DateArchived`, `Profile`, `Picture`, `IsHost`)
VALUES
	(1,'Mitch Eagles','mitch.eagles@lessannoyingcrm.com','$2a$92$VL5I8lFuvLUfTteV2S2h5uJRdbepSbm5PiCzBceFUP8J42q/s/wxq','2018-10-13 01:17:53',NULL,NULL,NULL,1),
	(2,'Olga K','olya@gmail.com','$2a$92$VL5I8lFuvLUfTteV2S2h5uJRdbepSbm5PiCzBceFUP8J42q/s/wxq','2018-10-13 01:56:29',NULL,NULL,NULL,0);

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user_language
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_language`;

CREATE TABLE `user_language` (
  `UserId` int(11) NOT NULL,
  `LanguageId` int(11) NOT NULL,
  `Ranking` int(11) NOT NULL COMMENT 'Ranking from 1-3',
  KEY `UserId` (`UserId`,`LanguageId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `user_language` WRITE;
/*!40000 ALTER TABLE `user_language` DISABLE KEYS */;

INSERT INTO `user_language` (`UserId`, `LanguageId`, `Ranking`)
VALUES
	(1,1,3),
	(1,2,1),
	(2,1,2),
	(2,3,3);

/*!40000 ALTER TABLE `user_language` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
