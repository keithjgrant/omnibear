document.addEventListener('DOMContentLoaded', function () {
  var redirectField = document.getElementById('redirect-uri');
  var redirectUrl = document.location.origin + '/index.html';
  redirectField.value = redirectUrl;

  var form = document.querySelector('#login > form');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var inputs = form.querySelectorAll('input[name]');
    var values = Array.prototype.map.call(inputs, i => `${i.name}=${encodeURIComponent(i.value)}`);
    var url = `${form.action}?${values.join('&')}`;
    chrome.tabs.create({url: url}, function (tab) {
      chrome.runtime.sendMessage({
        action: 'begin-auth',
        payload: { tabId: tab.id }
      });
    });
  });
});

/*
will eventually direct to:
https://indieauth.com/success?code=1487345376.VihBkrfpo-QC0fKBQHFyPHp-epf52Xp5-RLqoxSJjTDIXsB53BB51H3taXvVOmiErd1w-dVoKIvCW9d_V-_tAi6E3cr3Clj1KE3M9E4xEBdh6D2U-OQ6DusjnGX8lKhKhn5jriADtzsTXPgQcguOBO9mZgJfixupnKMKGnoQeg1chgGquYF1V20_-rIg8XNaRM3-oVC_IZjqoF58lbM99MoivdLxXRbT6llmZrZTxIYLV6x3i39_WYMGm2GrTxrf9KMBM1MD9aoGvQx2Wb2IW4tqqPwegatDw8iG0qtgOVIY9co7HD_GA_kr0H1JxukCtmSpCniUENVcHqar74rCT2lhiM8gICvEEpV2qg2peiuuSXKH_u0dS2_4fFAnCg0gqQmOQ_3yRr_erYtydTH2nqu7iiibws4KcrM9u1ae5PpvE9GCm6D88NKV-3_ogcnWeXwjv7qn-6yl1HJpvOqtKA==.trlO3NyGwrd_E-2uVXzbjg==&me=http%3A%2F%2Fkeithjgrant.com%2F&state=BIG_RANDOM_BLOB_HERE


chrome.tabs.remove(tabId)
*/

/*
https://indieauth.com/auth?
me=http%3A%2F%2Fkeithjgrant.com%2F&
redirect_uri=https%3A%2F%2Ftelegraph.p3k.io%2Flogin%2Fcallback&
client_id=https%3A%2F%2Ftelegraph.p3k.io%2F&
state=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtZSI6Imh0dHA6XC9cL2tlaXRoamdyYW50LmNvbVwvIiwiYXV0aG9yaXphdGlvbl9lbmRwb2ludCI6Imh0dHBzOlwvXC9pbmRpZWF1dGguY29tXC9hdXRoIiwicmV0dXJuX3RvIjoiIiwidGltZSI6MTQ4NzI3MDA4OCwiZXhwIjoxNDg3MjcwMzg4fQ.bS9yB_2EwLoF5nZyyz0mDa94eJ7y_GWvrqmbwjC3EAE&
response_type=id
*/
