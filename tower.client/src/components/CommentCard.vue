<template>
<div class="col-10 my-3">
    <div class="row justify-content-center align-items-center">
        <div class="col-1 text-center">
            <img :src="comment.creator.picture" :alt="comment.creator.name" class="img-fluid rounded-circle">
            <p>{{ comment.creator.name }}</p>
        </div>
        <div class="col-9">
            <p>{{ comment.body }}</p>
        </div>
        <div class="col-1">
            <button v-if="comment.creatorId == user.id"  class="btn btn-outline-danger" @click="deleteComment(comment.id)"><i class="mdi mdi-delete-outline"></i></button>
        </div>
    </div>

</div>

</template>


<script>

import { computed } from '@vue/reactivity';
import { Account } from '../models/Account.js';
import { Comment } from '../models/Comment.js';
import { commentsService } from '../services/CommentsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
export default {
    props: {
        comment: { type: Comment, required: true},
    },
    setup(){
        return {

            user: computed(()=> AppState.user),

            async deleteComment(commentId){
                try {
                    if(await Pop.confirm()){
                        await commentsService.deleteComment(commentId)
                    }

                } catch (error) {
                    logger.log(error)
                    Pop.toast(error.message, 'error')
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped>

</style>