<template>
    <div>
        <div class="flex-shrink-0" :class="[sm ? 'w-20' : 'w-32']">
            <div class="relative" :class="[sm ? 'py-16' : 'py-24']">
                <img class="absolute z-0 inset-0 h-full rounded-lg object-cover border" :src="getCoverUrl()" alt="book">
                <div class="absolute z-10 inset-0 background"></div>
                <span class="absolute z-20 top-0 p-2 text-indigo-100">{{ book.title_suggest }}</span>
                <button @click="create()" class="relative z-20 w-full px-4 py-2 bg-gray-900 hover:bg-indigo-500">
                    <span class="text-indigo-100">Add</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import {createBook, uploadCoverImg} from "../api/booksApi";

    export default {
    props: {
        sm: {
            type: Boolean,
            default: false
        },
        book: {
            type: Object,
            default: {}
        }
    },

    data () {
        return {
            coverBaseUrl: 'http://covers.openlibrary.org/b/olid/'
        };
    },

    methods: {
        async create () {
            const newBook = {
                title: this.book.title_suggest,
                subTitle: this.book.title_suggest,
                description: this.book.title_suggest,
                author: this.book.author_name[0],
                coverImgUrl: this.getCoverUrl()
            };

            try {
                const authTokenClaims = await this.$auth.getIdTokenClaims();
                const response = await createBook(authTokenClaims.__raw, newBook);
                await this.$router.push('/');
            } catch (e){
                console.log(e)
            }
        },

        getCoverUrl () {
            return this.coverBaseUrl + this.book.edition_key[0] + '-M.jpg'
        }
    }
}
</script>

<style>
    .background {
        background-color: rgba(0, 0, 0, 0.4);
    }
</style>