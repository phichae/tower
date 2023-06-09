import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class EventsService{
    async createEvent(eventData) {
        const event = await dbContext.Events.create(eventData)
        await event.populate('ticketCount')
        return event
    }
    async getEventById(eventId) {
        const event = await dbContext.Events.findById(eventId).populate('ticketCount')
        if(!event) {
            throw new BadRequest(`Event at ${eventId} could not be found.`)
        }
        return event
    }
    async getEvents() {
        const events = await dbContext.Events.find().populate('ticketCount')
        return events
    }
    async editEvent(eventData, eventId, userId) {
        const originalEvent = await this.getEventById(eventId)
        if(originalEvent.creatorId != userId) {
            throw new Forbidden('You are not the creator of this event.')
        }
        if (originalEvent.isCanceled){
            throw new BadRequest('This event is cancelled.')
        }
        
        originalEvent.name = eventData.name || originalEvent.name
        originalEvent.description = eventData.description || originalEvent.name
        originalEvent.coverImg = eventData.coverImg || originalEvent.coverImg
        originalEvent.location = eventData.location || originalEvent.location
        originalEvent.capacity = eventData.capacity || originalEvent.capacity
        originalEvent.startDate = eventData.startDate || originalEvent.startDate
        originalEvent.type = eventData.type || originalEvent.type
        
        await originalEvent.save()
        return originalEvent
    }
    async cancelEvent(eventId, userId) {
        const event = await this.getEventById(eventId)
        if(event.creatorId != userId) {
            throw new Forbidden('You are not the creator of this event.')
        } 
        event.isCanceled = true
        event.save()
        return event
    }

    async getAccountEvents(userId){
        const events = await dbContext.Events.find({ creatorId: userId})
        return events
    }
    
}

export const eventsService = new EventsService()