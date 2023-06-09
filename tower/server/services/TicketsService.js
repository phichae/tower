import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TicketsService{
    async createTicket(ticketData) {
        const ticket = await dbContext.Tickets.create(ticketData)
        await ticket.populate('event profile')
        return ticket
    }
    async getTicketById(ticketId) {
        const ticket = await dbContext.Tickets.findById(ticketId)
        return ticket
    }
    async getAccountTickets(accountId) {
        const tickets = await dbContext.Tickets.find({ accountId }).populate('event')
        return tickets
    }
    async getEventTickets(eventId) {
        const tickets = await dbContext.Tickets.find({ eventId }).populate('profile')
        return tickets
    }
    async deleteTicket(ticketId, accountId) {
        const ticket = await this.getTicketById(ticketId)
        if(!ticket){
            throw new BadRequest('This ticket does not exist.')
        }
        if(accountId != ticket.accountId) {
            throw new Forbidden('This is not your ticket.')
        }
        await ticket.remove()
        return ticket
    }
}

export const ticketsService = new TicketsService()