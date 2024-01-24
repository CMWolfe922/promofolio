import React, { useState } from "react";

type FormProps = {
    children: React.ReactNode;
    onSubmit: (values: Record<string, any>) => void;
};

function Form({ children, onSubmit }: FormProps) {
    const [values, setValues] = useState<Record<string, any>>({});

    const handleChange = (name: string, value: any) => {
        setValues({ ...values, [name]: value });
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(values);
            }}
        >
            {React.Children.map(children, child => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, { onChange: handleChange, value: values[child.props.name] });
                }
                return child;
            })}
        </form>
    );
}

type InputProps = {
    name: string;
    type?: string;
    value?: any;
    onChange?: (name: string, value: any) => void;
};

function Input({ name, type = "text", value, onChange }: InputProps) {
    return (
        <input
            name={name}
            type={type}
            value={value || ""}
            onChange={e => onChange && onChange(name, e.target.value)}
        />
    );
}

export { Form, Input };