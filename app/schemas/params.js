exports.isId = {
  id: {
    in: ['params'],
    errorMessage: 'Please enter a valid id',
    isInt: true,
    toInt: true
  }
};
