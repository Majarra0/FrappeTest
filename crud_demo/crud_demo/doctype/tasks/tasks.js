// Copyright (c) 2026, me and contributors
// For license information, please see license.txt

frappe.ui.form.on("Tasks", {
	refresh(frm) {
		// Optional: form-specific logic can go here
	},
});

window.updateTask = function (taskId, title, description = null) {
 frappe.call({
  method: "crud_demo.crud_demo.doctype.tasks.tasks.update_task",
  args: {
   id: taskId,
   title: title,
   description: description,
  },
  callback(r) {
   if (r.message) {
    frappe.msgprint(r.message.message);
   }
  },
 });
};
	window.createTask = function (title, description = null) {
		frappe.call({
			method: "crud_demo.crud_demo.doctype.tasks.tasks.create_task",
			args: {
				title: title,
				description: description,
			},
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
			args: {
				id: taskId,
			},
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
			args: {
				id: taskId,
			},
			callback(r) {
				if (r.message) {
					frappe.msgprint(r.message.message);
				}
			},
		});
	};