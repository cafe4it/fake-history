'use strict';
import 'style!css!purecss/build/pure-min.css';
import './index.css';
import riot from 'riot';
import './app.tag';
document.title = chrome.i18n.getMessage('options_page_Title');

riot.mount('*');






