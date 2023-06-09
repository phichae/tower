import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { eventsService } from "../services/EventsService.js";
import { ticketsService } from "../services/TicketsService.js";
import { commentsService } from "../services/CommentsService.js";

export class EventsController extends BaseController{
    constructor(){
        super('api/events')
        this.router
            .get('/:eventId', this.getEventById)
            .get('', this.getEvents)
            .get('/:eventId/tickets', this.getEventTickets)
            .get('/:eventId/comments', this.getEventComments)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createEvent)
            .put('/:eventId', this.editEvent)
            .delete('/:eventId', this.cancelEvent)
    }

    async createEvent(req, res, next){
        try {
            req.body.creatorId = req.userInfo.id
            const event = await eventsService.createEvent(req.body)
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }
    async getEventById(req, res, next){
        try {
            const event = await eventsService.getEventById(req.params.eventId)
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }

    async getEvents(req, res, next){
        try {
            const events = await eventsService.getEvents()
            return res.send(events)
        } catch (error) {
            next(error)
        }
    }

    async editEvent(req, res, next){
        try {
            const eventData = req.body
            const userId = req.userInfo.id
            const eventId = req.params.eventId
            const editedEvent = await eventsService.editEvent(eventData, eventId, userId)
            return res.send(editedEvent)
        } catch (error) {
            next(error)
        }
    }

    async cancelEvent(req, res, next){
        try {
            const event = await eventsService.cancelEvent(req.params.eventId, req.userInfo.id)
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }

    async getEventTickets(req, res, next){
        try {
            const tickets = await ticketsService.getEventTickets(req.params.eventId)
            return res.send(tickets)
        } catch (error) {
            next(error)
        }
    }

    async getEventComments(req, res, next){
        try {
            const eventId = req.params.eventId
            const comments = await commentsService.getEventComments(eventId)
            return res.send(comments)
        } catch (error) {
            next(error)
        }
    }
}