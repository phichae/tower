
export class Comment {
    constructor(data){
        this.body = data.body
        this.id = data.id
        this.creatorId = data.creatorId
        this.eventId = data.eventId
        this.creator = data.creator
    }
}