USE employees_db; 

INSERT INTO department (name) 
VALUES ("Corporate"),
    ("Mailroom"),
    ("Accounting"),
    ("Engineering"),
    ("Sales");

INSERT INTO role (title, salary, department_id) 
VALUES ("Chief Executive Officer", 400000, 1),
    ("Chief Financial Officer", 200000, 1),
    ("Mail Sorter", 30000, 2),
    ("Mail Manager", 50000, 2),
    ("Accountant", 75000, 3), 
    ("Data Entry Specialist", 45000, 3), 
    ("Engineer", 90000, 4),
    ("Intern", 50000, 4), 
    ("Sales Agent", 70000, 5), 
    ("Closer", 100000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jeff", "Beepos", 1, NULL),
    ("Mark", "Czech", 2, 1),
    ("Jenna", "Taylor", 3, 4),
    ("Tim", "McAppleman", 4, NULL),
    ("Jake", "Frum-Staightfarm", 5, 6), 
    ("Dale", "Gribble", 6, NULL), 
    ("Drawina", "Blank", 7, 8),
    ("Fred", "Drunning", 8, NULL), 
    ("Ricky", "Bobby", 9, 10), 
    ("Slick", "McGrease", 10, NULL);