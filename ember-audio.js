(function () {
  EmberAudio = {
    audioCache: {}
  };

  EmberAudio.object = Ember.Object.extend({
    load: function(src) {
      if (this.get('ready')) {
        this.set('src', src);
        EmberAudio.audiojsInstance.load(src);
      } else {
        // wait 'til we're ready, then load
        setTimeout($.proxy(function() {
          this.load(src);
        }, this), 50);
      }
    },

    play: function() {
      if (this.get('ready')) {
        EmberAudio.audiojsInstance.play();
      }
    },

    playPause: function() {
      if (this.get('ready')) {
        EmberAudio.audiojsInstance.playPause();
      } else {
        // wait 'til we're ready, then playPause
        setTimeout($.proxy(function() {
          this.playPause();
        }, this), 50);
      }
    },

    pause: function() {
      if (this.get('ready')) {
        EmberAudio.audiojsInstance.pause();
      }
    },

    reset: function() {
      this.pause();
      this.set('src', null);
      this.set('playing', false);
      this.set('position', null);
      this.set('duration', null);
      this.set('progress', null);
      this.set('ended', false);
    }
  });

  EmberAudio.object.reopenClass({
    create: function() {
      var instance = this._super({});
      instance.reset();
      return instance;
    }
  });

  EmberAudio.instance = EmberAudio.object.create();

  EmberAudio.audiojsInstance = new Audio5js({
    swf_path: '/audio5js.swf',
    throw_errors: true,
    ready: function() {
      EmberAudio.instance.set('ready', true);
    }
  });

  EmberAudio.audiojsInstance.on('play', function () {
    EmberAudio.instance.set('ended', false);
    Ember.set('EmberAudio.instance.playing', true);
  }, this);

  EmberAudio.audiojsInstance.on('pause', function () {
    EmberAudio.instance.set('playing', false);
  }, this);

  EmberAudio.audiojsInstance.on('ended', function () {
    EmberAudio.instance.set('playing', false);
    EmberAudio.instance.set('ended', true);
  }, this);

  EmberAudio.audiojsInstance.on('timeupdate', function (position, duration) {
    if (position.toString().indexOf('NaN') != -1) {
      alert('An error occurred playing audio, please refresh the page and try again.');
    } else {
      if (EmberAudio.instance.get('src')) {
        EmberAudio.instance.set('position', position);
        EmberAudio.instance.set('duration', duration);
      }
    }
  }, this);

  EmberAudio.audiojsInstance.on('progress', function (progress) {
    if (EmberAudio.instance.get('src')) {
      EmberAudio.instance.set('progress', progress);
    }
  }, this);

  EmberAudio.audiojsInstance.on('error', function (error) {
    alert(error.message);
  }, this);
}).call(window);
