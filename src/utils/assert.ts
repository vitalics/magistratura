export function assert(value?: unknown, message?: string): asserts value {
    if (!value)
        throw new Error(message);
}

export function assertNull(value?: unknown): asserts value {
    const isNull = typeof value === 'object' && !value;
    assert(!isNull, 'input value is null');
}

export function assertEqual<T1 extends Object & Record<string, unknown>, T2 extends Object & Record<string, unknown>>(obj1: T1, obj2: T2, excludeKeys?: (keyof T1 & keyof T2)[]) {
    const isObjectEqual = isEqual(obj1, obj2, excludeKeys);
    assert(isObjectEqual, 'compared objects are not equals')
}

function isEqual<T1 extends Object & Record<string, unknown>, T2 extends Object & Record<string, unknown>>(object1: T1, object2: T2, excludeKeys?: (keyof T1 & keyof T2)[]) {
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(object1);
    var bProps = Object.getOwnPropertyNames(object2);

    // If number of properties is different,
    // objects are not equivalent
    // eslint-disable-next-line eqeqeq
    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (excludeKeys && excludeKeys.length && excludeKeys.indexOf(propName) !== -1) {
            continue;
        }
        if (object1[propName] !== object2[propName]) {
            return false;
        }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
}

