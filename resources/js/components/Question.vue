<template>
    <div>
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

        <p v-if="feedback" v-text="feedback"></p>
    </div>
</template>
<script>
    import axios from 'axios';

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
                feedback: '',
            }
        },

        methods: {
            edit() {
                this.editing = true;
            },

            update(){
                this.editing = false;

                axios.post('/questions/1', this.form)
                    .then(response => {
                        this.question.title = response.data.title;
                        this.question.body = response.data.body;
                        this.feedback = "Updated!";
                    });
            },

            cancel(){
                this.editing = false;
            }
        }
    }
</script>