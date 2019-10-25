export var sub = (form, url, data, modalVisible,vm) => {
    vm.$refs[form].validate(valid => {
        if (valid) {
            vm.$q({
                url,
                method: "post",
                data: data
            }).then(res => {
                vm.$message.success("操作成功");
                vm[modalVisible] = false;
                vm.$refs[form].resetFields();
                vm.query();
            });
        } else {
            console.log("error submit!!");
            return false;
        }
    });
}
