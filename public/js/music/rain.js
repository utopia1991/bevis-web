function run(){
  var image = document.getElementById('rain');
  image.onload = function() {
    var engine = new RainyDay({
      image: this,
      blur: 10
    });
    engine.rain([ [1, 0, 20], [3, 3, 1] ], 100);
  };
  image.crossOrigin = 'anonymous';
  image.src = '/images/background/rain.jpg';
};

var elAudio,
  elButton,
  elGain,
  elGainValue,
  setGain,
  ctx,
  gain,
  mediaElementSource,
  isPlaying;

elAudio     = document.getElementById('audio');
elPlay      = document.getElementById('play');
elStop      = document.getElementById('stop');
elControl      = document.getElementById('control');
elGain      = document.getElementById('gain');
elGainValue = document.getElementById('gain-value');

window.AudioContext = window.AudioContext || window.webkitAudioContext;
ctx = new AudioContext();

mediaElementSource = ctx.createMediaElementSource(elAudio);
gain = ctx.createGain();

setGain = function() {
  gain.gain.value = elGainValue.innerText = elGain.value;
};
setGain();

mediaElementSource.connect(gain);
gain.connect(ctx.destination);

elAudio['play']();

elPlay.addEventListener('click', function() {
  elAudio['play']();
});

elStop.addEventListener('click', function() {
  elAudio['pause']();
});

elControl.addEventListener('click', function() {
  elAudio[!isPlaying ? 'play' : 'pause']();
  isPlaying = !isPlaying;
});

elGain.addEventListener('mouseup', setGain);

document.body.onload=run();
