import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class CommentsService{
    async createComment(commentData) {
        const comment = await dbContext.Comments.create(commentData)
        await comment.populate('creator')
        return comment
    }
    async getCommentById(commentId) {
        const comment = await dbContext.Comments.findById(commentId).populate('creator')
        if(!comment){
            throw new BadRequest('This comment does not exist.')
        }
        return comment
    }
    async getEventComments(eventId) {
        const comments = await dbContext.Comments.find({ eventId }).populate('creator')
        return comments
    }
    async deleteComment(commentId, accountId) {
        const comment = await this.getCommentById(commentId)
        if(comment.creatorId != accountId){
            throw new Forbidden("This isn't your comment.")
        }
        await comment.remove()
        return comment
    }
    
}

export const commentsService = new CommentsService()