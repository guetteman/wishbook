<template>
    <div class="max-w-4xl mx-auto mt-20 px-4 lg:px-0">
        <card class="overflow-hidden">
            <div class="flex justify-between items-center px-4 py-2 bg-gray-200">
                <h2 class="text-gray-600 text-2xl">New Book</h2>
            </div>
            <div class="p-4">
                <div class="flex flex-wrap justify-center sm:justify-between">
<!--                    <BookCover />-->
                    <UploadCover v-model="bookCoverImg"/>

                    <div class="w-full sm:w-9/12">
                        <label class="block">
                            <span class="text-gray-700">Title</span>
                            <input v-model="newBook.title" class="form-input mt-1 block w-full" placeholder="A great book">
                        </label>
                        <label class="block mt-4">
                            <span class="text-gray-700">Sub-title</span>
                            <input v-model="newBook.subTitle" class="form-input mt-1 block w-full" placeholder="Just a new book that I want to read">
                        </label>
                    </div>
                </div>
                <label class="block mt-4">
                    <span class="text-gray-700">Author</span>
                    <input v-model="newBook.author" class="form-input mt-1 block w-full" placeholder="Jhon Doe">
                </label>
                <label class="block mt-4">
                    <span class="text-gray-700">Description</span>
                    <textarea v-model="newBook.description" class="form-textarea mt-1 block w-full" rows="5" placeholder="Enter some long form content."></textarea>
                </label>

                <div class="w-full flex mt-8 md:justify-end">
                    <button @click="create()" class="w-full px-4 py-2 rounded bg-indigo-500 hover:bg-indigo-700 md:w-auto">
                        <span class="text-indigo-100">Create</span>
                    </button>
                </div>
            </div>
        </card>
    </div>
</template>

<script>
import BookCover from '../../components/BookCover';
import UploadCover from "../../components/UploadCover";
import { createBook, uploadCoverImg } from "../../api/booksApi";

export default {
    components: {
        BookCover,
        UploadCover
    },

    data () {
        return {
            newBook: {},
            bookCoverImg: null
        }
    },

    methods: {
        async create () {
            try {
                const authTokenClaims = await this.$auth.getIdTokenClaims();
                const response = await createBook(authTokenClaims.__raw, this.newBook);
                await uploadCoverImg(response.signedUrl, this.bookCoverImg);

                await this.$router.push('/');
            } catch (e){
                console.log(e)
            }

        }
    }
}
</script>