import axios from 'axios'

// const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY

const instance = axios.create({

	baseURL:"https://react-burger-builder-49c67.firebaseio.com"
})

export default instance