-- Set morgankuluvesky@gmail.com as admin
UPDATE User 
SET isAdmin = true 
WHERE email = 'morgankuluvesky@gmail.com';

-- If no user exists with that email, query will do nothing (safe)
