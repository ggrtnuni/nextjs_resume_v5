"use client";

interface Props {
    children?: React.ReactNode;
    label?: string;
    name?: string;
    checked?: boolean;
    onChange?: (checked: boolean) => void,
}

export default function ResumeControlInputCheckbox(props: Props) {
    const children = props.children || '';
    const label = props.label || '';
    const name = props.name || '';
    const checked = props.checked || false;
    const onChange = props.onChange || Function();

    return (
        <div className="mb-2">
            <label htmlFor={`${name}-label`} className="block text-nowrap text-gray-700 text-sm font-bold">
                {children}
            </label>
            <div className="flex items-center">
                <input type="checkbox" id={name} name={name} defaultChecked={checked} value="1"
                    className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
                    onChange={(e) => { onChange(e.target.checked) }} />
                <label htmlFor={name} className="ml-2 text-xs font-medium text-gray-900">
                    {label}
                </label>
            </div>
        </div>
    );
}