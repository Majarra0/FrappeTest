import { Task } from '../types';

/**
 * Frappe Guest API service (API-only, no mocks)
 * Uses /api/method endpoints
 */

const FRAPPE_BASE_URL = 'http://localhost:8000';

const ENDPOINTS = {
  list: '/api/method/crud_demo.crud_demo.doctype.tasks.tasks.get_all_tasks',
  get: '/api/method/crud_demo.crud_demo.doctype.tasks.tasks.get_task',
  create: '/api/method/crud_demo.crud_demo.doctype.tasks.tasks.create_task',
  delete: '/api/method/crud_demo.crud_demo.doctype.tasks.tasks.delete_task',
};

class FrappeService {
  private static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(`${FRAPPE_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json?.exception || 'Frappe API error');
    }

    return json.message as T;
  }

  static getAllTasks(): Promise<Task[]> {
    return this.request<Task[]>(ENDPOINTS.list);
  }

  static getTaskById(id: string): Promise<Task> {
    return this.request<Task>(ENDPOINTS.get, {
      method: 'POST',
      body: JSON.stringify({ id }),
    });
  }

  static createTask(task: Partial<Task>): Promise<Task> {
    return this.request<Task>(ENDPOINTS.create, {
      method: 'POST',
      body: JSON.stringify({
        title: task.task_name,
        description: task.task_desc,
      }),
    });
  }

  static async deleteTask(id: string): Promise<void> {
    await this.request<void>(ENDPOINTS.delete, {
      method: 'POST',
      body: JSON.stringify({ id }),
    });
  }
}

export default FrappeService;
