import { commentsService } from "../services/CommentsService.js";
import BaseController from "../utils/BaseController.js";
import { Auth0Provider } from "@bcwdev/auth0provider";

export class CommentsController extends BaseController{
    constructor(){
        super('/api/comments')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createComment)
            .get('/:commentId', this.getCommentById)
            .delete('/:commentId', this.deleteComment)
    }

    async createComment(req, res, next){
        try {
            req.body.creatorId = req.userInfo.id
            const comment = await commentsService.createComment(req.body)
            return res.send(comment)
        } catch (error) {
            next(error)
        }
    }

    async getCommentById(req, res, next){
        try {
            const commentId = req.params.commentId
            const comment = await commentsService.getCommentById(commentId)
            return res.send(comment)
        } catch (error) {
            next(error)
        }
    }

    async deleteComment(req, res, next){
        try {
            const accountId = req.userInfo.id
            const commentId = req.params.commentId
            const comment = await commentsService.deleteComment(commentId, accountId)
            return res.send(comment)
        } catch (error) {
            next(error)
        }
    }
}