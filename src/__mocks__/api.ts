const api = {
  get: async (url: string) => {
    if (url.startsWith("/users?")) {
      return { data: { users: [] } };
    }
    if (url.startsWith("/users/")) {
      const id = Number(url.split("/").pop());
      return { data: { id, todo: "", completed: false, userId: id } };
    }
    return { data: {} };
  },
  post: async () => ({ data: {} }),
  put: async () => ({ data: {} }),
  delete: async () => ({ data: {} }),
};

export default api;
