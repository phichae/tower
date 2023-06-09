
import { AppState } from "../AppState.js"
import { Event } from "../models/Event.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class EventsService {

    async createEvent(eventData){
        const res = await api.post('api/events', eventData)
        return res.data
    }
    async getAllEvents(){
        const res = await api.get('api/events')
        AppState.events = res.data.map(e => new Event(e))
    }

    async getMyEvents(){
        const res = await api.get('account/events')
        AppState.myEvents = res.data.map(e => new Event(e))
    }

    async getEventById(eventId){
        const res = await api.get(`api/events/${eventId}`)
        AppState.activeEvent = new Event(res.data)
        logger.log(AppState.activeEvent)
    }

    async cancelEvent(eventId){
        const res = await api.delete(`api/events/${eventId}`)
        logger.log('[CANCELLING EVENT]', res.data)
        AppState.activeEvent.isCanceled = true
    }
}

export const eventsService = new EventsService()