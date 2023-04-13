const { GestureDescription, Finger, FingerCurl } = window.fp;

const ScrollUpGesture = new GestureDescription('scroll-up'); // ✊️
const ScrollDownGesture = new GestureDescription('scroll-down'); // 🖐
const GoBackGesture = new GestureDescription('go-back'); // 🤟
const ClickGesture = new GestureDescription('click'); // 🤏🏻

// Scroll up gesture
// -----------------------------------------------------------------------------

// thumb: half curled
// accept no curl with a bit lower confidence
ScrollUpGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
ScrollUpGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.5);

// all other fingers: curled
for (const finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  ScrollUpGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
  ScrollUpGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9);
}

// Scroll down gesture
// -----------------------------------------------------------------------------

// no finger should be curled
for (const finger of Finger.all) {
  ScrollDownGesture.addCurl(finger, FingerCurl.NoCurl, 1.0);
}

// Scroll top gesture
// -----------------------------------------------------------------------------
for (const finger of [Finger.Middle, Finger.Ring]) {
  GoBackGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
}
for (const finger of [Finger.Thumb, Finger.Index, Finger.Pinky]) {
  GoBackGesture.addCurl(finger, FingerCurl.NoCurl, 1.0);
}

// Click gesture
ClickGesture.addCurl(Finger.Index, FingerCurl.HalfCurl, 0.8);
ClickGesture.addCurl(Finger.Index, FingerCurl.FullCurl, 0.5);

ClickGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
ClickGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 0.4);

for (const finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
  ClickGesture.addCurl(finger, FingerCurl.HalfCurl, 1.0);
  ClickGesture.addCurl(finger, FingerCurl.FullCurl, 0.9);
}

const knownGestures = [
  ScrollUpGesture,
  ScrollDownGesture,
  GoBackGesture,
  ClickGesture
];

const gestureStrings = {
  'scroll-up': '✊️',
  'scroll-down': '🖐',
  'go-back': '🤟',
  click: '🤏🏻'
};

export {
  knownGestures,
  gestureStrings
};
