
<template>
  <div v-if="appReady" class="min-h-full font-poppins box-border">
    <NavigationView/>
    <div>
      <input disabled v-model="currentDate" type="text">
    </div>
    <RouterView />
  </div>
</template>

<script>
import NavigationView from './components/NavigationView.vue';
import {ref} from "vue";
import { supabase } from './supabase/supabase';
import store from './store/index';
export default {
  components: {
    NavigationView
  },
  setup() {
    // Create data / vars
    const appReady = ref(null)
    const currentDateUnix = ref(null);
    const currentDate = ref(null);
    // Check to see if user is already logged in
    const user = supabase.auth.getUser();

    // If user does not exist, need to make app ready
    if (!user) {
      appReady.value = true;
      currentDateUnix.value = Date.now();
      currentDate.value = new Date(currentDateUnix.value);
    }

    // Runs when there is a auth state change
    // if user is logged in, this will fire

    supabase.auth.onAuthStateChange((_, session) => {
      console.log("hello");
      store.methods.setUser(session);
      appReady.value = true;
    })

    return {appReady};
  },
};

</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap");

</style>