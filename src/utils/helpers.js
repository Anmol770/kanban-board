// Sort todos alphabetically by 'todo' text, case-insensitive
export const sortTodos = (a, b) =>
  a.todo.toLowerCase().localeCompare(b.todo.toLowerCase());

// Handle fetch API response JSON with error handling
export const handleJson = async (res) => {
  if (!res.ok) {
    let errorDetails = {};
    try {
      // Try parsing error response body as JSON
      errorDetails = await res.json();
    } catch (error) {
      // Log if error body parsing fails
      console.log("Failed to parse error body:", error);
    }

    // Create Error with status info and parsed message if any
    const error = new Error(
      `API error: ${res.status} ${res.statusText} - ${
        errorDetails.message || "Unknown error"
      }`
    );
    error.status = res.status;
    error.statusText = res.statusText;
    error.details = errorDetails;

    throw error; // Propagate error for handling upstream
  }

  try {
    // Parse successful response body as JSON
    return await res.json();
  } catch {
    // Return empty object if parsing fails
    return {};
  }
};
