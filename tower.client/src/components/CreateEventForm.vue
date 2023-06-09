<template>
    <div class="modal-content bg-dark text-black">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="createEvent">Create Event</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <!-- SECTION form -->
        <form @submit.prevent="createEvent()">
            <div class="modal-body">
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingInput" placeholder="Event Title"
                        v-model="editable.name">
                    <label for="floatingInput">Event Name</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingPassword" placeholder="Cover Image"
                        v-model="editable.coverImg">
                    <label for="floatingPassword">Cover Image</label>
                </div>
                <div class="text-black form-floating mb-3">
                    <select class="form-control" name="type" id="type" v-model="editable.type">
                        <option value="concert">Concert</option>
                        <option value="convention">Convention</option>
                        <option value="sport">Sport</option>
                        <option value="digital">Digital</option>
                    </select>
                    <label for="floatingPassword">Type</label>
                </div>
                <div class="form-floating mb-3">
                    <input  class="form-control" type="number" id="quantity" name="quantity" min="1" v-model="editable.capacity">
                    <label for="floatingPassword">Capacity</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingPassword" placeholder="Location" v-model="editable.location">
                    <label for="floatingPassword">Location</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="date" class="form-control" id="floatingPassword" placeholder="Date" v-model="editable.startDate">
                    <label for="floatingPassword">Date</label>
                </div>
                <div class="form-floating mb-3">
                    <textarea class="form-control" id="floatingPassword" placeholder="Description" v-model="editable.description" cols="20" rows="5"></textarea>
                    <label for="floatingPassword">Description</label>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary">Create Event</button>
            </div>
            
        </form>

    </div>
</template>


<script>
import Pop from '../utils/Pop.js';
import { ref } from 'vue'
import { Modal } from 'bootstrap';
import { useRouter } from 'vue-router';
import { eventsService } from '../services/EventsService.js';

export default {
    setup(){
        const editable = ref({})
        const router = useRouter()

        
        return {
            editable,
            async createEvent(){
                try {
                    const formData = editable.value
                    const newEvent = await eventsService.createEvent(formData)
                    Modal.getOrCreateInstance('#createEvent').hide()
                    editable.value = {}
                    router.push({ name: 'EventDetails', params: { eventId: newEvent.id }})
                } catch (error) {
                    Pop.toast(error)
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped>

#text-black{
    color: black;
}   

</style>