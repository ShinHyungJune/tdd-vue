<template>
    <div>
        <input class="new-reminder" v-model="newReminder">
        <button @click="add">Add Reminder</button>

        <ul v-if="reminders.length !== 0">
            <li v-for="reminder in reminders" :key="reminder">
                {{reminder}}

                <button class="delete" @click="remove(reminder)">remove</button>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                reminders: [],
                newReminder: '',
            };
        },

        methods: {
            add() {
                this.reminders.push(this.newReminder);

                this.newReminder = '';
            },

            remove(reminder) {
                this.reminders.splice(reminder, 1);
            }
        }
    }
</script>