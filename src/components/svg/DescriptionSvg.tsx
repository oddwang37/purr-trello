import * as React from "react"
import { SVGProps } from "react"

const DescriptionSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={18}
    height={14}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width={18} height={2.333} rx={1.167} fill="#000" />
    <rect y={5.833} width={18} height={2.333} rx={1.167} fill="#000" />
    <rect y={11.667} width={12.316} height={2.333} rx={1.167} fill="#000" />
    <rect y={3.5} width={18} height={1.167} rx={0.583} fill="#000" />
    <rect y={9.333} width={18} height={1.167} rx={0.583} fill="#000" />
  </svg>
)

export default DescriptionSvg
