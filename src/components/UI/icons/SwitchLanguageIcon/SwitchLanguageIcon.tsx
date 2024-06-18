import React from "react";

interface ISwitchLanguageIcon {
  width?: number;
  height?: number;
  fill?: string;
}

const SwitchLanguageIcon : React.FC<ISwitchLanguageIcon> = ({width = 20, height = 20, fill = "#444B51"}) => {
  return (
    <div>
      <svg
        width={width}
        height={height}
        viewBox="1 1.7 21 21"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        aria-labelledby="languageIconTitle"
        stroke={fill}
        stroke-width="1"
        stroke-linecap="square"
        stroke-linejoin="miter"
        fill="none"
        color="#000000"
      >
        {" "}
        <title id="languageIconTitle">Language</title>{" "}
        <circle cx="12" cy="12" r="10" />{" "}
        <path
          stroke-linecap="round"
          d="M12,22 C14.6666667,19.5757576 16,16.2424242 16,12 C16,7.75757576 14.6666667,4.42424242 12,2 C9.33333333,4.42424242 8,7.75757576 8,12 C8,16.2424242 9.33333333,19.5757576 12,22 Z"
        />{" "}
        <path stroke-linecap="round" d="M2.5 9L21.5 9M2.5 15L21.5 15" />{" "}
      </svg>
    </div>
  );
};

export default SwitchLanguageIcon;
