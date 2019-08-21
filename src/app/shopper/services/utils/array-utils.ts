import { Injectable } from '@angular/core';

export type StringOrNumber = string | number;

@Injectable({
    providedIn: 'root'
})
export class ArrayUtils {

    constructor() {}

    sortFromReferenceList<T>(array: Array<T>, referenceList: Array<StringOrNumber>, getter: (a: T) => StringOrNumber): Array<T> {
        if (array && array.length && referenceList && referenceList.length) {
            const indexByReference = referenceList.reduce((acc, next, index) => ((acc[next] = index) , acc), {});

            return [...array].sort((a, b) => {
                const indexOfA = indexByReference[getter(a)];
                const indexOfB = indexByReference[getter(b)];
                return indexOfA - indexOfB;
            });
        }

        return array;
    }
}
