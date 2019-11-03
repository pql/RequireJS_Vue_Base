define([
    'vue',
    'text!./hello.html',
    'css!./hello.css'
], function(vue, html) {
    'use strict';
    var vm = vue.extend({
        template: html,
        data() {
            return {
                title: 'hello world'
            }
        }
    });
    return vm;
});