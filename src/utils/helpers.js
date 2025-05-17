// Sorting helper - case insensitive alphabetical order by todo text
export const sortTodos = (a, b) =>
  a.todo.toLowerCase().localeCompare(b.todo.toLowerCase());

export const handleJson = async (res) => {
  if (!res.ok) {
    let errorDetails = {};
    try {
      errorDetails = await res.json();
    } catch (error) {
      console.log("Failed to parse error body:", error);
    }

    const error = new Error(
      `API error: ${res.status} ${res.statusText} - ${
        errorDetails.message || "Unknown error"
      }`
    );
    error.status = res.status;
    error.statusText = res.statusText;
    error.details = errorDetails;

    throw error;
  }

  try {
    return await res.json();
  } catch {
    return {};
  }
};
