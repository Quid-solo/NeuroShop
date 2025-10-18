export default function Button({
    children,
    type='button',
    classname='bg-blue-600 text-white px-4 py-2 rounded-lg',
    ...props
}) {
    return(
        <button type={type} className={classname} {...props}>
            {children}
        </button>
    )
}