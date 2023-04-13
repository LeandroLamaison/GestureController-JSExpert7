const fingerPointId = {
  indexFingerTip: 'index_finger_tip'
};

export const fingerId = {
  thumb: 'thumb',
  index: 'indexFinger',
  middle: 'middleFinger',
  ring: 'ringFinger',
  pinky: 'pinky'
};

export const fingerLookupIndexes = {
  [fingerId.thumb]: [0, 1, 2, 3, 4],
  [fingerId.index]: [0, 5, 6, 7, 8],
  [fingerId.middle]: [9, 10, 11, 12],
  [fingerId.ring]: [13, 14, 15, 16],
  [fingerId.pinky]: [17, 18, 19, 20]
};

export function findFingerTip (points) {
  return points.find(item => item.name === fingerPointId.indexFingerTip);
}
