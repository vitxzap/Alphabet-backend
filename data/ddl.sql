-- !! DDL NOT FINISHED YET !!
-- Init
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE DATABASE DEV_ALPHABET;

-- //////////////// Creating tables //////////////// --

-- ROLE
CREATE TABLE IF NOT EXISTS tb_role(
	id			SERIAL PRIMARY KEY,
    name		VARCHAR(16) NOT NULL,
    isValid		BOOLEAN DEFAULT TRUE
);

-- PERMISSION
CREATE TABLE IF NOT EXISTS tb_permission(
	id			SERIAL PRIMARY KEY,
    name		VARCHAR(48) NOT NULL UNIQUE,
    isValid		BOOLEAN DEFAULT TRUE
);

-- ROLE_PERMISSION
CREATE TABLE IF NOT EXISTS tb_role_permission(
	id 				SERIAL PRIMARY KEY,
    roleId			INT NOT NULL,
    permissionId	INT NOT NULL,
    FOREIGN KEY (roleId) REFERENCES tb_role(id),
    FOREIGN KEY (permissionId) REFERENCES tb_permission(id)
);

-- PROVIDER
CREATE TABLE IF NOT EXISTS tb_provider(
	id			SERIAL PRIMARY KEY,
    name		VARCHAR(32) NOT NULL,
    isActive	BOOLEAN DEFAULT TRUE,
    createdAt	TIMESTAMP NOT NULL DEFAULT now(),
    updatedAt	TIMESTAMP NOT NULL DEFAULT now()
);

-- USER
CREATE TABLE IF NOT EXISTS tb_user(
	id			UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name		VARCHAR(20) NOT NULL,
    lastName	VARCHAR(20) NOT NULL,
    email		VARCHAR(150) NOT NULL UNIQUE,
    password	VARCHAR(191) NOT NULL,
    providerId	INTEGER NOT NULL,
    icon		TEXT,
    roleId		INTEGER DEFAULT 1 NOT NULL,		
    createdAt	TIMESTAMP NOT NULL DEFAULT now(),
    updatedAt	TIMESTAMP NOT NULL DEFAULT now(),
	FOREIGN KEY (roleId) REFERENCES tb_role(id),
    FOREIGN KEY (providerId) REFERENCES tb_provider(id)
);

-- SESSION
CREATE TABLE IF NOT EXISTS tb_user_session(
	id				UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	userId			UUID NOT NULL,
	ipAdress		VARCHAR(16) NOT NULL,
	createdAt		TIMESTAMP NOT NULL DEFAULT now(),				
	FOREIGN KEY (userId) REFERENCES tb_user(id)
);

-- ///////////////// Defining functions and triggers ///////////////// --

-- Function for update date
CREATE OR REPLACE FUNCTION updatedAt()
	RETURNS TRIGGER AS $$
BEGIN
	NEW.updatedAt = now();
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--Its triggers
CREATE TRIGGER user_info_updated
BEFORE UPDATE ON tb_user
FOR EACH ROW
EXECUTE FUNCTION updatedAt();

CREATE TRIGGER provider_updated
BEFORE UPDATE ON tb_provider
FOR EACH ROW
EXECUTE FUNCTION updatedAt();

-- Function to verify user's active sessions
CREATE OR REPLACE FUNCTION verifyUserActiveSessions()
	RETURNS TRIGGER AS $$
DECLARE 
	ip_sessions INTEGER;	
	max_sessions  INTEGER;
BEGIN
	SELECT COUNT(*) INTO ip_sessions FROM tb_user_session WHERE userId = NEW.userId AND ipAdress = NEW.ipAdress;
	SELECT COUNT(*) INTO max_sessions FROM tb_user_session WHERE userId = NEW.userId;
	IF ip_sessions >= 2 OR max_sessions >= 6 THEN
		RAISE EXCEPTION 'User sessions limit exceeded.';
	END IF;
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Its trigger
CREATE TRIGGER verify_user_sessions
BEFORE INSERT ON tb_user_session
FOR EACH ROW
EXECUTE FUNCTION verifyUserActiveSessions();
-- !! DDL NOT FINISHED YET !!
