var $ = require('/modules/lib/jquery.js');
require('/modules/lib/jquery.ui.dialog.js');
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
                selectedCourse: -1,
                showClasses: 0,
                rows: [],
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
                        .then(function (response) {
                            alert(response.data.message);
                        });
                },
                getClasses: function (id) {
                    /**
                     *   $('.class-dialog').dialog({
                     *       resizable: false,
                     *       height: 'auto',
                     *       width: 400,
                     *       modal: true
                     *   });
                     **/
                    if (this.showClasses) {
                        return;
                    }

                    // 显示弹窗
                    this.$set(this, 'showClasses', 1);
                    var date = new Date();
                    var m = date.getMonth() + 1;
                    var em = date.getMonth() + 2;
                    var d = date.getDate();
                    var beginDate = date.getFullYear() + '-' + (m > 9 ? m : '0' + m) + '-' + (d > 9 ? d : '0' + d);
                    var endDate = date.getFullYear() + '-' + (em > 9 ? em : '0' + em) + '-' + (d > 9 ? d : '0' + d);
                    axios.get('/view/guest/costs/findPage', {
                        params: {
                            courseId: courseId,
                            // beginDate: beginDate,
                            beginDate: '2017-02-20',
                            endDate: endDate
                        }
                    })
                        .then(function (response) {
                            var data = response.data.data;
                            this.$set(this, 'rows', data.rows);
                          }.bind(this)
                        )
                        .catch(function (error) {
                            console.log(error);
                        });
                },

                // 预约课程
                subscribeCourse: function(){
                    var selectedCourse = this.selectedCourse;
                    // TODO
                    var costId = '';
                    if(selectedCourse < 0) {
                        alert('请选择要预约的课程');
                        return;
                    }
                    var params = new URLSearchParams();
                    params.append('costId', costId);
                    axios.post('/courses/schedules/add', params)
                        .then(function (response) {
                                var data = response.data;
                                alert(data.message);
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