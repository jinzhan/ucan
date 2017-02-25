var $ = require('/modules/lib/jquery.js');
var Vue = require('/modules/lib/Vue.js');
var axios = require('/modules/lib/axios.js');
require('/modules/js/slider.js');

module.exports = {
    init: function () {
        var vm = new Vue({
            el: '#box-1on1',
            created: function () {
                this.loadNav();
                this.loadClass();
            },
            data: {
                isLoading: 0,
                rows: [],
                // 导航名称
                navAllIds: '',
                navList: [],
                currentNavId: 0
            },
            methods: {
                // 获取课程导航
                loadNav: function () {
                    var $this = this;
                    axios.get('/view/guest/courses/courseTopics', {
                        params: {}
                    })
                        .then(function (response) {
                            var data = response.data.data;
                            this.$set(this, 'navList', data);
                            var navAllIds = [];
                            data.map(function (item, index, arr) {
                                navAllIds.push(item.id);
                            });
                            this.$set(this, 'navAllIds', navAllIds.join());
                            this.$set(this, 'currentNavId', this.navAllIds);
                        }.bind(this))
                        .catch(function (error) {
                            console.log(error);
                        });
                },

                changeClassNav: function (id) {
                    var $this = this;
                    axios.get('/view/guest/teachers/findlist', {
                        params: {
                            courseTopicsIds: id
                        }
                    })
                        .then(
                            function (response) {
                                var data = response.data.data;
                                this.$set(this, 'rows', data);
                                var $el = $('#box-1on1');
                                $el.find('.tl-backward').addClass('disabled');
                                $el.find('.tl-forward').removeClass('disabled');
                                $el.find('.slider-wrapper').find('.slider-el').css('margin-left', 0);
                            }.bind(this)
                        )
                        .catch(function (error) {
                            console.log(error);
                        });
                },

                loadClass: function () {
                    var $this = this;
                    axios.get('/view/guest/teachers/findlist', {
                        params: {}
                    })
                        .then(
                            function (response) {
                                var data = response.data.data;
                                this.$set(this, 'rows', data);
                            }.bind(this)
                        )
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            }
        });
    }
};