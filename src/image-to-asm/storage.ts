export default {
    save(key: string, data: any): void {
        localStorage.setItem(key, JSON.stringify(data));
    },

    load(key: string): any {
        const dataText = localStorage.getItem(key);
        if (dataText) {
            try {
                return JSON.parse(dataText);
            } catch (e) {}
        }
        return null;
    },

    remove(key: string): void {
        localStorage.removeItem(key);
    }
};
