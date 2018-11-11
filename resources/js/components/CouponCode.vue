<template>
    <div>
        <input type="text" class="coupon-code" v-model="couponCode" @input="validate">
        <p v-text="feedback"></p>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                valid: false,
                coupons: [
                    {
                        code: '500FF',
                        message: '10% off!',
                        discount: 10
                    },
                    {
                        code: 'FREE',
                        message: 'Entirely Free!',
                        discount: 100
                    },
                ],
                couponCode: '',
            }
        },

        computed: {
            selectedCoupon(){
                return this.coupons.find(coupon => coupon.code === this.couponCode);
            },

            message(){
                if(this.valid)
                    return this.selectedCoupon.message;
            },

            feedback(){
                if(this.valid)
                    return 'Coupon Redeemded: ' + this.message;

                return "Invalid Coupon Code";
            }
        },

        methods: {
            validate() {
                this.valid = !! this.selectedCoupon;

                if(this.valid){
                    this.$emit('applied', this.selectedCoupon.discount);
                }
            }
        }
    }
</script>