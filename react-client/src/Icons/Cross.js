import * as React from "react";

function SvgCross(props) {
  return (
    <svg width={24} height={24} viewBox="0 0 12 12" {...props}>
      <path d="M10.293 1l-.635.635L6 5.293 2.342 1.635 1.707 1H1v.707l.635.635L5.293 6 1.635 9.658v-.001L1 10.293V11h.707l.635-.636L6 6.707l3.658 3.657.635.636H11v-.707l-.635-.636v.001L6.707 6l3.658-3.658.635-.635V1z" />
    </svg>
  );
}

export default SvgCross;
