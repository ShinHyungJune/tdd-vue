import {mount} from 'vue-test-utils';
import expect from 'expect';
import CouponCode from '../../resources/js/components/CouponCode.vue';

describe('CouponCode', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(CouponCode);

        wrapper.setData({ // CouponCode.vue에 있는 컴포넌트 coupons 데이터와 상관없이 데이터를 오버라이드해서 테스트할 수 있음.
            coupons: [
                {
                    code: '500FF',
                    message: '50% off!',
                    discount: 50
                },
            ],
        })
    });

    it ('accepts a coupon code', () => {
        expect(wrapper.contains('input.coupon-code')).toBe(true);
    });

    it ('validates a real coupon code', () => {
        enterCouponCode('500FF');

        // expect(wrapper.vm.valid).toBe(true);
        expect(wrapper.html()).toContain('Coupon Redeemded: 50% off!');
    });

    it ('validates a fake coupon code', () => {
        enterCouponCode('NOTREAL');

        // expect(wrapper.vm.valid).toBe(true);
        expect(wrapper.html()).toContain('Invalid Coupon Code');
    });

    it ('broadcasts the percentage discount when a valid coupon code is apllied', () => {
        enterCouponCode('500FF');

        expect(wrapper.emitted().applied).toBeTruthy();
        expect(wrapper.emitted().applied[0]).toEqual([50]);
        // toBeTruthy는
        // emitted().applied는 emit('applied')를 캐치,
        // emitted().applied[0]는 emit('applied', 50)에서 첫번째 인자인 50에 접근함.
        // 잘 모르겠으면 console.log(emitted().applied 찍어보면 됨)
    });
    function enterCouponCode(code){
        let couponeCode = wrapper.find('input.coupon-code');

        couponeCode.element.value = code;
        couponeCode.trigger('input');
    }
});