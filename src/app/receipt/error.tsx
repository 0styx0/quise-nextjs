'use client'

import { ErrorMessage } from "@/components/ErrorMessage";

interface ErrorProps {
    error: Error
}

export default function Error({ error }: ErrorProps) {
    
    return (
        <ErrorMessage title="Unable to fetch order" message={error.message} />
    )
}