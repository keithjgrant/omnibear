import micropub from '../util/micropub';
import {getAuthTab, logout} from '../util/utils';
import {info, warning, error} from '../util/log';

export function fetchToken(code) {
  micropub.options.me = localStorage.getItem('domain');
  micropub.options.tokenEndpoint = localStorage.getItem('tokenEndpoint');
  micropub.options.micropubEndpoint = localStorage.getItem('micropubEndpoint');
  return micropub
    .getToken(code)
    .then(function(token) {
      if (!token) {
        throw new Error(
          'Token not found in token endpoint response. Missing expected field `access_token`'
        );
      }
      localStorage.setItem('token', token);
      micropub.options.token = token;
    })
    .catch(function(err) {
      error('Error fetching token', err);
      getAuthTab().then(tab => {
        chrome.tabs.sendMessage(tab.id, {
          action: 'fetch-token-error',
          payload: {
            error: err,
          },
        });
        logout();
      });
    });
}

export function fetchSyndicationTargets() {
  return micropub.query('syndicate-to').then(response => {
    const syndicateTo = response['syndicate-to'];
    info('Syndication targets retreived', syndicateTo);
    if (Array.isArray(syndicateTo)) {
      localStorage.setItem('syndicateTo', JSON.stringify(syndicateTo));
    } else {
      warning(
        `Syndication targets not in array format. Saving as empty array.`
      );
      localStorage.setItem('syndicateTo', JSON.stringify([]));
    }
  });
}
