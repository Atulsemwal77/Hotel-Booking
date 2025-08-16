import express from 'express'
import {protect} from "../middleware/authMiddleware.js"
import { checkAvailabilityAPI, createBooking, getHotelBookings, getUserBooking } from '../controllers/bookingsControllers.js'

const bookingRouter = express.Router()

bookingRouter.post('/check-availability' , checkAvailabilityAPI)
bookingRouter.post('/book' , protect , createBooking)
bookingRouter.get('/user' , protect , getUserBooking)
bookingRouter.get('/hotel' , protect , getHotelBookings)

export default bookingRouter;