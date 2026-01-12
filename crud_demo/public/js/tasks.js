// Global Tasks JS (console-focused, no Promise noise)

function frappeCallPromise(options) {
	return new Promise((resolve, reject) => {
		frappe.call({
			...options,
			callback(r) {
				resolve(r.message);
			},
			error(err) {
				reject(err);
			},
		});
	});
}

frappe.after_ajax(function () {
	console.log("GLOBAL TASKS JS LOADED");

	// Create task
	window.createTask = async function (title, description = null) {
		const result = await frappeCallPromise({
			method: "crud_demo.crud_demo.doctype.tasks.tasks.create_task",
			args: { title, description },
		});

		console.log(result);
		return result;
	};

	// Get all tasks
	window.getAllTasks = async function () {
		const result = await frappeCallPromise({
			method: "crud_demo.crud_demo.doctype.tasks.tasks.get_all_tasks",
		});

		console.log(result);
		return result;
	};

	// Get task by ID
	window.getTask = async function (taskId) {
		const result = await frappeCallPromise({
			method: "crud_demo.crud_demo.doctype.tasks.tasks.get_task",
			args: { id: taskId },
		});

		console.log(result);
		return result;
	};

	// Delete task
	window.deleteTask = async function (taskId) {
		const result = await frappeCallPromise({
			method: "crud_demo.crud_demo.doctype.tasks.tasks.delete_task",
			args: { id: taskId },
		});

		console.log(result);
		return result;
	};
});
