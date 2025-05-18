import axios from 'axios';

const axiosPublic = axios.create({
    baseURL: "https://one-drop-server-navy.vercel.app"
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;