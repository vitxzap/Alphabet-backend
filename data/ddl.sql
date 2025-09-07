-- DISCLAIMER: THIS DDL FILE IS IN BETA AND WILL BE CHANGED
-- Init
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE DATABASE DEV_ALPHABET;

-- /////////////////////////////////////// --

-- Creating tables
CREATE TABLE IF NOT EXISTS tb_role(
	id			SERIAL PRIMARY KEY,
    name		VARCHAR(16) NOT NULL,
    isValid		BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS tb_permission(
	id			SERIAL PRIMARY KEY,
    name		VARCHAR(48) NOT NULL UNIQUE,
    isValid		BOOLEAN DEFAULT TRUE
);


CREATE TABLE IF NOT EXISTS tb_role_permission(
	id 				SERIAL PRIMARY KEY,
    roleId			INT NOT NULL,
    permissionId	INT NOT NULL,
    FOREIGN KEY (roleId) REFERENCES tb_role(id),
    FOREIGN KEY (permissionId) REFERENCES tb_permission(id)
);

CREATE TABLE IF NOT EXISTS tb_provider(
	id			SERIAL PRIMARY KEY,
    name		VARCHAR(32) NOT NULL,
    isActive	BOOLEAN DEFAULT TRUE,
    createdAt	TIMESTAMP NOT NULL DEFAULT now(),
    updatedAt	TIMESTAMP NOT NULL DEFAULT now()
);

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



CREATE TABLE IF NOT EXISTS tb_session(
	id				UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	userId			UUID NOT NULL,
	ipAdress		VARCHAR(16) NOT NULL,
	createdAt		TIMESTAMP NOT NULL DEFAULT now(),				
	FOREIGN KEY (userId) REFERENCES tb_user(id)
);

-- ////////////////////////////////////// --

-- Defining functions and triggers
CREATE OR REPLACE FUNCTION updatedAt()
	RETURNS TRIGGER AS $$
BEGIN
	NEW.updatedAt = now();
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER user_info_updated
BEFORE UPDATE ON tb_user
FOR EACH ROW
EXECUTE FUNCTION updatedAt();

CREATE TRIGGER provider_updated
BEFORE UPDATE ON tb_provider
FOR EACH ROW
EXECUTE FUNCTION updatedAt();


CREATE OR REPLACE FUNCTION verifyUserActiveSessions()
	RETURNS TRIGGER AS $$
DECLARE 
	user_sessions INTEGER;	
	max_sessions  INTEGER;
BEGIN
	SELECT COUNT(*) INTO user_sessions FROM tb_session WHERE userId = NEW.userId AND ipAdress = NEW.ipAdress;
	SELECT COUNT(*) INTO max_sessions FROM tb_session WHERE userId = NEW.userId;
	IF user_sessions >= 2 OR max_sessions >= 6 THEN
		RAISE EXCEPTION 'User sessions limit exceeded.';
	END IF;
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER verify_user_sessions
BEFORE INSERT ON tb_session
FOR EACH ROW
EXECUTE FUNCTION verifyUserActiveSessions();

-- /////////////////////////////////////// --

-- Populating
	-- Provider
	INSERT INTO tb_provider(name)
		VALUES('Default authentication');
	INSERT INTO tb_provider(name)
		VALUES('Apple');
	INSERT INTO tb_provider(name)
		VALUES('Google');
        
-- ////////////////////////////////////// --
	
	-- Role
	INSERT INTO tb_role(name)
		VALUES('User');
    INSERT INTO tb_role(name)
		VALUES('Owner');

	-- Permission
		-- System Permission
	INSERT INTO tb_permission(name)
		VALUES('manage:system');
		
		-- Resume Permission
	INSERT INTO tb_permission(name)
		VALUES('create:resume'),
			  ('update:resume'),
			  ('delete:resume'),
			  ('read:resume');
		
		-- User Permission
	INSERT INTO tb_permission(name)
		VALUES('logout:user'),
			  ('update:user'),
			  ('ban:user');

		-- Templates Permission
	INSERT INTO tb_permission(name)
		VALUES('create:template'),
			  ('read:template'),
			  ('use:template'),
			  ('delete:template'),
			  ('publish:template');

		-- Account Permission
	INSERT INTO tb_permission(name)
		VALUES('create:account'),
			  ('delete:account'),	
			  ('read:account'),
			  ('update:account');

		-- Role Permission
	INSERT INTO tb_permission(name)
		VALUES('create:role'),
			  ('read:role'),
			  ('update:role'),
			  ('delete:role');

	-- User
	INSERT INTO  tb_user(name, lastName, email, password, providerId, icon) 
		VALUES('user', 'test', 'user@test.com', 'testpassword', 1, '/icon.png'),
			  ('jonh', 'doe', 'jonhdoe@test.com', 'jonhdoepass', 1, '/jonh.png');

	-- Session
	DO $$
	DECLARE
		firstUser UUID;
	BEGIN 
		SELECT id INTO firstUser FROM tb_user LIMIT 1;
		INSERT INTO tb_session(userId, ipAdress)
		VALUES(firstUser, '192.168.0.1'),
			  (firstUser, '127.0.0.1');
	END
	$$ LANGUAGE plpgsql;
-- DISCLAIMER: THIS DDL FILE IS IN BETA AND WILL BE CHANGED
