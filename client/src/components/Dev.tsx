interface Props {
    children: React.ReactNode;
}

export const Dev: React.FC<Props & React.HTMLAttributes<HTMLDivElement>> = ({children, ...props}) => {
    const {className} = props;

    if (process.env.NODE_ENV !== 'development') {
        return null;
    }
    
    return (
        <div className={`dev ${className}`}>
           <strong className="mx-2">DEV</strong>
           {children}
        </div>
    );
}