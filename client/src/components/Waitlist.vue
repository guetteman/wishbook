<template>
    <div>
        <div v-for="book in books" :key="book.bookId" class="flex justify-start p-4">
            <BookCover sm :url="book.coverImgUrl"/>
            <div class="pl-4">
                <h4 class="block text-xl text-indigo-500">{{ book.title }}</h4>
                <span class="block text-gray-600">{{ book.subTitle }}</span>
                <span class="text-gray-600">by</span> <span class="text-indigo-500">{{ book.author }}</span>
                <button @click="deleteBook(book.bookId)" class="block mt-2 px-4 py-1 bg-red-100 rounded">
                    <span class="text-red-500 hover:text-red-700">Delete</span>
                </button>
            </div>
        </div>
        <hr class="border" />
    </div>
</template>

<script>
    import BookCover from "./BookCover";
    import {getBooks, deleteBook} from "../api/booksApi";

    export default {
        components: {
            BookCover
        },

        data () {
            return {
                books: []
            }
        },

        async mounted() {
            await this.getBooks();
        },

        methods: {
            async getBooks () {
                const authTokenClaims = await this.$auth.getIdTokenClaims();

                this.books = await getBooks(authTokenClaims.__raw);
            },

            async deleteBook (bookId) {
                const authTokenClaims = await this.$auth.getIdTokenClaims();

                await deleteBook(authTokenClaims.__raw, bookId);

                this.books = this.books.filter(book => book.bookId !== bookId);
            }
        }
    }
</script>