import {mount} from 'vue-test-utils';
import expect from 'expect';
import Reminders from '../../resources/js/components/Reminders.vue';

describe('Reminders', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(Reminders);
    });

    it('hides the remidners list if there are none', ()=>{
        expect(reminderList).toBe(false);
    });

    it ('can add reminders', ()=>{
        addReminder('Go to the store');

        expect(reminderList).toContain('Go to the store');
    });

    it('can remove any reminder', () => {
        addReminder('Go to the store');
        addReminder('Finish screencast');

        let deleteButton = wrapper.find('ul > li:first-child .delete');

        deleteButton.trigger('click');

        expect(reminderList).not.toContain('Go to the store');
        expect(reminderList).toContain('Finish screencast');
    });

    function addReminder(body) {
        let newReminder = wrapper.find('.new-reminder');

        newReminder.element.value = body;
        newReminder.trigger('input');

        wrapper.find('button').trigger('click');
    }

    function reminderList() {
        return wrapper.find('ul').text();
    }
});