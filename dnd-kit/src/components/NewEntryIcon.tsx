import { CSSProperties } from "react";

import "./NewEntryIcon.css";

export interface NewEntryIconProps {
  style?: CSSProperties;
}

export const NewEntryIcon = ({ style }: NewEntryIconProps) => {
  return (
    <span className="new-entry-icon" style={{ ...style } as CSSProperties}>
      <svg
        width="8"
        height="8"
        viewBox="0 0 8 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.933594 0.333008V4.99967C0.933594 5.58878 1.41116 6.06634 2.00026 6.06634H5.55599V7.889L7.77821 5.66678L5.55599 3.44455V5.26634H2.00026C1.85298 5.26634 1.73359 5.14695 1.73359 4.99967V0.333008H0.933594Z"
          fill="#A7A7A7"
        />
      </svg>
    </span>
  );
};
