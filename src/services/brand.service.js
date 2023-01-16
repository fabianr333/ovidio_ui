import http from "../http-common";

class BrandDataService {
    
  getAll() {
    return http.get("/brands/");
  }

}

export default new BrandDataService();