<template>
    <div v-if="event">
        <div class="container-fluid">
            <section class="row">
                <div class="col-12 p-4 d-flex justify-content-between">
                    <h2>{{ event.name }}</h2>
                    <button @click="cancelEvent()" class="btn btn-outline-danger">Cancel Event</button>
                </div>
                <div class="col-md-4 p-4">
                    <img class="img-fluid rounded" :src="event.coverImg" :alt="event.name">
                </div>
                <div class="col-md-8">
                    <div class="row pt-4">
                        <p>{{ event.description }}</p>
                        <h4>LOCATION: </h4>
                        <p>{{ event.location }}</p>
                    </div>
                    <div class="text-end">
                        <p>{{  }}</p>
                        <button v-if="!hasTicket && !event.isCanceled || availableTickets == 0" @click="createTicket()" class="btn btn-outline-light">GET TICKET</button>
                        <p class="text-danger" v-if="event.isCanceled">EVENT IS CANCELLED</p>
                    </div>
                </div>
            </section>

            <section class="row justify-content-center">
                <div class="col-10">
                    <h3>Tickets:</h3>
                    <div class="row">
                        <div class="col-1 text-center" v-for="t in tickets" :key="t.id">
                            <img :src="t.profile.picture" :alt="t.profile.name" class="ticket-img rounded-circle img-fluid">
                            <p>{{ t.profile.name }}</p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="row justify-content-center">
                <div class="col-10">
                    <h3>Comments:</h3>
                    <div class="col-12" v-for="c in comments">
                        <CommentCard :comment="c"/>
                    </div>

                </div>

            </section>
        </div>
    </div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { eventsService } from '../services/EventsService.js';
import { ticketsService } from '../services/TicketsService.js'
import { commentsService } from '../services/CommentsService.js'
export default {
    setup(){
        const route = useRoute()

        async function getEventById() {
            try {
                const eventId = route.params.eventId
                await eventsService.getEventById(eventId)
            } catch (error) {
                logger.error(error)
                Pop.toast(error.message, 'error')
            }
        }

        async function getTicketsByEventId(){
            try {
                const eventId = route.params.eventId
                await ticketsService.getTicketsByEventId(eventId)
            } catch (error) {
                logger.error(error)
                Pop.toast(error.message, 'error')
            }
        }

        async function getCommentsByEventId(){
            try {
                const eventId = route.params.eventId
                await commentsService.getCommentsByEventId(eventId)
            } catch (error) {
                logger.log(error)
                Pop.toast(error.message, 'error')
            }
        }

        
        onMounted(()=> {
            getEventById()
            getTicketsByEventId()
            getCommentsByEventId()
        })
        return {
            event: computed(() => AppState.activeEvent),
            hasTicket: computed(() => AppState.tickets.find(t => t.accountId == AppState.user.id)),
            tickets: computed(() => AppState.tickets),
            user: computed(() => AppState.user),
            comments: computed(() => AppState.comments),
            availableTickets: computed(() => AppState.activeEvent.capacity - AppState.activeEvent.ticketCount),
            async createTicket() {
                try {
                    const eventId = route.params.eventId
                    await ticketsService.createTicket(eventId)
                } catch (error) {
                    logger.error(error)
                    Pop.toast(error.message, 'error')
                }
            },

            async cancelEvent(){
                try {
                    if (await Pop.confirm()){
                        await eventsService.cancelEvent(route.params.eventId)
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



    .ticket-img{
        height: 5vh;
        width: 5vh;
        object-fit: cover;
        aspect-ratio: 1/1;
    }

</style>