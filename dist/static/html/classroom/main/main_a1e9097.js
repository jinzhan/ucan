define('modules/html/classroom/main/main', function(require, exports, module) {

  var $ = require('modules/lib/jquery');
  var Vue = require('modules/lib/Vue');
  var axios = require('modules/lib/axios');
  require('modules/js/slider');
  
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
                  // 每页12个
                  size: 12,
                  // 初始页码
                  page: 1,
                  maxPage: '-',
                  // 课程类型
                  courseTopicsIds: '',
                  // loading flag
                  loading: 0
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
  
                  changeClassNav: function (ids) {
                      this.$set(this, 'courseTopicsIds', ids);
                      this.$set(this, 'page', 1);
                      this.loadClass();
                  },
  
                  loadClass: function () {
                      if(this.loading) {
                          return;
                      }
                      this.$set(this, 'loading', 1);
                      var $this = this;
                      axios.get('/view/guest/courses/findPage', {
                          params: {
                              page: this.page-1,
                              size: this.size,
                              courseTopicsIds: this.courseTopicsIds
                          }
                      })
                          .then(
                              function(response) {
                                  var data = response.data.data;
                                  this.$set(this, 'rows', data.rows);
                                  this.$set(this, 'loading', 0);
                                  this.$set(this, 'maxPage', Math.ceil(data.total/this.size));
                              }.bind(this)
                          )
                          .catch( function(error) {console.log(error);});
                  },
  
                  gotoPage: function(){
                      var $pageNum = $('.goto-num');
                      var pageNum = $pageNum.val();
                      pageNum = Math.max(pageNum, 1);
                      pageNum = Math.min(pageNum, this.maxPage);
                      $pageNum.val(pageNum);
                      this.$set(this, 'page', pageNum);
                      this.loadClass();
                  }
              }
          });
      }
  };

});
