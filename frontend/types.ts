export interface Task {
  name: string; // Frappe ID
  task_name: string;
  task_desc?: string;
  creation?: string;
  owner?: string;
}

export interface FrappeResponse<T> {
  data: T;
}

export enum ViewMode {
  GRID = "GRID",
  LIST = "LIST",
}

export interface StatsData {
  total: number;
  recent: number;
}
