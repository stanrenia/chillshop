export const setupMockedDateForAllTests = (mockedDate: Date) => {

    const OriginalDate = global.Date;

    (global.Date as any) = class extends OriginalDate {
        constructor() {
            super();
            return new OriginalDate(mockedDate);
        }
    };

    afterAll(() => {
        global.Date = OriginalDate;
    });
};
