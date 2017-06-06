(function(root) {
    var $scope = $(document.body);
    var allTime;
    var frameId;
    //转换时间
    function formaTime(time) {
        time = parseInt(time);
        var minute = Math.floor(time / 60);
        var second = time - minute * 60;
        if (minute < 10) minute = '0' + minute;
        if (second < 10) second = '0' + second;
        return (minute + ':' + second);
    }
    //渲染歌曲总时间
    function render(duration) {
        allTime = duration;
        var allTime1 = formaTime(duration);
        $scope.find('.all-time').text(allTime1);
    }
    //渲染当前时间和进度条
    function updata(currentTime, precentage) {
        var time = formaTime(currentTime);
        $scope.find('.current-time').text(time);
        var precentage = -(1 - precentage) * 100 + '%';
        $scope.find('.pro-top').css('transform', 'translateX(' + precentage + ')')
    }
    //开始渲染进度
    function start(current) {

        cancelAnimationFrame(frameId);

        function frame() {
            var currentTime = AudioManager.audio.currentTime;
            var precentage = parseInt((currentTime / allTime) * 100) / 100;

            if (precentage < 1) {
                updata(currentTime, precentage);
                frameId = requestAnimationFrame(frame);
            } else {
                console.log(precentage)
                console.log('a')
                cancelAnimationFrame(frameId);
                $scope.find('.next-btn').click();
                $scope.find('.play-btn').click();

            }
        }
        frame()
    }
    //停止
    function stop() {
        cancelAnimationFrame(frameId)
    }
    root.processor = {
        render: render,
        start: start,
        stop: stop,
        updata: updata
    }
}(window.player || (window.player = {})))