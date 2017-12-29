// all languages
var langs = ['es'];
// default language
var dflt = 'es';
// import language
var locale = window.navigator.language.substr(0, 2);
if (langs.indexOf(locale) === -1)
  locale = dflt;
var lang = document.createElement('script');
lang.src = `/lang/${locale}.js`;
// insert languaje
document.head.appendChild(lang);
