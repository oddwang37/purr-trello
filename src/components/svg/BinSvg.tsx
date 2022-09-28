import * as React from 'react';
import { SVGProps } from 'react';

const BinSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={16}
    height={16}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.5}
    {...props}>
    <path d="M5.75 4.25v-2.5h4.5v2.5m-6.5 1v9h8.5v-9m-9.5-.5h10.5" />
  </svg>
);

export default BinSvg;
