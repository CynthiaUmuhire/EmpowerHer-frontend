import React, { ErrorInfo, ReactNode } from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

interface Props {
    children: ReactNode;
}

const ErrorFallback = () => {
    return <h1>Something went wrong.</h1>;
};

const ErrorBoundary: React.FC<Props> = ({ children }) => {
    const handleError = (error: Error, errorInfo: ErrorInfo) => {
        console.log("ErrorBoundary")
        console.error('ErrorBoundary caught an error: ', error, {
            componentStack: errorInfo.componentStack || 'No stack trace available',
        });
    };

    return (
        <ReactErrorBoundary FallbackComponent={ErrorFallback} onError={handleError}>
            {children}
        </ReactErrorBoundary>
    );
};

export default ErrorBoundary;