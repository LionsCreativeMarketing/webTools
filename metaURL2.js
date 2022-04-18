//Paste this code into the head of the project to duplicate on every page.
//<script src="https://cdn.jsdelivr.net/gh/LionsCreativeMarketing/webTools@main/metaURL2.js"></script>
//$('head').append('<meta property="og:url" content="'+window.location.href+'">');
var meta = document.createElement('meta');
meta.property = "og:url";
meta.content = ""+window.location.href+"";
document.getElementsByTagName('head')[0].appendChild(meta);
