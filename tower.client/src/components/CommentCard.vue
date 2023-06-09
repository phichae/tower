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
    </div>

</div>

</template>


<script>

import { Comment } from '../models/Comment.js';
export default {
    props: {
        comment: { type: Comment, required: true}
    },
    setup(){
        return {}
    }
}
</script>


<style lang="scss" scoped>

</style>