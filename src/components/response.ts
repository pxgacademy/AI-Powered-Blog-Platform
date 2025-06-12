//

const api_response = (success: boolean, message: string, status: number) => {
  return Response.json({ success, message }, { status });
};

export default api_response;
