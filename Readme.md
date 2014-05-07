## ember-audio

Managed [audio5js](http://zohararad.github.io/audio5js/) instance for Ember. Supports audio loaded %, play/pause, position/duration -- all data-bound to the audio currently playing. Smart enough to wait until we have enough buffered before playing.

## Installation

Use bower or simply copy `ember-audio.js` somewhere after ember has loaded.

## Usage

Create a component:

```js
  AudioPlayer = Ember.Component.extend({

  willDestroyElement: function() {
    // stop playing & reset
    EmberAudio.instance.reset();
  },

  setupPlayer: function() {
    var _this = this;

    EmberAudio.instance.load(this.get('src'));
  },

  actions: {
    pause: function() {
      if (this.get('key')) {
        EmberAudio.instance.pause();
      }
    },

    playPause: function() {
      if (this.get('key')) {
        EmberAudio.instance.playPause();
      }
    }
  }
});
```

... and a template:

```handlebars
<button {{action "playPause"}} class="btn btn--bare">
  {{EmberAudio.instance.progress}}%

  {{#if EmberAudio.instance.playing}}
    <i class="ss-pause"></i>
  {{else}}
    <i class="ss-play"></i>
  {{/if}}

  {{#if EmberAudio.instance.position}}
    <span class="position">
      {{EmberAudio.instance.position}} | {{EmberAudio.instance.duration}}
    </span>
  {{/if}}
</button>
```

Use the component like so:

```handlebars
{{audio-player src="srcToAudioFileHere"}}
```

That's it! Bring your own styles/icons & customize as you see fit.

## TODO

Tests?

## LICENSE

MIT
