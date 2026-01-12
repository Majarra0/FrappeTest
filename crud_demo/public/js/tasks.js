frappe.after_ajax(function () {
	console.log("GLOBAL TASKS JS LOADED");

	window.createTask = function (title, description = null) {
		frappe.call({
			method: "crud_demo.crud_demo.doctype.tasks.tasks.create_task",
			args: { title, description },
			callback(r) {
				if (r.message) {
					frappe.msgprint(r.message.message);
				}
			},
		});
	};

	window.getAllTasks = function (callback) {
		frappe.call({
			method: "crud_demo.crud_demo.doctype.tasks.tasks.get_all_tasks",
			callback(r) {
				if (r.message && callback) {
					callback(r.message);
				}
			},
		});
	};

	window.getTask = function (taskId, callback) {
		frappe.call({
			method: "crud_demo.crud_demo.doctype.tasks.tasks.get_task",
			args: { id: taskId },
			callback(r) {
				if (r.message && callback) {
					callback(r.message);
				}
			},
		});
	};

	window.deleteTask = function (taskId) {
		frappe.call({
			method: "crud_demo.crud_demo.doctype.tasks.tasks.delete_task",
			args: { id: taskId },
			callback(r) {
				if (r.message) {
					frappe.msgprint(r.message.message);
				}
			},
		});
	};
});
