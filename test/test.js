// this is a dummy test just to showcase test step in jenkins pipeline

describe('dummy test', () => {
  it('check if 4 does not exist in the array', () => {
    expect([1,2,3].indexOf(4)).toEqual(-1);
  });
});