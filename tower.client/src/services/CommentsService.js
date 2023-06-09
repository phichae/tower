import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class CommentsService{

    async getCommentsByEventId(eventId){
        const res = await api.get(`api/events/${eventId}/comments`)
        logger.log('[GETTING COMMENTS]', res.data)
        AppState.comments = res.data.map(c => new Comment(c))
    }

}

export const commentsService = new CommentsService()