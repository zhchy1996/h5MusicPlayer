//播放音乐模块
(function(root) {
    var AudioManager = function() {
        this.audio = new Audio();
        this.status = 'pause';
    }
    AudioManager.prototype = {
        //播放功能
        play: function() {
            this.audio.play();
            this.status = 'play';
        },
        //暂停功能
        pause: function() {
            this.audio.pause();
            this.status = 'pause';
        },
        //设置播放源
        setAudioSource: function(src) {
            this.audio.src = src;
            this.audio.load();
        },
        //设置音量
        volume: function(vol) {
            this.audio.volume = vol;
        },
        //跳转
        drump: function(time) {
            this.audio.currentTime = time;
            this.play();
        }


    }
    root.AudioManager = AudioManager;
}(window.player || (window.player = {})))