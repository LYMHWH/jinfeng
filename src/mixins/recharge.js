
export default {
    data() {
        var checkRechargeAmount = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入金额'));
            }
            if (value <= 0) {
                callback(new Error('请输入正确金额'));
            } else {
                callback();
            }
        };
        return {
            rechargeVisible: false,
            rechargeForm: {
                recharge_type: "2",
                recharge_amount: undefined
            },
            rechargeRules: {
                recharge_type: [
                    { required: true, message: '请选择充值方式', trigger: 'change' },

                ],
                recharge_amount: [
                    { required: true, validator: checkRechargeAmount, trigger: 'blur' }
                ]
            },
            timer: null,
            time: 45,
            img: undefined,
            recharge_data: {},
            rechargeCodeVisible: false
        }
    },
    methods: {
        recharge() {
            this.$refs['rechargeForm'].validate((valid) => {
                if (valid) {
                    this.rechargeVisible = false;
                    if (this.rechargeForm.recharge_type == 2) {
                        this.$http.get('/ecommerce_report/rechargeToEcommerceBalance', { params: { ...this.rechargeForm } }).then(({ data }) => {
                            var url = encodeURIComponent(data.url);
                            this.recharge_data = data;
                            this.img = `/ecommerce_shop/ecommerce_report/wxQrcode?qrurl=${url}`
                            this.rechargeCodeVisible = true;
                            this.call(data.recharge_num);
                        })
                    }
                    if (this.rechargeForm.recharge_type == 1) {
                        this.$confirm('是否支付成功', '提示', {
                            type: 'info',
                            confirmButtonText: '我已支付'
                        }).then(res => {
                            location.reload();
                        })
                        window.open("/ecommerce_shop/ecommerce_report/rechargeToEcommerceBalance?recharge_amount=" + this.rechargeForm.recharge_amount + "&recharge_type=" + this.rechargeForm.recharge_type);
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });

        },
        call(recharge_num) {
            this.timer = setInterval(() => {
                if (this.time <= 0) {
                    clearInterval(this.timer);
                    // this.img = '../../static/images/wx_disable.png';
                    this.time = 45;
                } else {
                    this.time--;
                }
                this.$post(
                    "/ecommerce_report/queryWxOrder",
                    {
                        recharge_num: recharge_num,
                    }).then(res => {
                        res = JSON.parse(res);
                        if (res.code == 1) {
                            this.time = 45;
                            this.$confirm('充值成功', '提示', {
                                showCancelButton: false,
                                type: 'success',
                                callback: (actions) => {
                                    location.reload();
                                }
                            })
                            clearInterval(this.timer);
                        }
                    })
            }, 1000);

        }
    }
}