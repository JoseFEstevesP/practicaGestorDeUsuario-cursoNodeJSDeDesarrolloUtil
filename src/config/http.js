import {createServer} from 'http'
import app from '#Config/express.js'
const httpServer =  createServer(app)
export default httpServer