(function(root) {
    var $scope = $(document.body);
    //渲染歌曲信息
    function renderInfo(info) {
        var html = '<h1 class="song-name">' + info.song + '</h1>' +
            '<h3 class="singer-name">' + info.singer + '</h3>' + '<h3 class="album-name">' + info.album + '</h3>'
        $scope.find('.song-info').html(html);

    }
    //渲染歌曲图片，高斯模糊
    function renderImg(src) {
        var image = new Image();
        image.onload = function() {
            root.blurImg(image, $scope[0]);
            $scope.find('.img-wrapper img').attr('src', src)
        }
        image.src = src;
    }
    //渲染喜欢按钮
    function renderLikeBtn(islike) {
        if (islike) {
            $scope.find('.like-btn').addClass('liked');
        } else {
            $scope.find('.like-btn').removeClass('liked');
        }
    }
    root.render = function(data) {
        renderInfo(data);
        renderImg(data.image);
        renderLikeBtn(data.isLike)
    }

}(window.player || (window.player = {})))