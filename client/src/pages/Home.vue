<template>
    <div>
        <div class="bg-white">
            <div class="pt-20 pb-32">
                <h1 class="text-center text-gray-600 text-6xl"><span class="text-indigo-500">Wish</span>Book</h1>
                <h2 class="text-center text-gray-600 text-2xl">Create your waitlist and check it wherever you go</h2>
            </div>
        </div>

        <div class="max-w-4xl mx-auto px-4 lg:px-0">
            <card class="-mt-20 p-4">
                <label class="block">
                    <input class="form-input block w-full" placeholder="Search for a new book...">
                </label>

                <div class="px-4 overflow-x-auto">
                    <div class="flex mt-4 -ml-12">
                        <BookCover v-for="i in 10" :key="i" class="pl-8"/>
                    </div>
                </div>
            </card>

            <div class="w-full mt-10">
                <card class="overflow-hidden">
                    <div class="flex justify-between items-center px-4 py-2 bg-gray-200">
                        <h2 class="text-gray-600 text-2xl">Your waitlist</h2>
                        <router-link to="/books/create" class="text-indigo-500 hover:underline">New Book</router-link>
                    </div>
                    <div v-for="i in 10" :key="i">
                        <div class="flex justify-start p-4">
                            <BookCover sm/>
                            <div class="pl-4">
                                <h4 class="block text-xl text-indigo-500">Harry Potter sd sahsas skjhas </h4>
                                <span class="block text-gray-600">Phoenyx order</span>
                                <span class="text-gray-600">by</span> <span class="text-indigo-500">J. K. Rowling</span>
                                <button class="block mt-2 px-4 py-1 bg-red-100 rounded">
                                    <span class="text-red-500 hover:text-red-700">Delete</span>
                                </button>
                            </div>
                        </div>
                        <hr class="border" />
                    </div>
                </card>
            </div>
        </div>
    </div>
</template>

<script>
import BookCover from '../components/BookCover';

export default {
    components: {
        BookCover
    }
}
</script>