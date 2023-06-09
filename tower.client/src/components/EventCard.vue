<template>
    <router-link :to="{ name: 'EventDetails', params: { eventId: event.id }}">
        <div v-if="event">
            <div class="event-card align-items-top">
            <p class="badge bg-dark">{{ event.name }}</p>
            </div>
        </div>
    </router-link>
</template>


<script>
import { computed } from '@vue/reactivity';
import { Event } from '../models/Event.js';

export default {

    props: {
        event: { type: Event, required: true }
    },
    setup(props){
        return {
            coverImg: computed(() => `url(${props.event?.coverImg})`)
        }
    }
}
</script>


<style lang="scss" scoped>

    .event-card{
        background-image: v-bind(coverImg);
        aspect-ratio: 1/1;
        height: 150px;
        min-width: 100%;
        background-size: cover;
        background-repeat: no-repeat;
        display: grid;
        place-content: center;
    }
</style>