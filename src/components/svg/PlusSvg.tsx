import * as React from "react"
import { SVGProps } from "react"

const PlusSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={10}
    height={13}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect y={6.224} width={10} height={0.898} rx={0.449} fill="#000" />
    <rect
      x={4.615}
      y={12.51}
      width={11.673}
      height={0.769}
      rx={0.385}
      transform="rotate(-90 4.615 12.51)"
      fill="#000"
    />
  </svg>
)

export default PlusSvg
