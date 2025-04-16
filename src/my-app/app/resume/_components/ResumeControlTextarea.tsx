"use client";

interface Props {
    children?: React.ReactNode;
    name?: string;
    value?: string;
    onInput?: (value: string) => void,
}

export default function ResumeControlInputText(props: Props) {
    const children = props.children || '';
    const name = props.name || '';
    const value = props.value || '';
    const onInput = props.onInput || Function();

    const inputClass = 'shadow appearance-none border rounded w-full py-1 px-3 text-xs text-gray-700 leading-tight focus:outline-none forcus:shadow-outline';

    return (
        <div className="space-y-2 mb-2">
            <label htmlFor={name} className="block text-gray-700 text-sm font-bold">
                {children}
            </label>
            <textarea className={inputClass} id={name} name={name} defaultValue={value} rows={10}
                onChange={(e) => { onInput(e.target.value) }}>
            </textarea>
        </div>
    );
}