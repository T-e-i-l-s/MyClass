
/*
Animation
This function runs Animated.timing
Input:
1) ref - useRef(Animated.Value)
2) value - the end value
3) duration - Animation Duration
*/

import { Animated } from "react-native"

export default function (ref, value, duration) {
  Animated.timing(ref, {
    toValue: value,
    duration: duration,
    useNativeDriver: true
  }).start()
}