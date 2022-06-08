import http from "../http-common";

class CompendiumDataService {
  getAll() {
    return http.get(`http://127.0.0.1:5000/compendium`);
  }

  get(id) {
    return http.get(`http://127.0.0.1:5000/compendium/${id}`);
  }
  
  create(data) {
    return http.post(`http://127.0.0.1:5000/compendium`, data);
  }

  update(id, data) {
    return http.put(`http://127.0.0.1:5000/compendium/${id}`, data);
  }

  delete(id) {
    return http.delete(`http://127.0.0.1:5000/compendium/${id}`);
  }

  deleteAll() {
    return http.delete("http://127.0.0.1:5000/compendium");
  }

  findByTitle(customerName) {
    return http.get(`http://127.0.0.1:5000/compendium?customer_name=${customerName}`);
  }
}
export default new CompendiumDataService();