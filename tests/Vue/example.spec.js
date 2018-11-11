import {mount} from 'vue-test-utils';
import expect from 'expect';
import example from '../../resources/js/components/ExampleComponent.vue';// 테스트할 컴포넌트

describe ('example', () => {
    it('says that it is an example component', () => {
        let wrapper = mount(example);

        expect(wrapper.html()).toContain('Example');
    });
});