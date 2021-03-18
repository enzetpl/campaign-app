import axios from "axios";

const API_URL = 'https://salty-spire-26306.herokuapp.com/api/campaigns'

class CampaingsDataService {

    getAllCampaigns() {
        return axios.get(API_URL);
    }
    getCampaign(id) {
        return axios.get(`${API_URL}/${id}`);
    }
    saveCampaign(data) {
         return axios.post(API_URL, data);
    }
    updateCampaign(id, data) {
        return axios.put(`${API_URL}/${id}`, data);
    }
    deleteCampaign(id) {
        return axios.delete(`${API_URL}/${id}`);
    }
}

export default new CampaingsDataService();