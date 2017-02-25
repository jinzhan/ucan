// var $ = require('/modules/lib/jquery.js');
var Vue = require('/modules/lib/Vue.js');
var axios = require('/modules/lib/axios.js');
require('/modules/js/slider.js');

module.exports = {
    init: function () {
        var vm = new Vue({
            el: '#class-evaluate',
            created: function () {
                this.loadData();
            },
            data: {
                isLoading: 0,
                rows: []
            },
            methods: {
                loadData: function () {
                    var $this = this;
                    axios.get('/view/guest/courses/evaluations/query', {
                        params: {}
                    })
                        .then(function (response) {
                            var data = response.data.data;
                            this.$set(this, 'rows', data);
                        }.bind(this))
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            }
        });
    }
};