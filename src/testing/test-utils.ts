export const mockDateNowForAllTests = (givenDate: Date) => {

    const OriginalDateNowFunc = global.Date.now;

    global.Date.now = () => givenDate.getTime();

    afterAll(() => {
        global.Date.now = OriginalDateNowFunc;
    });
};
