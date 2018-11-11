<template>
    <div v-if="!editing">
        <h1 v-text="question.title"></h1>
        <h1 v-text="question.body"></h1>

        <button id="edit" @click="edit">edit</button>
    </div>

    <div v-else>
        <input type="text" name="title" v-model="form.title">
        <textarea name="body" cols="30" rows="10" v-model="form.body"></textarea>
        <button id="update" @click="update">update</button>
        <button id="cancel" @click="cancel">cancel</button>
    </div>

</template>
<script>
    export default {
        props: ['dataQuestion'],
        data() {
            return {
                question: this.dataQuestion,
                form: {
                    title: this.dataQuestion.title,
                    body: this.dataQuestion.body,
                },
                editing: false,
            }
        },

        methods: {
            edit() {
                this.editing = true;
            },

            update(){
                this.question.title = this.form.title;
                this.question.body = this.form.body;
                this.editing = false;
            },

            cancel(){
                this.editing = false;
            }
        }
    }
</script>