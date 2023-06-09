<template>
    <div class="bg-dark">
        <div class="text-center">
            <Login />
        </div>
        <div class="text-center">
            <button v-if="user.id" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#createEvent"><i class="mdi mdi-plus"></i> New Event</button>
        </div>
    </div>

</template>


<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';

export default {
    setup(){
        return {
            user: computed(() => AppState.account),
            activeEvent: computed(() => AppState.activeEvent)
        }
    }
}
</script>


<style lang="scss" scoped>

</style>