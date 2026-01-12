## Tasks Module

A simple Tasks module built with the Frappe Framework that provides basic task management through server-side APIs.

### Features

- Create tasks with a title and optional description
- Retrieve a single task by ID
- List all tasks
- Delete tasks with validation

### DocType

#### Tasks

task_name – Task title
task_desc – Optional description

### API Methods

- create_task(title, description=None)
- get_all_tasks()
- get_task(id)
- delete_task(id)

## Client-side JavaScript
The module exposes global JavaScript helpers

- createTask(title, description = null)
- getAllTasks(callback)
- getTask(id, callback)
- deleteTask(id)

### Installation

You can install this app using the [bench](https://github.com/frappe/bench) CLI:

```bash
cd $PATH_TO_YOUR_BENCH
bench get-app $URL_OF_THIS_REPO --branch develop
bench install-app crud_demo
```

### Contributing

This app uses `pre-commit` for code formatting and linting. Please [install pre-commit](https://pre-commit.com/#installation) and enable it for this repository:

```bash
cd apps/crud_demo
pre-commit install
```

Pre-commit is configured to use the following tools for checking and formatting your code:

- ruff
- eslint
- prettier
- pyupgrade

### License

mit
