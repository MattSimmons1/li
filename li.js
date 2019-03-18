//
// lightweight - li.js - Matt Simmons 2018 - version 0.4.1
//


var css = `
  @import url('https://fonts.googleapis.com/css?family=Source+Code+Pro:200,400,600');

  body {
    font-family: 'Source Code Pro', monospace;
    margin: 10vw;
    color: #282a2e;
  }
  h1 {
    font-size: 50px;
  }
  p, li, ol, ul, td, th, textarea, blockquote {
    font-size: 12px;
  }
  pre {
    padding: 1vw;
    background: #282a2e;
    overflow-y: scroll;
  }
  pre::-webkit-scrollbar {
    display: none;
  }
  code {
    background: #282a2e;
    color: white;
    line-height: 1.5;
  }
  hr {
    height: 0px;
    margin: 2.5vh 0 2.5vh 0;
  }
  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 80vw;
    max-height: 80vh;
  }
  table {
    margin: 0 10vw 0 10vw;
    width: 60vw;
    table-layout: fixed;
    border-collapse: collapse;
  }
  .li-blockquote {
    border-left: 3px solid #282a2e;
    margin: 24px 0 24px 0;
    padding: 0 48px 0 48px;
  }

  .li-quote {
    margin: 60px 0 60px 0;
  }
  .li-quote p {
    position: relative;
    font-style: italic;
    font-size: 3em;
  }
  .li-quote p:before {
    content: '\\201C';
    position: absolute;
    font-style: normal;

    top: -42px;
    left: -35px;
    color: #aaa;
    font-size: 110px;
    z-index: -1;
  }
  .li-quote-attribution {
    position: absolute;
    color: #aaa;
    right: 10vw;
    margin-top: -36px;
  }

  thead {
  }
  tr {
  }
  td, th {
    text-align: left;
    padding: 3px;
    border-left: 0.5px solid #ddd;
  }
  th {
  border-bottom: 0.5px solid #ddd;
  }
  tr:hover {
    background-color: #ddd;
  }
  .big-spacer {
    height: 50vh;
  }
  .spacer {
    height: 10vh;
  }
  .li-editor-box {
    width: 80vw;
    resize: none;
    border: none;
    background: #282a2e;
    color: white;
    font-family: monospace;
    padding: 8px;
  }
  .li-editor-container {
    margin: 10px 0 10px 0;
    position: relative;
  }
  .li-tooltip {
    position: relative;
    display: inline-block;
    border-bottom: 1px dotted #282a2e;
  }
  .li-tooltip .li-tooltip-text {
    visibility: hidden;
    width: max-content;
    background-color: #282a2e;
    color: #fff;
    padding: 5px;
    border-radius: 3px;

    position: absolute;
    z-index: 1;
    top: 125%;
    left: 50%;
    transform: translate(-50%, 0);
  }
  .li-tooltip:hover .li-tooltip-text {
    visibility: visible;
  }
  .li-centred-outer {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    padding 0;
    margin 0;
  }
  .li-centred-inner {
    grid-column: 2;
    text-align: center;
    padding 0;
    margin 0;
  }
  .li-nav-bar {
    position: absolute;
    background: #282a2e;
    top: 0;
    left: 0;
    width: calc(90vw + 18px);
    height: 24px;
    margin: 0;
    padding: 6px 0 6px calc(10vw - 18px);
    z-index: -100;
  }
  .li-nav-bar a {
    color: white;
    font-size: 12px;
    text-decoration: none;
    margin: 0 18px 0 18px;
  }
  .li-nav-bar a:hover {
      text-decoration: underline;
  }

  .li-watermark {
    position: absolute;
    top: 0;
    right: 0;
    margin: 6px;
    opacity: 0.2;
    z-index: 1;
  }
  .li-watermark:hover {
    opacity: 1;
  }
  .li-download {
    right: 31px;
  }
  .li-edit-icon {
    position: absolute;
    pointer-events:none;
    visibility: hidden;
  }

  .li-d3-tooltip {
    position: absolute;
    pointer-events: none;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .li-d3-tooltip-box {
    width: max-content;
    height: auto;
    padding: 6px;
    border-radius: 4px;
    background: #282a2e;
    color: white;
    font-size: 12px;
  }
  .li-d3-tooltip-pointer {
	width: 0;
	height: 0;
	border-left: 5px solid transparent;
	border-right: 5px solid transparent;
	border-top: 10px solid #282a2e;
  }
  .li-bar-chart {
    fill: #282a2e;
  }
  .li-sankey-node rect {
    cursor: move;
    shape-rendering: crispEdges;
  }
  .li-sankey-node text {
    pointer-events: none;
    text-shadow: 0 1px 0 #fff;
  }
  .li-sankey-link {
    fill: none;
    stroke-opacity: .4;
  }
  .li-sankey-link:hover {
    stroke-opacity: .7 !important;
  }
  .tick text {
    font-weight: lighter;
    font-family: 'Source Code Pro';
    color: #282a2e;
    stroke: none;
  }

`

var style = document.createElement('style');

if (style.styleSheet) {
    style.styleSheet.cssText = css;
} else {
    style.appendChild(document.createTextNode(css));
}

document.getElementsByTagName('head')[0].appendChild(style);

//https://github.com/showdownjs/showdown
(function(){function g(g){"use strict";var A={omitExtraWLInCodeBlocks:{defaultValue:!1,describe:"Omit the default extra whiteline added to code blocks",type:"boolean"},noHeaderId:{defaultValue:!1,describe:"Turn on/off generated header id",type:"boolean"},prefixHeaderId:{defaultValue:!1,describe:"Add a prefix to the generated header ids. Passing a string will prefix that string to the header id. Setting to true will add a generic 'section-' prefix",type:"string"},rawPrefixHeaderId:{defaultValue:!1,describe:'Setting this option to true will prevent showdown from modifying the prefix. This might result in malformed IDs (if, for instance, the " char is used in the prefix)',type:"boolean"},ghCompatibleHeaderId:{defaultValue:!1,describe:"Generate header ids compatible with github style (spaces are replaced with dashes, a bunch of non alphanumeric chars are removed)",type:"boolean"},rawHeaderId:{defaultValue:!1,describe:"Remove only spaces, ' and \" from generated header ids (including prefixes), replacing them with dashes (-). WARNING: This might result in malformed ids",type:"boolean"},headerLevelStart:{defaultValue:!1,describe:"The header blocks level start",type:"integer"},parseImgDimensions:{defaultValue:!1,describe:"Turn on/off image dimension parsing",type:"boolean"},simplifiedAutoLink:{defaultValue:!1,describe:"Turn on/off GFM autolink style",type:"boolean"},excludeTrailingPunctuationFromURLs:{defaultValue:!1,describe:"Excludes trailing punctuation from links generated with autoLinking",type:"boolean"},literalMidWordUnderscores:{defaultValue:!1,describe:"Parse midword underscores as literal underscores",type:"boolean"},literalMidWordAsterisks:{defaultValue:!1,describe:"Parse midword asterisks as literal asterisks",type:"boolean"},strikethrough:{defaultValue:!1,describe:"Turn on/off strikethrough support",type:"boolean"},tables:{defaultValue:!1,describe:"Turn on/off tables support",type:"boolean"},tablesHeaderId:{defaultValue:!1,describe:"Add an id to table headers",type:"boolean"},ghCodeBlocks:{defaultValue:!0,describe:"Turn on/off GFM fenced code blocks support",type:"boolean"},tasklists:{defaultValue:!1,describe:"Turn on/off GFM tasklist support",type:"boolean"},smoothLivePreview:{defaultValue:!1,describe:"Prevents weird effects in live previews due to incomplete input",type:"boolean"},smartIndentationFix:{defaultValue:!1,description:"Tries to smartly fix indentation in es6 strings",type:"boolean"},disableForced4SpacesIndentedSublists:{defaultValue:!1,description:"Disables the requirement of indenting nested sublists by 4 spaces",type:"boolean"},simpleLineBreaks:{defaultValue:!1,description:"Parses simple line breaks as <br> (GFM Style)",type:"boolean"},requireSpaceBeforeHeadingText:{defaultValue:!1,description:"Makes adding a space between `#` and the header text mandatory (GFM Style)",type:"boolean"},ghMentions:{defaultValue:!1,description:"Enables github @mentions",type:"boolean"},ghMentionsLink:{defaultValue:"https://github.com/{u}",description:"Changes the link generated by @mentions. Only applies if ghMentions option is enabled.",type:"string"},encodeEmails:{defaultValue:!0,description:"Encode e-mail addresses through the use of Character Entities, transforming ASCII e-mail addresses into its equivalent decimal entities",type:"boolean"},openLinksInNewWindow:{defaultValue:!1,description:"Open all links in new windows",type:"boolean"},backslashEscapesHTMLTags:{defaultValue:!1,description:"Support for HTML Tag escaping. ex: <div>foo</div>",type:"boolean"},emoji:{defaultValue:!1,description:"Enable emoji support. Ex: `this is a :smile: emoji`",type:"boolean"},underline:{defaultValue:!1,description:"Enable support for underline. Syntax is double or triple underscores: `__underline word__`. With this option enabled, underscores no longer parses into `<em>` and `<strong>`",type:"boolean"},completeHTMLDocument:{defaultValue:!1,description:"Outputs a complete html document, including `<html>`, `<head>` and `<body>` tags",type:"boolean"},metadata:{defaultValue:!1,description:"Enable support for document metadata (defined at the top of the document between `«««` and `»»»` or between `---` and `---`).",type:"boolean"},splitAdjacentBlockquotes:{defaultValue:!1,description:"Split adjacent blockquote blocks",type:"boolean"}};if(!1===g)return JSON.parse(JSON.stringify(A));var C={};for(var I in A)A.hasOwnProperty(I)&&(C[I]=A[I].defaultValue);return C}function A(g,A){"use strict";var C=A?"Error in "+A+" extension->":"Error in unnamed extension",e={valid:!0,error:""};I.helper.isArray(g)||(g=[g]);for(var r=0;r<g.length;++r){var t=C+" sub-extension "+r+": ",a=g[r];if("object"!=typeof a)return e.valid=!1,e.error=t+"must be an object, but "+typeof a+" given",e;if(!I.helper.isString(a.type))return e.valid=!1,e.error=t+'property "type" must be a string, but '+typeof a.type+" given",e;var n=a.type=a.type.toLowerCase();if("language"===n&&(n=a.type="lang"),"html"===n&&(n=a.type="output"),"lang"!==n&&"output"!==n&&"listener"!==n)return e.valid=!1,e.error=t+"type "+n+' is not recognized. Valid values: "lang/language", "output/html" or "listener"',e;if("listener"===n){if(I.helper.isUndefined(a.listeners))return e.valid=!1,e.error=t+'. Extensions of type "listener" must have a property called "listeners"',e}else if(I.helper.isUndefined(a.filter)&&I.helper.isUndefined(a.regex))return e.valid=!1,e.error=t+n+' extensions must define either a "regex" property or a "filter" method',e;if(a.listeners){if("object"!=typeof a.listeners)return e.valid=!1,e.error=t+'"listeners" property must be an object but '+typeof a.listeners+" given",e;for(var o in a.listeners)if(a.listeners.hasOwnProperty(o)&&"function"!=typeof a.listeners[o])return e.valid=!1,e.error=t+'"listeners" property must be an hash of [event name]: [callback]. listeners.'+o+" must be a function but "+typeof a.listeners[o]+" given",e}if(a.filter){if("function"!=typeof a.filter)return e.valid=!1,e.error=t+'"filter" must be a function, but '+typeof a.filter+" given",e}else if(a.regex){if(I.helper.isString(a.regex)&&(a.regex=new RegExp(a.regex,"g")),!(a.regex instanceof RegExp))return e.valid=!1,e.error=t+'"regex" property must either be a string or a RegExp object, but '+typeof a.regex+" given",e;if(I.helper.isUndefined(a.replace))return e.valid=!1,e.error=t+'"regex" extensions must implement a replace string or function',e}}return e}function C(g,A){"use strict";return"¨E"+A.charCodeAt(0)+"E"}var I={},e={},r={},t=g(!0),a="vanilla",n={github:{omitExtraWLInCodeBlocks:!0,simplifiedAutoLink:!0,excludeTrailingPunctuationFromURLs:!0,literalMidWordUnderscores:!0,strikethrough:!0,tables:!0,tablesHeaderId:!0,ghCodeBlocks:!0,tasklists:!0,disableForced4SpacesIndentedSublists:!0,simpleLineBreaks:!0,requireSpaceBeforeHeadingText:!0,ghCompatibleHeaderId:!0,ghMentions:!0,backslashEscapesHTMLTags:!0,emoji:!0,splitAdjacentBlockquotes:!0},original:{noHeaderId:!0,ghCodeBlocks:!1},ghost:{omitExtraWLInCodeBlocks:!0,parseImgDimensions:!0,simplifiedAutoLink:!0,excludeTrailingPunctuationFromURLs:!0,literalMidWordUnderscores:!0,strikethrough:!0,tables:!0,tablesHeaderId:!0,ghCodeBlocks:!0,tasklists:!0,smoothLivePreview:!0,simpleLineBreaks:!0,requireSpaceBeforeHeadingText:!0,ghMentions:!1,encodeEmails:!0},vanilla:g(!0),allOn:function(){"use strict";var A=g(!0),C={};for(var I in A)A.hasOwnProperty(I)&&(C[I]=!0);return C}()};I.helper={},I.extensions={},I.setOption=function(g,A){"use strict";return t[g]=A,this},I.getOption=function(g){"use strict";return t[g]},I.getOptions=function(){"use strict";return t},I.resetOptions=function(){"use strict";t=g(!0)},I.setFlavor=function(g){"use strict";if(!n.hasOwnProperty(g))throw Error(g+" flavor was not found");I.resetOptions();var A=n[g];a=g;for(var C in A)A.hasOwnProperty(C)&&(t[C]=A[C])},I.getFlavor=function(){"use strict";return a},I.getFlavorOptions=function(g){"use strict";if(n.hasOwnProperty(g))return n[g]},I.getDefaultOptions=function(A){"use strict";return g(A)},I.subParser=function(g,A){"use strict";if(I.helper.isString(g)){if(void 0===A){if(e.hasOwnProperty(g))return e[g];throw Error("SubParser named "+g+" not registered!")}e[g]=A}},I.extension=function(g,C){"use strict";if(!I.helper.isString(g))throw Error("Extension 'name' must be a string");if(g=I.helper.stdExtName(g),I.helper.isUndefined(C)){if(!r.hasOwnProperty(g))throw Error("Extension named "+g+" is not registered!");return r[g]}"function"==typeof C&&(C=C()),I.helper.isArray(C)||(C=[C]);var e=A(C,g);if(!e.valid)throw Error(e.error);r[g]=C},I.getAllExtensions=function(){"use strict";return r},I.removeExtension=function(g){"use strict";delete r[g]},I.resetExtensions=function(){"use strict";r={}},I.validateExtension=function(g){"use strict";var C=A(g,null);return!!C.valid||(console.warn(C.error),!1)},I.hasOwnProperty("helper")||(I.helper={}),I.helper.isString=function(g){"use strict";return"string"==typeof g||g instanceof String},I.helper.isFunction=function(g){"use strict";return g&&"[object Function]"==={}.toString.call(g)},I.helper.isArray=function(g){"use strict";return Array.isArray(g)},I.helper.isUndefined=function(g){"use strict";return void 0===g},I.helper.forEach=function(g,A){"use strict";if(I.helper.isUndefined(g))throw new Error("obj param is required");if(I.helper.isUndefined(A))throw new Error("callback param is required");if(!I.helper.isFunction(A))throw new Error("callback param must be a function/closure");if("function"==typeof g.forEach)g.forEach(A);else if(I.helper.isArray(g))for(var C=0;C<g.length;C++)A(g[C],C,g);else{if("object"!=typeof g)throw new Error("obj does not seem to be an array or an iterable object");for(var e in g)g.hasOwnProperty(e)&&A(g[e],e,g)}},I.helper.stdExtName=function(g){"use strict";return g.replace(/[_?*+\/\\.^-]/g,"").replace(/\s/g,"").toLowerCase()},I.helper.escapeCharactersCallback=C,I.helper.escapeCharacters=function(g,A,I){"use strict";var e="(["+A.replace(/([\[\]\\])/g,"\\$1")+"])";I&&(e="\\\\"+e);var r=new RegExp(e,"g");return g=g.replace(r,C)};var o=function(g,A,C,I){"use strict";var e,r,t,a,n,o=I||"",s=o.indexOf("g")>-1,i=new RegExp(A+"|"+C,"g"+o.replace(/g/g,"")),l=new RegExp(A,o.replace(/g/g,"")),c=[];do{for(e=0;t=i.exec(g);)if(l.test(t[0]))e++||(a=(r=i.lastIndex)-t[0].length);else if(e&&!--e){n=t.index+t[0].length;var u={left:{start:a,end:r},match:{start:r,end:t.index},right:{start:t.index,end:n},wholeMatch:{start:a,end:n}};if(c.push(u),!s)return c}}while(e&&(i.lastIndex=r));return c};I.helper.matchRecursiveRegExp=function(g,A,C,I){"use strict";for(var e=o(g,A,C,I),r=[],t=0;t<e.length;++t)r.push([g.slice(e[t].wholeMatch.start,e[t].wholeMatch.end),g.slice(e[t].match.start,e[t].match.end),g.slice(e[t].left.start,e[t].left.end),g.slice(e[t].right.start,e[t].right.end)]);return r},I.helper.replaceRecursiveRegExp=function(g,A,C,e,r){"use strict";if(!I.helper.isFunction(A)){var t=A;A=function(){return t}}var a=o(g,C,e,r),n=g,s=a.length;if(s>0){var i=[];0!==a[0].wholeMatch.start&&i.push(g.slice(0,a[0].wholeMatch.start));for(var l=0;l<s;++l)i.push(A(g.slice(a[l].wholeMatch.start,a[l].wholeMatch.end),g.slice(a[l].match.start,a[l].match.end),g.slice(a[l].left.start,a[l].left.end),g.slice(a[l].right.start,a[l].right.end))),l<s-1&&i.push(g.slice(a[l].wholeMatch.end,a[l+1].wholeMatch.start));a[s-1].wholeMatch.end<g.length&&i.push(g.slice(a[s-1].wholeMatch.end)),n=i.join("")}return n},I.helper.regexIndexOf=function(g,A,C){"use strict";if(!I.helper.isString(g))throw"InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string";if(A instanceof RegExp==!1)throw"InvalidArgumentError: second parameter of showdown.helper.regexIndexOf function must be an instance of RegExp";var e=g.substring(C||0).search(A);return e>=0?e+(C||0):e},I.helper.splitAtIndex=function(g,A){"use strict";if(!I.helper.isString(g))throw"InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string";return[g.substring(0,A),g.substring(A)]},I.helper.encodeEmailAddress=function(g){"use strict";var A=[function(g){return"&#"+g.charCodeAt(0)+";"},function(g){return"&#x"+g.charCodeAt(0).toString(16)+";"},function(g){return g}];return g=g.replace(/./g,function(g){if("@"===g)g=A[Math.floor(2*Math.random())](g);else{var C=Math.random();g=C>.9?A[2](g):C>.45?A[1](g):A[0](g)}return g})},"undefined"==typeof console&&(console={warn:function(g){"use strict";alert(g)},log:function(g){"use strict";alert(g)},error:function(g){"use strict";throw g}}),I.helper.regexes={asteriskDashAndColon:/([*_:~])/g},I.helper.emojis={"+1":"👍","-1":"👎",100:"💯",1234:"🔢","1st_place_medal":"🥇","2nd_place_medal":"🥈","3rd_place_medal":"🥉","8ball":"🎱",a:"🅰️",ab:"🆎",abc:"🔤",abcd:"🔡",accept:"🉑",aerial_tramway:"🚡",airplane:"✈️",alarm_clock:"⏰",alembic:"⚗️",alien:"👽",ambulance:"🚑",amphora:"🏺",anchor:"⚓️",angel:"👼",anger:"💢",angry:"😠",anguished:"😧",ant:"🐜",apple:"🍎",aquarius:"♒️",aries:"♈️",arrow_backward:"◀️",arrow_double_down:"⏬",arrow_double_up:"⏫",arrow_down:"⬇️",arrow_down_small:"🔽",arrow_forward:"▶️",arrow_heading_down:"⤵️",arrow_heading_up:"⤴️",arrow_left:"⬅️",arrow_lower_left:"↙️",arrow_lower_right:"↘️",arrow_right:"➡️",arrow_right_hook:"↪️",arrow_up:"⬆️",arrow_up_down:"↕️",arrow_up_small:"🔼",arrow_upper_left:"↖️",arrow_upper_right:"↗️",arrows_clockwise:"🔃",arrows_counterclockwise:"🔄",art:"🎨",articulated_lorry:"🚛",artificial_satellite:"🛰",astonished:"😲",athletic_shoe:"👟",atm:"🏧",atom_symbol:"⚛️",avocado:"🥑",b:"🅱️",baby:"👶",baby_bottle:"🍼",baby_chick:"🐤",baby_symbol:"🚼",back:"🔙",bacon:"🥓",badminton:"🏸",baggage_claim:"🛄",baguette_bread:"🥖",balance_scale:"⚖️",balloon:"🎈",ballot_box:"🗳",ballot_box_with_check:"☑️",bamboo:"🎍",banana:"🍌",bangbang:"‼️",bank:"🏦",bar_chart:"📊",barber:"💈",baseball:"⚾️",basketball:"🏀",basketball_man:"⛹️",basketball_woman:"⛹️&zwj;♀️",bat:"🦇",bath:"🛀",bathtub:"🛁",battery:"🔋",beach_umbrella:"🏖",bear:"🐻",bed:"🛏",bee:"🐝",beer:"🍺",beers:"🍻",beetle:"🐞",beginner:"🔰",bell:"🔔",bellhop_bell:"🛎",bento:"🍱",biking_man:"🚴",bike:"🚲",biking_woman:"🚴&zwj;♀️",bikini:"👙",biohazard:"☣️",bird:"🐦",birthday:"🎂",black_circle:"⚫️",black_flag:"🏴",black_heart:"🖤",black_joker:"🃏",black_large_square:"⬛️",black_medium_small_square:"◾️",black_medium_square:"◼️",black_nib:"✒️",black_small_square:"▪️",black_square_button:"🔲",blonde_man:"👱",blonde_woman:"👱&zwj;♀️",blossom:"🌼",blowfish:"🐡",blue_book:"📘",blue_car:"🚙",blue_heart:"💙",blush:"😊",boar:"🐗",boat:"⛵️",bomb:"💣",book:"📖",bookmark:"🔖",bookmark_tabs:"📑",books:"📚",boom:"💥",boot:"👢",bouquet:"💐",bowing_man:"🙇",bow_and_arrow:"🏹",bowing_woman:"🙇&zwj;♀️",bowling:"🎳",boxing_glove:"🥊",boy:"👦",bread:"🍞",bride_with_veil:"👰",bridge_at_night:"🌉",briefcase:"💼",broken_heart:"💔",bug:"🐛",building_construction:"🏗",bulb:"💡",bullettrain_front:"🚅",bullettrain_side:"🚄",burrito:"🌯",bus:"🚌",business_suit_levitating:"🕴",busstop:"🚏",bust_in_silhouette:"👤",busts_in_silhouette:"👥",butterfly:"🦋",cactus:"🌵",cake:"🍰",calendar:"📆",call_me_hand:"🤙",calling:"📲",camel:"🐫",camera:"📷",camera_flash:"📸",camping:"🏕",cancer:"♋️",candle:"🕯",candy:"🍬",canoe:"🛶",capital_abcd:"🔠",capricorn:"♑️",car:"🚗",card_file_box:"🗃",card_index:"📇",card_index_dividers:"🗂",carousel_horse:"🎠",carrot:"🥕",cat:"🐱",cat2:"🐈",cd:"💿",chains:"⛓",champagne:"🍾",chart:"💹",chart_with_downwards_trend:"📉",chart_with_upwards_trend:"📈",checkered_flag:"🏁",cheese:"🧀",cherries:"🍒",cherry_blossom:"🌸",chestnut:"🌰",chicken:"🐔",children_crossing:"🚸",chipmunk:"🐿",chocolate_bar:"🍫",christmas_tree:"🎄",church:"⛪️",cinema:"🎦",circus_tent:"🎪",city_sunrise:"🌇",city_sunset:"🌆",cityscape:"🏙",cl:"🆑",clamp:"🗜",clap:"👏",clapper:"🎬",classical_building:"🏛",clinking_glasses:"🥂",clipboard:"📋",clock1:"🕐",clock10:"🕙",clock1030:"🕥",clock11:"🕚",clock1130:"🕦",clock12:"🕛",clock1230:"🕧",clock130:"🕜",clock2:"🕑",clock230:"🕝",clock3:"🕒",clock330:"🕞",clock4:"🕓",clock430:"🕟",clock5:"🕔",clock530:"🕠",clock6:"🕕",clock630:"🕡",clock7:"🕖",clock730:"🕢",clock8:"🕗",clock830:"🕣",clock9:"🕘",clock930:"🕤",closed_book:"📕",closed_lock_with_key:"🔐",closed_umbrella:"🌂",cloud:"☁️",cloud_with_lightning:"🌩",cloud_with_lightning_and_rain:"⛈",cloud_with_rain:"🌧",cloud_with_snow:"🌨",clown_face:"🤡",clubs:"♣️",cocktail:"🍸",coffee:"☕️",coffin:"⚰️",cold_sweat:"😰",comet:"☄️",computer:"💻",computer_mouse:"🖱",confetti_ball:"🎊",confounded:"😖",confused:"😕",congratulations:"㊗️",construction:"🚧",construction_worker_man:"👷",construction_worker_woman:"👷&zwj;♀️",control_knobs:"🎛",convenience_store:"🏪",cookie:"🍪",cool:"🆒",policeman:"👮",copyright:"©️",corn:"🌽",couch_and_lamp:"🛋",couple:"👫",couple_with_heart_woman_man:"💑",couple_with_heart_man_man:"👨&zwj;❤️&zwj;👨",couple_with_heart_woman_woman:"👩&zwj;❤️&zwj;👩",couplekiss_man_man:"👨&zwj;❤️&zwj;💋&zwj;👨",couplekiss_man_woman:"💏",couplekiss_woman_woman:"👩&zwj;❤️&zwj;💋&zwj;👩",cow:"🐮",cow2:"🐄",cowboy_hat_face:"🤠",crab:"🦀",crayon:"🖍",credit_card:"💳",crescent_moon:"🌙",cricket:"🏏",crocodile:"🐊",croissant:"🥐",crossed_fingers:"🤞",crossed_flags:"🎌",crossed_swords:"⚔️",crown:"👑",cry:"😢",crying_cat_face:"😿",crystal_ball:"🔮",cucumber:"🥒",cupid:"💘",curly_loop:"➰",currency_exchange:"💱",curry:"🍛",custard:"🍮",customs:"🛃",cyclone:"🌀",dagger:"🗡",dancer:"💃",dancing_women:"👯",dancing_men:"👯&zwj;♂️",dango:"🍡",dark_sunglasses:"🕶",dart:"🎯",dash:"💨",date:"📅",deciduous_tree:"🌳",deer:"🦌",department_store:"🏬",derelict_house:"🏚",desert:"🏜",desert_island:"🏝",desktop_computer:"🖥",male_detective:"🕵️",diamond_shape_with_a_dot_inside:"💠",diamonds:"♦️",disappointed:"😞",disappointed_relieved:"😥",dizzy:"💫",dizzy_face:"😵",do_not_litter:"🚯",dog:"🐶",dog2:"🐕",dollar:"💵",dolls:"🎎",dolphin:"🐬",door:"🚪",doughnut:"🍩",dove:"🕊",dragon:"🐉",dragon_face:"🐲",dress:"👗",dromedary_camel:"🐪",drooling_face:"🤤",droplet:"💧",drum:"🥁",duck:"🦆",dvd:"📀","e-mail":"📧",eagle:"🦅",ear:"👂",ear_of_rice:"🌾",earth_africa:"🌍",earth_americas:"🌎",earth_asia:"🌏",egg:"🥚",eggplant:"🍆",eight_pointed_black_star:"✴️",eight_spoked_asterisk:"✳️",electric_plug:"🔌",elephant:"🐘",email:"✉️",end:"🔚",envelope_with_arrow:"📩",euro:"💶",european_castle:"🏰",european_post_office:"🏤",evergreen_tree:"🌲",exclamation:"❗️",expressionless:"😑",eye:"👁",eye_speech_bubble:"👁&zwj;🗨",eyeglasses:"👓",eyes:"👀",face_with_head_bandage:"🤕",face_with_thermometer:"🤒",fist_oncoming:"👊",factory:"🏭",fallen_leaf:"🍂",family_man_woman_boy:"👪",family_man_boy:"👨&zwj;👦",family_man_boy_boy:"👨&zwj;👦&zwj;👦",family_man_girl:"👨&zwj;👧",family_man_girl_boy:"👨&zwj;👧&zwj;👦",family_man_girl_girl:"👨&zwj;👧&zwj;👧",family_man_man_boy:"👨&zwj;👨&zwj;👦",family_man_man_boy_boy:"👨&zwj;👨&zwj;👦&zwj;👦",family_man_man_girl:"👨&zwj;👨&zwj;👧",family_man_man_girl_boy:"👨&zwj;👨&zwj;👧&zwj;👦",family_man_man_girl_girl:"👨&zwj;👨&zwj;👧&zwj;👧",family_man_woman_boy_boy:"👨&zwj;👩&zwj;👦&zwj;👦",family_man_woman_girl:"👨&zwj;👩&zwj;👧",family_man_woman_girl_boy:"👨&zwj;👩&zwj;👧&zwj;👦",family_man_woman_girl_girl:"👨&zwj;👩&zwj;👧&zwj;👧",family_woman_boy:"👩&zwj;👦",family_woman_boy_boy:"👩&zwj;👦&zwj;👦",family_woman_girl:"👩&zwj;👧",family_woman_girl_boy:"👩&zwj;👧&zwj;👦",family_woman_girl_girl:"👩&zwj;👧&zwj;👧",family_woman_woman_boy:"👩&zwj;👩&zwj;👦",family_woman_woman_boy_boy:"👩&zwj;👩&zwj;👦&zwj;👦",family_woman_woman_girl:"👩&zwj;👩&zwj;👧",family_woman_woman_girl_boy:"👩&zwj;👩&zwj;👧&zwj;👦",family_woman_woman_girl_girl:"👩&zwj;👩&zwj;👧&zwj;👧",fast_forward:"⏩",fax:"📠",fearful:"😨",feet:"🐾",female_detective:"🕵️&zwj;♀️",ferris_wheel:"🎡",ferry:"⛴",field_hockey:"🏑",file_cabinet:"🗄",file_folder:"📁",film_projector:"📽",film_strip:"🎞",fire:"🔥",fire_engine:"🚒",fireworks:"🎆",first_quarter_moon:"🌓",first_quarter_moon_with_face:"🌛",fish:"🐟",fish_cake:"🍥",fishing_pole_and_fish:"🎣",fist_raised:"✊",fist_left:"🤛",fist_right:"🤜",flags:"🎏",flashlight:"🔦",fleur_de_lis:"⚜️",flight_arrival:"🛬",flight_departure:"🛫",floppy_disk:"💾",flower_playing_cards:"🎴",flushed:"😳",fog:"🌫",foggy:"🌁",football:"🏈",footprints:"👣",fork_and_knife:"🍴",fountain:"⛲️",fountain_pen:"🖋",four_leaf_clover:"🍀",fox_face:"🦊",framed_picture:"🖼",free:"🆓",fried_egg:"🍳",fried_shrimp:"🍤",fries:"🍟",frog:"🐸",frowning:"😦",frowning_face:"☹️",frowning_man:"🙍&zwj;♂️",frowning_woman:"🙍",middle_finger:"🖕",fuelpump:"⛽️",full_moon:"🌕",full_moon_with_face:"🌝",funeral_urn:"⚱️",game_die:"🎲",gear:"⚙️",gem:"💎",gemini:"♊️",ghost:"👻",gift:"🎁",gift_heart:"💝",girl:"👧",globe_with_meridians:"🌐",goal_net:"🥅",goat:"🐐",golf:"⛳️",golfing_man:"🏌️",golfing_woman:"🏌️&zwj;♀️",gorilla:"🦍",grapes:"🍇",green_apple:"🍏",green_book:"📗",green_heart:"💚",green_salad:"🥗",grey_exclamation:"❕",grey_question:"❔",grimacing:"😬",grin:"😁",grinning:"😀",guardsman:"💂",guardswoman:"💂&zwj;♀️",guitar:"🎸",gun:"🔫",haircut_woman:"💇",haircut_man:"💇&zwj;♂️",hamburger:"🍔",hammer:"🔨",hammer_and_pick:"⚒",hammer_and_wrench:"🛠",hamster:"🐹",hand:"✋",handbag:"👜",handshake:"🤝",hankey:"💩",hatched_chick:"🐥",hatching_chick:"🐣",headphones:"🎧",hear_no_evil:"🙉",heart:"❤️",heart_decoration:"💟",heart_eyes:"😍",heart_eyes_cat:"😻",heartbeat:"💓",heartpulse:"💗",hearts:"♥️",heavy_check_mark:"✔️",heavy_division_sign:"➗",heavy_dollar_sign:"💲",heavy_heart_exclamation:"❣️",heavy_minus_sign:"➖",heavy_multiplication_x:"✖️",heavy_plus_sign:"➕",helicopter:"🚁",herb:"🌿",hibiscus:"🌺",high_brightness:"🔆",high_heel:"👠",hocho:"🔪",hole:"🕳",honey_pot:"🍯",horse:"🐴",horse_racing:"🏇",hospital:"🏥",hot_pepper:"🌶",hotdog:"🌭",hotel:"🏨",hotsprings:"♨️",hourglass:"⌛️",hourglass_flowing_sand:"⏳",house:"🏠",house_with_garden:"🏡",houses:"🏘",hugs:"🤗",hushed:"😯",ice_cream:"🍨",ice_hockey:"🏒",ice_skate:"⛸",icecream:"🍦",id:"🆔",ideograph_advantage:"🉐",imp:"👿",inbox_tray:"📥",incoming_envelope:"📨",tipping_hand_woman:"💁",information_source:"ℹ️",innocent:"😇",interrobang:"⁉️",iphone:"📱",izakaya_lantern:"🏮",jack_o_lantern:"🎃",japan:"🗾",japanese_castle:"🏯",japanese_goblin:"👺",japanese_ogre:"👹",jeans:"👖",joy:"😂",joy_cat:"😹",joystick:"🕹",kaaba:"🕋",key:"🔑",keyboard:"⌨️",keycap_ten:"🔟",kick_scooter:"🛴",kimono:"👘",kiss:"💋",kissing:"😗",kissing_cat:"😽",kissing_closed_eyes:"😚",kissing_heart:"😘",kissing_smiling_eyes:"😙",kiwi_fruit:"🥝",koala:"🐨",koko:"🈁",label:"🏷",large_blue_circle:"🔵",large_blue_diamond:"🔷",large_orange_diamond:"🔶",last_quarter_moon:"🌗",last_quarter_moon_with_face:"🌜",latin_cross:"✝️",laughing:"😆",leaves:"🍃",ledger:"📒",left_luggage:"🛅",left_right_arrow:"↔️",leftwards_arrow_with_hook:"↩️",lemon:"🍋",leo:"♌️",leopard:"🐆",level_slider:"🎚",libra:"♎️",light_rail:"🚈",link:"🔗",lion:"🦁",lips:"👄",lipstick:"💄",lizard:"🦎",lock:"🔒",lock_with_ink_pen:"🔏",lollipop:"🍭",loop:"➿",loud_sound:"🔊",loudspeaker:"📢",love_hotel:"🏩",love_letter:"💌",low_brightness:"🔅",lying_face:"🤥",m:"Ⓜ️",mag:"🔍",mag_right:"🔎",mahjong:"🀄️",mailbox:"📫",mailbox_closed:"📪",mailbox_with_mail:"📬",mailbox_with_no_mail:"📭",man:"👨",man_artist:"👨&zwj;🎨",man_astronaut:"👨&zwj;🚀",man_cartwheeling:"🤸&zwj;♂️",man_cook:"👨&zwj;🍳",man_dancing:"🕺",man_facepalming:"🤦&zwj;♂️",man_factory_worker:"👨&zwj;🏭",man_farmer:"👨&zwj;🌾",man_firefighter:"👨&zwj;🚒",man_health_worker:"👨&zwj;⚕️",man_in_tuxedo:"🤵",man_judge:"👨&zwj;⚖️",man_juggling:"🤹&zwj;♂️",man_mechanic:"👨&zwj;🔧",man_office_worker:"👨&zwj;💼",man_pilot:"👨&zwj;✈️",man_playing_handball:"🤾&zwj;♂️",man_playing_water_polo:"🤽&zwj;♂️",man_scientist:"👨&zwj;🔬",man_shrugging:"🤷&zwj;♂️",man_singer:"👨&zwj;🎤",man_student:"👨&zwj;🎓",man_teacher:"👨&zwj;🏫",man_technologist:"👨&zwj;💻",man_with_gua_pi_mao:"👲",man_with_turban:"👳",tangerine:"🍊",mans_shoe:"👞",mantelpiece_clock:"🕰",maple_leaf:"🍁",martial_arts_uniform:"🥋",mask:"😷",massage_woman:"💆",massage_man:"💆&zwj;♂️",meat_on_bone:"🍖",medal_military:"🎖",medal_sports:"🏅",mega:"📣",melon:"🍈",memo:"📝",men_wrestling:"🤼&zwj;♂️",menorah:"🕎",mens:"🚹",metal:"🤘",metro:"🚇",microphone:"🎤",microscope:"🔬",milk_glass:"🥛",milky_way:"🌌",minibus:"🚐",minidisc:"💽",mobile_phone_off:"📴",money_mouth_face:"🤑",money_with_wings:"💸",moneybag:"💰",monkey:"🐒",monkey_face:"🐵",monorail:"🚝",moon:"🌔",mortar_board:"🎓",mosque:"🕌",motor_boat:"🛥",motor_scooter:"🛵",motorcycle:"🏍",motorway:"🛣",mount_fuji:"🗻",mountain:"⛰",mountain_biking_man:"🚵",mountain_biking_woman:"🚵&zwj;♀️",mountain_cableway:"🚠",mountain_railway:"🚞",mountain_snow:"🏔",mouse:"🐭",mouse2:"🐁",movie_camera:"🎥",moyai:"🗿",mrs_claus:"🤶",muscle:"💪",mushroom:"🍄",musical_keyboard:"🎹",musical_note:"🎵",musical_score:"🎼",mute:"🔇",nail_care:"💅",name_badge:"📛",national_park:"🏞",nauseated_face:"🤢",necktie:"👔",negative_squared_cross_mark:"❎",nerd_face:"🤓",neutral_face:"😐",new:"🆕",new_moon:"🌑",new_moon_with_face:"🌚",newspaper:"📰",newspaper_roll:"🗞",next_track_button:"⏭",ng:"🆖",no_good_man:"🙅&zwj;♂️",no_good_woman:"🙅",night_with_stars:"🌃",no_bell:"🔕",no_bicycles:"🚳",no_entry:"⛔️",no_entry_sign:"🚫",no_mobile_phones:"📵",no_mouth:"😶",no_pedestrians:"🚷",no_smoking:"🚭","non-potable_water":"🚱",nose:"👃",notebook:"📓",notebook_with_decorative_cover:"📔",notes:"🎶",nut_and_bolt:"🔩",o:"⭕️",o2:"🅾️",ocean:"🌊",octopus:"🐙",oden:"🍢",office:"🏢",oil_drum:"🛢",ok:"🆗",ok_hand:"👌",ok_man:"🙆&zwj;♂️",ok_woman:"🙆",old_key:"🗝",older_man:"👴",older_woman:"👵",om:"🕉",on:"🔛",oncoming_automobile:"🚘",oncoming_bus:"🚍",oncoming_police_car:"🚔",oncoming_taxi:"🚖",open_file_folder:"📂",open_hands:"👐",open_mouth:"😮",open_umbrella:"☂️",ophiuchus:"⛎",orange_book:"📙",orthodox_cross:"☦️",outbox_tray:"📤",owl:"🦉",ox:"🐂",package:"📦",page_facing_up:"📄",page_with_curl:"📃",pager:"📟",paintbrush:"🖌",palm_tree:"🌴",pancakes:"🥞",panda_face:"🐼",paperclip:"📎",paperclips:"🖇",parasol_on_ground:"⛱",parking:"🅿️",part_alternation_mark:"〽️",partly_sunny:"⛅️",passenger_ship:"🛳",passport_control:"🛂",pause_button:"⏸",peace_symbol:"☮️",peach:"🍑",peanuts:"🥜",pear:"🍐",pen:"🖊",pencil2:"✏️",penguin:"🐧",pensive:"😔",performing_arts:"🎭",persevere:"😣",person_fencing:"🤺",pouting_woman:"🙎",phone:"☎️",pick:"⛏",pig:"🐷",pig2:"🐖",pig_nose:"🐽",pill:"💊",pineapple:"🍍",ping_pong:"🏓",pisces:"♓️",pizza:"🍕",place_of_worship:"🛐",plate_with_cutlery:"🍽",play_or_pause_button:"⏯",point_down:"👇",point_left:"👈",point_right:"👉",point_up:"☝️",point_up_2:"👆",police_car:"🚓",policewoman:"👮&zwj;♀️",poodle:"🐩",popcorn:"🍿",post_office:"🏣",postal_horn:"📯",postbox:"📮",potable_water:"🚰",potato:"🥔",pouch:"👝",poultry_leg:"🍗",pound:"💷",rage:"😡",pouting_cat:"😾",pouting_man:"🙎&zwj;♂️",pray:"🙏",prayer_beads:"📿",pregnant_woman:"🤰",previous_track_button:"⏮",prince:"🤴",princess:"👸",printer:"🖨",purple_heart:"💜",purse:"👛",pushpin:"📌",put_litter_in_its_place:"🚮",question:"❓",rabbit:"🐰",rabbit2:"🐇",racehorse:"🐎",racing_car:"🏎",radio:"📻",radio_button:"🔘",radioactive:"☢️",railway_car:"🚃",railway_track:"🛤",rainbow:"🌈",rainbow_flag:"🏳️&zwj;🌈",raised_back_of_hand:"🤚",raised_hand_with_fingers_splayed:"🖐",raised_hands:"🙌",raising_hand_woman:"🙋",raising_hand_man:"🙋&zwj;♂️",ram:"🐏",ramen:"🍜",rat:"🐀",record_button:"⏺",recycle:"♻️",red_circle:"🔴",registered:"®️",relaxed:"☺️",relieved:"😌",reminder_ribbon:"🎗",repeat:"🔁",repeat_one:"🔂",rescue_worker_helmet:"⛑",restroom:"🚻",revolving_hearts:"💞",rewind:"⏪",rhinoceros:"🦏",ribbon:"🎀",rice:"🍚",rice_ball:"🍙",rice_cracker:"🍘",rice_scene:"🎑",right_anger_bubble:"🗯",ring:"💍",robot:"🤖",rocket:"🚀",rofl:"🤣",roll_eyes:"🙄",roller_coaster:"🎢",rooster:"🐓",rose:"🌹",rosette:"🏵",rotating_light:"🚨",round_pushpin:"📍",rowing_man:"🚣",rowing_woman:"🚣&zwj;♀️",rugby_football:"🏉",running_man:"🏃",running_shirt_with_sash:"🎽",running_woman:"🏃&zwj;♀️",sa:"🈂️",sagittarius:"♐️",sake:"🍶",sandal:"👡",santa:"🎅",satellite:"📡",saxophone:"🎷",school:"🏫",school_satchel:"🎒",scissors:"✂️",scorpion:"🦂",scorpius:"♏️",scream:"😱",scream_cat:"🙀",scroll:"📜",seat:"💺",secret:"㊙️",see_no_evil:"🙈",seedling:"🌱",selfie:"🤳",shallow_pan_of_food:"🥘",shamrock:"☘️",shark:"🦈",shaved_ice:"🍧",sheep:"🐑",shell:"🐚",shield:"🛡",shinto_shrine:"⛩",ship:"🚢",shirt:"👕",shopping:"🛍",shopping_cart:"🛒",shower:"🚿",shrimp:"🦐",signal_strength:"📶",six_pointed_star:"🔯",ski:"🎿",skier:"⛷",skull:"💀",skull_and_crossbones:"☠️",sleeping:"😴",sleeping_bed:"🛌",sleepy:"😪",slightly_frowning_face:"🙁",slightly_smiling_face:"🙂",slot_machine:"🎰",small_airplane:"🛩",small_blue_diamond:"🔹",small_orange_diamond:"🔸",small_red_triangle:"🔺",small_red_triangle_down:"🔻",smile:"😄",smile_cat:"😸",smiley:"😃",smiley_cat:"😺",smiling_imp:"😈",smirk:"😏",smirk_cat:"😼",smoking:"🚬",snail:"🐌",snake:"🐍",sneezing_face:"🤧",snowboarder:"🏂",snowflake:"❄️",snowman:"⛄️",snowman_with_snow:"☃️",sob:"😭",soccer:"⚽️",soon:"🔜",sos:"🆘",sound:"🔉",space_invader:"👾",spades:"♠️",spaghetti:"🍝",sparkle:"❇️",sparkler:"🎇",sparkles:"✨",sparkling_heart:"💖",speak_no_evil:"🙊",speaker:"🔈",speaking_head:"🗣",speech_balloon:"💬",speedboat:"🚤",spider:"🕷",spider_web:"🕸",spiral_calendar:"🗓",spiral_notepad:"🗒",spoon:"🥄",squid:"🦑",stadium:"🏟",star:"⭐️",star2:"🌟",star_and_crescent:"☪️",star_of_david:"✡️",stars:"🌠",station:"🚉",statue_of_liberty:"🗽",steam_locomotive:"🚂",stew:"🍲",stop_button:"⏹",stop_sign:"🛑",stopwatch:"⏱",straight_ruler:"📏",strawberry:"🍓",stuck_out_tongue:"😛",stuck_out_tongue_closed_eyes:"😝",stuck_out_tongue_winking_eye:"😜",studio_microphone:"🎙",stuffed_flatbread:"🥙",sun_behind_large_cloud:"🌥",sun_behind_rain_cloud:"🌦",sun_behind_small_cloud:"🌤",sun_with_face:"🌞",sunflower:"🌻",sunglasses:"😎",sunny:"☀️",sunrise:"🌅",sunrise_over_mountains:"🌄",surfing_man:"🏄",surfing_woman:"🏄&zwj;♀️",sushi:"🍣",suspension_railway:"🚟",sweat:"😓",sweat_drops:"💦",sweat_smile:"😅",sweet_potato:"🍠",swimming_man:"🏊",swimming_woman:"🏊&zwj;♀️",symbols:"🔣",synagogue:"🕍",syringe:"💉",taco:"🌮",tada:"🎉",tanabata_tree:"🎋",taurus:"♉️",taxi:"🚕",tea:"🍵",telephone_receiver:"📞",telescope:"🔭",tennis:"🎾",tent:"⛺️",thermometer:"🌡",thinking:"🤔",thought_balloon:"💭",ticket:"🎫",tickets:"🎟",tiger:"🐯",tiger2:"🐅",timer_clock:"⏲",tipping_hand_man:"💁&zwj;♂️",tired_face:"😫",tm:"™️",toilet:"🚽",tokyo_tower:"🗼",tomato:"🍅",tongue:"👅",top:"🔝",tophat:"🎩",tornado:"🌪",trackball:"🖲",tractor:"🚜",traffic_light:"🚥",train:"🚋",train2:"🚆",tram:"🚊",triangular_flag_on_post:"🚩",triangular_ruler:"📐",trident:"🔱",triumph:"😤",trolleybus:"🚎",trophy:"🏆",tropical_drink:"🍹",tropical_fish:"🐠",truck:"🚚",trumpet:"🎺",tulip:"🌷",tumbler_glass:"🥃",turkey:"🦃",turtle:"🐢",tv:"📺",twisted_rightwards_arrows:"🔀",two_hearts:"💕",two_men_holding_hands:"👬",two_women_holding_hands:"👭",u5272:"🈹",u5408:"🈴",u55b6:"🈺",u6307:"🈯️",u6708:"🈷️",u6709:"🈶",u6e80:"🈵",u7121:"🈚️",u7533:"🈸",u7981:"🈲",u7a7a:"🈳",umbrella:"☔️",unamused:"😒",underage:"🔞",unicorn:"🦄",unlock:"🔓",up:"🆙",upside_down_face:"🙃",v:"✌️",vertical_traffic_light:"🚦",vhs:"📼",vibration_mode:"📳",video_camera:"📹",video_game:"🎮",violin:"🎻",virgo:"♍️",volcano:"🌋",volleyball:"🏐",vs:"🆚",vulcan_salute:"🖖",walking_man:"🚶",walking_woman:"🚶&zwj;♀️",waning_crescent_moon:"🌘",waning_gibbous_moon:"🌖",warning:"⚠️",wastebasket:"🗑",watch:"⌚️",water_buffalo:"🐃",watermelon:"🍉",wave:"👋",wavy_dash:"〰️",waxing_crescent_moon:"🌒",wc:"🚾",weary:"😩",wedding:"💒",weight_lifting_man:"🏋️",weight_lifting_woman:"🏋️&zwj;♀️",whale:"🐳",whale2:"🐋",wheel_of_dharma:"☸️",wheelchair:"♿️",white_check_mark:"✅",white_circle:"⚪️",white_flag:"🏳️",white_flower:"💮",white_large_square:"⬜️",white_medium_small_square:"◽️",white_medium_square:"◻️",white_small_square:"▫️",white_square_button:"🔳",wilted_flower:"🥀",wind_chime:"🎐",wind_face:"🌬",wine_glass:"🍷",wink:"😉",wolf:"🐺",woman:"👩",woman_artist:"👩&zwj;🎨",woman_astronaut:"👩&zwj;🚀",woman_cartwheeling:"🤸&zwj;♀️",woman_cook:"👩&zwj;🍳",woman_facepalming:"🤦&zwj;♀️",woman_factory_worker:"👩&zwj;🏭",woman_farmer:"👩&zwj;🌾",woman_firefighter:"👩&zwj;🚒",woman_health_worker:"👩&zwj;⚕️",woman_judge:"👩&zwj;⚖️",woman_juggling:"🤹&zwj;♀️",woman_mechanic:"👩&zwj;🔧",woman_office_worker:"👩&zwj;💼",woman_pilot:"👩&zwj;✈️",woman_playing_handball:"🤾&zwj;♀️",woman_playing_water_polo:"🤽&zwj;♀️",woman_scientist:"👩&zwj;🔬",woman_shrugging:"🤷&zwj;♀️",woman_singer:"👩&zwj;🎤",woman_student:"👩&zwj;🎓",woman_teacher:"👩&zwj;🏫",woman_technologist:"👩&zwj;💻",woman_with_turban:"👳&zwj;♀️",womans_clothes:"👚",womans_hat:"👒",women_wrestling:"🤼&zwj;♀️",womens:"🚺",world_map:"🗺",worried:"😟",wrench:"🔧",writing_hand:"✍️",x:"❌",yellow_heart:"💛",yen:"💴",yin_yang:"☯️",yum:"😋",zap:"⚡️",zipper_mouth_face:"🤐",zzz:"💤"},I.Converter=function(g){"use strict";function C(g,C){if(C=C||null,I.helper.isString(g)){if(g=I.helper.stdExtName(g),C=g,I.extensions[g])return console.warn("DEPRECATION WARNING: "+g+" is an old extension that uses a deprecated loading method.Please inform the developer that the extension should be updated!"),void function(g,C){"function"==typeof g&&(g=g(new I.Converter));I.helper.isArray(g)||(g=[g]);var e=A(g,C);if(!e.valid)throw Error(e.error);for(var r=0;r<g.length;++r)switch(g[r].type){case"lang":s.push(g[r]);break;case"output":i.push(g[r]);break;default:throw Error("Extension loader error: Type unrecognized!!!")}}(I.extensions[g],g);if(I.helper.isUndefined(r[g]))throw Error('Extension "'+g+'" could not be loaded. It was either not found or is not a valid extension.');g=r[g]}"function"==typeof g&&(g=g()),I.helper.isArray(g)||(g=[g]);var t=A(g,C);if(!t.valid)throw Error(t.error);for(var a=0;a<g.length;++a){switch(g[a].type){case"lang":s.push(g[a]);break;case"output":i.push(g[a])}if(g[a].hasOwnProperty("listeners"))for(var n in g[a].listeners)g[a].listeners.hasOwnProperty(n)&&e(n,g[a].listeners[n])}}function e(g,A){if(!I.helper.isString(g))throw Error("Invalid argument in converter.listen() method: name must be a string, but "+typeof g+" given");if("function"!=typeof A)throw Error("Invalid argument in converter.listen() method: callback must be a function, but "+typeof A+" given");l.hasOwnProperty(g)||(l[g]=[]),l[g].push(A)}var o={},s=[],i=[],l={},c=a,u={parsed:{},raw:"",format:""};!function(){g=g||{};for(var A in t)t.hasOwnProperty(A)&&(o[A]=t[A]);if("object"!=typeof g)throw Error("Converter expects the passed parameter to be an object, but "+typeof g+" was passed instead.");for(var e in g)g.hasOwnProperty(e)&&(o[e]=g[e]);o.extensions&&I.helper.forEach(o.extensions,C)}(),this._dispatch=function(g,A,C,I){if(l.hasOwnProperty(g))for(var e=0;e<l[g].length;++e){var r=l[g][e](g,A,this,C,I);r&&void 0!==r&&(A=r)}return A},this.listen=function(g,A){return e(g,A),this},this.makeHtml=function(g){if(!g)return g;var A={gHtmlBlocks:[],gHtmlMdBlocks:[],gHtmlSpans:[],gUrls:{},gTitles:{},gDimensions:{},gListLevel:0,hashLinkCounts:{},langExtensions:s,outputModifiers:i,converter:this,ghCodeBlocks:[],metadata:{parsed:{},raw:"",format:""}};return g=g.replace(/¨/g,"¨T"),g=g.replace(/\$/g,"¨D"),g=g.replace(/\r\n/g,"\n"),g=g.replace(/\r/g,"\n"),g=g.replace(/\u00A0/g," "),o.smartIndentationFix&&(g=function(g){var A=g.match(/^\s*/)[0].length,C=new RegExp("^\\s{0,"+A+"}","gm");return g.replace(C,"")}(g)),g="\n\n"+g+"\n\n",g=I.subParser("detab")(g,o,A),g=g.replace(/^[ \t]+$/gm,""),I.helper.forEach(s,function(C){g=I.subParser("runExtension")(C,g,o,A)}),g=I.subParser("metadata")(g,o,A),g=I.subParser("hashPreCodeTags")(g,o,A),g=I.subParser("githubCodeBlocks")(g,o,A),g=I.subParser("hashHTMLBlocks")(g,o,A),g=I.subParser("hashCodeTags")(g,o,A),g=I.subParser("stripLinkDefinitions")(g,o,A),g=I.subParser("blockGamut")(g,o,A),g=I.subParser("unhashHTMLSpans")(g,o,A),g=I.subParser("unescapeSpecialChars")(g,o,A),g=g.replace(/¨D/g,"$$"),g=g.replace(/¨T/g,"¨"),g=I.subParser("completeHTMLDocument")(g,o,A),I.helper.forEach(i,function(C){g=I.subParser("runExtension")(C,g,o,A)}),u=A.metadata,g},this.setOption=function(g,A){o[g]=A},this.getOption=function(g){return o[g]},this.getOptions=function(){return o},this.addExtension=function(g,A){C(g,A=A||null)},this.useExtension=function(g){C(g)},this.setFlavor=function(g){if(!n.hasOwnProperty(g))throw Error(g+" flavor was not found");var A=n[g];c=g;for(var C in A)A.hasOwnProperty(C)&&(o[C]=A[C])},this.getFlavor=function(){return c},this.removeExtension=function(g){I.helper.isArray(g)||(g=[g]);for(var A=0;A<g.length;++A){for(var C=g[A],e=0;e<s.length;++e)s[e]===C&&s[e].splice(e,1);for(;0<i.length;++e)i[0]===C&&i[0].splice(e,1)}},this.getAllExtensions=function(){return{language:s,output:i}},this.getMetadata=function(g){return g?u.raw:u.parsed},this.getMetadataFormat=function(){return u.format},this._setMetadataPair=function(g,A){u.parsed[g]=A},this._setMetadataFormat=function(g){u.format=g},this._setMetadataRaw=function(g){u.raw=g}},I.subParser("anchors",function(g,A,C){"use strict";var e=function(g,e,r,t,a,n,o){if(I.helper.isUndefined(o)&&(o=""),r=r.toLowerCase(),g.search(/\(<?\s*>? ?(['"].*['"])?\)$/m)>-1)t="";else if(!t){if(r||(r=e.toLowerCase().replace(/ ?\n/g," ")),t="#"+r,I.helper.isUndefined(C.gUrls[r]))return g;t=C.gUrls[r],I.helper.isUndefined(C.gTitles[r])||(o=C.gTitles[r])}var s='<a href="'+(t=t.replace(I.helper.regexes.asteriskDashAndColon,I.helper.escapeCharactersCallback))+'"';return""!==o&&null!==o&&(s+=' title="'+(o=(o=o.replace(/"/g,"&quot;")).replace(I.helper.regexes.asteriskDashAndColon,I.helper.escapeCharactersCallback))+'"'),A.openLinksInNewWindow&&!/^#/.test(t)&&(s+=' target="¨E95Eblank"'),s+=">"+e+"</a>"};return g=(g=C.converter._dispatch("anchors.before",g,A,C)).replace(/\[((?:\[[^\]]*]|[^\[\]])*)] ?(?:\n *)?\[(.*?)]()()()()/g,e),g=g.replace(/\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<([^>]*)>(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g,e),g=g.replace(/\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g,e),g=g.replace(/\[([^\[\]]+)]()()()()()/g,e),A.ghMentions&&(g=g.replace(/(^|\s)(\\)?(@([a-z\d\-]+))(?=[.!?;,[\]()]|\s|$)/gim,function(g,C,e,r,t){if("\\"===e)return C+r;if(!I.helper.isString(A.ghMentionsLink))throw new Error("ghMentionsLink option must be a string");var a=A.ghMentionsLink.replace(/\{u}/g,t),n="";return A.openLinksInNewWindow&&(n=' target="¨E95Eblank"'),C+'<a href="'+a+'"'+n+">"+r+"</a>"})),g=C.converter._dispatch("anchors.after",g,A,C)});var s=/([*~_]+|\b)(((https?|ftp|dict):\/\/|www\.)[^'">\s]+?\.[^'">\s]+?)()(\1)?(?=\s|$)(?!["<>])/gi,i=/([*~_]+|\b)(((https?|ftp|dict):\/\/|www\.)[^'">\s]+\.[^'">\s]+?)([.!?,()\[\]])?(\1)?(?=\s|$)(?!["<>])/gi,l=/()<(((https?|ftp|dict):\/\/|www\.)[^'">\s]+)()>()/gi,c=/(^|\s)(?:mailto:)?([A-Za-z0-9!#$%&'*+-/=?^_`{|}~.]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)(?=$|\s)/gim,u=/<()(?:mailto:)?([-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi,d=function(g){"use strict";return function(A,C,e,r,t,a,n){var o=e=e.replace(I.helper.regexes.asteriskDashAndColon,I.helper.escapeCharactersCallback),s="",i="",l=C||"",c=n||"";return/^www\./i.test(e)&&(e=e.replace(/^www\./i,"http://www.")),g.excludeTrailingPunctuationFromURLs&&a&&(s=a),g.openLinksInNewWindow&&(i=' target="¨E95Eblank"'),l+'<a href="'+e+'"'+i+">"+o+"</a>"+s+c}},p=function(g,A){"use strict";return function(C,e,r){var t="mailto:";return e=e||"",r=I.subParser("unescapeSpecialChars")(r,g,A),g.encodeEmails?(t=I.helper.encodeEmailAddress(t+r),r=I.helper.encodeEmailAddress(r)):t+=r,e+'<a href="'+t+'">'+r+"</a>"}};I.subParser("autoLinks",function(g,A,C){"use strict";return g=C.converter._dispatch("autoLinks.before",g,A,C),g=g.replace(l,d(A)),g=g.replace(u,p(A,C)),g=C.converter._dispatch("autoLinks.after",g,A,C)}),I.subParser("simplifiedAutoLinks",function(g,A,C){"use strict";return A.simplifiedAutoLink?(g=C.converter._dispatch("simplifiedAutoLinks.before",g,A,C),g=A.excludeTrailingPunctuationFromURLs?g.replace(i,d(A)):g.replace(s,d(A)),g=g.replace(c,p(A,C)),g=C.converter._dispatch("simplifiedAutoLinks.after",g,A,C)):g}),I.subParser("blockGamut",function(g,A,C){"use strict";return g=C.converter._dispatch("blockGamut.before",g,A,C),g=I.subParser("blockQuotes")(g,A,C),g=I.subParser("headers")(g,A,C),g=I.subParser("horizontalRule")(g,A,C),g=I.subParser("lists")(g,A,C),g=I.subParser("codeBlocks")(g,A,C),g=I.subParser("tables")(g,A,C),g=I.subParser("hashHTMLBlocks")(g,A,C),g=I.subParser("paragraphs")(g,A,C),g=C.converter._dispatch("blockGamut.after",g,A,C)}),I.subParser("blockQuotes",function(g,A,C){"use strict";g=C.converter._dispatch("blockQuotes.before",g,A,C),g+="\n\n";var e=/(^ {0,3}>[ \t]?.+\n(.+\n)*\n*)+/gm;return A.splitAdjacentBlockquotes&&(e=/^ {0,3}>[\s\S]*?(?:\n\n)/gm),g=g.replace(e,function(g){return g=g.replace(/^[ \t]*>[ \t]?/gm,""),g=g.replace(/¨0/g,""),g=g.replace(/^[ \t]+$/gm,""),g=I.subParser("githubCodeBlocks")(g,A,C),g=I.subParser("blockGamut")(g,A,C),g=g.replace(/(^|\n)/g,"$1  "),g=g.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm,function(g,A){var C=A;return C=C.replace(/^  /gm,"¨0"),C=C.replace(/¨0/g,"")}),I.subParser("hashBlock")("<blockquote>\n"+g+"\n</blockquote>",A,C)}),g=C.converter._dispatch("blockQuotes.after",g,A,C)}),I.subParser("codeBlocks",function(g,A,C){"use strict";g=C.converter._dispatch("codeBlocks.before",g,A,C);return g=(g+="¨0").replace(/(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=¨0))/g,function(g,e,r){var t=e,a=r,n="\n";return t=I.subParser("outdent")(t,A,C),t=I.subParser("encodeCode")(t,A,C),t=I.subParser("detab")(t,A,C),t=t.replace(/^\n+/g,""),t=t.replace(/\n+$/g,""),A.omitExtraWLInCodeBlocks&&(n=""),t="<pre><code>"+t+n+"</code></pre>",I.subParser("hashBlock")(t,A,C)+a}),g=g.replace(/¨0/,""),g=C.converter._dispatch("codeBlocks.after",g,A,C)}),I.subParser("codeSpans",function(g,A,C){"use strict";return void 0===(g=C.converter._dispatch("codeSpans.before",g,A,C))&&(g=""),g=g.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,function(g,e,r,t){var a=t;return a=a.replace(/^([ \t]*)/g,""),a=a.replace(/[ \t]*$/g,""),a=I.subParser("encodeCode")(a,A,C),a=e+"<code>"+a+"</code>",a=I.subParser("hashHTMLSpans")(a,A,C)}),g=C.converter._dispatch("codeSpans.after",g,A,C)}),I.subParser("completeHTMLDocument",function(g,A,C){"use strict";if(!A.completeHTMLDocument)return g;g=C.converter._dispatch("completeHTMLDocument.before",g,A,C);var I="html",e="<!DOCTYPE HTML>\n",r="",t='<meta charset="utf-8">\n',a="",n="";void 0!==C.metadata.parsed.doctype&&(e="<!DOCTYPE "+C.metadata.parsed.doctype+">\n","html"!==(I=C.metadata.parsed.doctype.toString().toLowerCase())&&"html5"!==I||(t='<meta charset="utf-8">'));for(var o in C.metadata.parsed)if(C.metadata.parsed.hasOwnProperty(o))switch(o.toLowerCase()){case"doctype":break;case"title":r="<title>"+C.metadata.parsed.title+"</title>\n";break;case"charset":t="html"===I||"html5"===I?'<meta charset="'+C.metadata.parsed.charset+'">\n':'<meta name="charset" content="'+C.metadata.parsed.charset+'">\n';break;case"language":case"lang":a=' lang="'+C.metadata.parsed[o]+'"',n+='<meta name="'+o+'" content="'+C.metadata.parsed[o]+'">\n';break;default:n+='<meta name="'+o+'" content="'+C.metadata.parsed[o]+'">\n'}return g=e+"<html"+a+">\n<head>\n"+r+t+n+"</head>\n<body>\n"+g.trim()+"\n</body>\n</html>",g=C.converter._dispatch("completeHTMLDocument.after",g,A,C)}),I.subParser("detab",function(g,A,C){"use strict";return g=C.converter._dispatch("detab.before",g,A,C),g=g.replace(/\t(?=\t)/g,"    "),g=g.replace(/\t/g,"¨A¨B"),g=g.replace(/¨B(.+?)¨A/g,function(g,A){for(var C=A,I=4-C.length%4,e=0;e<I;e++)C+=" ";return C}),g=g.replace(/¨A/g,"    "),g=g.replace(/¨B/g,""),g=C.converter._dispatch("detab.after",g,A,C)}),I.subParser("ellipsis",function(g,A,C){"use strict";return g=C.converter._dispatch("ellipsis.before",g,A,C),g=g.replace(/\.\.\./g,"…"),g=C.converter._dispatch("ellipsis.after",g,A,C)}),I.subParser("emoji",function(g,A,C){"use strict";if(!A.emoji)return g;return g=(g=C.converter._dispatch("emoji.before",g,A,C)).replace(/:([\S]+?):/g,function(g,A){return I.helper.emojis.hasOwnProperty(A)?I.helper.emojis[A]:g}),g=C.converter._dispatch("emoji.after",g,A,C)}),I.subParser("encodeAmpsAndAngles",function(g,A,C){"use strict";return g=C.converter._dispatch("encodeAmpsAndAngles.before",g,A,C),g=g.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g,"&amp;"),g=g.replace(/<(?![a-z\/?$!])/gi,"&lt;"),g=g.replace(/</g,"&lt;"),g=g.replace(/>/g,"&gt;"),g=C.converter._dispatch("encodeAmpsAndAngles.after",g,A,C)}),I.subParser("encodeBackslashEscapes",function(g,A,C){"use strict";return g=C.converter._dispatch("encodeBackslashEscapes.before",g,A,C),g=g.replace(/\\(\\)/g,I.helper.escapeCharactersCallback),g=g.replace(/\\([`*_{}\[\]()>#+.!~=|-])/g,I.helper.escapeCharactersCallback),g=C.converter._dispatch("encodeBackslashEscapes.after",g,A,C)}),I.subParser("encodeCode",function(g,A,C){"use strict";return g=C.converter._dispatch("encodeCode.before",g,A,C),g=g.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/([*_{}\[\]\\=~-])/g,I.helper.escapeCharactersCallback),g=C.converter._dispatch("encodeCode.after",g,A,C)}),I.subParser("escapeSpecialCharsWithinTagAttributes",function(g,A,C){"use strict";return g=(g=C.converter._dispatch("escapeSpecialCharsWithinTagAttributes.before",g,A,C)).replace(/<\/?[a-z\d_:-]+(?:[\s]+[\s\S]+?)?>/gi,function(g){return g.replace(/(.)<\/?code>(?=.)/g,"$1`").replace(/([\\`*_~=|])/g,I.helper.escapeCharactersCallback)}),g=g.replace(/<!(--(?:(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>/gi,function(g){return g.replace(/([\\`*_~=|])/g,I.helper.escapeCharactersCallback)}),g=C.converter._dispatch("escapeSpecialCharsWithinTagAttributes.after",g,A,C)}),I.subParser("githubCodeBlocks",function(g,A,C){"use strict";return A.ghCodeBlocks?(g=C.converter._dispatch("githubCodeBlocks.before",g,A,C),g+="¨0",g=g.replace(/(?:^|\n)(```+|~~~+)([^\s`~]*)\n([\s\S]*?)\n\1/g,function(g,e,r,t){var a=A.omitExtraWLInCodeBlocks?"":"\n";return t=I.subParser("encodeCode")(t,A,C),t=I.subParser("detab")(t,A,C),t=t.replace(/^\n+/g,""),t=t.replace(/\n+$/g,""),t="<pre><code"+(r?' class="'+r+" language-"+r+'"':"")+">"+t+a+"</code></pre>",t=I.subParser("hashBlock")(t,A,C),"\n\n¨G"+(C.ghCodeBlocks.push({text:g,codeblock:t})-1)+"G\n\n"}),g=g.replace(/¨0/,""),C.converter._dispatch("githubCodeBlocks.after",g,A,C)):g}),I.subParser("hashBlock",function(g,A,C){"use strict";return g=C.converter._dispatch("hashBlock.before",g,A,C),g=g.replace(/(^\n+|\n+$)/g,""),g="\n\n¨K"+(C.gHtmlBlocks.push(g)-1)+"K\n\n",g=C.converter._dispatch("hashBlock.after",g,A,C)}),I.subParser("hashCodeTags",function(g,A,C){"use strict";g=C.converter._dispatch("hashCodeTags.before",g,A,C);return g=I.helper.replaceRecursiveRegExp(g,function(g,e,r,t){var a=r+I.subParser("encodeCode")(e,A,C)+t;return"¨C"+(C.gHtmlSpans.push(a)-1)+"C"},"<code\\b[^>]*>","</code>","gim"),g=C.converter._dispatch("hashCodeTags.after",g,A,C)}),I.subParser("hashElement",function(g,A,C){"use strict";return function(g,A){var I=A;return I=I.replace(/\n\n/g,"\n"),I=I.replace(/^\n/,""),I=I.replace(/\n+$/g,""),I="\n\n¨K"+(C.gHtmlBlocks.push(I)-1)+"K\n\n"}}),I.subParser("hashHTMLBlocks",function(g,A,C){"use strict";g=C.converter._dispatch("hashHTMLBlocks.before",g,A,C);var e=["pre","div","h1","h2","h3","h4","h5","h6","blockquote","table","dl","ol","ul","script","noscript","form","fieldset","iframe","math","style","section","header","footer","nav","article","aside","address","audio","canvas","figure","hgroup","output","video","p"],r=function(g,A,I,e){var r=g;return-1!==I.search(/\bmarkdown\b/)&&(r=I+C.converter.makeHtml(A)+e),"\n\n¨K"+(C.gHtmlBlocks.push(r)-1)+"K\n\n"};A.backslashEscapesHTMLTags&&(g=g.replace(/\\<(\/?[^>]+?)>/g,function(g,A){return"&lt;"+A+"&gt;"}));for(var t=0;t<e.length;++t)for(var a,n=new RegExp("^ {0,3}(<"+e[t]+"\\b[^>]*>)","im"),o="<"+e[t]+"\\b[^>]*>",s="</"+e[t]+">";-1!==(a=I.helper.regexIndexOf(g,n));){var i=I.helper.splitAtIndex(g,a),l=I.helper.replaceRecursiveRegExp(i[1],r,o,s,"im");if(l===i[1])break;g=i[0].concat(l)}return g=g.replace(/(\n {0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g,I.subParser("hashElement")(g,A,C)),g=I.helper.replaceRecursiveRegExp(g,function(g){return"\n\n¨K"+(C.gHtmlBlocks.push(g)-1)+"K\n\n"},"^ {0,3}\x3c!--","--\x3e","gm"),g=g.replace(/(?:\n\n)( {0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g,I.subParser("hashElement")(g,A,C)),g=C.converter._dispatch("hashHTMLBlocks.after",g,A,C)}),I.subParser("hashHTMLSpans",function(g,A,C){"use strict";function I(g){return"¨C"+(C.gHtmlSpans.push(g)-1)+"C"}return g=C.converter._dispatch("hashHTMLSpans.before",g,A,C),g=g.replace(/<[^>]+?\/>/gi,function(g){return I(g)}),g=g.replace(/<([^>]+?)>[\s\S]*?<\/\1>/g,function(g){return I(g)}),g=g.replace(/<([^>]+?)\s[^>]+?>[\s\S]*?<\/\1>/g,function(g){return I(g)}),g=g.replace(/<[^>]+?>/gi,function(g){return I(g)}),g=C.converter._dispatch("hashHTMLSpans.after",g,A,C)}),I.subParser("unhashHTMLSpans",function(g,A,C){"use strict";g=C.converter._dispatch("unhashHTMLSpans.before",g,A,C);for(var I=0;I<C.gHtmlSpans.length;++I){for(var e=C.gHtmlSpans[I],r=0;/¨C(\d+)C/.test(e);){var t=RegExp.$1;if(e=e.replace("¨C"+t+"C",C.gHtmlSpans[t]),10===r){console.error("maximum nesting of 10 spans reached!!!");break}++r}g=g.replace("¨C"+I+"C",e)}return g=C.converter._dispatch("unhashHTMLSpans.after",g,A,C)}),I.subParser("hashPreCodeTags",function(g,A,C){"use strict";g=C.converter._dispatch("hashPreCodeTags.before",g,A,C);return g=I.helper.replaceRecursiveRegExp(g,function(g,e,r,t){var a=r+I.subParser("encodeCode")(e,A,C)+t;return"\n\n¨G"+(C.ghCodeBlocks.push({text:g,codeblock:a})-1)+"G\n\n"},"^ {0,3}<pre\\b[^>]*>\\s*<code\\b[^>]*>","^ {0,3}</code>\\s*</pre>","gim"),g=C.converter._dispatch("hashPreCodeTags.after",g,A,C)}),I.subParser("headers",function(g,A,C){"use strict";function e(g){var e,r;if(A.customizedHeaderId){var t=g.match(/\{([^{]+?)}\s*$/);t&&t[1]&&(g=t[1])}return e=g,r=I.helper.isString(A.prefixHeaderId)?A.prefixHeaderId:!0===A.prefixHeaderId?"section-":"",A.rawPrefixHeaderId||(e=r+e),e=A.ghCompatibleHeaderId?e.replace(/ /g,"-").replace(/&amp;/g,"").replace(/¨T/g,"").replace(/¨D/g,"").replace(/[&+$,\/:;=?@"#{}|^¨~\[\]`\\*)(%.!'<>]/g,"").toLowerCase():A.rawHeaderId?e.replace(/ /g,"-").replace(/&amp;/g,"&").replace(/¨T/g,"¨").replace(/¨D/g,"$").replace(/["']/g,"-").toLowerCase():e.replace(/[^\w]/g,"").toLowerCase(),A.rawPrefixHeaderId&&(e=r+e),C.hashLinkCounts[e]?e=e+"-"+C.hashLinkCounts[e]++:C.hashLinkCounts[e]=1,e}g=C.converter._dispatch("headers.before",g,A,C);var r=isNaN(parseInt(A.headerLevelStart))?1:parseInt(A.headerLevelStart),t=A.smoothLivePreview?/^(.+)[ \t]*\n={2,}[ \t]*\n+/gm:/^(.+)[ \t]*\n=+[ \t]*\n+/gm,a=A.smoothLivePreview?/^(.+)[ \t]*\n-{2,}[ \t]*\n+/gm:/^(.+)[ \t]*\n-+[ \t]*\n+/gm;g=(g=g.replace(t,function(g,t){var a=I.subParser("spanGamut")(t,A,C),n=A.noHeaderId?"":' id="'+e(t)+'"',o="<h"+r+n+">"+a+"</h"+r+">";return I.subParser("hashBlock")(o,A,C)})).replace(a,function(g,t){var a=I.subParser("spanGamut")(t,A,C),n=A.noHeaderId?"":' id="'+e(t)+'"',o=r+1,s="<h"+o+n+">"+a+"</h"+o+">";return I.subParser("hashBlock")(s,A,C)});var n=A.requireSpaceBeforeHeadingText?/^(#{1,6})[ \t]+(.+?)[ \t]*#*\n+/gm:/^(#{1,6})[ \t]*(.+?)[ \t]*#*\n+/gm;return g=g.replace(n,function(g,t,a){var n=a;A.customizedHeaderId&&(n=a.replace(/\s?\{([^{]+?)}\s*$/,""));var o=I.subParser("spanGamut")(n,A,C),s=A.noHeaderId?"":' id="'+e(a)+'"',i=r-1+t.length,l="<h"+i+s+">"+o+"</h"+i+">";return I.subParser("hashBlock")(l,A,C)}),g=C.converter._dispatch("headers.after",g,A,C)}),I.subParser("horizontalRule",function(g,A,C){"use strict";g=C.converter._dispatch("horizontalRule.before",g,A,C);var e=I.subParser("hashBlock")("<hr />",A,C);return g=g.replace(/^ {0,2}( ?-){3,}[ \t]*$/gm,e),g=g.replace(/^ {0,2}( ?\*){3,}[ \t]*$/gm,e),g=g.replace(/^ {0,2}( ?_){3,}[ \t]*$/gm,e),g=C.converter._dispatch("horizontalRule.after",g,A,C)}),I.subParser("images",function(g,A,C){"use strict";function e(g,A,e,r,t,a,n,o){var s=C.gUrls,i=C.gTitles,l=C.gDimensions;if(e=e.toLowerCase(),o||(o=""),g.search(/\(<?\s*>? ?(['"].*['"])?\)$/m)>-1)r="";else if(""===r||null===r){if(""!==e&&null!==e||(e=A.toLowerCase().replace(/ ?\n/g," ")),r="#"+e,I.helper.isUndefined(s[e]))return g;r=s[e],I.helper.isUndefined(i[e])||(o=i[e]),I.helper.isUndefined(l[e])||(t=l[e].width,a=l[e].height)}A=A.replace(/"/g,"&quot;").replace(I.helper.regexes.asteriskDashAndColon,I.helper.escapeCharactersCallback);var c='<img src="'+(r=r.replace(I.helper.regexes.asteriskDashAndColon,I.helper.escapeCharactersCallback))+'" alt="'+A+'"';return o&&(c+=' title="'+(o=o.replace(/"/g,"&quot;").replace(I.helper.regexes.asteriskDashAndColon,I.helper.escapeCharactersCallback))+'"'),t&&a&&(c+=' width="'+(t="*"===t?"auto":t)+'"',c+=' height="'+(a="*"===a?"auto":a)+'"'),c+=" />"}return g=(g=C.converter._dispatch("images.before",g,A,C)).replace(/!\[([^\]]*?)] ?(?:\n *)?\[([\s\S]*?)]()()()()()/g,e),g=g.replace(/!\[([^\]]*?)][ \t]*()\([ \t]?<?(data:.+?\/.+?;base64,[A-Za-z0-9+/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g,function(g,A,C,I,r,t,a,n){return I=I.replace(/\s/g,""),e(g,A,C,I,r,t,0,n)}),g=g.replace(/!\[([^\]]*?)][ \t]*()\([ \t]?<([^>]*)>(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(?:(["'])([^"]*?)\6))?[ \t]?\)/g,e),g=g.replace(/!\[([^\]]*?)][ \t]*()\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g,e),g=g.replace(/!\[([^\[\]]+)]()()()()()/g,e),g=C.converter._dispatch("images.after",g,A,C)}),I.subParser("italicsAndBold",function(g,A,C){"use strict";function I(g,A,C){return A+g+C}return g=C.converter._dispatch("italicsAndBold.before",g,A,C),g=A.literalMidWordUnderscores?(g=(g=g.replace(/\b___(\S[\s\S]*)___\b/g,function(g,A){return I(A,"<strong><em>","</em></strong>")})).replace(/\b__(\S[\s\S]*)__\b/g,function(g,A){return I(A,"<strong>","</strong>")})).replace(/\b_(\S[\s\S]*?)_\b/g,function(g,A){return I(A,"<em>","</em>")}):(g=(g=g.replace(/___(\S[\s\S]*?)___/g,function(g,A){return/\S$/.test(A)?I(A,"<strong><em>","</em></strong>"):g})).replace(/__(\S[\s\S]*?)__/g,function(g,A){return/\S$/.test(A)?I(A,"<strong>","</strong>"):g})).replace(/_([^\s_][\s\S]*?)_/g,function(g,A){return/\S$/.test(A)?I(A,"<em>","</em>"):g}),g=A.literalMidWordAsterisks?(g=(g=g.replace(/([^*]|^)\B\*\*\*(\S[\s\S]+?)\*\*\*\B(?!\*)/g,function(g,A,C){return I(C,A+"<strong><em>","</em></strong>")})).replace(/([^*]|^)\B\*\*(\S[\s\S]+?)\*\*\B(?!\*)/g,function(g,A,C){return I(C,A+"<strong>","</strong>")})).replace(/([^*]|^)\B\*(\S[\s\S]+?)\*\B(?!\*)/g,function(g,A,C){return I(C,A+"<em>","</em>")}):(g=(g=g.replace(/\*\*\*(\S[\s\S]*?)\*\*\*/g,function(g,A){return/\S$/.test(A)?I(A,"<strong><em>","</em></strong>"):g})).replace(/\*\*(\S[\s\S]*?)\*\*/g,function(g,A){return/\S$/.test(A)?I(A,"<strong>","</strong>"):g})).replace(/\*([^\s*][\s\S]*?)\*/g,function(g,A){return/\S$/.test(A)?I(A,"<em>","</em>"):g}),g=C.converter._dispatch("italicsAndBold.after",g,A,C)}),I.subParser("lists",function(g,A,C){"use strict";function e(g,e){C.gListLevel++,g=g.replace(/\n{2,}$/,"\n");var r=/(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0| {0,3}([*+-]|\d+[.])[ \t]+))/gm,t=/\n[ \t]*\n(?!¨0)/.test(g+="¨0");return A.disableForced4SpacesIndentedSublists&&(r=/(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0|\2([*+-]|\d+[.])[ \t]+))/gm),g=g.replace(r,function(g,e,r,a,n,o,s){s=s&&""!==s.trim();var i=I.subParser("outdent")(n,A,C),l="";return o&&A.tasklists&&(l=' class="task-list-item" style="list-style-type: none;"',i=i.replace(/^[ \t]*\[(x|X| )?]/m,function(){var g='<input type="checkbox" disabled style="margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;"';return s&&(g+=" checked"),g+=">"})),i=i.replace(/^([-*+]|\d\.)[ \t]+[\S\n ]*/g,function(g){return"¨A"+g}),e||i.search(/\n{2,}/)>-1?(i=I.subParser("githubCodeBlocks")(i,A,C),i=I.subParser("blockGamut")(i,A,C)):(i=(i=I.subParser("lists")(i,A,C)).replace(/\n$/,""),i=(i=I.subParser("hashHTMLBlocks")(i,A,C)).replace(/\n\n+/g,"\n\n"),i=t?I.subParser("paragraphs")(i,A,C):I.subParser("spanGamut")(i,A,C)),i=i.replace("¨A",""),i="<li"+l+">"+i+"</li>\n"}),g=g.replace(/¨0/g,""),C.gListLevel--,e&&(g=g.replace(/\s+$/,"")),g}function r(g,A){if("ol"===A){var C=g.match(/^ *(\d+)\./);if(C&&"1"!==C[1])return' start="'+C[1]+'"'}return""}function t(g,C,I){var t=A.disableForced4SpacesIndentedSublists?/^ ?\d+\.[ \t]/gm:/^ {0,3}\d+\.[ \t]/gm,a=A.disableForced4SpacesIndentedSublists?/^ ?[*+-][ \t]/gm:/^ {0,3}[*+-][ \t]/gm,n="ul"===C?t:a,o="";if(-1!==g.search(n))!function A(s){var i=s.search(n),l=r(g,C);-1!==i?(o+="\n\n<"+C+l+">\n"+e(s.slice(0,i),!!I)+"</"+C+">\n",n="ul"===(C="ul"===C?"ol":"ul")?t:a,A(s.slice(i))):o+="\n\n<"+C+l+">\n"+e(s,!!I)+"</"+C+">\n"}(g);else{var s=r(g,C);o="\n\n<"+C+s+">\n"+e(g,!!I)+"</"+C+">\n"}return o}return g=C.converter._dispatch("lists.before",g,A,C),g+="¨0",g=C.gListLevel?g.replace(/^(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm,function(g,A,C){return t(A,C.search(/[*+-]/g)>-1?"ul":"ol",!0)}):g.replace(/(\n\n|^\n?)(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm,function(g,A,C,I){return t(C,I.search(/[*+-]/g)>-1?"ul":"ol",!1)}),g=g.replace(/¨0/,""),g=C.converter._dispatch("lists.after",g,A,C)}),I.subParser("metadata",function(g,A,C){"use strict";function I(g){C.metadata.raw=g,(g=(g=g.replace(/&/g,"&amp;").replace(/"/g,"&quot;")).replace(/\n {4}/g," ")).replace(/^([\S ]+): +([\s\S]+?)$/gm,function(g,A,I){return C.metadata.parsed[A]=I,""})}return A.metadata?(g=C.converter._dispatch("metadata.before",g,A,C),g=g.replace(/^\s*«««+(\S*?)\n([\s\S]+?)\n»»»+\n/,function(g,A,C){return I(C),"¨M"}),g=g.replace(/^\s*---+(\S*?)\n([\s\S]+?)\n---+\n/,function(g,A,e){return A&&(C.metadata.format=A),I(e),"¨M"}),g=g.replace(/¨M/g,""),g=C.converter._dispatch("metadata.after",g,A,C)):g}),I.subParser("outdent",function(g,A,C){"use strict";return g=C.converter._dispatch("outdent.before",g,A,C),g=g.replace(/^(\t|[ ]{1,4})/gm,"¨0"),g=g.replace(/¨0/g,""),g=C.converter._dispatch("outdent.after",g,A,C)}),I.subParser("paragraphs",function(g,A,C){"use strict";for(var e=(g=(g=(g=C.converter._dispatch("paragraphs.before",g,A,C)).replace(/^\n+/g,"")).replace(/\n+$/g,"")).split(/\n{2,}/g),r=[],t=e.length,a=0;a<t;a++){var n=e[a];n.search(/¨(K|G)(\d+)\1/g)>=0?r.push(n):n.search(/\S/)>=0&&(n=(n=I.subParser("spanGamut")(n,A,C)).replace(/^([ \t]*)/g,"<p>"),n+="</p>",r.push(n))}for(t=r.length,a=0;a<t;a++){for(var o="",s=r[a],i=!1;/¨(K|G)(\d+)\1/.test(s);){var l=RegExp.$1,c=RegExp.$2;o=(o="K"===l?C.gHtmlBlocks[c]:i?I.subParser("encodeCode")(C.ghCodeBlocks[c].text,A,C):C.ghCodeBlocks[c].codeblock).replace(/\$/g,"$$$$"),s=s.replace(/(\n\n)?¨(K|G)\d+\2(\n\n)?/,o),/^<pre\b[^>]*>\s*<code\b[^>]*>/.test(s)&&(i=!0)}r[a]=s}return g=r.join("\n"),g=g.replace(/^\n+/g,""),g=g.replace(/\n+$/g,""),C.converter._dispatch("paragraphs.after",g,A,C)}),I.subParser("runExtension",function(g,A,C,I){"use strict";if(g.filter)A=g.filter(A,I.converter,C);else if(g.regex){var e=g.regex;e instanceof RegExp||(e=new RegExp(e,"g")),A=A.replace(e,g.replace)}return A}),I.subParser("spanGamut",function(g,A,C){"use strict";return g=C.converter._dispatch("spanGamut.before",g,A,C),g=I.subParser("codeSpans")(g,A,C),g=I.subParser("escapeSpecialCharsWithinTagAttributes")(g,A,C),g=I.subParser("encodeBackslashEscapes")(g,A,C),g=I.subParser("images")(g,A,C),g=I.subParser("anchors")(g,A,C),g=I.subParser("autoLinks")(g,A,C),g=I.subParser("simplifiedAutoLinks")(g,A,C),g=I.subParser("emoji")(g,A,C),g=I.subParser("underline")(g,A,C),g=I.subParser("italicsAndBold")(g,A,C),g=I.subParser("strikethrough")(g,A,C),g=I.subParser("ellipsis")(g,A,C),g=I.subParser("hashHTMLSpans")(g,A,C),g=I.subParser("encodeAmpsAndAngles")(g,A,C),A.simpleLineBreaks?/\n\n¨K/.test(g)||(g=g.replace(/\n+/g,"<br />\n")):g=g.replace(/  +\n/g,"<br />\n"),g=C.converter._dispatch("spanGamut.after",g,A,C)}),I.subParser("strikethrough",function(g,A,C){"use strict";return A.strikethrough&&(g=(g=C.converter._dispatch("strikethrough.before",g,A,C)).replace(/(?:~){2}([\s\S]+?)(?:~){2}/g,function(g,e){return function(g){return A.simplifiedAutoLink&&(g=I.subParser("simplifiedAutoLinks")(g,A,C)),"<del>"+g+"</del>"}(e)}),g=C.converter._dispatch("strikethrough.after",g,A,C)),g}),I.subParser("stripLinkDefinitions",function(g,A,C){"use strict";var e=function(g,e,r,t,a,n,o){return e=e.toLowerCase(),r.match(/^data:.+?\/.+?;base64,/)?C.gUrls[e]=r.replace(/\s/g,""):C.gUrls[e]=I.subParser("encodeAmpsAndAngles")(r,A,C),n?n+o:(o&&(C.gTitles[e]=o.replace(/"|'/g,"&quot;")),A.parseImgDimensions&&t&&a&&(C.gDimensions[e]={width:t,height:a}),"")};return g=(g+="¨0").replace(/^ {0,3}\[(.+)]:[ \t]*\n?[ \t]*<?(data:.+?\/.+?;base64,[A-Za-z0-9+/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n\n|(?=¨0)|(?=\n\[))/gm,e),g=g.replace(/^ {0,3}\[(.+)]:[ \t]*\n?[ \t]*<?([^>\s]+)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n+|(?=¨0))/gm,e),g=g.replace(/¨0/,"")}),I.subParser("tables",function(g,A,C){"use strict";function e(g){return/^:[ \t]*--*$/.test(g)?' style="text-align:left;"':/^--*[ \t]*:[ \t]*$/.test(g)?' style="text-align:right;"':/^:[ \t]*--*[ \t]*:$/.test(g)?' style="text-align:center;"':""}function r(g,e){var r="";return g=g.trim(),(A.tablesHeaderId||A.tableHeaderId)&&(r=' id="'+g.replace(/ /g,"_").toLowerCase()+'"'),g=I.subParser("spanGamut")(g,A,C),"<th"+r+e+">"+g+"</th>\n"}function t(g,e){return"<td"+e+">"+I.subParser("spanGamut")(g,A,C)+"</td>\n"}function a(g){var a,n=g.split("\n");for(a=0;a<n.length;++a)/^ {0,3}\|/.test(n[a])&&(n[a]=n[a].replace(/^ {0,3}\|/,"")),/\|[ \t]*$/.test(n[a])&&(n[a]=n[a].replace(/\|[ \t]*$/,"")),n[a]=I.subParser("codeSpans")(n[a],A,C);var o=n[0].split("|").map(function(g){return g.trim()}),s=n[1].split("|").map(function(g){return g.trim()}),i=[],l=[],c=[],u=[];for(n.shift(),n.shift(),a=0;a<n.length;++a)""!==n[a].trim()&&i.push(n[a].split("|").map(function(g){return g.trim()}));if(o.length<s.length)return g;for(a=0;a<s.length;++a)c.push(e(s[a]));for(a=0;a<o.length;++a)I.helper.isUndefined(c[a])&&(c[a]=""),l.push(r(o[a],c[a]));for(a=0;a<i.length;++a){for(var d=[],p=0;p<l.length;++p)I.helper.isUndefined(i[a][p]),d.push(t(i[a][p],c[p]));u.push(d)}return function(g,A){for(var C="<table>\n<thead>\n<tr>\n",I=g.length,e=0;e<I;++e)C+=g[e];for(C+="</tr>\n</thead>\n<tbody>\n",e=0;e<A.length;++e){C+="<tr>\n";for(var r=0;r<I;++r)C+=A[e][r];C+="</tr>\n"}return C+="</tbody>\n</table>\n"}(l,u)}if(!A.tables)return g;return g=C.converter._dispatch("tables.before",g,A,C),g=g.replace(/\\(\|)/g,I.helper.escapeCharactersCallback),g=g.replace(/^ {0,3}\|?.+\|.+\n {0,3}\|?[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*:?[ \t]*(?:[-=]){2,}[\s\S]+?(?:\n\n|¨0)/gm,a),g=g.replace(/^ {0,3}\|.+\|[ \t]*\n {0,3}\|[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*\n( {0,3}\|.+\|[ \t]*\n)*(?:\n|¨0)/gm,a),g=C.converter._dispatch("tables.after",g,A,C)}),I.subParser("underline",function(g,A,C){"use strict";return A.underline?(g=C.converter._dispatch("underline.before",g,A,C),g=A.literalMidWordUnderscores?g.replace(/\b_?__(\S[\s\S]*)___?\b/g,function(g,A){return"<u>"+A+"</u>"}):g.replace(/_?__(\S[\s\S]*?)___?/g,function(g,A){return/\S$/.test(A)?"<u>"+A+"</u>":g}),g=g.replace(/(_)/g,I.helper.escapeCharactersCallback),g=C.converter._dispatch("underline.after",g,A,C)):g}),I.subParser("unescapeSpecialChars",function(g,A,C){"use strict";return g=C.converter._dispatch("unescapeSpecialChars.before",g,A,C),g=g.replace(/¨E(\d+)E/g,function(g,A){var C=parseInt(A);return String.fromCharCode(C)}),g=C.converter._dispatch("unescapeSpecialChars.after",g,A,C)});"function"==typeof define&&define.amd?define(function(){"use strict";return I}):"undefined"!=typeof module&&module.exports?module.exports=I:this.showdown=I}).call(this);

var watermark = `<a class="li-watermark" href="https://li.js.org">
<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg" id="li-watermark">
 <g transform="translate(6, 6)">
 <g transform="scale(0.04)">
  <g>
    <path id="svg_2" d="m0,70L0,315" stroke-width="30" stroke="#282a2e" fill="none" stroke-linecap="round"/>
    <path id="svg_5" d="m85,400l115,0" stroke-width="30" stroke="#282a2e" fill="none" stroke-linecap="round"/>
    <path id="svg_12" d="m0,315l80,80l40,0l-105,-105l0,40z" stroke-width="30" stroke="#282a2e" fill="#282a2e" stroke-linecap="round"/>
  </g>
  <g>
    <path id="svg_6" d="m400,400l0,-149.7" stroke-width="30" stroke="#282a2e" fill="none" stroke-linecap="round"/>
    <circle r="14" id="svg_7" cy="80" cx="400" stroke-width="30" stroke="#282a2e" fill="#282a2e" />
    <circle r="14" id="svg_8" cy="171" cx="298" stroke-width="30" stroke="#282a2e" fill="#282a2e" />
    <path id="svg_11" d="m400,265.77568l-7,0l0, -22 l-76, -74 l-20,20l83,83l20,20z" stroke-width="30" stroke="#282a2e" fill="#282a2e" stroke-linecap="round"/></g></g></g></svg></a>`

var download = `<a id="download" class="li-watermark li-download" href="https://li.js.org">
<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg" id="li-watermark">
 <g transform="translate(6, 7)">
 <g transform="scale(0.83)">
  <path fill="#282a2e" d="M15,7h-3V1H8v6H5l5,5L15,7z M19.338,13.532c-0.21-0.224-1.611-1.723-2.011-2.114  C17.062,11.159,16.683,11,16.285,11h-1.757l3.064,2.994h-3.544c-0.102,0-0.194,0.052-0.24,0.133L12.992,16H7.008l-0.816-1.873  c-0.046-0.081-0.139-0.133-0.24-0.133H2.408L5.471,11H3.715c-0.397,0-0.776,0.159-1.042,0.418c-0.4,0.392-1.801,1.891-2.011,2.114  c-0.489,0.521-0.758,0.936-0.63,1.449l0.561,3.074c0.128,0.514,0.691,0.936,1.252,0.936h16.312c0.561,0,1.124-0.422,1.252-0.936  l0.561-3.074C20.096,14.468,19.828,14.053,19.338,13.532z"/>
 </g></g></svg></a>`

var editIcon = document.createElement("div")
editIcon.className = "li-edit-icon"
editIcon.innerHTML += `<svg id="li-edit-icon" width="20" height="20" xmlns="http://www.w3.org/2000/svg" id="li-watermark"><path fill="#282a2e" d="M17.561,2.439c-1.442-1.443-2.525-1.227-2.525-1.227L8.984,7.264L2.21,14.037L1.2,18.799l4.763-1.01  l6.774-6.771l6.052-6.052C18.788,4.966,19.005,3.883,17.561,2.439z M5.68,17.217l-1.624,0.35c-0.156-0.293-0.345-0.586-0.69-0.932  c-0.346-0.346-0.639-0.533-0.932-0.691l0.35-1.623l0.47-0.469c0,0,0.883,0.018,1.881,1.016c0.997,0.996,1.016,1.881,1.016,1.881  L5.68,17.217z"/></svg>`

// Initialise modes
var presentationMode = false,
    scrollAnimations = [];

var md;

document.addEventListener('DOMContentLoaded', function(){

    md = document.body.innerHTML;

    var html = convert(md);

    //add watermark
    html += watermark;

    //add download button
    html += download;

    document.body.innerHTML = html;

    save();

    //add edit icon
    document.body.appendChild(editIcon)


    if (typeof(d3) !== "undefined") {
        renderD3();
    }

    presentationModeSetup();
    scrollAnimationSetup();

}, false);

//main converter function
function convert(md) {

    showdown.setFlavor('github');
    showdown.setOption('simpleLineBreaks', true);
    showdown.setOption('emoji', true);
    showdown.setOption('tables', true);
    showdown.setOption('tasklists', true);
    showdown.setOption('ghMentions', false);

    var converter = new showdown.Converter();

    //remove '↵' that appears in textarea value
    md = md.replace(/↵/g, "\n");

    //add some new lines to the end so that I don't have to always match '\n or end of string'
    md += "\n\n"

    // li.§ (for emoji)
    md = md.replace(/@li\.§/g, "");
    // § as spaces
    md = md.replace(/(?<!\\)§/g, "&nbsp;")
    md = md.replace(/\\§/g, "§")

    // spacers
    md = md.replace(/\/\/\/\/\/\//g, '\<div class="big-spacer">\</div>');
    md = md.replace(/(?<!\\)\/\/\//g, '\<div class="spacer">\</div>');
    md = md.replace(/\\\/\/\//g, '///');

    // li.present
    presentationMode = /( *@li\.present)/g.test(md);
    md = md.replace(/@li\.present/g, '');

    // li.font
    md = md.replace(/(?<!\\)@li\.font\( *([\w ]*) *(?:, *(.*) *)?\)/g, changeFont);

    // colours
    md = md.replace(/(?<!\\)\( *((?:rgb\( *[0-9]{1,3} *, *[0-9]{1,3} *, *[0-9]{1,3} *\))|(?:#[0-9a-zA-Z]{3})|(?:#[0-9a-zA-Z]{6})|red|orange2?|yellow|green2?|teal2?|blue|blue2|purple2?|pink|grey2?|gray2?|brown2?|gold|black|white *):(.*?) *\)/g, function(_, colour, content){ return `<span style='color:${liColour(colour)};'>${content}</span>` })  // TODO: stupid
    md = md.replace(/\\(\( *((?:rgb\( *[0-9]{1,3} *, *[0-9]{1,3} *, *[0-9]{1,3} *\))|(?:#[0-9a-zA-Z]{3})|(?:#[0-9a-zA-Z]{6}) *):)/g, "$1")

    //colour tags - rgb version (may have been converted to HTML tags by the browser) - DEPRECIATED
    md = md.replace(/(?<!\\)< *rgb(.*?):(.*?)>/g, "<span style='color:rgb$1;'>$2</span>");
//    md = md.replace(/(?<!\\)&lt; *rgb(.*?):(.*?)&gt;/g, "<span style='color:rgb$1;'>$2</span>");

    // li.tooltip - TODO: something changes \) to ) which prevents \) detection
    md = md.replace(/(?<!\\)@li\.tooltip\((.*?)(?<!\\):(.*?)(?<!\\)\)/g, "<span class='li-tooltip'>$1<span class='li-tooltip-text'>$2</span></span>");

    // li.table
    md = md.replace(/(?<!\\)@li\.table *\n(.*\t?)\n((.*\n)*?)( *\n)/g, toTable);

    // TODO: not finished
    // // |" quote  //TODO add to documentation
    // md = md.replace(/\n(?:(?<!\\)\| *"(.*)\n?)+(.*)?/g, function(match, _, attribution){
    //     var content = match.replace(attribution, "").split("\n").map(d => d.replace(/\| *(.*)/g, "$1"))
    //     return "<blockquote class='li-quote'>" + convert(content.join("\n").replace(/"/g, "")) + "<span class='li-quote-attribution'>" + attribution + "</span>"
    //  + "</blockquote>" });

    // li.blockquote  //TODO add to documentation
    md = md.replace(/ *(?<!\\)@li.blockquote *\(?([^\)]*)\)/g, function(_, content){

        return "<blockquote class='li-blockquote'>" + converter.makeHtml(content) + "</blockquote>"
    });
    // | blockquote
    md = md.replace(/\n(?:(?<!\\)\| *(.*)\n?)+/g, function(match, _){
        var content = match.split("\n").map(d => d.replace(/\| *(.*)/g, "$1"))
        return "<blockquote class='li-blockquote'>" + convert(content.join("\n")) + "</blockquote>"
    });

    // li.youtube
    md = md.replace(/(?<!\\)@li\.[Yy]ou[Tt]ube\(([^,]*)(?: *, *(\d+|full|fullscreen))?\)/g, youTubeEmbed);

    // li.d3.force-bubble
    md = md.replace(/(?<!\\)@li\.(?:d3\.)?(force-bubble|bubble|bee-?swarm) *\n((.*\n)*?)( *\n)/g, toForceBubble);

    // li.d3.bar-chart
    md = md.replace(/(?<!\\)@li\.(?:d3\.)?bar-chart *\n((.*\n)*?)( *\n)/g, toBarChart);

    // li.d3.sankey
    md = md.replace(/(?<!\\)@li\.(?:d3\.)?sankey *\n(.*\t?)\n((.*\n)*?)( *\n)/g, toSankey);

    // li.d3.tree & li.d3.cluster
    md = md.replace(/ *(?<!\\)@li\.(?:d3\.)?(tree|cluster|cluster-no-separation|radial-tree) *\n((.*\n)*?)( *\n)/g, tree_o_matic);

    // li.big
    md = md.replace(/ *(?<!\\)@li\.big(.*)?\n?/g, toBigText);

    // li.nav //TODO: make watermarks white if nav bar
    //TODO add to documentation
    md = md.replace(/ *(?<!\\)@li\.nav(?:-?bar)?\(((?:[\n ]*\[.*\]\(.*\),?[\n ]*)+)\)/g, function(_, content){
        var nav = "<div class='li-nav-bar'>"
        content.replace(" ", "").replace("\n", "").split(",").forEach(function(d){
            nav += d.replace(/\[(.*)\]\((.*)\)/g, (_, name, href) => `<a href="${href}">${name}</a>`)
        })
        return nav + "</div>"
    })

    // li.center()
    md = md.replace(/ *(?<!\\)@li.cent(?:er|re) *\(((?:(?!\n\)\n)(?:.|\n))*)?\n *\)/g, function(_, content){
        return "<div class='li-centred-outer'><div class='li-centred-inner'>" + converter.makeHtml(content) + "</div></div>"
    });
    // li.center
    md = md.replace(/ *(?<!\\)@li.cent(?:er|re) *(.*)?\n/g, function(_, content){
        return "<div class='li-centred-outer'><div class='li-centred-inner'>" + converter.makeHtml(content) + "</div></div>"
    });

    var html = converter.makeHtml(md);

    // ~PARSE HTML~

    //fix html entities //TODO: make sure it's only in code tags
    html = html
      .replace(/&quot;/g, '"')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&');

    // li.fraktur
    html = html.replace(/<.+> *@li\.fraktur (.*)<\/(.+)>/g, toFraktur);

    // colour tags - hex version - DEPRECIATED
    html = html.replace(/(?<!\\)< *#(.*?):(.*?)>/g, "<span style='color:#$1;'>$2</span>");

    // unescape chars the user escaped
    html = html.replace(/(?<!\\)\\([@)\|])/g, "$1");

    //remove backslash in \< and \> only if they are not part of actual tags
    html = html.replace(/\\(< *#)/g, "$1");    //hex colour tag
    html = html.replace(/\\(< *rgb)/g, "$1");  //rgb colour tag

    // <--> or <->
    html = html.replace(/(?<!\\)<--?>/g, "<span style='font-size: 13.8px; line-height: 0.4'>⟷</span>");
    html = html.replace(/\\<-->/g, "<-->");
    html = html.replace(/\\<->/g, "<->");
    // -->
    html = html.replace(/(?<![\\<])-->/g, "<span style='font-size: 13.8px; line-height: 0.4'>⟶</span>");
    html = html.replace(/\\-->/g, "-->"); // TODO: this one doesn't work because the backslash gets removed somehow
    // <--
    html = html.replace(/(?<!\\)<--(?!>)/g, "<span style='font-size: 13.8px; line-height: 0.4'>⟵</span>");
    html = html.replace(/\\<--/g, "<--");
    // <==> or <=>
    html = html.replace(/(?<!\\)<==?>/g, "<span style='font-size: 13.8px; line-height: 0.4'>⟺</span>");
    html = html.replace(/\\<==>/g, "<==>");
    html = html.replace(/\\<=>/g, "<=>");
    // ==>
    html = html.replace(/(?<![\\<])==>/g, "<span style='font-size: 13.8px; line-height: 0.4'>⟹</span>");
    html = html.replace(/\\==>/g, "==>");
    // <==
    html = html.replace(/(?<!\\)<==(?!>)/g, "<span style='font-size: 13.8px; line-height: 0.4'>⟸</span>");
    html = html.replace(/\\<==/g, "<==");

    return html
}


//
// EDIT FUNCTIONALITY
//


function save() {
    md = "<script src='https://li.js.org/li.js'></script>\n" + md;
    if (typeof(d3) !== "undefined") {
        md = "<script src='https://d3js.org/d3.v5.min.js'></script>" + md
    }

    var a = document.getElementById("download");
    var file = new Blob([md], {type: 'text/plain'});
    a.href = URL.createObjectURL(file);
    a.download = "document.html";
}

// add new section below selected element
function addSection(target) {
    var mdBox = document.createElement("textarea");
//    mdBox.style.resize = "none"
    mdBox.className = "li-editor li-editor-box";
    mdBox.rows = 10; //TODO: add rows
//    mdBox.wrap = "off"
    mdBox.addEventListener('keydown', convertSection);

    //make container for edit section
    var container = document.createElement("div")
    container.className = "li-editor li-editor-container"

    //make button to publish edits
    var publishButton = document.createElement("div")
    publishButton.className = "li-editor"
    publishButton.style.width = "40px"
    publishButton.style.height = "40px"
    publishButton.style.position = "absolute"
    publishButton.style.left = "80vw"
    publishButton.style.bottom = "0"

    publishButton.style.background = "blue"
    publishButton.style.borderRadius = "0 5px 5px 0"

    publishButton.addEventListener('click', function(e){ convertSection(e, mdBox) })

    //add cancel/delete button
    var cancelButton = document.createElement("div")
    cancelButton.className = "li-editor"
    cancelButton.style.width = "40px"
    cancelButton.style.height = "40px"
    cancelButton.style.position = "absolute"
    cancelButton.style.left = "-40px"

    cancelButton.style.background = "red"
    cancelButton.style.borderRadius = "5px 0 0 5px"

    cancelButton.addEventListener('click', function(e){
        cancelButton.parentNode.parentNode.removeChild(cancelButton.parentNode)
    });

    //add elements to container
    container.insertBefore(mdBox, container.firstChild)
    container.insertBefore(publishButton, container.firstChild)
    container.insertBefore(cancelButton, container.firstChild)

    var aboveElement = target;//document.querySelector("#lijs")
    aboveElement.parentNode.insertBefore(container, aboveElement.nextSibling);
}

function convertSection(e, eventTarget="default") {

    if (e.key === "Enter" && e.ctrlKey || e.type == 'click') {

        var target = eventTarget == "default" ? e.target : eventTarget;

        var newHTML = document.createElement("div");

        //save the md
        newHTML.md = target.value;

        //add the new md to existing md
        //TODO: add it to the right place
        md += target.value;
        save();

        //convert box content to HTML and add it to the container
        newHTML.innerHTML += convert(target.value);

        //add container to DOM
        target.parentNode.parentNode.insertBefore(newHTML, target.parentNode);

        //remove box
        target.parentNode.parentNode.removeChild(target.parentNode);

        //render D3
        if (typeof(d3) !== "undefined") {
            renderD3();
        }
    }
}

var editModeActive = false;

//keyboard shortcut to enter edit mode
//TODO: option to disable editing
document.addEventListener('keydown', function(e){

    if(e.key == "e" && e.ctrlKey){

        if(!editModeActive) {

            editModeActive = true
            document.querySelector("*").style.cursor = "none"
            editIcon.style.visibility = "visible";

        }
        else {
            editModeActive = false
            document.querySelector("*").style.cursor = "default"
            editIcon.style.visibility = "hidden";

        }

    }
})

//move edit icon with the mouse
document.addEventListener('mousemove', function(e){

    if (editModeActive) {

        editIcon.style.left = e.pageX;
        editIcon.style.top = e.pageY - 18;
    }
})

//make icon stay in the same place on scroll
var lastScrollY = 0,
    lastScrollX = 0;
document.addEventListener('scroll', function(e){

    if (e.srcElement === document && editModeActive) {

        var newScrollY = e.srcElement.scrollingElement.scrollTop
        var newScrollX = e.srcElement.scrollingElement.scrollLeft

        editIcon.style.top = parseInt(editIcon.style.top) + newScrollY - lastScrollY
        editIcon.style.left = parseInt(editIcon.style.left) + newScrollX - lastScrollX

        lastScrollY = newScrollY;
        lastScrollX = newScrollX;
    }
})

document.addEventListener('click', function(e) {

    if(editModeActive) {
        e = e || window.event;
        var target = e.target || e.srcElement

        //prevent editor box from being added to the following elements
        let className = e.target.getAttribute('class') || ""
        let id = e.target.getAttribute('id') || ""
        if(className.includes("li-editor") || id.includes("li-watermark")) return;
        if(e.target.tagName == "HTML" || e.target.tagName == "BODY") return;

        addSection(target)

    }
}, false);


const palette = {
    red: "rgb(223,82,92)", //"#d63031",
    orange: "rgb(240,142,57)", //"#e17055",
    orange2: "rgb(253,189,130)", //"#e17055",
    yellow: "rgb(240,205,107)", //"#ffeaa7",
    green: "rgb(91,160,83)", //"#00b894",
    green2: "rgb(142,208,129)",
    teal: "rgb(76,152,148)",
    teal2: "rgb(136,188,182)",
    blue: "rgb(80,122,165)", //"#0984e3",
    blue2: "rgb(161,203,231)",
    purple: "rgb(175,123,160)", //"#6c5ce7",
    purple2: "rgb(211,167,199)",
    pink: "rgb(253,157,156)", //"#fd79a8",
    grey: "rgb(121,112,110)", //"#636e72",
    gray: "rgb(121,112,110)", //"#636e72",
    grey2: "rgb(186,176,172)",
    gray2: "rgb(186,176,172)",
    brown: "rgb(156,118,98)",
    brown2: "rgb(214,181,167)",
    gold: "rgb(181,152,118)",
    black: "#282a2e"
}
const patterns = {}

// colour palette
function liColour(input, svg) {

    if (typeof(input) == "undefined") return input;

    if (input.match("-stripe") && typeof(svg) != "undefined") {

        var colourName = input.split("-")[0]

        if (palette.hasOwnProperty(colourName)) {
            colourName = palette[colourName]
        }

        if (!svg[input]) {

            if (!svg.defs) {
                svg.defs = svg.append("defs")
            }

            svg[input] = svg.defs
              .append("pattern")
               .attr("id", input)
               .attr("width", 3)
               .attr("height", 3)
               .attr("patternUnits", "userSpaceOnUse")
               .attr("patternTransform", "rotate(45 50 50)")

            svg[input]
              .append("line")
              .attr("y1", 0)
              .attr("y2", 0)
              .attr("x1", 0)
              .attr("x2", 3)
              .attr("stroke", colourName)
              .attr("stroke-width", 3)

        }
        return "url(#" + input + ")"
    }

    // colours
    if (palette.hasOwnProperty(input)) {
        return palette[input];
    }
    else {
        return input
    }
}

//
// EXTENSIONS
//


function changeFont(match, font, url) {
    // if import is a url + name
    if (url) {
        getStyle('body').setProperty("font-family", "'" + font + "', sans-serif");
        if (!url.match(/["'].*/)) {
            url = "'" + url + "'";
        }
        document.styleSheets[0].insertRule("@import " + url);
    }
    // if import is name of a google font
    else {
        var fontName = font.replace("+", " ");
        getStyle('body').setProperty("font-family", "'" + fontName + "', 'Source Code Pro'");

        var fontUrl = "'https://fonts.googleapis.com/css?family=" + fontName.replace(" ", "+") + ":200,400,600'";
        document.styleSheets[0].insertRule("@import " + fontUrl);
    }

    return ""
}
function getStyle(className) {
    var classes = document.styleSheets[0].rules || document.styleSheets[0].cssRules;
    for (var x = 0; x < classes.length; x++) {
        if (classes[x].selectorText == className) {
            return classes[x].style;
        }
    }
}

function toTable(match, headerRow, body, none, blankLine) {

    headerRow = headerRow.replace(/(?<!\\),/g, " | ");
    headerRow = headerRow.replace(/\\,/g, ",");
    body = body.replace(/(?<!\\),/g, " | ");
    body = body.replace(/\\,/g, ",");

    headerRow = headerRow.replace(/(?<!\\)\t/g, " | ");
    headerRow = headerRow.replace(/\\\t/g, "\t");
    body = body.replace(/(?<!\\)\t/g, " | ");
    body = body.replace(/\\\t/g, "\t");

    var headerLine = headerRow.replace(/[^|]/g, "-");

    return "\n" + headerRow + "\n" + headerLine + "\n" + body + "\n";
}

function toBigText(match, text) {

    if (typeof(text) === "undefined") {
        return "";
    }

    var scale = 1/text.length;

    //TODO: get length of text within tags

    return `<div style='width: 100%; text-align: center;'><p style='margin: 0; font-size: calc(130vw * ${scale});'>${text}</p></div>`
}

function toFraktur(match, text, tag) {
    const normal = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let fraktur = [120172,120173,120174,120175,120176,120177,120178,120179,120180,120181,120182,120183,120184,120185,120186,120187,120188,120189,120190,120191,120192,120193,120194,120195,120196,120197,120198,120199,120200,120201,120202,120203,120204,120205,120206,120207,120208,120209,120210,120211,120212,120213,120214,120215,120216,120217,120218,120219,120220,120221,120222,120223];

    let _arr = text.split("");

    return ("<" + tag + ">" + _arr.map(function(d){
        let index = normal.indexOf(d);

        return index == -1 ? d : "&#x" + fraktur[index].toString(16);
    }).join("") + "</" + tag + ">");
}

function youTubeEmbed(match, videoId, size) {

    videoId = videoId.trim();

    const ratio = 16/9;

    var mode = "normal";

    var padding = 0,
        width = typeof(size) === "undefined" ? 630 : parseInt(size),
        height = width/ratio;

    if (size == "full" || size == "fullscreen") {
        height = window.innerHeight;
        width = ratio * height;
        padding = Math.abs(window.innerWidth - width)/2;
    }
    return `<div style="width: 100vw; display: grid; grid-template-columns: 1fr auto 1fr; margin-left: -10vw;">
            <iframe id="ytplayer" type="text/html"
             style="grid-column: 2;"
             width="${width}" height="${height}"
             src="https://www.youtube.com/embed/${videoId}?autoplay=0"
             frameborder="0"></iframe></div>`
}


//
// D3
//

//render all D3 TODO: on window resize refresh render functions
function renderD3() {
    if(!d3.li) {
        return;
    }

    // make tooltip
    d3.li.tooltip = d3.select("body")
      .on("mousemove", moveTooltip)
        .append("div")
        .attr("class", "li-d3-tooltip li-d3-tooltip-box")

    d3.li.tooltip.pointer = d3.select("body")
        .append("div")
        .attr("class", "li-d3-tooltip li-d3-tooltip-pointer")

    d3.li.tooltip.show = false;
    moveTooltip();

    // li.d3.tree & li.d3.cluster
    if(d3.li.treeData) {
        d3.li.treeData.forEach(function(d, i){ drawTree(d, i) });
    }

     // li.d3.force-bubbles
    if(d3.li.forceBubblesData) {
        d3.li.forceBubblesData.forEach(function(d, i){ drawForceBubbles(d, i) });
    }

    // li.d3.bar-chart
    if(d3.li.barChartData) {
        d3.li.barChartData.forEach(function(d, i){ drawBarChart(d, i) });
    }

    // li.d3.sankey
    if(d3.li.sankeyData) {
        d3.li.sankeyData.forEach(function(d, i){ drawSankey(d, i) });
    }
}
function moveTooltip() {
    e = window.event;

    posX = e.pageX;
    posY = e.pageY;

    var boxWidth = d3.li.tooltip.node().offsetWidth;
    var boxHeight = d3.li.tooltip.node().offsetHeight;

    d3.li.tooltip
      .transition().duration(30)
        .style("left", (posX - boxWidth/2) + "px")
        .style("top", (posY - boxHeight - 10 - 1) + "px")
        .style("opacity", d3.li.tooltip.show ? 1 : 0)

    d3.li.tooltip.pointer
      .transition().duration(30)
        .style("left", (posX - 5) + "px")
        .style("top", (posY - 10 - 1) + "px")
        .style("opacity", d3.li.tooltip.show ? 1 : 0)

    document.body.style.pointer = d3.li.tooltip.show ? "none" : "default";
}
function hideTooltip(){
    d3.li.tooltip.show = false;
}

const d3Error = "<span style='color: red'>ERROR\nCould not create: D3 module not found. Import D3 at the top of the file with a tag like this: \n\n    &lt;script src='https://d3js.org/d3.v5.min.js'&gt;&lt;/script&gt;</span>\n";


//gets matched csv or tsv style text and turns it into an array of arrays
function parseD3CSV(match, body, none, blankLine) {

    body = body.trim();

    body = body.replace(/(?<!\\),/g, "__DELIM__");
    body = body.replace(/\\,/g, ",");

    body = body.replace(/(?<!\\)\t/g, "__DELIM__");
    body = body.replace(/\\\t/g, "\t");

    var data = body.split("\n").map(d => d.split("__DELIM__").map(d => typeof(d) === "string" ? d.trim() : d ).map(d => /^[-\d\.]+$/.test(d) ? parseFloat(d) : d));

    return data;
}

function getTypes(data) {
    // logic: if more than half of non null values are that type
    let types = []

    const len = data[0].length
    for (let i = 0; i < len; i++) {

        var numbers = 0;
        var strings = 0;

        data.forEach(function(d){

            if (!(typeof(d[i]) == "undefined")) {

                if (typeof(d[i]) == "number") numbers++;
                else if(!(d[i].replace(" ", "").length == 0)) {
                    if (typeof(d[i]) == "string") strings++;
                }
            }

        })

        if (strings >= numbers) {
           types.push("string")
        }
        else {
            types.push("number")
        }
    }

    return types
}

//from https://beta.observablehq.com/@mbostock/tree-o-matic
function tree_o_matic(match, algorithm, body, none, blankLine) {

    if (typeof(d3) === "undefined") return d3Error;

    //create data object
    const parents = [];
    const nodes = body.trim().split(/\n/g);
    parents.push({children: []});
    for (let i = 0, n = nodes.length; i < n; ++i) {
        let parent, depth = nodes[i].match(/^\s*/)[0].length;
        while (!(parent = parents[depth])) --depth;
        if (!parent.children) parent.children = [];
        parent.children.push(parents[depth + 1] = {name: nodes[i].slice(depth)});
    }
    var data = parents[0].children.length === 1 ? parents[0].children[0] : parents[0];

    //store data globally to be used after parsing has finished
    if(!d3.li) {
        d3.li = {}
    }
    if(!d3.li.treeData) {
        d3.li.treeData = [{data, algorithm}];
    }
    else {
        d3.li.treeData.push({data, algorithm});
    }

    let index = d3.li.treeData.length - 1;

    return `<svg id='tree-${index}'></svg>`;
}
function tree(data, algorithm) {
    const root = d3.hierarchy(data);
    root.dx = 10;
    root.dy = window.innerWidth*0.8 / (root.height + 1);
    let layout;
//algorithm = "radial-tree"
    switch (algorithm) {
        case "cluster": layout = d3.cluster().nodeSize([root.dx * 1.4, root.dy]); break;
        case "cluster-no-separation": layout = d3.cluster().separation(() => 1).nodeSize([root.dx * 1.4, root.dy]); break;
        case "tree": layout = d3.tree().nodeSize([root.dx * 1.4, root.dy]); break;
        case "radial-tree": layout = d3.tree().separation(function(a, b){ return (a.parent == b.parent ? 1 : 2) / a.depth; }).size([2 * Math.PI, (.8*window.innerHeight)/2 - 20]);
    }
    return layout(root);
}
function radialPoint(x, y) {
  return [(y = +y) * Math.cos(x -= Math.PI / 2), y * Math.sin(x)];
}
function drawTree(treeData, i) {

    //don't render if it's already been rendered
    if(treeData.rendered) return;

    const root = tree(treeData.data, treeData.algorithm);

    const svg = d3.select("body").select("svg#tree-" + i)
      .style("background", "white")
      .style("font-size", "10px");

    var g = svg.append("g");

    const link = g.append("g")
      .attr("fill", "none")
      .attr("stroke", "#282a2e")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1.5)
    .selectAll("path")
      .data(root.links())
      .enter().append("path")
        .attr("d", d => `
          M${d.target.y},${d.target.x}
          C${d.source.y + root.dy / 2},${d.target.x}
           ${d.source.y + root.dy / 2},${d.source.x}
           ${d.source.y},${d.source.x}`)

    const node = g.append("g")
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 3)
      .selectAll("g")
      .data(root.descendants().reverse())
      .enter().append("g")
        .attr("transform", d => `translate(${d.y},${d.x})`);

    if (treeData.algorithm == "radial-tree") {
        link
          .attr("d", d3.linkRadial()
            .angle(function(d){ return d.x; })
            .radius(function(d){ return d.y; }))

        node.attr("transform", function(d){ return "translate(" + radialPoint(d.x, d.y) + ")"; });
    }

    node.append("circle")
      .attr("fill", d => d.children ? "#282a2e" : "#999")
      .attr("r", 4);

    node.append("text")
      .attr("dy", "0.31em")
      .attr("x", d => d.children || (treeData.algorithm == "radial-tree" && radialPoint(d.x, d.y)[0] < d3.max(root.descendants().reverse(), d => d.x)/2) ? -6 : 6)
      .text(d => d.data.name == "&nbsp;" ? "" : d.data.name)
      .filter(d => d.children || (treeData.algorithm == "radial-tree" && radialPoint(d.x, d.y)[0] < d3.max(root.descendants().reverse(), d => d.x)/2))
        .attr("text-anchor", "end")
      .clone(true).lower()
        .attr("stroke", "white");

    const {x, y, width, height} = g.node().getBBox();

    svg
      .style("max-width", "80vw")
      .attr("width", "80vw")
      .attr("height", height)
      .attr("viewBox", `${x} ${y} ${width} ${height}`);

    treeData.rendered = true;
}

function toSankey(match, headers, body, none, blankLine) {
    if (typeof(d3) === "undefined") return d3Error;

    d3.sankey=function(){var sankey={},nodeWidth=24,nodePadding=8,size=[1,1],nodes=[],links=[];sankey.nodeWidth=function(_){if(!arguments.length)return nodeWidth;nodeWidth=+_;return sankey};sankey.nodePadding=function(_){if(!arguments.length)return nodePadding;nodePadding=+_;return sankey};sankey.nodes=function(_){if(!arguments.length)return nodes;nodes=_;return sankey};sankey.links=function(_){if(!arguments.length)return links;links=_;return sankey};sankey.size=function(_){if(!arguments.length)return size;size=_;return sankey};sankey.layout=function(iterations){computeNodeLinks();computeNodeValues();computeNodeBreadths();computeNodeDepths(iterations);computeLinkDepths();return sankey};sankey.relayout=function(){computeLinkDepths();return sankey};sankey.link=function(){var curvature=.5;function link(d){var x0=d.source.x+d.source.dx,x1=d.target.x,xi=d3.interpolateNumber(x0,x1),x2=xi(curvature),x3=xi(1-curvature),y0=d.source.y+d.sy+d.dy/2,y1=d.target.y+d.ty+d.dy/2;return"M"+x0+","+y0+"C"+x2+","+y0+" "+x3+","+y1+" "+x1+","+y1}
    link.curvature=function(_){if(!arguments.length)return curvature;curvature=+_;return link};return link};function computeNodeLinks(){nodes.forEach(function(node){node.sourceLinks=[];node.targetLinks=[]});links.forEach(function(link){var source=link.source,target=link.target;if(typeof source==="number")source=link.source=nodes[link.source];if(typeof target==="number")target=link.target=nodes[link.target];source.sourceLinks.push(link);target.targetLinks.push(link)})}
    function computeNodeValues(){nodes.forEach(function(node){node.value=Math.max(d3.sum(node.sourceLinks,value),d3.sum(node.targetLinks,value))})}
    function computeNodeBreadths(){var remainingNodes=nodes,nextNodes,x=0;while(remainingNodes.length){nextNodes=[];remainingNodes.forEach(function(node){node.x=x;node.dx=nodeWidth;node.sourceLinks.forEach(function(link){nextNodes.push(link.target)})});remainingNodes=nextNodes;++x}
    moveSinksRight(x);scaleNodeBreadths((window.innerWidth*0.8-nodeWidth)/(x-1))}
    function moveSourcesRight(){nodes.forEach(function(node){if(!node.targetLinks.length){node.x=d3.min(node.sourceLinks,function(d){return d.target.x})-1}})}
    function moveSinksRight(x){nodes.forEach(function(node){if(!node.sourceLinks.length){node.x=x-1}})}
    function scaleNodeBreadths(kx){nodes.forEach(function(node){node.x*=kx})}
    function computeNodeDepths(iterations){var nodesByBreadth=d3.nest().key(function(d){return d.x}).sortKeys(d3.ascending).entries(nodes).map(function(d){return d.values});initializeNodeDepth();resolveCollisions();for(var alpha=1;iterations>0;--iterations){relaxRightToLeft(alpha*=.99);resolveCollisions();relaxLeftToRight(alpha);resolveCollisions()}
    function initializeNodeDepth(){var ky=d3.min(nodesByBreadth,function(nodes){return(size[1]-(nodes.length-1)*nodePadding)/d3.sum(nodes,value)});nodesByBreadth.forEach(function(nodes){nodes.forEach(function(node,i){node.y=i;node.dy=node.value*ky})});links.forEach(function(link){link.dy=link.value*ky})}
    function relaxLeftToRight(alpha){nodesByBreadth.forEach(function(nodes,breadth){nodes.forEach(function(node){if(node.targetLinks.length){var y=d3.sum(node.targetLinks,weightedSource)/d3.sum(node.targetLinks,value);node.y+=(y-center(node))*alpha}})});function weightedSource(link){return center(link.source)*link.value}}
    function relaxRightToLeft(alpha){nodesByBreadth.slice().reverse().forEach(function(nodes){nodes.forEach(function(node){if(node.sourceLinks.length){var y=d3.sum(node.sourceLinks,weightedTarget)/d3.sum(node.sourceLinks,value);node.y+=(y-center(node))*alpha}})});function weightedTarget(link){return center(link.target)*link.value}}
    function resolveCollisions(){nodesByBreadth.forEach(function(nodes){var node,dy,y0=0,n=nodes.length,i;nodes.sort(ascendingDepth);for(i=0;i<n;++i){node=nodes[i];dy=y0-node.y;if(dy>0)node.y+=dy;y0=node.y+node.dy+nodePadding}
    dy=y0-nodePadding-size[1];if(dy>0){y0=node.y-=dy;for(i=n-2;i>=0;--i){node=nodes[i];dy=node.y+node.dy+nodePadding-y0;if(dy>0)node.y-=dy;y0=node.y}}})}
    function ascendingDepth(a,b){return a.y-b.y}}
    function computeLinkDepths(){nodes.forEach(function(node){node.sourceLinks.sort(ascendingTargetDepth);node.targetLinks.sort(ascendingSourceDepth)});nodes.forEach(function(node){var sy=0,ty=0;node.sourceLinks.forEach(function(link){link.sy=sy;sy+=link.dy});node.targetLinks.forEach(function(link){link.ty=ty;ty+=link.dy})});function ascendingSourceDepth(a,b){return a.source.y-b.source.y}
    function ascendingTargetDepth(a,b){return a.target.y-b.target.y}}
    function center(node){return node.y+node.dy/2}
    function value(link){return link.value}
    return sankey}

    var data = parseD3CSV(match, body, none, blankLine);
    data = data.map(function(d){ return {source: d[0], target: d[1], value: d[2], colour: d[3]}})

    //store data globally to be used after parsing has finished
    if(!d3.li) {
        d3.li = {};
    }
    if(!d3.li.sankeyData) {
        d3.li.sankeyData = [{data, headers}];
    }
    else {
        d3.li.sankeyData.push({data, headers});
    }

    let index = d3.li.sankeyData.length - 1;

    return `<svg id='li-sankey-${index}'></svg>`;
}

function drawSankey(data, index) {

    var width = window.innerWidth*.8;
    var height = window.innerHeight*.7;

    data.headers = data.headers.replace(" ", "").split(",");

    //TODO: search headers for correct index of colour and measure

    var measureName = data.headers[2];

    var svg = d3.select("body").select("svg#li-sankey-" + index)
        .attr("width", width)
        .attr("height", height)

    var links = data.data;

    // Set the sankey diagram properties
    var sankey = d3.sankey()
        .nodeWidth(10)
        .nodePadding(40)
        .size([width, height]);

    var path = sankey.link();

    var nodes = []

    links.forEach(function(d) {
         if(nodes.indexOf(d.source) < 0) {
             nodes.push(d.source);
         }
         if(nodes.indexOf(d.target) < 0) {
             nodes.push(d.target);
         }
    });

    links = links.map(function(d){ return { source: nodes.indexOf(d.source), target: nodes.indexOf(d.target), value: d.value } })

    nodes = nodes.map(function(d){ return {name: d, node: nodes.indexOf(d)} });

    sankey
      .nodes(nodes)
      .links(links)
      .layout(40);

    // add in the links
    var link = svg.append("g").selectAll(".link")
        .data(links)
      .enter().append("path")
        .attr("class", "li-sankey-link")
        .style("stroke", d => liColour(data.data.filter(e => e.source == d.source.name && e.target == d.target.name)[0].colour, svg) || "#686a6e")
        .attr("d", path)
        .style("stroke-width", function(d){ return Math.max(1, d.dy); })
        .sort(function(a, b){ return b.dy - a.dy; })
        .on("mouseleave", hideTooltip)
        .on("mouseenter", updateLinkTooltip);

    // add in the nodes
    var node = svg.append("g").selectAll(".node")
        .data(nodes)
      .enter().append("g")
        .attr("class", "li-sankey-node")
        .attr("transform", function(d){
  		    return "translate(" + d.x + "," + d.y + ")"; })
      .on("mouseenter", function(d){ updateNodeTooltip(d); mouseenterNode(d) })
      .on("mouseleave", function(d){ hideTooltip(d); mouseleaveNode(d) })
      .call(d3.drag()
        .on("start", function(){
  		    this.parentNode.appendChild(this); })
        .on("drag", dragmove));

    function mouseenterNode(d) {
        link.filter(e => e.source == d || e.target == d)
          .style("stroke-opacity", .7)
    }

    function mouseleaveNode(d) {
        link.filter(e => e.source == d || e.target == d)
          .style("stroke-opacity", .4)
    }

    function updateNodeTooltip(d) {
        d3.li.tooltip.show = true;
        d3.li.tooltip.html(
            `${d.name}</br>
            <div style="display: grid; grid-template-columns: max-content 1fr;">
              <p style="display: inline; font-weight: 200; margin: 0;">${measureName}:&nbsp</p>
              <p style="display: inline; text-align: right; margin: 0;">${d.value}</p>
            </div>`
        );
    }
    function updateLinkTooltip(d) {
        d3.li.tooltip.show = true;
        d3.li.tooltip.html(
            `${d.source.name} <span style="font-size: 16px; line-height: 0.4;">⟶</span> ${d.target.name}</br>
            <div style="display: grid; grid-template-columns: max-content 1fr;">
              <p style="display: inline; font-weight: 200; margin: 0;">${measureName}:&nbsp</p>
              <p style="display: inline; text-align: right; margin: 0;">${d.value}</p>
            </div>`
        );
    }

    // add the rectangles for the nodes
    node.append("rect")
        .attr("height", function(d) { return d.dy; })
        .attr("width", sankey.nodeWidth())
        .style("fill", "#282a2e");

    // add in the title for the nodes
    node.append("text")
        .attr("x", -6)
        .attr("y", function(d) { return d.dy / 2; })
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .attr("transform", null)
        .text(function(d) { return d.name; })
      .filter(function(d) { return d.x < width / 2; })
        .attr("x", 6 + sankey.nodeWidth())
        .attr("text-anchor", "start");

    // the function for moving the nodes
    function dragmove(d) {
      d3.select(this).attr("transform",
          "translate(" + d.x + "," + (
                  d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))
              ) + ")");
      sankey.relayout();
      link.attr("d", path);

      d3.li.tooltip.show = false;
      moveTooltip()
    }

    links.rendered = true

}

function toBarChart(match, body, none, blankLine) {

    if (typeof(d3) === "undefined") return d3Error;

    var data = parseD3CSV(match, body, none, blankLine);

    //store data globally to be used after parsing has finished
    if(!d3.li) {
        d3.li = {}
    }
    if(!d3.li.barChartData) {
        d3.li.barChartData = [{data}];
    }
    else {
        d3.li.barChartData.push({data});
    }

    let index = d3.li.barChartData.length - 1;

    return `<svg id='li-bar-chart-${index}'></svg>`;
}
function drawBarChart(barChartData, i) {

    //don't render if it's already been rendered
    if(barChartData.rendered) return;
    barChartData.rendered = true;

    const headers = barChartData.data.shift()

    //extract colours
    const ci = headers.map(d => Boolean(d.toString().match(/([Cc]olou?r)([:\=]\w)?/g))).indexOf(true)

    var colours = [];
    var defaultColour;

    if (ci > -1) {
        defaultColour = headers[ci].replace("=", ":").split(":")[1];
        defaultColour = typeof(defaultColour) == "undefined" ? "#282a2e" : defaultColour;
        headers.splice(ci, 1);
        barChartData.data.forEach(d => colours.push(d.splice(ci, 1)[0]));
    }

    //get types of headers
    const types = getTypes(barChartData.data);
    //logic: first column is the group
    var groups = []
    //reformat null category names to keep them in
    barChartData.data.forEach(function(d, i){
        if(!d[0]) {
            d[0] = "__empty__" + i;
        }
    })
    barChartData.data.forEach(function(d){ if(groups.indexOf(d[0]) < 0) groups.push(d[0]) })

    const measures = headers.length - 1;
    var measure = 1;

    barChartData.stackHeights = [];

    var dataDomain = [0, 0];

    //loop over every row for every group for every measure
    for (let i = 1; i < measures + 1; i++) {

        if (types[i] == "string") continue;

        barChartData.stackHeights[i] = []

        for (let j = 0; j < groups.length; j++) {

            var running_total = 0
            var negative_running_total = 0

            barChartData.data.forEach(function(d, k){

                if (d[0] === groups[j]) {
                    if (d[i] >= 0) {
                        barChartData.stackHeights[i][k] = running_total;

                        running_total += d[i] ? parseFloat(d[i]) : 0;

                        if (running_total > dataDomain[0]) dataDomain[0] = running_total;
                    }
                    if (d[i] < 0) {
                        barChartData.stackHeights[i][k] = negative_running_total;

                        negative_running_total += d[i] ? parseFloat(d[i]) : 0;

                        if (negative_running_total < dataDomain[1]) dataDomain[1] = negative_running_total;
                    }
                }
            })
        }
    }

    const w = window.innerWidth*.8;
    const h = window.innerHeight*.8;
    const ym = 20;
    const xm = 40;
    const barWidth = Math.min((w - xm*4)/groups.length - 1, 65)

    const scale = d3.scaleLinear()
      .domain(dataDomain)
      .range([xm, 0.9*h]);

    const iScale = d3.scaleLinear()
      .domain([0, groups.length])
      .range([xm*2, w - xm*2]);

    const svg = d3.select("body").select("svg#li-bar-chart-" + i)
      .style("height", h)
      .style("width", w);

    colours = colours.map(d => d ? d : defaultColour)
    colours = colours.map(d => liColour(d, svg))

    const bars = svg.selectAll("rect")
      .data(barChartData.data)
      .enter().append("rect");

    bars
      .attr("class", "li-bar-chart")
      .style("fill", (d, i) => colours[i] || "#282a2e")
      .attr("x", d => iScale(groups.indexOf(d[0])))
      .attr("y", (d, i) => scale(0))
      .attr("width", barWidth)
      .attr("height", d => Math.abs(scale(0) - scale(0)))
      .attr("transform", `translate(${((w - xm*4)/groups.length - 1 - barWidth)/2}, 0)`)
      .on("mouseenter", updateTooltip)
      .on("mouseleave", hideTooltip);

    function updateTooltip(d) {
        d3.li.tooltip.show = true;
        d3.li.tooltip.html(`<span style="font-weight: 200">${headers[measure]}:</span> ${d[measure]}`);
    }

    addScrollTrigger({
        func: function(){
            bars
              .transition()
              .duration(500)
              .delay((d, i) => i*20)
                .attrTween("height", function(d) {
                    const i = d3.interpolate(0, d[measure]);
                    return function(t) {
                        return Math.abs(scale(0) - scale(i(t)))
                    }
                })
                .attrTween("y", function(d, j) {
                    const i = d3.interpolate(0, d[measure]);
                    const i2 = d3.interpolate(0, barChartData.stackHeights[measure][j]);
                    return function(t) {
                        return i(t) < 0 ? scale(i2(t)) : scale(i(t) + i2(t))
                    }
                });

            svg.on("click", changeMeasure);
        },
        triggerPos: svg.node().getBoundingClientRect().top + window.scrollY - h/3
    })

    function changeMeasure() {
        const previousMeasure = measure
        measure = ++measure > measures ? 1 : measure;

        if (types[measure] == "string") {
            measure = ++measure > measures ? 1 : measure;
        }

        bars
          .transition()
          .duration(500)
            //make sure the height tweens properly if the sign of the measure flips
            .attrTween("height", function(d) {
                const i = d3.interpolate(d[previousMeasure], d[measure]);
                return function(t) {
                    return Math.abs(scale(0) - scale(i(t)))
                }
            })
            .attrTween("y", function(d, j) {
                const i = d3.interpolate(d[previousMeasure], d[measure]);
                const i2 = d3.interpolate(barChartData.stackHeights[previousMeasure][j], barChartData.stackHeights[measure][j]);
                return function(t) {
                    return i(t) < 0 ? scale(i2(t)) : scale(i(t) + i2(t))
                }
            })

        header.text(headers[measure])

        d3.li.tooltip.show = false;
        moveTooltip()
    }

    svg.selectAll("text")
      .data(groups)
      .enter().append("text")
        .text(d => d.includes("__empty__") ? "" : d.replace(/'/g, ""))
        .attr("x", (d, i) => iScale(i) + (iScale(0.5) - iScale(0)))
        .attr("y", h*.9 + ym)
        .style("text-anchor", "middle");

    var yAxis = svg.append("g")
      .attr("transform", "translate("+ xm*1.5 +",0)")
      .attr("class", "axis")
      .style("stroke-width", 1)
      .style("stroke", "#282a2e")
      .call(d3.axisLeft()
        .scale(scale));

    const header = svg
      .append("text")
      .text(headers[measure])
      .attr("transform", `translate(${xm/2},${h/2 - 20}) rotate(-90)`)
      .style("text-anchor", "middle");

}

function toForceBubble(match, variant, body, none, blankLine) {

    if (typeof(d3) === "undefined") return d3Error;

    var data = parseD3CSV(match, body, none, blankLine);

    variant == "bee-swarm" ? "beeswarm" : variant;

    //store data globally to be used after parsing has finished
    if(!d3.li) {
        d3.li = {}
    }
    if(!d3.li.forceBubblesData) {
        d3.li.forceBubblesData = [{data, variant}];
    }
    else {
        d3.li.forceBubblesData.push({data, variant});
    }

    let index = d3.li.forceBubblesData.length - 1;

    return `<svg id='li-${variant}-${index}'></svg>`;
}
function drawForceBubbles(bubblesData, i) {

    //don't render if it's already been rendered
    if(bubblesData.rendered) return;

    const headers = bubblesData.data.shift()

    const ci = headers.map(d => Boolean(d.toString().match(/([Cc]olou?r)/g))).indexOf(true)

    var colours = [];
    var defaultColour;

    if (ci > -1) {
        defaultColour = headers[ci].replace("=", ":").split(":")[1];
        defaultColour = typeof(defaultColour) == "undefined" ? "#282a2e" : defaultColour;
        bubblesData.data.forEach(d => colours.push(d.splice(ci, 1)[0]));
        headers.splice(ci, 1);
    }

    const measures = bubblesData.data[0].length - 2;
    var measure = 0;

    var w = window.innerWidth*.8;
    var h = window.innerHeight*.8;

    if (bubblesData.variant == "beeswarm") {
        h = window.innerHeight*.4;
    }

    //set the scale so that the approximate diameter = the height of the page
    //total proportional to root of the radius
    const scale = d3.scaleLinear()
      .domain([0, Math.sqrt(d3.sum(bubblesData.data, d => d[1]))])
      .range([0, 0.3*window.innerHeight]);

    const svg = d3.select("body").select(`svg#li-${bubblesData.variant}-` + i)
      .style("height", h)
      .style("width", w);

    colours = colours.map(d => d ? d : defaultColour)
    colours = colours.map(d => liColour(d, svg))

    var simulation = d3.forceSimulation()
      .force("collide", d3.forceCollide().radius(d => scale(Math.sqrt(d[1]))).iterations(4))
      .force("charge", d3.forceManyBody().strength(5))
      .force("forceX", d3.forceX().strength(0.1).x(w/2))
      .force("forceY", d3.forceY().strength(0.1).y(h/2));

    var xScale;
    var header;
    if (bubblesData.variant == "beeswarm") {
        xScale = d3.scaleLinear()
          .domain([Math.min(d3.min(bubblesData.data, d => d[2]), 0), d3.max(bubblesData.data, d => d[2])])
          .range([0.1*w, .9*w]);

        scale.range([0, 0.07*window.innerWidth]);

        simulation
          .force("forceX", d3.forceX().strength(2).x(d => xScale(d[2])))
          .force("forceY", d3.forceY().strength(0.5).y(h/2));

        var xAxis = svg.append("g")
          .attr("transform", "translate(0,"+ h*0.80 +")")
          .attr("class", "axis")
          .style("stroke-width", 1)
          .style("stroke", "#282a2e")
          .call(d3.axisBottom()
            .scale(xScale));

        header = svg
          .append("text")
          .attr("transform", `translate(${w/2},${h*0.95})`)
          .style("text-anchor", "middle")
          .text(headers[measure + 2])
    }
    else {
        simulation
          .force("center", d3.forceCenter(w/2, h/2))
    }

    const charScale = 10;

    svg.on("click", changeMeasure)

    var g = svg.append("g")
      .attr("class", "nodes")
      .selectAll("g")
      .data(bubblesData.data)
      .enter().append("g")

    var node = g.append("circle")
      .attr("r", d => scale(Math.sqrt(d[1])))
      .attr("title", d => d[0])
      .style("fill", (d, i) => colours[i] ? colours[i] : palette["black"])
      .style("stroke", "#fff")
      .style("stroke-width", 0.5)
      .on("mouseenter", updateTooltip)
      .on("mouseleave", hideTooltip)
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    function updateTooltip(d) {
        d3.li.tooltip.show = true;
        d3.li.tooltip.html(
            `${d[0]}</br>
            <div style="display: grid; grid-template-columns: max-content 1fr;">
              <p style="display: inline; font-weight: 200; margin: 0;">${headers[1]}:&nbsp</p>
              <p style="display: inline; text-align: right; margin: 0;">${d[1]}</p></div>`
            + (measures > 1 ? `<div style="display: grid; grid-template-columns: max-content 1fr;"><p style="display: inline; font-weight: 200; margin: 0;">${headers[measure + 2]}:&nbsp</p><p style="display: inline; text-align: right; margin: 0;">${d[measure + 2]}</p></div>` : "")
        );
    }

    function changeMeasure() {

        if (bubblesData.variant == "beeswarm") {
            measure = ++measure >= measures ? 0 : measure;

            simulation
              .force("forceX", d3.forceX().strength(2).x(d => xScale(d[measure + 2]))).alphaTarget(0.03).restart();

            header.text(headers[measure + 2]);

            d3.li.tooltip.show = false;
            moveTooltip();
        }
    }

    simulation
      .nodes(bubblesData.data)
      .on("tick", ticked);

    function ticked() {
        node
          .attr("cx", d => d.x)
          .attr("cy", d => d.y);
    }

    function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.1).restart();
        d.fx = d.x;
        d.fy = d.y;
        d3.li.tooltip.show = false;
        moveTooltip();
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    bubblesData.rendered = true;
}


//
// PRESENTATION CONTROLS
//


var position = 0;

function scroll(e, direction = 1) {
    var spacers = [].slice.call(document.querySelectorAll(".big-spacer"))

    //do nothing if there are no spacers
    if (spacers.length < 2) {
        return;
    }

    spacers = spacers.map(d => d.offsetTop);
    spacers.push(0);

    var scrollPos = window.scrollY || window.scrollTop || document.getElementsByTagName("html")[0].scrollTop;

    // find the nearest spacer above the scroll position (with a value less than scrollPos)
    // get all spacers below scroll position
    var spacersBelow = spacers.filter(d => scrollPos < d )

    // get the next spacers
    spacersBelow = spacersBelow.sort(function(a, b){ return a - b });
    var nearestUp = spacersBelow[0];
    var nearestDown = spacersBelow[1];

    var height = window.innerHeight;

    // sort spacers to help with next stage
    spacers = spacers.sort(function(a, b){ return a - b });

    // if user has scrolled to the last slide
    if (typeof(nearestDown) === "undefined" && direction !== -1) {
        var ReverseNearestUp = spacers[Math.max(spacers.indexOf(nearestUp) - 1, 0)];

        position = (ReverseNearestUp + height/2 + nearestUp)/2 - height/2;
    }
    // if going backwards
    else if (direction === -1) {
        var ReverseNearestUp = spacers[Math.max(spacers.indexOf(nearestUp) - 1, 0)];
        var ReverseNearestDown = spacers[Math.max(spacers.indexOf(ReverseNearestUp) - 1, 0)];

        position = (ReverseNearestDown + height/2 + ReverseNearestUp)/2 - height/2;
    }
    else {
        position = (nearestUp + height/2 + nearestDown)/2 - height/2;
    }

    if (presentationMode.transitionMode === "smooth") {
        //TODO: scroll smoothly
    }
    else {
        window.scrollTo(0, position);
    }
}


function presentationModeSetup() {
    if (presentationMode) {

        window.addEventListener("click", scroll);
        window.addEventListener("keydown", function(e){ e.which == 39 || e.which == 40 ? scroll(e, 1) : 0 });
        window.addEventListener("keydown", function(e){ e.which == 37 || e.which == 38 ? scroll(e, -1) : 0 });
    }
}

//
// scroll triggered animations
//

function triggerScrollAnimations() {

    const scrollPos = window.scrollY || window.scrollTop || document.getElementsByTagName("html")[0].scrollTop;

    scrollAnimations.forEach(function(d, i){

        if (!d.triggered && scrollPos >= d.triggerPos) {
            const index = scrollAnimations.indexOf(d);
            if (index !== -1) {
                d.triggered = true;
                d.func();
            }
        }
    })
}
function scrollAnimationSetup() {
    if (scroll) {
        triggerScrollAnimations();

        document.addEventListener('scroll', triggerScrollAnimations)
    }
}
function addScrollTrigger(obj) {
    scrollAnimations.push(obj);  // TODO: refactor
}
