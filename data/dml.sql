-- !! DML FOR TESTS ONLY !!
-- Populating
	-- Provider
	INSERT INTO tb_provider(name)
		VALUES('Default authentication');
	INSERT INTO tb_provider(name)
		VALUES('Apple');
	INSERT INTO tb_provider(name)
		VALUES('Google');
        
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
		INSERT INTO tb_user_session(userId, ipAdress)
		VALUES(firstUser, '192.168.0.2'),
			  (firstUser, '127.0.0.2');
	END
	$$ LANGUAGE plpgsql;

-- ////////////////////////////////////// --

-- Selects
SELECT * FROM tb_provider; --Should have 3 providers
SELECT * FROM tb_user; -- Should have 2 users
SELECT * FROM tb_role; -- Should have 2 roles
SELECT * FROM tb_user_session; -- Should have 2 sessions
SELECT * FROM tb_permission; -- Should have 21 permissions

-- Truncates
TRUNCATE TABLE tb_user RESTART IDENTITY CASCADE;
TRUNCATE TABLE tb_provider RESTART IDENTITY CASCADE;
TRUNCATE TABLE tb_role RESTART IDENTITY CASCADE;
TRUNCATE TABLE tb_user_session RESTART IDENTITY CASCADE;
TRUNCATE TABLE tb_permission RESTART IDENTITY CASCADE;
TRUNCATE TABLE tb_role_permission;

-- Drops
DROP TABLE tb_role_permission;
DROP TABLE tb_user_session;
DROP TABLE tb_user;
DROP TABLE tb_role;
DROP TABLE tb_permission;
DROP TABLE tb_provider;
-- !! DML FOR TESTS ONLY !!
