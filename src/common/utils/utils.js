import { imageUrl } from 'common/http/urlConfig'
const weekMap = {
  '1': '一',
  '2': '二',
  '3': '三',
  '4': '四',
  '5': '五',
  '6': '六',
  '0': '日'
}
export default {
  dateAdd (startDate, num = 1) {
    startDate = new Date(startDate)
    startDate = +startDate + 1000 * 60 * 60 * 24 * num
    startDate = new Date(startDate)
    return { date: startDate.getFullYear() + '-' + (startDate.getMonth() + 1) + '-' + startDate.getDate(), week: startDate.getDay() }
  },
  getWeekByWeek (week) {
    return weekMap[week]
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
      let maxSize = 2
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < maxSize
      if (!isJPG) {
        vue.$message.error('上传的图片只能是 JPG 或 png 格式!')
        return false
      }
      if (!isLt2M) {
        vue.$message.error('上传的图片大小不能超过 ' + maxSize + 'MB!')
        return false
      }
      return isJPG && isLt2M
    },
    getImagePath (image) {
      if (image.indexOf('http://') === 0 || image.indexOf('https://') === 0) {
        return image
      }
      return imageUrl + image
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
