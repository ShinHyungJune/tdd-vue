import { mount } from 'vue-test-utils';
import expect from 'expect';
import Question from '../../resources/js/components/Question.vue';

describe('Question', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(Question, {
            propsData: {
                dataQuestion: {
                    title: 'The title',
                    body: 'The body',
                }
            }
        });
    });

    it ('presents the title and the body', () => {
        // 매번 아래처럼 쓰기 겁나 기니까 see 함수를 따로 만들고, helper.js같은데다 넣어놓고 쓰면 편할 듯
        see('The title');
        see('The body');
        /*expect(wrapper.html()).toContain('The title');
        expect(wrapper.html()).toContain('The body');*/
    });

    it('can be edited', ()=>{
        expect(wrapper.contains('input[name=title]')).toBe(false);

        click('#edit');
        /*wrapper.find('#edit').trigger('click');*/

        expect(wrapper.find('input[name=title]').element.value).toBe('The title');
        expect(wrapper.find('textarea[name=body]').element.value).toBe('The body');
    });

    it ('hides the edit button during edit mode', () => {
        expect(wrapper.contains('#edit')).toBe(true);

        click('#edit');

        expect(wrapper.contains('#edit')).toBe(false);
    });

    it('updates the question after being edited', () => {
        wrapper.find('#edit').trigger('click');

        type('input[name=title]', 'Changed title');
        type('textarea[name=body]', 'Changed body');

        click('#update');

        see('Changed title');
        see('Changed body');
    });

    it ('can cancel out of edit mode', () => {
        click('#edit');

        type('input[name=title]', 'Changed title');

        click('#cancel');

        see('The title');
    });

    let see = (text, selector) => {
        let wrap = selector ? wrapper.find(selector) : wrapper;

        expect(wrap.html()).toContain(text);
    };

    let type = (selector, text) => {
        let node = wrapper.find(selector);

        node.element.value = text;
        node.trigger('input');
    };

    let click = (selector) => {
        wrapper.find(selector).trigger('click');
    };
});