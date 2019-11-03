define([
    "vue",
    "src/components/hello/hello"
], function(vue, vmComponentHello) {
    new vue({
        el: "#root",
        render: function (createElement) {
            return createElement(vmComponentHello)
        }
    })
});