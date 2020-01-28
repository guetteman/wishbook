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
                    <div class="flex mt-4 -mx-4">
                        <BookCover v-for="i in 10" :key="i"/>
                    </div>
                </div>
            </card>

            <div class="flex flex-wrap justify-between mt-10 md:-mx-4">
                <div class="w-full md:w-1/2 lg:w-1/3 md:px-4">
                    <card>
                        <div class="px-4 py-2">
                            <h2 class="text-gray-600 text-2xl">Upload your own book</h2>
                        </div>
                        <div class="p-4">
                            <p>content</p>
                        </div>
                    </card>
                </div>
                <div class="w-full mt-4 md:mt-0 md:w-1/2 lg:w-2/3 md:px-4">
                    <card class="overflow-hidden">
                        <div class="bg-gray-200 px-4 py-2">
                            <h2 class="text-gray-600 text-2xl">Your waitlist</h2>
                        </div>
                        <div class="p-4">
                            <p>content</p>
                        </div>
                    </card>
                </div>
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