// var $ = require('/modules/lib/jquery.js');
var Vue = require('/modules/lib/Vue.js');
var axios = require('/modules/lib/axios.js');
require('/modules/js/slider.js');

module.exports = {
    init: function () {
        var vm = new Vue({
            el: '#class-aside',
            created: function () {
                this.loadData();
            },
            data: {
                isLoading: 0,
                rows: [],
                currentRows: [],
                index: 0,
                size: 5,
                maxIndex: 0
            },
            methods: {
                loadData: function () {
                    var $this = this;
                    axios.get('/view/guest/courseRooms/findGuest', {
                        params: {}
                    })
                        .then(function (response) {
                            var data = response.data.data;
                            this.$set(this, 'currentRows', data.rows);
                            this.$set(this, 'maxIndex', Math.ceil(data.rows.length/this.size) - 1);
                            this.$set(this, 'rows', this.currentRows.slice(this.index * this.size, (this.index + 1) * this.size));
                        }.bind(this))
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            }
        });
    }
};