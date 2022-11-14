import * as React from "react";
import SassyImage from "../SassyImage/SassyImage";
import templateAvatarSrc from "@Presentation/Assets/images/person.svg";

/**
 * A generic user avatar that uses a default avatar in case the provided one is
 * erred.
 *
 * @returns {JSX.Element}
 *
 * @author kashan-ahmad
 * @version 0.0.1
 */
export default function Avatar({
  src,
  className = "",
  ...props
}: JSX.IntrinsicElements["img"]): JSX.Element {
  return (
    <SassyImage
      {...props}
      src={src || templateAvatarSrc}
      fallbackImgSrc={templateAvatarSrc}
      className={`border-1 rounded-circle object-cover ${className}`}
    />
  );
}
