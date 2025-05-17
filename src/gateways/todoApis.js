import { API_BASE, USER_ID, headers } from "../constants";
import { handleJson } from "../utils/helpers";

const todoApi = {
  // Fetch all todos
  async fetchAll() {
    const res = await fetch(API_BASE);
    const data = await handleJson(res);
    return data.todos;
  },

  // Create new todo
  async create(text, targetColumn = "pending") {
    const completed = targetColumn === "completed";
    const body = {
      todo: text,
      completed,
      userId: USER_ID,
    };

    const res = await fetch(`${API_BASE}/add`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    return handleJson(res);
  },

  // Edit todo text
  async update(id, text, completed) {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({ todo: text, completed }),
    });

    return handleJson(res);
  },

  // Delete todo
  async delete(id) {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: "DELETE",
      headers,
    });

    await handleJson(res); // validate response and throw if needed
    return true; // success status stays the same
  },
};

export default todoApi;
