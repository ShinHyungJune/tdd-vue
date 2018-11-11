import { mount } from 'vue-test-utils';
import expect from 'expect';
import Question from '../../resources/js/components/Question.vue';
import moxios from 'moxios';

describe('Question', () => {
    let wrapper;

    beforeEach(() => {
        moxios.install();

        wrapper = mount(Question, {
            propsData: {
                dataQuestion: {
                    title: 'The title',
                    body: 'The body',
                }
            }
        });
    });

    afterEach(() => {
        moxios.uninstall();
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

    it.only ('updates the question after being edited', (done) => {
        wrapper.find('#edit').trigger('click');

        type('input[name=title]', 'Changed title');
        type('textarea[name=body]', 'Changed body');

        click('#update');

        // ""로 안쓸 때는 오른쪽처럼(// 사이에) /url, 특스문자 앞에는 \ 붙이기, d+ 숫자 아무거나 와도된다는 뜻, 아무거나 다 상관없으면 .+/
        moxios.stubRequest(/\/questions\/\d+/, { // /questions/{any number}
            status:200,
            response: {
                title: 'Changed title',
                body: 'Changed body'
            }
        });

        moxios.wait(() => { // 비동기 통신에 대한 결과값 테스트할 때는 wait 사용
            see('Changed title');
            see('Changed body');
            see('Updated!');

            done(); // 비동기를 위한 콜백(작업 다 끝났어요~)
        });
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