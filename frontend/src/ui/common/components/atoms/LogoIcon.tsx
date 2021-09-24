import React from "react"

interface LogoIconProps extends React.SVGProps<SVGSVGElement> {
  rectColor?: string
  width?: number
  height?: number
}

export function LogoIcon({
  width = 70,
  height = 60,
  rectColor = "#4C0BB6",
  ...props
}: LogoIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 70 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <ellipse
        cx={34.755}
        cy={53.544}
        rx={33.321}
        ry={6.455}
        fill="url(#prefix__paint0_linear)"
      />
      <rect
        width={62.933}
        height={31.677}
        rx={8}
        transform="matrix(.86312 -.505 .49502 .86888 0 31.78)"
        fill={rectColor}
      />
      <defs>
        <linearGradient
          id="prefix__paint0_linear"
          x1={22.015}
          y1={54.289}
          x2={67.832}
          y2={54.048}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E4BC2D" />
          <stop offset={1} stopColor="#BC9A1F" />
        </linearGradient>
      </defs>
    </svg>
  )
}
