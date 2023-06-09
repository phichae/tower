<template>
  <div class="bg-dark d-flex">
    <header>
    </header>
    <main class="container-fluid">
      <section class="row justify-content-center">
        <div class="col-11">
          <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
            <div class="d-flex flex-column align-items-center m-3">
              <img alt="logo" src="./assets/img/Logo.png" height="45" />
            </div>
          </router-link>
          <router-view />
        </div>
        <div class="col-1">
          <Sidebar />
        </div>
      </section>
    </main>
  </div>


  <Modal id="createEvent">
    <CreateEventForm />
  </Modal>
  
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, Sidebar }

}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

body{
  background-color: #141926;
}

:root{
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
