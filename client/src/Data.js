// Adapted from the 'React Authentication' Treehouse course
const accessAPI = (path, method = 'GET', body = null, requiresAuth = false, credentials = null) => {
  const url = 'http://localhost:5000/api' + path;

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  };

  if (body !== null) {
    options.body = JSON.stringify(body);
  }

  if (requiresAuth) {
    const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
    options.headers['Authorization'] = `Basic ${encodedCredentials}`;
  }

  return fetch(url, options);
}

exports.getUser = async (username, password) => {
  const response = await accessAPI(`/users`, 'GET', null, true, { username, password });
  if (response.status === 200) {
    return response.json().then(data => data);
  }
  else if (response.status === 401) {
    return null;
  }
  else {
    throw new Error();
  }
}

exports.createUser = async (user) => {
  const response = await accessAPI('/users', 'POST', user);
  if (response.status === 201) {
    return [];
  }
  else if (response.status === 400) {
    return response.json().then(data => {
      return data.errors;
    });
  }
  else {
    throw new Error();
  }
}

exports.getCourses = async (id) => {
  const path = id ? `/courses/${id}` : '/courses';
  const response = await accessAPI(path, 'GET');
  if (response.status === 200) {
    return response.json().then(data => data);
  } else {
    throw new Error();
  }
}

exports.createCourse = async (course, username, password) => {
  const response = await accessAPI('/courses', 'POST', course, true, { username, password });
  if (response.status === 201) {
    return [];
  } else if (response.status === 401) {
    return [ 401 ];
  } else if (response.status === 400) {
    return response.json().then(data => {
      return data.errors;
    });
  } else {
    throw new Error();
  }
}

exports.updateCourse = async (id, course, username, password) => {
  const response = await accessAPI(`/courses/${id}`, 'PUT', course, true, { username, password });
  if (response.status === 204) {
    return [];
  } else if (response.status === 401) {
    return [ 401 ];
  } else if (response.status === 400) {
    return response.json().then(data => {
      return data.errors;
    });
  } else {
    throw new Error();
  }
}