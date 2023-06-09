<template>
  <section class="row p-5">
    <div class="col-12">
      <p>My Events:</p>
    </div>
    <div class="col-md-3 py-3" v-for="e in myEvents" :key="e.id">
      <EventCard :event="e"/>
    </div>
  </section>
  <section class="row p-5">
    <div class="col-12">
      <p>My Tickets:</p>
      <section class="row" v-for="t in myTickets" :key="t.id">
        <div class="col-12">
          <div class="row card p-3">
            <div class="col-10">
              <h4>TICKET</h4>
              <p>{{ t.event.name }}</p>
            </div>
            <div class="col-2 align-content-center">
              <button class="btn btn-outline-danger" @click="deleteTicket(t.id)"><i class="mdi mdi-delete"></i></button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import EventCard from '../components/EventCard.vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { ticketsService } from '../services/TicketsService.js';
import { eventsService } from '../services/EventsService.js';
export default {
    setup(){
      async function getMyTickets(){
        try {
          await ticketsService.getMyTickets() 
        } catch (error) {
          logger.log(error)
          Pop.toast(error.message, 'error')
        }
      }

      async function getMyEvents(){
        try {
          await eventsService.getMyEvents()
        } catch (error) {
         logger.log(error)
         Pop.toast(error.message, 'error') 
        }
      }


      onMounted(() => {
        getMyTickets()
        getMyEvents()
      })
        return {
            account: computed(() => AppState.account),
            myEvents: computed(() => AppState.myEvents),
            myTickets: computed(() => AppState.myTickets),

            async deleteTicket(ticketId){
              try {
                await ticketsService.deleteTicket(ticketId)
              } catch (error) {
                logger.log(error)
                Pop.toast(error.message, 'error')
              }
            }
        };
    },
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
