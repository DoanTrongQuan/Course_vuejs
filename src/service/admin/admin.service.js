import api from "../api.js";
import authHeader from '../auth-header.js';

const API_URL = 'http://localhost:8088/api/v1/users/';
const API_URL_COURSE ='http://localhost:8088/api/v1/course/';
const API_URL_POST = 'http://localhost:8088/api/v1/post/'


class AdminService {

  getAllUser(numberPageAndPageSize) {
    return api.get("/users/getAllUser", {
      params: {
        pageNumber: numberPageAndPageSize.page,
        limit: numberPageAndPageSize.usersPerPage,
      },
      headers: authHeader()
    }).then(response => {
      return response.data;
    });
  }

  getTotalUserCount(){
    return api.get('/users/total-user-count', { headers: authHeader() })
  }
  getTotalUserLocked() {
    return api.get('/users/total-user-locked', { headers: authHeader() })
  }
  getTotalCourseCount() {
    return api.get('/course/total-course-count', { headers: authHeader() })
  }
  getTotalPostCount() {
    return api.get('/post/total-post-count', { headers: authHeader()})
  }
  lockUser(userid) {
    return api.put('/users/lock-user', null, {
      params: { userID: userid },
      headers: authHeader()
    })
  }
  
  
}

export default  new AdminService();