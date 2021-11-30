/*
SQLyog Community v13.1.6 (64 bit)
MySQL - 8.0.27 : Database - theater-booking
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`theater-booking` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `theater-booking`;

/*Table structure for table `bookings` */

DROP TABLE IF EXISTS `bookings`;

CREATE TABLE `bookings` (
  `BookingID` int NOT NULL AUTO_INCREMENT,
  `UserID` int NOT NULL,
  `SeatID` int NOT NULL,
  PRIMARY KEY (`BookingID`),
  KEY `UserID` (`UserID`),
  KEY `SeatID` (`SeatID`),
  CONSTRAINT `SeatID` FOREIGN KEY (`SeatID`) REFERENCES `seat` (`SeatID`),
  CONSTRAINT `UserID` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `bookings` */

/*Table structure for table `movies` */

DROP TABLE IF EXISTS `movies`;

CREATE TABLE `movies` (
  `MovieID` int NOT NULL AUTO_INCREMENT,
  `MovieName` varchar(255) DEFAULT NULL,
  `MovieDescription` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`MovieID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `movies` */

insert  into `movies`(`MovieID`,`MovieName`,`MovieDescription`) values 
(1,'Avengers: Endgame','After Thanos, an intergalactic warlord, disintegrates half of the universe, the Avengers must reunite and assemble again to reinvigorate their trounced allies and restore balance.'),
(2,'Spider-Man: No Way Home','With Spider-Man\'s identity now revealed, our friendly neighborhood web-slinger is unmasked and no longer able to separate his normal life as Peter Parker from the high stakes of being a superhero. When Peter asks for help from Doctor Strange, the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.'),
(3,'Iron Man 3','Tony Stark encounters a formidable foe called the Mandarin. After failing to defeat his enemy, Tony embarks on a journey of self-discovery as he fights against the powerful Mandarin.');

/*Table structure for table `seat` */

DROP TABLE IF EXISTS `seat`;

CREATE TABLE `seat` (
  `SeatID` int NOT NULL AUTO_INCREMENT,
  `SeatCode` varchar(765) DEFAULT NULL,
  `MovieID` int DEFAULT NULL,
  `SeatAvailability` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`SeatID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `seat` */

insert  into `seat`(`SeatID`,`SeatCode`,`MovieID`,`SeatAvailability`) values 
(1,'A1',1,0),
(2,'A2',1,0),
(3,'A3',1,0),
(4,'A4',1,0),
(5,'A5',1,0),
(6,'A6',1,0),
(7,'A7',1,0),
(8,'A8',1,0),
(9,'A9',1,0),
(10,'A10',1,0),
(11,'B1',1,0),
(12,'B2',1,0),
(13,'B3',1,0),
(14,'B4',1,0),
(15,'B5',1,0),
(16,'B6',1,0),
(17,'B7',1,0),
(18,'B8',1,0),
(19,'B9',1,0),
(20,'B10',1,0),
(21,'C1',1,0),
(22,'C2',1,0),
(23,'C3',1,0),
(24,'C4',1,0),
(25,'C5',1,0),
(26,'C6',1,0),
(27,'C7',1,0),
(28,'C8',1,0),
(29,'C9',1,0),
(30,'C10',1,0),
(31,'D1',1,0),
(32,'D2',1,0),
(33,'D3',1,0),
(34,'D4',1,0),
(35,'D5',1,0),
(36,'D6',1,0),
(37,'D7',1,0),
(38,'D8',1,0),
(39,'D9',1,0),
(40,'D10',1,0),
(41,'E1',1,0),
(42,'E2',1,0),
(43,'E3',1,0),
(44,'E4',1,0),
(45,'E5',1,0),
(46,'E6',1,0),
(47,'E7',1,0),
(48,'E8',1,0),
(49,'E9',1,0),
(50,'E10',1,0),
(51,'A1',2,0),
(52,'A2',2,0),
(53,'A3',2,0),
(54,'A4',2,0),
(55,'A5',2,0),
(56,'A6',2,0),
(57,'A7',2,0),
(58,'A8',2,0),
(59,'A9',2,0),
(60,'A10',2,0),
(61,'B1',2,0),
(62,'B2',2,0),
(63,'B3',2,0),
(64,'B4',2,0),
(65,'B5',2,0),
(66,'B6',2,0),
(67,'B7',2,0),
(68,'B8',2,0),
(69,'B9',2,0),
(70,'B10',2,0),
(71,'C1',2,0),
(72,'C2',2,0),
(73,'C3',2,0),
(74,'C4',2,0),
(75,'C5',2,0),
(76,'C6',2,0),
(77,'C7',2,0),
(78,'C8',2,0),
(79,'C9',2,0),
(80,'C10',2,0),
(81,'D1',2,0),
(82,'D2',2,0),
(83,'D3',2,0),
(84,'D4',2,0),
(85,'D5',2,0),
(86,'D6',2,0),
(87,'D7',2,0),
(88,'D8',2,0),
(89,'D9',2,0),
(90,'D10',2,0),
(91,'E1',2,0),
(92,'E2',2,0),
(93,'E3',2,0),
(94,'E4',2,0),
(95,'E5',2,0),
(96,'E6',2,0),
(97,'E7',2,0),
(98,'E8',2,0),
(99,'E9',2,0),
(100,'E10',2,0),
(101,'A1',3,0),
(102,'A2',3,0),
(103,'A3',3,0),
(104,'A4',3,0),
(105,'A5',3,0),
(106,'A6',3,0),
(107,'A7',3,0),
(108,'A8',3,0),
(109,'A9',3,0),
(110,'A10',3,0),
(111,'B1',3,0),
(112,'B2',3,0),
(113,'B3',3,0),
(114,'B4',3,0),
(115,'B5',3,0),
(116,'B6',3,0),
(117,'B7',3,0),
(118,'B8',3,0),
(119,'B9',3,0),
(120,'B10',3,0),
(121,'C1',3,0),
(122,'C2',3,0),
(123,'C3',3,0),
(124,'C4',3,0),
(125,'C5',3,0),
(126,'C6',3,0),
(127,'C7',3,0),
(128,'C8',3,0),
(129,'C9',3,0),
(130,'C10',3,0),
(131,'D1',3,0),
(132,'D2',3,0),
(133,'D3',3,0),
(134,'D4',3,0),
(135,'D5',3,0),
(136,'D6',3,0),
(137,'D7',3,0),
(138,'D8',3,0),
(139,'D9',3,0),
(140,'D10',3,0),
(141,'E1',3,0),
(142,'E2',3,0),
(143,'E3',3,0),
(144,'E4',3,0),
(145,'E5',3,0),
(146,'E6',3,0),
(147,'E7',3,0),
(148,'E8',3,0),
(149,'E9',3,0),
(150,'E10',3,0);

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `UserID` int NOT NULL AUTO_INCREMENT,
  `UserName` varchar(255) DEFAULT NULL,
  `UserContactNumber` varchar(25) DEFAULT NULL,
  `UserEmail` varchar(255) DEFAULT NULL,
  `UserPassword` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`UserID`),
  UNIQUE KEY `UserEmail` (`UserEmail`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
