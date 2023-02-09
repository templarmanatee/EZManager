const dbConnection = require("./connection");
const inquirer = require("inquirer");
const { query } = require("express");
const cTable = require("console.table");

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
      // loop: false,
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

const viewDepts = () => {
  dbConnection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
    startPrompt();
  });
  mainMenu();
};

const viewRoles = () => {
  dbConnection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    console.table(res);
  });
  mainMenu();
};

const viewEmps = () => {
  dbConnection.query("SELECT * FROM EMPLOYEE"),
    (err, res) => {
      if (err) throw err;
      console.table(res);
    };
  mainMenu();
};

const addDept = () => {
  dbConnection.query("SELECT * FROM EMPLOYEE"), (err, res) => {
    prompt([
        {
            type: "input", 
            name: "first_name", 
            message: "Type the employee's first name: "
        }, 
        {
            type: "input",
            name: "last_name",
            message: "Type the employee's last name: ",
        },
        {
            type: "list",
            name: "roletitle",
            message: "Choose a new role for the employee: ",
            choices: res.map((role) => role.title)
        },
        {
            type: "list",
            name: "managerId",
            message: "",
            choices: db
        }
    ])
  };

  mainMenu();
};

const addRole = () => {
  mainMenu();
};

const addEmp = async () => {
  mainMenu();
};

const updateEmpRole = async () => {
  mainMenu();
};

module.exports = { mainMenu };
