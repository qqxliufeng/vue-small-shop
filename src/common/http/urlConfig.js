
export const baseUrl = 'http://192.168.1.100:80/store_api/v1/'

export const imageUrl = 'http://192.168.1.100:80/'

const commonModuleUrl = 'common/'

export const imageActionUrl = imageUrl + 'store_api/' + commonModuleUrl + 'upload'

const userModuleUrl = 'user'

const userInfoUrl = userModuleUrl + '/user/'

export const userInfoLoginUrl = userInfoUrl + 'login'

export const userInfoRegisterUrl = userInfoUrl + 'register'

export const userInfoGetSMSCodeUrl = userInfoUrl + 'get_captcha'

export const userInfoModileLoginUrl = userInfoUrl + 'mobilelogin'

export const userInfoForgetPWUrl = userInfoUrl + 'resetpwd'

export const userInfoResetPWUrl = userInfoUrl + 'eidtpwd'

export const userInfoResetInfo = userInfoUrl + 'profile'

const personInfoUrl = userModuleUrl + '/personal/'

export const linkManUrl = personInfoUrl + 'linkman'

export const addLinkManUrl = personInfoUrl + 'add_linkman'

export const editLinkManUrl = personInfoUrl + 'edit_linkman'

export const deleteLinkManUrl = personInfoUrl + 'del_linkman'

const goodsModuleUrl = 'goods'

const goodsIndexUrl = goodsModuleUrl + '/index/'

export const goodsIndexListUrl = goodsIndexUrl + 'goods_list'
