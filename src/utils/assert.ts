export function assert(value?: unknown, message?: string): asserts value {
    if (!value)
        throw new Error(message);
}

export function assertNull(value?: unknown): asserts value {
    const isNull = typeof value === 'object' && !value;
    assert(!isNull, 'input value is null');
}