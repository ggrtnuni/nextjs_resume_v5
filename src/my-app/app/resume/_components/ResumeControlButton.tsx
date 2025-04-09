"use client";

interface Props {
    children?: string,
    show?: boolean,
    level?: string,
    onClick?: () => void,
}

export default function ResumeControlButton(props: Props) {
    const children = props.children || '';
    const show = props.show || true;
    const level = props.level || 'primary';
    const onClick = props.onClick || function () { }

    let buttonClass = 'text-white text-nowrap bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded text-xs  px-1 py-1 me-1 mb-1  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800';
    if (level === 'danger') {
        buttonClass = 'text-white text-nowrap bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded text-xs  px-1 py-1 me-1 mb-1  dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800';
    }

    if (show) {
        return (
            <button type="button" className={buttonClass} onClick={() => { onClick() }}>
                {children}
            </button>
        )
    } else {
        return (
            <></>
        );
    }
}