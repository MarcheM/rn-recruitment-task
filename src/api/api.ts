export class ApiError extends Error {
    constructor(
        message: string,
        public status?: number,
        public data?: unknown
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

export const fetchData = async<T>(url: string): Promise<T> => {
    try {
        const response = await fetch(`https://rickandmortyapi.com/api/${url}`);
        
        if (!response.ok) {
            throw new ApiError(
                `HTTP error! status: ${response.status}`,
                response.status,
                await response.json().catch(() => null)
            );
        }

        const data = await response.json();
        return data;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        
        if (error instanceof Error) {
            throw new ApiError(
                `Network error: ${error.message}`,
                undefined,
                error
            );
        }

        throw new ApiError('Unknown error occurred');
    }
}