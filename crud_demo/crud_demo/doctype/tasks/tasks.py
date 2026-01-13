# Copyright (c) 2026, me and contributors
# For license information, please see license.txt

import frappe
from frappe import _
from frappe.model.document import Document
from frappe.sessions import get_csrf_token as get_session_csrf_token


class tasks(Document):
	pass


def check_existence(id):
	try:
		frappe.get_doc("tasks", id, ignore_permissions=True)
		return True
	except frappe.DoesNotExistError:
		return False


@frappe.whitelist(allow_guest=True)
def create_task(title=None, description=None):
	if not title or title == "_":
		frappe.throw(_("Title is required"))

	task = frappe.new_doc("tasks")
	task.task_name = title
	task.task_desc = description
	task.insert(ignore_permissions=True)
	return {"message": f"Task '{task.task_name}' created succesfully"}


@frappe.whitelist(allow_guest=True)
def get_all_tasks():
	tasks = frappe.get_all("tasks", fields=["name", "task_name", "task_desc"], ignore_permissions=True)
	return tasks


@frappe.whitelist(allow_guest=True)
def get_task(id):
	if not id:
		frappe.throw(_("Id is required"))
	if not check_existence(id):
		frappe.throw(_("Task does not exist"))

	task = frappe.get_doc("tasks", id, ignore_permissions=True)

	return task


@frappe.whitelist(allow_guest=True)
def fetch_csrf_token():
	"""Return the current session's CSRF token (generates if missing)."""
	return {"csrf_token": get_session_csrf_token()}


@frappe.whitelist(allow_guest=True)
def delete_task(id):
	if not id:
		frappe.throw(_("Id is required"))

	if not check_existence(id):
		frappe.throw(_("Task does not exist"))
	else:
		frappe.delete_doc("tasks", id, ignore_permissions=True)
		return {"message": f"Task deleted succesfully"}
