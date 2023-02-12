import type {
  CSSObject,
  CSSInterpolation,
  CSSPropertiesWithMultiValues,
} from "@emotion/serialize";

import type { ComplexStyleRule } from "@vanilla-extract/css";

function emotionToVanillaExtract(css: CSSObject): ComplexStyleRule {
  const styles = Object.fromEntries(
    Object.entries(css).filter(([key]) => !key.includes("&"))
  );

  const selectors = recursiveExtract(
    Object.fromEntries(Object.entries(css).filter(([key]) => key.includes("&")))
  );

  if (!selectors) {
    return styles;
  }
  return {
    ...styles,
    selectors,
  };
}
export default emotionToVanillaExtract;

function assertInterpolationIsCSSObject(
  interpolation: CSSInterpolation
): asserts interpolation is CSSObject {
  if (!interpolation) {
    throw new Error("CSSInterpolation is ");
  }
  if (typeof interpolation === "boolean") {
    throw new Error("CSSInterpolation is boolean");
  }
  if (typeof interpolation === "number") {
    throw new Error("CSSInterpolation is number");
  }

  if (typeof interpolation === "string") {
    throw new Error("CSSInterpolation is string");
  }

  // Keyframes is an extended string so should come before string
  if ("anim" in interpolation) {
    throw new Error("CSSInterpolation is Keyframes");
  }
  if (Array.isArray(interpolation)) {
    throw new Error("CSSInterpolation is ArrayCSSInterpolation");
  }
  if ("__emotion_styles" in interpolation) {
    throw new Error("CSSInterpolation is ComponentSelector");
  }
  if ("styles" in interpolation) {
    throw new Error("CSSInterpolation is SerializedStyles");
  }
}

function recursiveExtract(
  interpolation: CSSInterpolation,
  parentKey = "&"
): { [selector: string]: CSSPropertiesWithMultiValues } | null {
  assertInterpolationIsCSSObject(interpolation);

  let selectors: { [selector: string]: CSSPropertiesWithMultiValues } | null =
    null;
  Object.entries(interpolation).forEach(([key, value]) => {
    if (!key.includes("&")) {
      if (!selectors) {
        selectors = {};
      }
      selectors[parentKey] = {
        ...selectors[parentKey],
        [key]: value,
      };
    } else {
      selectors = {
        ...selectors,
        ...recursiveExtract(value, parentKey.replaceAll("&", key)),
      };
    }
  });
  return selectors;
}
