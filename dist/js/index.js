var $scope = $(document.body);
var root = window.player;
var dataUrl = './mock/data.json';
var render = root.render;
var index = 0;
var songList;
var controlManager;
var AudioManager = new root.AudioManager();
AudioManager.volume(.2)
var processor = root.processor;
var playList = root.playList;


//绑定touch事件
function bindTouch(alltime) {
    var $slidePoint = $scope.find('.slide-point');
    var offset = $scope.find('.pro-wrapper').offset();
    var left = offset.left;
    var width = $scope.find('.pro-wrapper').width();
    $slidePoint.on('touchstart', function() {
        processor.stop();
    }).on('touchmove', function(e) {
        var x = e.changedTouches[0].clientX;
        var percentage = (x - left) / width;
        if (percentage < 0 || percentage > 1) {
            percentage = 0;
        }
        var upTime = percentage * alltime;
        processor.updata(upTime, percentage);

    }).on('touchend', function(e) {
        var x = e.changedTouches[0].clientX;
        var percentage = (x - left) / width;
        if (percentage < 0 || percentage > 1) {
            percentage = 0;
        }
        var index = controlManager.index;
        var curData = songList[index];
        var currenttime = curData.duration * percentage;
        AudioManager.drump(currenttime);
        processor.start(currenttime)
        $scope.find('.play-btn').addClass('playing')

    })
}
//播放状态改变
$scope.on('play:change', function(event, index) {
        var curData = songList[index];
        render(curData);
        AudioManager.setAudioSource(curData.audio);
        processor.render(curData.duration)
        bindTouch(curData.duration);
        playList.playing(index)
    })
    //切歌停止播放
function changeStop() {
    AudioManager.status = 'pause';
    $scope.find('.play-btn').removeClass('playing');
}
$scope.on('click', '.prev-btn', function() {
    var Index = controlManager.prev();
    changeStop();
    $scope.trigger('play:change', Index)
})
$scope.on('click', '.next-btn', function() {
        var Index = controlManager.next();
        changeStop();
        $scope.trigger('play:change', Index)
    })
    //播放按钮
$scope.on('click', '.play-btn', function() {
    if (AudioManager.status === 'play') {
        AudioManager.pause();
    } else {
        AudioManager.play();
        processor.start();
    }
    $(this).toggleClass('playing');
})

function succecssCallback(data) {
    songList = data;
    playList.render(data);
    controlManager = new root.controlManager(data.length);
    playList.show(controlManager);
    playList.choose()
    $scope.trigger('play:change', 0)

}

function getData(url, callback) {
    $.ajax({
        url: url,
        type: 'GET',
        success: callback,
        error: function() {
            console.log('error')
        }
    })
}
getData(dataUrl, succecssCallback);

(function(window) {
    var a = 1;

    function df() {
        a = 5;
        con()
    }


    function con() {
        console.log(a)
    }
    window.df = df;
}(window))