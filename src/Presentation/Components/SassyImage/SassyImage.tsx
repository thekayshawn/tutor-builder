import * as React from "react";

type Props = {
  fallbackImgSrc?: string;
} & JSX.IntrinsicElements["img"];

/**
 * An image that has sass. In other words, it has a fallback image.
 * Not to mention that the fallback works even if the provided source fails to
 * load.
 *
 * @returns {JSX.Element}
 *
 * @author kashan-ahmad
 * @version 0.0.1
 */
export default function SassyImage({
  src,
  alt = "",
  fallbackImgSrc,
  className = "",
  ...props
}: Props): JSX.Element {
  return (
    <img
      {...props}
      // It's a flexbox to allow the ALT text to be in the middle in-case it's
      // provided and fallback image isn't.
      className={`d-flex justify-content-center align-items-center ${className}`}
      alt={alt}
      src={src || fallbackImgSrc}
      onError={({ target }) => {
        // Removing the event listener prevents an infinite event chain.
        (target as HTMLImageElement)["onerror"] = null;
        (target as HTMLImageElement)["src"] = fallbackImgSrc || "";
      }}
    />
  );
}
