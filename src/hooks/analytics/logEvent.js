import PostHog from "posthog-react-native";
import posthogKeys from "../../../keys/posthog.json";
import strings from "../../values/strings.json";

const posthog = new PostHog("phc_dKFNxH621TPVP3J2DDZtzN76T2Ae5cC9WBNU4iUcg78", {
  host: strings.posthogLink,
});

export default function logEvent(name) {
  posthog.capture(name);
}
