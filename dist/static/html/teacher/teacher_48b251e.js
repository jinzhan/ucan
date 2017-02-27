define('modules/html/teacher/teacher', function(require, exports, module) {

  var $ = require('modules/lib/jquery');
  var Vue = require('modules/lib/Vue');
  var axios = require('modules/lib/axios');
  
  module.exports = {
      init: function () {
          var vm = new Vue({
              el: '#recom-teacher',
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
                      axios.get('/view/guest/teachers/findList', {
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

});
