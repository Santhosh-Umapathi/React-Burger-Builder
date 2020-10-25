import axios from 'axios'

const instance = axios.create({

	baseURL:'https://react-burger-builder-49c67.firebaseio.com/'
})

export default instance