<template>
    <div class="pb-10">
        <div class="bg-white">
            <div class="pt-20 pb-32">
                <h1 class="text-center text-gray-600 text-6xl"><span class="text-indigo-500">Wish</span>Book</h1>
                <h2 class="text-center text-gray-600 text-2xl">Create your waitlist and check it wherever you go</h2>
            </div>
        </div>

        <div v-if="$auth.isAuthenticated" class="max-w-4xl mx-auto px-4 lg:px-0">
            <card class="-mt-20 p-4">
                <label class="block">
                    <input v-model="query" @input="searchForOpenBooks()" class="form-input block w-full" placeholder="Search for a new book...">
                </label>

                <div class="px-4 overflow-x-auto">
                    <div class="flex mt-4 -ml-12">
                        <AddCover v-for="book in openBooks" :key="book.cover_edition_key" :book="book" class="pl-8"/>
                    </div>
                </div>
            </card>

            <div class="w-full mt-10">
                <card class="overflow-hidden">
                    <div class="flex justify-between items-center px-4 py-2 bg-gray-200">
                        <h2 class="text-gray-600 text-2xl">Your waitlist</h2>
                        <router-link to="/books/create" class="text-indigo-500 hover:underline">New Book</router-link>
                    </div>
                    <Waitlist />
                </card>
            </div>
        </div>

        <div v-if="!$auth.isAuthenticated" class="max-w-4xl mx-auto px-4 lg:px-0">
            <div class="w-full flex mt-8 justify-center">
                <button @click="login()" class="w-full px-4 py-2 rounded bg-indigo-500 hover:bg-indigo-700 md:w-auto">
                    <span class="text-indigo-100">Login</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import Waitlist from "../components/Waitlist";
import {search} from "../api/openBookApi";
import AddCover from "../components/AddCover";

export default {
    components: {
        AddCover,
        Waitlist
    },

    data () {
        return {
            query: '',
            openBooks: [],
            timer: null,
        };
    },

    methods: {
        async searchForOpenBooks() {
            if (this.timer) clearTimeout(this.timer);

            this.timer = setTimeout(async () => {

                this.openBooks = await search(this.query);
                console.log(this.openBooks);

            }, 500);
        },

        login () {
            this.$auth.loginWithRedirect();
        },
    }
}
</script>