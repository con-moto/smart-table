import {createComparison, defaultRules} from "../lib/compare.js";

export function initFiltering(elements, indexes) {
    // #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes)
        .forEach((elementName) => {
            elements[elementName].append(
                ...Object.values(indexes[elementName])
                    .map(name => {
                        const option = document.createElement('option');
                        option.value = name;
                        option.textContent = name;
                        return option;
                    })
            );
        });

    return (data, state, action) => {
        // #4.2 — обработка очистки поля (можно пока оставить пустой)

        // #4.3 — настроить компаратор
        const compareFn = createComparison(defaultRules);

        // #4.5 — отфильтровать данные используя компаратор + диапазон по сумме
        return data.filter(row => {
            if (!compareFn(row, state)) {
                return false;
            }

            const total = row.total;

            const min = state.totalFrom ? parseFloat(state.totalFrom) : null;
            const max = state.totalTo ? parseFloat(state.totalTo) : null;

            if (min !== null && !Number.isNaN(min) && total < min) {
                return false;
            }

            if (max !== null && !Number.isNaN(max) && total > max) {
                return false;
            }

            return true;
        });
    };
}