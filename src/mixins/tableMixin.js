export default {
    data() {
        return {
            cellStyle: {
                textAlign: 'center',
            },
            headerCellStyle: {
                textAlign: 'center',
                backgroundColor:'#f5f5f5',
            },
            tableData: [],
            multipleSelection: [],
            currentPage: 1
        };
    },
    methods: {
        handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log(this.multipleSelection);
        },
        handleSizeChange(val) {
            this.queryParams.size = val;
            this.query();
        },
        handleCurrentChange(val) {
            this.queryParams.page = val;
            this.query();
        },
        delete(title, url, data) {
            this.$confirm(title, "提示", {
                type: "warning"
            }).then(() => {
                this.$q({
                    method: 'post',
                    url,
                    data
                }).then(res => {
                    this.$message.success('删除成功');
                    this.query();
                });
            });
        },
        cancel(){
            this.$confirm('确定要取消吗？取消后填写的信息将丢失！', "提示", {
                type: "warning"
            }).then(() => {
                this.cancel1();
            });
        },
        toggle(title, url, data,message) {
            this.$confirm(title, "提示", {
                type: "warning"
            }).then(() => {
                this.$q({
                    method: 'post',
                    url,
                    data
                }).then(res => {
                    this.$message.success(message||'操作成功');
                    this.query();
                });
            });
        },
        post(form, url, data, modalVisible) {
            this.$refs[form].validate(valid => {
                if (valid) {
                    this.$q({
                        url,
                        method: "post",
                        data: data
                    }).then(res => {
                        this.$message.success("操作成功");
                        this[modalVisible] = false;
                        this.$refs[form].resetFields();
                        this.query();
                    });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        reset(form) {
            this.$refs[form].resetFields();
        },
        clean(object) {
            for (const key in object) {
                if (object.hasOwnProperty(key)) {
                    object[key] = '';
                }
            }
        }
    }
}