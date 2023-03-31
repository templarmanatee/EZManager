const dbConnection = require("./connection");
const inquirer = require("inquirer");
const { query } = require("express");
const cTable = require("console.table");
const art = require("ascii-art-font");

const splashScreen = async () => {
  console.log(await art.create("Employee Manager","doom"));
}

//Create the initial menu selector for the program
const mainMenu = async () => {
  const prompt = [
    {
      type: "list",
      name: "mainMenu",
      message: "Welcome! What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add department",
        "Add role",
        "Add employee",
        "Update employee role",
        "Exit",
      ],
      loop: false,
    },
  ];

  inquirer.prompt(prompt).then((answer) => {
    switch (answer.mainMenu) {
      case "View all departments":
        console.log("ding");
        viewDepts();
        break;
      case "View all roles":
        viewRoles();
        break;
      case "View all employees":
        viewEmps();
        break;
      case "Add department":
        addDept();
        break;
      case "Add role":
        addRole();
        break;
      case "Add employee":
        addEmp();
        break;
      case "Update employee role":
        updateEmpRole();
        break;
      case "Exit":
        dbConnection.end();
        return -1;
    }
  });
};

// View all available departments
const viewDepts = () => {
  console.log("\n");
  dbConnection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });
};

//View all roles available 
const viewRoles = () => {
  console.log("\n");
  dbConnection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });
};

const viewEmps = () => {
  dbConnection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });
};

const addEmp = () => {
  dbConnection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "input",
          name: "first_name",
          message: "Type the employee's first name: ",
        },
        {
          type: "input",
          name: "last_name",
          message: "Type the employee's last name: ",
        },
        {
          type: "list",
          name: "role",
          message: "Choose a new role for the employee: ",
          choices: res.map((role) => role.title),
        },
        {
          type: "list",
          name: "manager_id",
          message: "Choose the employee's assigned manager: ",
          choices: [1, 4, 6, 8, 10],
        },
      ])
      .then((input) => {
        let role = res.find((role) => role.title === input.role);
        dbConnection.query("INSERT INTO employee set ?", {
          first_name: input.first_name,
          last_name: input.last_name,
          role_id: role.id,
          manager_id: input.manager_id,
        });
        mainMenu();
      });
  });
};

const addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "role",
        message: "Choose a name for the new role: ",
      },
    ])
    .then((input) => {
      dbConnection.query("INSERT INTO department SET ?", { name: input.role });
      mainMenu();
    });
};

const addDept = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "Choose a name for the new department: ",
      },
    ])
    .then((input) => {
      dbConnection.query("INSERT INTO department SET ?", {
        name: input.department,
      });
      mainMenu();
    });
};

const updateEmpRole = async () => {
  dbConnection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "list",
          name: "employee_name",
          message:
            "Please select the employees whos role you would like to update",
          choices: empRes.map(
            (employee) => employee.first_name + " " + employee.last_name
          ),
        },
      ])
      .then((input) => {
        const roleChanger = res.find(
          (employee) =>
            employee.first_name + " " + employee.last_name === input.name
        );
        inquirer
          .prompt([
            {
              type: "list",
              name: "role",
              choices: res.map((role) => role.title),
            },
          ])
          .then((input) => {
            const newRole = res.find((role) => role.title === input.role);
            dbConnection.query(
              "UPDATE employee SET role_id = ? WHERE id = ?",
              [newRole, roleChanger],
              (err) => {
                mainMenu();
              }
            );
          });
      });
  });
};


module.exports = { splashScreen, mainMenu };
