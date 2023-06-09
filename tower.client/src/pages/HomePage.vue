<template>
  <div class="container-fluid bg-dark">
    <section class="row justify-content-center">
      <div class="col-10">

        <section class="row">
          <div class="col-12 text-center">
            <img class="img-fluid my-3" src="../assets/img/unsplash_kcJsQ3PJrYU.png">
          </div>
        </section>

        <section class="row justify-content-center pb-2">
          <div class="col-10 d-flex justify-content-around">
            <button @click="filterBy= ''" class="btn btn-outline-light">ALL</button>
            <button @click="filterBy= 'concert'" class="btn btn-outline-light">CONCERT</button>
            <button @click="filterBy= 'convention'" class="btn btn-outline-light">CONVENTION</button>
            <button @click="filterBy= 'sport'" class="btn btn-outline-light">SPORT</button>
            <button @click="filterBy= 'digital'" class="btn btn-outline-light">DIGITAL</button>
          </div>
        </section>

        <section class="row px-5">
          <div class="col-md-3 py-3" v-for="e in events" :key="e.id">
            <EventCard :event="e" />
          </div>
        </section>

      </div>
    </section>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import Pop from '../utils/Pop.js';
import { eventsService } from '../services/EventsService.js'
import { AppState } from '../AppState.js';
import { computed } from '@vue/reactivity';

export default {
  setup() {
    const filterBy = ref('')

    async function getAllEvents(){
      try {
        await eventsService.getAllEvents()
      } catch (error) {
        Pop.error(error)
      }
    }
    onMounted(()=> getAllEvents())
    return {
      filterBy,
      events: computed(() => {
        if(filterBy.value == "") {
          return AppState.events
        } else {
          return AppState.events.filter(e => e.type == filterBy.value)
          }
        })
      }
    }
  }


</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}

  .nav-bar{

  }
</style>
