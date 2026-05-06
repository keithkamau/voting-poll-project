const API_URL = "http://localhost:3001";

const request = async (path, options = {}) => {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error("JSON Server request failed.");
  }

  return response.json();
};

export const getOptions = () => request("/options");

export const createOption = (option) =>
  request("/options", {
    method: "POST",
    body: JSON.stringify(option),
  });

export const updateOption = (id, option) =>
  request(`/options/${id}`, {
    method: "PUT",
    body: JSON.stringify(option),
  });

export const getUserVote = async (userId) => {
  const votes = await request(`/userVotes?userId=${userId}`);
  return votes[0] ?? null;
};

export const createUserVote = (vote) =>
  request("/userVotes", {
    method: "POST",
    body: JSON.stringify(vote),
  });

export const getUserVotes = () => request("/userVotes");

export const deleteUserVote = (id) =>
  request(`/userVotes/${id}`, {
    method: "DELETE",
  });
