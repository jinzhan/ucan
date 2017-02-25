// var $ = require('/modules/lib/jquery.js');
var Vue = require('/modules/lib/Vue.js');
var axios = require('/modules/lib/axios.js');
require('/modules/js/slider.js');

module.exports = {
    init: function () {
        var vm = new Vue({
            el: '#classroom',
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
                    console.log(id);
                },

                loadClass: function () {
                    var $this = this;
                    axios.get('/view/guest/courses/findList', {
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