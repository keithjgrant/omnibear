
function getFormValues (form) {
  var inputs = form.querySelectorAll('input[name], textarea');
  var values = {};
  Array.prototype.forEach.call(inputs, (i) => {
    if (typeof values[i.name] === 'undefined') {
      values[i.name] = i.value;
    } else {
      if (!Array.isArray(values[i.name])) {
        values[i.name] = [values[i.name]];
      }
      values[i.name].push(i.value);
    }
  });
  return values;
}

function buildFieldsString (form) {
  var inputs = form.querySelectorAll('input[name], textarea');
  var values = Array.prototype.map.call(inputs, (i) => {
    return `${i.name}=${encodeURIComponent(i.value)}`;
  });
  return values.join('&');
}

module.exports = {
  getFormValues: getFormValues,
  buildFieldsString: buildFieldsString
};
