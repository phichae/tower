import { ticketsService } from "../services/TicketsService.js";
import BaseController from "../utils/BaseController.js";
import { Auth0Provider } from "@bcwdev/auth0provider";

export class TicketsController extends BaseController{
    constructor(){
        super('api/tickets')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .get('/:ticketId', this.getTicketById)
            .post('', this.createTicket)
            .delete('/:ticketId', this.deleteTicket)
    }

    async createTicket(req, res, next){
        try {
            req.body.accountId = req.userInfo.id
            const ticket = await ticketsService.createTicket(req.body)
            return res.send(ticket)
        } catch (error) {
            next(error)
        }
    }

    async getTicketById(req, res, next){
        try {
            const ticketId = req.params.ticketId
            const ticket = await ticketsService.getTicketById(ticketId)
            return res.send(ticket)
        } catch (error) {
            next(error)
        }
    }

    async deleteTicket(req, res, next){
        try {
            let accountId = req.userInfo.id
            const ticket = await ticketsService.deleteTicket(req.params.ticketId, accountId)
            return res.send(ticket)
        } catch (error) {
            next(error)
        }
    }
}