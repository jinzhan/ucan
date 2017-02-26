var $ = require('/modules/lib/jquery.js');
var Vue = require('/modules/lib/Vue.js');
var axios = require('/modules/lib/axios.js');
require('/modules/js/slider.js');

/*
 关于 regFlag：
 是否为签约用户条件： (regFlag & 1) != 0
 是否为智慧之星条件： (regFlag & 2) != 0
 是否为实名认证条件： (regFlag & 4) != 0
 是否为资格认证条件： (regFlag & 8) != 0
 是否可上门授课条件： (regFlag & 16) != 0
 是否为随时报名条件： (regFlag & 32) != 0
 */

var courseId = 0;
if (location.href.match(/courseId=(\d+)/)) {
    courseId = RegExp.$1;
} else {
    console.error('课程详情加载失败 => 缺少courseId参数');
}

module.exports = {
    init: function () {
        var vm = new Vue({
            el: '#course-detail',
            created: function () {
                this.loadData();
            },
            data: {
                isLoading: 0,
                co: {},
                ooo: 0,
                live: 0
            },
            methods: {
                loadData: function () {
                    var $this = this;
                    axios.get('/view/guest/courses/findList', {
                        params: {
                            id: courseId
                        }
                    })
                        .then(function (response) {
                            var data = response.data.data[0];
                            data.courseImg = data.ucanFile.newUrl;
                            data.flag = data.teacher.regFlagStr;
                            // this.$set(this, 'co', data);
                            // 进一步查询数据
                            axios.get('/view/guest/costs/findList', {
                                params: {
                                    courseId: courseId
                                }
                            }).then(function (response) {
                                var costData = response.data.data[0];
                                // var data = this.co;
                                data = $.extend(data, costData);
                                this.$set(this, 'co', data);
                            }.bind(this));
                        }.bind(this))
                        .catch(function (error) {
                            console.log(error);
                        });
                },
                collect: function (courseId) {
                    var params = new URLSearchParams();
                    params.append('courseId', courseId);
                    params.append('mode', this.co.mode);
                    axios.post('/courses/favorite/add', params)
                        .then(function(response){
                            alert(response.data.message);
                        });
                },
                getOoo: function (id) {

                },
                getLive: function(id) {

                }
            }
        });
    }
};