import axios from "axios";

export const fetchRtaData = () => axios.get("/api/rta-data");
