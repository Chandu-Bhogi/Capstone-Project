import * as React from "react";

function SvgInlineEdit(props) {
    return (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 19 19"
            fill="none"
            {...props}
        >
            <path
                d="M16 7.5v8.625A1.875 1.875 0 0114.125 18H2.875A1.875 1.875 0 011 16.125V4.875A1.875 1.875 0 012.875 3h7.85"
                stroke="#0091AE"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M17.484.158L6.649 10.97a.54.54 0 00-.138.235L6.01 12.7a.235.235 0 00.291.291l1.492-.5a.541.541 0 00.236-.14L18.844 1.518a.54.54 0 000-.76l-.597-.6a.54.54 0 00-.763 0z"
                fill="#0091AE"
            />
        </svg>
    );
}

export default SvgInlineEdit;
