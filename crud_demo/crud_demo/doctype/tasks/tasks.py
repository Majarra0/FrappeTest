# Copyright (c) 2026, me and contributors
# For license information, please see license.txt

import frappe
from frappe import _
from frappe.model.document import Document


class tasks(Document):
	pass
	
def check_existence(id):
	try:
		frappe.get_doc("tasks", id)
		return True
	except frappe.DoesNotExistError:
		return False

@frappe.whitelist()
def create_task(title, description=None):
	if not title or title=="_":
		frappe.throw(_("Title is required"))

	task = frappe.new_doc("tasks")
	task.task_name = title
	task.task_desc = description
	task.insert()
	return {"message": f"Task '{task.task_name}' created succesfully" }
	
@frappe.whitelist()
def get_all_tasks():
	tasks = frappe.get_all('tasks', fields=['task_name', 'task_desc'])
	return tasks

@frappe.whitelist()
def get_task(id:int):
	if not id:
		frappe.throw(_("Id is required"))
	if not check_existence(id):
		frappe.throw(_("Task does not exist"))
	
	task = frappe.get_doc('tasks', id)
		
	return task
	
@frappe.whitelist()
def delete_task(id:int):
	if not id:
		frappe.throw(_("Id is required"))
		
	if not check_existence(id):
		frappe.throw(_("Task does not exist"))
	else:
		frappe.delete_doc('tasks', id)
		return {"message": f"Task deleted succesfully" }