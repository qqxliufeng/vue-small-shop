
const baseIP = 'http://192.168.1.100:80'

export const baseUrl = baseIP + '/store_api/v1/'

export const imageUrl = baseIP

const commonModuleUrl = 'common/'

export const imageActionUrl = imageUrl + '/store_api/' + commonModuleUrl + 'upload'

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

export const userFavoriteGoodsUrl = favoritesUrl + 'favorite_goods'

export const userUnFavoroteGoodsUrl = favoritesUrl + 'unfavorite_goods'

const personInfoUrl = 'personal/'

export const linkManUrl = personInfoUrl + 'linkman'

export const addLinkManUrl = personInfoUrl + 'add_linkman'

export const editLinkManUrl = personInfoUrl + 'edit_linkman'

export const deleteLinkManUrl = personInfoUrl + 'del_linkman'

const indexModuleUrl = 'index/'

export const indexUrl = indexModuleUrl + 'index'

const scenicDetailModuleUrl = 'details/'

export const scenicDetailUrl = scenicDetailModuleUrl + 'scenic_details'

export const goodsDetailUrl = scenicDetailModuleUrl + 'goods_detail'

const commentModuleUrl = 'comment/'

export const commentListUrl = commentModuleUrl + 'comment_list'

const askModuleUrl = 'ask/'

export const askListUrl = askModuleUrl + 'ask_list'

export const askAddUrl = askModuleUrl + 'add_ask'

export const askAnswerUrl = askModuleUrl + 'answer'

export const askAnswerListUrl = askModuleUrl + 'answer_list'

export const askAnswerLikeUrl = askModuleUrl + 'answer_like'

export const askAnserGetScenicUrl = askModuleUrl + 'get_scenic'

const orderModuleUrl = 'order/'

export const orderReserve = orderModuleUrl + 'reserve'

export const orderCreate = orderModuleUrl + 'create'

export const orderStatusNum = orderModuleUrl + 'order_status_num'

export const orderList = orderModuleUrl + 'order_list'

export const orderDetails = orderModuleUrl + 'details'

const payModuleUrl = 'payment/'

export const orderPayUrl = payModuleUrl + 'run_pay'
