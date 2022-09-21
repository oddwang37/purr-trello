import * as React from "react"
import { SVGProps } from "react"

const AvatarSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={25}
    height={25}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.5 0C5.597 0 0 5.597 0 12.5S5.597 25 12.5 25 25 19.403 25 12.5 19.403 0 12.5 0Zm-.143 5.372c2.1 0 3.811 1.687 3.811 3.756 0 2.068-1.709 3.755-3.81 3.755-2.1 0-3.812-1.687-3.812-3.755.002-2.07 1.712-3.756 3.811-3.756Zm6.38 13.582c0 1.365-2.23 1.365-4.811 1.365h-2.855c-2.688 0-4.81 0-4.81-1.365v-.28c0-2.613 2.157-4.738 4.81-4.738h2.858c2.653 0 4.81 2.125 4.81 4.738l-.002.28Z"
      fill="#000"
    />
  </svg>
)

export default AvatarSvg
