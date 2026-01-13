export async function getAllTasks() {
  const response = await fetch(
    "http://localhost:8000/api/method/crud_demo.crud_demo.get_all_tasks",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  const data = await response.json();
  return data.message;
}
