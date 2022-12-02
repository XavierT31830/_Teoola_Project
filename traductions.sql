-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 02 déc. 2022 à 14:13
-- Version du serveur : 8.0.31
-- Version de PHP : 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `traductions`
--

-- --------------------------------------------------------

--
-- Structure de la table `applications`
--

DROP TABLE IF EXISTS `applications`;
CREATE TABLE IF NOT EXISTS `applications` (
  `id_app` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id_app`),
  UNIQUE KEY `title` (`title`),
  KEY `user_app` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `applications`
--

INSERT INTO `applications` (`id_app`, `title`, `description`, `content`, `user_id`) VALUES
(17, 'Test1', 'Description', '', 5),
(123, 'Test2', 'On test', '', 5),
(124, 'Test3', 'This is an App and i wanted to do a big decription here to test it, so go on !', '', 5);

-- --------------------------------------------------------

--
-- Structure de la table `relation_app_users`
--

DROP TABLE IF EXISTS `relation_app_users`;
CREATE TABLE IF NOT EXISTS `relation_app_users` (
  `id_app_user` int NOT NULL AUTO_INCREMENT,
  `app_id` int NOT NULL,
  `user_id` int NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`id_app_user`),
  KEY `this_app` (`app_id`),
  KEY `this_user` (`user_id`),
  KEY `this_role` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id_role` int NOT NULL AUTO_INCREMENT,
  `role` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_role`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `roles`
--

INSERT INTO `roles` (`id_role`, `role`) VALUES
(1, 'Administrator'),
(2, 'Translator'),
(3, 'Owner');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `last_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `first_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `pwd` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id_user`, `last_name`, `first_name`, `email`, `pwd`) VALUES
(5, 'Torrente', 'Xavier', 'xavopeus@yahoo.fr', '3189086edcfdabc915934fb8a8cd0d310cadd7a33855b2fcbef12e7b5b104258'),
(6, 'Gaillard', 'Remy', 'remy@gmail.com', 'd4ee672562b7f048e8a783efaccffefe6945b8d3dc1277e4ab6fde9140827843');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `applications`
--
ALTER TABLE `applications`
  ADD CONSTRAINT `user_app` FOREIGN KEY (`user_id`) REFERENCES `users` (`id_user`);

--
-- Contraintes pour la table `relation_app_users`
--
ALTER TABLE `relation_app_users`
  ADD CONSTRAINT `this_app` FOREIGN KEY (`app_id`) REFERENCES `applications` (`id_app`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `this_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id_role`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `this_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id_user`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
