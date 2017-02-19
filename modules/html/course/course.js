var $ = require('/modules/lib/jquery.js');
var Vue = require('/modules/lib/Vue.js');

module.exports = {
    init: function () {
        var vm = new Vue({
            el: '#recom-course',
            mounted: function () {
                var $this = this;
                $.ajax({
                    url: '/ucan/courses/searchCourse',
                    dataType: 'json',
                    success: function(response){
                        console.log(response);
                        $this.set('isLoading', 1);
                    }
                })
            },
            data: {
                isLoading: 0
            }
        });
    }
};