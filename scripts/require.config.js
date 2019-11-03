require.config({
    baseUrl: "/scripts", //reqireJS解析的基准路径，define引入的基准根路径 指向breakfast_share的下一级
    paths: {
        "vue": 'lib/vue/vue',
        "css": 'lib/require-css',
        "text": 'lib/require-text',
    }
})
require(["/scripts/app.js"]);