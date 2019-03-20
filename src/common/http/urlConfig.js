
const baseIP = 'http://192.168.1.100:80'

export const baseUrl = baseIP + '/store_api/v1/'

export const imageUrl = baseIP

const commonModuleUrl = 'common/'

export const imageActionUrl = imageUrl + 'store_api/' + commonModuleUrl + 'upload'

const userInfoUrl = 'user/'

export const userInfoLoginUrl = userInfoUrl + 'login'

export const userInfoRegisterUrl = userInfoUrl + 'register'

export const userInfoGetSMSCodeUrl = userInfoUrl + 'get_captcha'

export const userInfoModileLoginUrl = userInfoUrl + 'mobile_login'

export const userInfoForgetPWUrl = userInfoUrl + 'resetpwd'

export const userInfoResetPWUrl = userInfoUrl + 'eidtpwd'

export const userInfoResetInfo = userInfoUrl + 'profile'

const favoritesUrl = 'favorites/'

export const userFavoriteScenicUrl = favoritesUrl + 'favorite_scenic'

export const userUnFavoroteScenicUrl = favoritesUrl + 'unfavorite_scenic'

const personInfoUrl = 'personal/'

export const linkManUrl = personInfoUrl + 'linkman'

export const addLinkManUrl = personInfoUrl + 'add_linkman'

export const editLinkManUrl = personInfoUrl + 'edit_linkman'

export const deleteLinkManUrl = personInfoUrl + 'del_linkman'

const indexModuleUrl = 'index/'

export const indexUrl = indexModuleUrl + 'index'
