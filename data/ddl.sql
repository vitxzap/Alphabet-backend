-- DISCLAIMER: DDL NOT FINISHED YET
-- Init
CREATE DATABASE APBTDEVDB;
USE APBTDEVDB;


-- Creating tables
CREATE TABLE tb_user(
	id			CHAR(36) PRIMARY KEY NOT NULL,
    name		VARCHAR(20) NOT NULL,
    lastName	VARCHAR(20) NOT NULL,
    email		VARCHAR(150) NOT NULL,
    password	VARCHAR(191) NOT NULL,
    providerId	INT NOT NULL,
    icon		blob,
    roleId		INT DEFAULT 1 NOT NULL,		
    createdAt	DATETIME(3) NOT NULL DEFAULT current_timestamp(3),
    updatedAt	DATETIME(3) NOT NULL DEFAULT current_timestamp(3) ON UPDATE CURRENT_TIMESTAMP(3),
	FOREIGN KEY (roleId) REFERENCES tb_role(id),
    FOREIGN KEY (providerId) REFERENCES tb_provider(id)
);

CREATE TABLE tb_role(
	id			INT PRIMARY KEY AUTO_INCREMENT,
    name		VARCHAR(16) NOT NULL,
    isValid		BOOLEAN DEFAULT TRUE
);

CREATE TABLE tb_permission(
	id			INT PRIMARY KEY AUTO_INCREMENT,
    name		VARCHAR(48) NOT NULL,
    isValid		BOOLEAN DEFAULT TRUE
);

CREATE TABLE tb_role_permission(
	id 				INT PRIMARY KEY AUTO_INCREMENT,
    roleId			INT NOT NULL,
    permissionId	INT NOT NULL,
    FOREIGN KEY (roleId) REFERENCES tb_role(id),
    FOREIGN KEY (permissionId) REFERENCES tb_permission(id)
);

CREATE TABLE tb_provider(
	id			INT PRIMARY KEY AUTO_INCREMENT,
    name		VARCHAR(32) NOT NULL,
    isActive	BOOLEAN DEFAULT TRUE,
    createdAt	DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updatedAt	DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
);


-- Populating
	-- Provider
	INSERT INTO tb_provider(name)
		VALUES("Default auth");
	INSERT INTO tb_provider(name)
		VALUES("Apple");
	INSERT INTO tb_provider(name)
		VALUES("Google");
        
-- ////////////////////////////////////// --
	-- Role
	INSERT INTO tb_role(name)
		VALUES("User");
    INSERT INTO tb_role(name)
		VALUES("Owner");

-- ////////////////////////////////////// --
	-- Permission
	
        
-- Selects
SELECT * FROM tb_provider;
SELECT * FROM tb_role;


-- DISCLAIMER: DDL NOT FINISHED YET