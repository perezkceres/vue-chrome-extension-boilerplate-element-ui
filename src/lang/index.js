import Vue from 'vue'
import VueI18n from 'vue-i18n'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementEsLocale from 'element-ui/lib/locale/lang/es'// element-ui lang
import enLocale from './en'
import esLocale from './es'

Vue.use(VueI18n)

const messages = {
    en: {
        ...enLocale,
        ...elementEnLocale
    },
    es: {
        ...esLocale,
        ...elementEsLocale
    }
}

const i18n = new VueI18n({
    // set locale
    // options: en | zh | es
    locale: 'es',
    // set locale messages
    messages
})

export default i18n