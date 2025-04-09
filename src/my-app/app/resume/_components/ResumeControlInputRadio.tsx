"use client";

interface Props {
    children?: string;
    name?: string;
    selected?: string;
    items: Array<{ label: string, value: string }>;
    onChange?: (value: string) => void,
}

export default function ResumeControlInputRadio(props: Props) {
    const children = props.children || '';
    const name = props.name || '';
    const selected = props.selected || '';
    const items = props.items || Array<{ label: string, value: string }>();
    const onChange = props.onChange || function (value: string) { };

    const rows = items.map((item, index) => {
        return (
            <div className="flex items-center" key={index}>
                <input type="radio" className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    id={`${name}-${index}`} name={name} value={item.value} checked={item.value === selected} onChange={(e) => { onChange(e.target.value) }} />
                <label htmlFor={`${name}-${index}`} className="mr-2 text-xs font-medium text-gray-900">
                    {item.label}
                </label>
            </div>
        );
    });

    return (
        <div className="mb-2">
            <label htmlFor={`${name}-label`} className="block text-gray-700 text-sm font-bold">
                {children}
            </label>
            <div className="flex items-center">
                {rows}
            </div >
        </div >
    );
}