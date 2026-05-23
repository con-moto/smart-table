import {rules, createComparison} from "../lib/compare.js";

export function initSearching(searchField) {
    // #5.1 — настроить компаратор
    const compareFn = createComparison(
        ['skipEmptyTargetValues'],
        [
            rules.searchMultipleFields(
                searchField,
                ['date', 'customer', 'seller'],
                false
            )
        ]
    );

    return (data, state, action) => {
        // #5.2 — применить компаратор
        return data.filter(row => compareFn(row, state));
    };
}