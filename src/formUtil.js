
function buildFieldsString (form) {
  var inputs = form.querySelectorAll('input[name]');
  var values = Array.prototype.map.call(inputs, (i) => {
    return `${i.name}=${encodeURIComponent(i.value)}`;
  });
  return values.join('&');
}

module.exports = {
  buildFieldsString: buildFieldsString
};
