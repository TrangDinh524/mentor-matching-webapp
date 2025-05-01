DROP DATABASE IF EXISTS mentorship_db;
CREATE DATABASE IF NOT EXISTS mentorship_db;
USE mentorship_db;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL, 
  email VARCHAR(255) NOT NULL UNIQUE,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  skills TEXT,
  interests TEXT,
  bio TEXT,
  role ENUM('mentor', 'mentee'),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS connections (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sender_id INT NOT NULL,
  receiver_id INT NOT NULL,
  status ENUM('pending', 'accepted', 'declined') DEFAULT 'pending',
  FOREIGN KEY (sender_id) REFERENCES users(id),
  FOREIGN KEY (receiver_id) REFERENCES users(id)
);
