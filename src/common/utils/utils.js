export default {
  dateAdd (startDate, num = 1) {
    startDate = new Date(startDate)
    startDate = +startDate + 1000 * 60 * 60 * 24 * num
    startDate = new Date(startDate)
    return startDate.getFullYear() + '-' + (startDate.getMonth() + 1) + '-' + startDate.getDate()
  },
  validator: {
    phoneReg: /^1(3|4|5|7|8)\d{9}$/,
    passwordReg: /^(\w){6,16}$/,
    emailReg: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
    isPhone (phone) {
      return this.phoneReg.test(phone)
    },
    isPassword (s) {
      return this.passwordReg.test(s)
    },
    isEmail (s) {
      return this.emailReg.test(s)
    }
  },
  image: {
    beforeUploadImageCheck (vue, file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 1
      if (!isJPG) {
        vue.$message.error('上传头像图片只能是 JPG 或 png 格式!')
        return false
      }
      if (!isLt2M) {
        vue.$message.error('上传头像图片大小不能超过 1MB!')
        return false
      }
      return isJPG && isLt2M
    },
    getImagePath (vue, image) {
      return vue.$urlPath.imageUrl + image
    }
  },
  common: {
    hiddenMobile (mobile) {
      let newMobile = mobile
      if (mobile.length > 7) {
        newMobile = mobile.substr(0, 3) + '****' + mobile.substr(7)
      }
      return newMobile
    }
  }
}
