
function getUserMedia(constrains, success, error) {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        //最新标准API
        // Notify({ type: 'success', message: '支持最新标准API' });
        navigator.mediaDevices.getUserMedia(constrains).then(success).catch(error);
    } else if (navigator.webkitGetUserMedia) {
        //  Notify({ type: 'success', message: '支持webkit内核浏览器' });
        //webkit内核浏览器
        navigator.webkitGetUserMedia(constrains).then(success).catch(error);
    } else if (navigator.mozGetUserMedia) {
        // Notify({ type: 'success', message: '支持Firefox浏览器' });
        //Firefox浏览器
        navagator.mozGetUserMedia(constrains).then(success).catch(error);
    } else if (navigator.getUserMedia) {
        // Notify({ type: 'success', message: '支持旧版API' });
        //旧版API
        navigator.getUserMedia(constrains).then(success).catch(error);
    } else {
        // Notify('浏览器不支持getUserMedia');
        console.log("浏览器不支持getUserMedia")
    }
}

// 要重写initUserMedia_ 方法，因为chrome的底层api已做调整
window.tracking.initUserMedia_ = function (element, opt_options) {
    const options = {
        video: true,
        audio: !!(opt_options && opt_options.audio)
    };
    getUserMedia(options, function (stream) {
            try {
                element.srcObject = stream;
            } catch (err) {
                element.src = window.URL.createObjectURL(stream);
            }
        }, function (e) {
            // Notify(e.message);
            console.log(e.message)
        }
    );
};


// 重写视频捕获方法，因为不能停止 stop无效的bug
window.tracking.trackVideo_ = function (element, tracker) {

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var width;
    var height;

    var resizeCanvas_ = function () {
        width = element.offsetWidth;
        height = element.offsetHeight;
        canvas.width = width;
        canvas.height = height;
    };
    resizeCanvas_();
    element.addEventListener('resize', resizeCanvas_);

    var requestId;
    var stopped = false;
    var requestAnimationFrame_ = function () {
        requestId = window.requestAnimationFrame(function () {
            if (element.readyState === element.HAVE_ENOUGH_DATA) {
                try {
                    // Firefox v~30.0 gets confused with the video readyState firing an
                    // erroneous HAVE_ENOUGH_DATA just before HAVE_CURRENT_DATA state,
                    // hence keep trying to read it until resolved.
                    context.drawImage(element, 0, 0, width, height);
                } catch (err) { }
                tracking.trackCanvasInternal_(canvas, tracker);
            }
            if (stopped !== true) {
                requestAnimationFrame_();
            }
        });
    };
    var task = new tracking.TrackerTask(tracker);
    task.on('stop', function () {
        stopped = true;
        window.cancelAnimationFrame(requestId);
    });
    task.on('run', function () {
        stopped = false;
        requestAnimationFrame_();
    });
    return task.run();
};
