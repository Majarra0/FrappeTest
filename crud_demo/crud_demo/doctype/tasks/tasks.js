// Copyright (c) 2026, me and contributors
// For license information, please see license.txt

// frappe.ui.form.on("tasks", {
// 	refresh(frm) {

// 	},
// });
function createTask(title, description = null) {
    frappe.call({
        method: "crud_demo.crud_demo.doctype.tasks.tasks.create_task",
        args: {
            title: title,
            description: description
        },
        callback: function (r) {
            if (r.message) {
                frappe.msgprint(r.message.message);
            }
        }
    });
}

function getAllTasks(callback) {
    frappe.call({
        method: "crud_demo.crud_demo.doctype.tasks.tasks.get_all_tasks",
        callback: function (r) {
            if (r.message) {
                callback(r.message);
            }
        }
    });
}

function getTask(taskId, callback) {
    frappe.call({
        method: "crud_demo.crud_demo.doctype.tasks.tasks.get_task",
        args: {
            id: taskId
        },
        callback: function (r) {
            if (r.message) {
                callback(r.message);
            }
        }
    });
}

function deleteTask(taskId) {
    frappe.call({
        method: "crud_demo.crud_demo.doctype.tasks.tasks.delete_task",
        args: {
            id: taskId
        },
        callback: function (r) {
            if (r.message) {
                frappe.msgprint(r.message.message);
            }
        }
    });
}