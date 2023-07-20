<template>
    <div class="max-w-screen-sm mx-auto px-4 py-10">
        <!-- Status message -->
        <div v-if="statusMsg || errorMsg" class="mb-10 p-4 bg-light-grey rounded-md shadow-lg" >
            <p class="text-at-light-green">
                {{ statusMsg }}
            </p>
            <p class="text-red-500">
                {{ errorMsg }}
            </p>
        </div>
        <!-- Consent write up -->
        <div class=" max-w-screen-sm mx-auto px-4 py-10">
            <h2 class="text-2xl">Consent</h2>
            <h3 class="text-2xl">Read out the consent and click on the check boxes below</h3>
            <p class="text-xl">Thank you for agreeing to do this questionnaire with us today.
                We’re going to work through the questions together to help you to figure out if you could benefit from any support and how best we can help with it.
                There might be some questions or areas you haven’t thought about before but as we ask them you might realise you could do with some help in that area. That’s totally fine and quite normal, the questionnaire is designed to identify all areas of need, including things you perhaps hadn’t considered before.
                There might be some questions that aren’t relevant to you; that’s ok too, you can just say it’s not relevant to you and we’ll just move on from those.
                Hopefully by the end we will have looked at every area of your life and you will have a full picture of the help you might benefit from. We will then support you to access the available help.
                We can’t guarantee that there will always be support for each area that is identified, but we will always do our best to find out what is available.
                You are in control of this process, you can stop the need assesment at any time and if there are any questions you don’t want to answer, just tell us and we can move on to the next one.
                These answers are kept securely, and we never share them or connect you to other places without your consent.
            </p>
        </div>
        <!-- Personal Consent-question -->
        <div class="p-8 flex bg-light-grey rounded-md shadow-lg">
            <form @submit.prevent="recordPersonals" class="flex flex-col gap-y-5 w-full">
                <div class="flex flex-col">
                 <p class="text-2xl text-at-light-green">Are you happy to proceed with the needs assesment and allow us to stoe and use your information as described</p>
                 <p class="text-2xl text-at-light-green"></p>
                 <select @change="choiceChange" id="consent-choice" class="p-2 text-gray-500 focus:outline-none" required v-model="consentChoice">
                    <option value="select-choice">Choose your choice</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                 </select>
                </div>
             

                <!-- Personal details form -->
                <div v-if="consentChoice === 'yes' " class="max-w-screen-sm mx-auto px-4 py-10"  >
                    <div class="gap-y-2 relative" v-for="(item, index) in personals"
                        :key="index">
                        <h1 class="text-3xl text-at-light-green mb-4">Personal details</h1>

                        <div class="flex flex-col mb-2">
                            <label for="firstName" class="mb-1 text-sm text-at-light-green">First Name</label>
                            <input type="text" required class="p-2 w-full text-gray-500 focus:outline-none"  v-model="item.firstName">
                        </div>
                        <div class="flex flex-col mb-2">
                            <label for="lastName" class="mb-1 text-sm text-at-light-green">Last Name</label>
                            <input type="text" required class="p-2 text-gray-500 focus:outline-none"  v-model="item.lastName">
                        </div>
                        <div class="flex flex-col mb-2">
                            <label for="email" class="mb-1 text-sm text-at-light-green">Email</label>
                            <input type="email" required class="p-2 text-gray-500 focus:outline-none" v-model="item.email">
                        </div>
                        <div class="flex flex-col mb-2">
                            <label for="phoneNumber" class="mb-1 text-sm text-at-light-green">Phone number</label>
                            <input type="text" required class="p-2 text-gray-500 focus:outline-none"  v-model="item.phoneNumber">
                        </div>
                        <div class="flex flex-col mb-2">
                            <label for="address" class="mb-1 text-sm text-at-light-green">Address</label>
                            <input type="text" required class="p-2 text-gray-500 focus:outline-none"  v-model="item.address">
                        </div>
                        <div class="flex flex-col mb-2">
                            <label for="adultCount" class="mb-1 text-sm text-at-light-green">Number of adults in household(18 and over)</label>
                            <input type="text" required class="p-2 text-gray-500 focus:outline-none"  v-model="item.adultsCount">
                        </div>
                        <div class="flex flex-col mb-2">
                            <label for="childrenCount" class="mb-1 text-sm text-at-light-green">Number of children in household (under 18)</label>
                            <input type="text" required class="p-2 text-gray-500 focus:outline-none"  v-model="item.childrenCount">
                        </div>
                        <div class="flex flex-col mb-2">
                            <label for="dependantsCount" class="mb-1 text-sm text-at-light-green">Number of additional dependants</label>
                            <input type="text" required class="p-2 text-gray-500 focus:outline-none"  v-model="item.dependantsCount">
                        </div>
                    </div>
                     <button  type="submit" class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-200 
                        border-solid border-2-transparent hover:border-at-light-green hover:bg-white hover:text-at-light-green" >
                        Proceed
                    </button>   
                </div> 
                
           </form>
        </div>
 </div>
    
</template>

<script>
import {useRouter} from "vue-router";
import {ref} from "vue";
import {uid} from "uid";
import { supabase } from "../supabase/supabase";
export default {
    name: "PersonalView",
    setup() {

        // create variables 
        const router = useRouter();
        const consentChoice = ref("select-choice");
        const statusMsg = ref(null);
        const errorMsg = ref(null);
        const personals =ref([]);
        


        // check choice of consent form and display personal details if Yes
        const fillPersonal = () => {
            if (consentChoice.value === 'yes') {
                personals.value.push({
                        id: uid(),
                        firstName: "",
                        lastName: "",
                        email: "", 
                        phoneNumber: "", 
                        address: "",
                        adultsCount: "", 
                        childrenCount: "",
                        dependantsCount: ""  
                });
                return;
            }

        } 
        
        // Listens for changes in the consent choice
        const choiceChange = () => {
            personals.value = [];
            fillPersonal();
           }

        // Record the personal details
        const recordPersonals = async () => {
            try{
                const {error} = await supabase.from("clients").insert([
                {
                personals:personals.value,
                }
                ]);
                if (error) throw error;
                router.push({name: 'Financial'});
                statusMsg.value = 'success: personal details submitted!'
                personals.value =[];
                setTimeout(() =>{
                statusMsg.value = false;
                }, 5000)
            } catch(error) {
                errorMsg.value = `Error:${error.message}`;
                setTimeout(() =>{
                errorMsg.value = false;
                }, 5000)
            }
        }

     

      return { errorMsg, consentChoice, personals, statusMsg, choiceChange, fillPersonal, recordPersonals}
    }


      
}

</script>

<style>

</style>