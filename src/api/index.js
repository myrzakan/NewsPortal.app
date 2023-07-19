// import axios from "axios";

// const BASE_URL = 'http://127.0.0.1:8090'

// export const pb = axios.create({
//   baseURL: `${BASE_URL}/api/collections`,
// })

import PocketBase from 'pocketbase'

export const pb = new PocketBase('http://127.0.0.1:8090')