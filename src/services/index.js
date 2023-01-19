import axios from 'axios'

export const fetchObjects = (startTime, endTime) => {
    return axios.get(`/get-images-resource?startTime=${startTime}&endTime=${endTime}`)
}
