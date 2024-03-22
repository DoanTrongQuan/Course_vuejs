import axios from 'axios';
import authHeader from './auth-header.js';

const API_URL = 'http://localhost:8088/api/v1/courseType/';

class PublicService {

  getTop3CourseType() {
    return axios.get(API_URL + 'top3CourseType')
  }
}

export default  new PublicService();