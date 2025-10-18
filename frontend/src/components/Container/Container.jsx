export default function Container({children}) {
    return <div className="w-full max-w-7xl mx-auto px-4">{children}</div>;               //if there is single line return then you may also remove parenthesis.
}