(function(root) {
    var $playList = $('<div class="play-list">' +
        '<div class="head">播放列表</div>' +
        '<ul class="play-list-wrap"></ul>' +
        '<div class="close-btn">关闭</div></div>');
    var $scope = $(document.body);
    var controlManager;
    var a = 1;

    function render(data) {
        var html = '';
        for (var i = 0; i < data.length; i++) {
            html += '<li><h3>' + data[i].song + '<span> - ' + data[i].singer + '</span></h3></li> '
        }
        $playList.find('.play-list-wrap').html(html);
        $scope.append($playList);

    }

    //显示播放列表
    function show(control) {
        controlManager = control;
        playing();
        $scope.on('click', '.list-btn', function() {
            $('.play-list').addClass('show');

        })
        $scope.on('click', '.close-btn', function() {
            $('.play-list').removeClass('show');

        })
    }
    //当前播放红色显示
    function playing(index) {
        var index = index || controlManager.index;
        $playList.find('li').removeClass('playing');
        $playList.find('li').eq(index).addClass('playing');
    }
    //选择歌曲
    function choose() {
        $playList.find('ul li').on('click', function() {
            var index = $(this).index();
            $scope.trigger('play:change', index)
        })
    }
    root.playList = {
        render: render,
        show: show,
        choose: choose,
        playing: playing
    }
}(window.player || (window.player = {})))