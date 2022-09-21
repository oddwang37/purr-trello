import * as React from "react"
import { SVGProps } from "react"

const CommentsSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={18}
    height={15}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4 0h13a1 1 0 1 1 0 2H4V0ZM4 6h13a1 1 0 1 1 0 2H4V6ZM4 11h13a1 1 0 1 1 0 2H4v-2ZM4 3h10.5a.5.5 0 0 1 0 1H4V3ZM4 9h10.5a.5.5 0 0 1 0 1H4V9ZM4 14h10.5a.5.5 0 0 1 0 1H4v-1Z"
      fill="#000"
    />
    <circle cx={1.5} cy={1.5} r={1.5} fill="#000" />
    <circle cx={1.5} cy={7.5} r={1.5} fill="#000" />
    <circle cx={1.5} cy={12.5} r={1.5} fill="#000" />
  </svg>
)

export default CommentsSvg
