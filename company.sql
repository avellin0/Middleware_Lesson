CREATE TABLE employees(
    employer_id INT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(250) NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(100),

    UNIQUE (email)
);

CREATE TABLE team(
    team_id INT PRIMARY KEY, 
    team_number INT NOT NULL
);

CREATE TABLE team_employees (
    id INT PRIMARY KEY,
    teams INT REFERENCES team(team_id),
    employees INT REFERENCES employees(employer_id)
);






-- INSERTs --

INSERT INTO employees(
    employer_id,
    name,
    email,
    phone,
    role
) 
VALUES(
    1,
    'Davi',
    'ploglamador@hotmail.com',
    '+5521969692424',
    'admin'
);

INSERT INTO employees(
    employer_id,
    name,
    email,
    phone
) 
VALUES(
    2,
    'Wesley',
    'Wesley@hotmail.com',
    '+5521924246969'
);

INSERT INTO team(
    team_id,
    team_number
) 
VALUES(
    001, 
    1001
);

INSERT INTO team_employees(
    id,
    teams,
    employees
) 
VALUES(
    1,
    001,
    1
);

INSERT INTO team_employees(
    id,
    teams,
    employees
) 
VALUES(
    2,
    001,
    2
);



