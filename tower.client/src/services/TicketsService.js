import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TicketsService{

    async createTicket(eventId){
        const res = await api.post('api/tickets', { eventId })
        AppState.tickets.push(new Ticket(res.data))
        AppState.activeEvent.ticketCount++
        logger.log('[CREATING TICKET]', res.data)
    }

    async getTicketsByEventId(eventId){
        const res = await api.get(`api/events/${eventId}/tickets`)
        AppState.tickets = res.data.map(t => new Ticket(t))
        logger.log('[GETTING TICKETS FOR THIS EVENT]', res.data)
    }

    async getMyTickets(){
        const res = await api.get('account/tickets')
        logger.log(res.data)
        AppState.myTickets = res.data.map(t => new Ticket(t))
    }

    async deleteTicket(ticketId){
        const res = await api.delete(`api/tickets/${ticketId}`)
        AppState.myTickets.filter(t => t.id == ticketId)
    }
}

export const ticketsService = new TicketsService()