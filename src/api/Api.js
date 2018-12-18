export const apiGetRequest = ApiGet => route => {
  return ApiGet.get(route);
};

export const apiPostRequest = ApiPost => (route, data) => {
  return ApiPost.post(route, data);
};

export const apiPutRequest = ApiPut => (route, data) => {
  return ApiPut.put(route, data);
};
