import * as React from "react"
import { SVGProps } from "react"

const EditSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={10}
    height={10}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6.218 1.685 8.252 3.72 3.103 8.87 1.07 6.833l5.148-5.149Zm3.578-.49L8.889.286a.9.9 0 0 0-1.272 0l-.869.87L8.782 3.19l1.014-1.014a.693.693 0 0 0 0-.983ZM.006 9.693a.231.231 0 0 0 .28.275l2.267-.55L.519 7.385.006 9.694Z"
      fill="#000"
    />
  </svg>
)

export default EditSvg
