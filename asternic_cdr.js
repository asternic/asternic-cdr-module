function debug(message) {
    if(window.console !== undefined) {
        console.log(message);
    }
};


function List_move_around(direction, all) {

    if (direction=="right") {
        box1 = "List_Extensions_available";
        box2 = "List_Extensions[]";
    } else {
        box1 = "List_Extensions[]";
        box2 = "List_Extensions_available" + "";
    }

    for (var i=0;i<document.forms[0].elements[box1].length;i++) {
        if ((document.forms[0].elements[box1][i].selected || all)) {
            document.forms[0].elements[box2].options[document.forms[0].elements[box2].length] =    new Option(document.forms[0].elements[box1].options[i].text, document.forms[0].elements[box1][i].value);
            document.forms[0].elements[box1][i] = null;
            i--;
        }
    }
    return false;
}

function List_check_submit() {
    box = "List_Extensions[]";
    if (document.forms[0].elements[box]) {
        for (var i=0;i<document.forms[0].elements[box].length;i++) {
            document.forms[0].elements[box][i].selected = true;
         }
    }
    return true;
}

function envia() {

    List_check_submit();

    box = "List_Extensions[]";
    if (document.forms[0].elements[box].length == 0) {
        alert("Please select at least one Extension");
        return false;
    }

    month_start = parseInt(document.forms[0].month1.value) + 1;
    month_end   = parseInt(document.forms[0].month2.value) + 1;

    fecha_s  = document.forms[0].year1.value  + '-';

    if(String(month_start).length == 1) {
        fecha_s += "0";
    } 
    fecha_s += month_start + '-';
    if(String(document.forms[0].day1.value).length == 1) {
        fecha_s += "0";
    }
    fecha_s += document.forms[0].day1.value   + ' ';
    fecha_s += '00:00:00';

    fecha_check_s = document.forms[0].year1.value;
    if(String(month_start).length == 1) {
        fecha_check_s += "0";
    } 
    fecha_check_s += month_start;
    if(String(document.forms[0].day1.value).length == 1) {
        fecha_check_s += "0";
    }
    fecha_check_s += document.forms[0].day1.value;

    fecha_check_e = document.forms[0].year2.value;
    if(String(month_end).length == 1) {
        fecha_check_e += "0";
    } 
    fecha_check_e += month_end;
    if(String(document.forms[0].day2.value).length == 1) {
        fecha_check_e += "0";
    }
    fecha_check_e += document.forms[0].day2.value;

    fecha_e  = document.forms[0].year2.value  + '-';
    if(String(month_end).length == 1) {
        fecha_e += "0";
    } 
    fecha_e += month_end + '-';
    if(String(document.forms[0].day2.value).length == 1) {
        fecha_e += "0";
    }
    fecha_e += document.forms[0].day2.value   + ' ';
    fecha_e += '23:59:59';

    document.forms[0].start.value = fecha_s;
    document.forms[0].end.value   = fecha_e;

    if(fecha_check_e < fecha_check_s) {
        alert("Invalid date range");
    } else { 
      document.forms[0].submit();
    }
    return false;
}

function setdates(start,end) {
    var start_year  = start.substr(0,4);
    var start_month = start.substr(5,2);
    var start_day   = start.substr(8,2);

    var end_year  = end.substr(0,4);
    var end_month = end.substr(5,2);
    var end_day   = end.substr(8,2);

    dstart = MWJ_findSelect( "day1" ), mstart = MWJ_findSelect( "month1" ), ystart = MWJ_findSelect( "year1" );
    dend   = MWJ_findSelect( "day2" ), mend   = MWJ_findSelect( "month2" ), yend   = MWJ_findSelect( "year2" );

    while( dstart.options.length ) { dstart.options[0] = null; }
    while( dend.options.length   ) { dend.options[0]   = null; }

    for( var x = 0; x < 31; x++  ) { dstart.options[x] = new Option( x + 1, x + 1 ); }
    for( var x = 0; x < 31; x++  ) { dend.options[x]   = new Option( x + 1, x + 1 ); }

    x = start_day - 1;
    y = end_day - 1;
    dstart.options[x].selected = true;
    dend.options[y].selected = true;
    
    x = start_month - 1;
    y = end_month - 1;
    mstart.options[x].selected = true;
    mend.options[y].selected   = true;

    for( var x = 0; x < ystart.options.length; x++ ) { 
        if( ystart.options[x].value == '' + start_year + '' ) { 
            ystart.options[x].selected = true; 
            if( window.opera && document.importNode ) { 
                window.setTimeout('MWJ_findSelect( \''+ystart.name+'\' ).options['+x+'].selected = true;',0); 
            } 
        } 
    }
    for( var x = 0; x < yend.options.length; x++ ) { 
        if( yend.options[x].value == '' + end_year + '' ) { 
            yend.options[x].selected = true; 
            if( window.opera && document.importNode ) { 
                window.setTimeout('MWJ_findSelect( \''+yend.name+'\' ).options['+x+'].selected = true;',0); 
            } 
        } 
    }

}


/********************************************************************************************************
                                         Valid month script
                               Written by Mark Wilton-Jones, 6-7/10/2002
********************************************************************************************************

Please see http://www.howtocreate.co.uk/jslibs/ for details and a demo of this script
Please see http://www.howtocreate.co.uk/jslibs/termsOfUse.html for terms of use

This script monitors years and months and makes sure that the correct number of days are provided.

To use:

Inbetween the <head> tags, put:

    <script src="PATH TO SCRIPT/validmonth.js" type="text/javascript" language="javascript1.2"></script>

To have a static year box (only allows the years defined in the HTML)

    Day of month select box should be in the format:
        <select name="day" size="1">
        <option value="1" selected>1</option>
        <option value="2">2</option>
        ...
        <option value="31">31</option>
        </select>

    Month select box should be in the format:
        <select name="month" size="1" onchange="dateChange('day','month','year');">
        <option value="January" selected>January</option>
        <option value="February">February</option>
        ...
        <option value="December">December</option>
        </select>

    Year select box should be in the format:
        <select name="year" size="1" onchange="dateChange('day','month','year');">
        <option value="1980" selected>1980</option>
        <option value="1981">1981</option>
        ...
        <option value="2010">2010</option>
        </select>

    You can now use:
        setToday('day','month','year');
    to set the date to today's date (after the page has loaded)

To have an extendible year box (creates dates lower/higher than the current range)

    Year select box should be in the format:
        <select name="year" size="1" onchange="checkMore( this, 1980, 2005, 1840, 2010 );dateChange('day','month','year');">
        <option value="MWJ_DOWN">Lower ...</option>
        <option value="1980" selected>1980</option>
        <option value="1981">1981</option>
        ...
        <option value="2005">2005</option>
        <option value="MWJ_UP">Higher ...</option>
        </select>
    If you do not want to have higher / lower values, simply omit the relevant option

    Function format:
        checkMore( this, CURRENT LOWEST YEAR, CURRENT HIGHEST YEAR, LOWEST POSSIBLE YEAR, HIGHEST POSSIBLE YEAR )

    You can now use:
        reFill( 'year', 1980, 2005, true, true );setToday('day','month','year');
    to set the date to today's date (after the page has loaded)

    Function format (make sure the range of years includes the current year):
        reFill( name of year select box, LOWEST YEAR, HIGHEST YEAR, ALLOW HIGHER (true/false), ALLOW LOWER (true/false) )
_____________________________________________________________________________________________________________________*/

//Opera 7 has a bug making it fail to set selectedIndex after dynamic generation of options unless there is a 0ms+ delay
//I have put fixes in in all necessary places

function MWJ_findSelect( oName, oDoc ) { //get a reference to the select box using its name
    if( !oDoc ) { oDoc = window.document; }
    for( var x = 0; x < oDoc.forms.length; x++ ) { if( oDoc.forms[x][oName] ) { return oDoc.forms[x][oName]; } }
    for( var x = 0; document.layers && x < oDoc.layers.length; x++ ) { //scan layers ...
        var theOb = MWJ_findObj( oName, oDoc.layers[x].document ); if( theOb ) { return theOb; } }
    return null;
}
function dateChange( d, m, y ) {
    d = MWJ_findSelect( d ), m = MWJ_findSelect( m ), y = MWJ_findSelect( y );
    //work out if it is a leap year
    var IsLeap = parseInt( y.options[y.selectedIndex].value );
    IsLeap = !( IsLeap % 4 ) && ( ( IsLeap % 100 ) || !( IsLeap % 400 ) );
    //find the number of days in that month
    IsLeap = [31,(IsLeap?29:28),31,30,31,30,31,31,30,31,30,31][m.selectedIndex];
    //store the current day - reduce it if the new month does not have enough days
    var storedDate = ( d.selectedIndex > IsLeap - 1 ) ? ( IsLeap - 1 ) : d.selectedIndex;
    while( d.options.length ) { d.options[0] = null; } //empty days box then refill with correct number of days
    for( var x = 0; x < IsLeap; x++ ) { d.options[x] = new Option( x + 1, x + 1 ); }
    d.options[storedDate].selected = true; //select the number that was selected before
    if( window.opera && document.importNode ) { window.setTimeout('MWJ_findSelect( \''+d.name+'\' ).options['+storedDate+'].selected = true;',0); }
}
function setToday( d, m, y ) {
    d = MWJ_findSelect( d ), m = MWJ_findSelect( m ), y = MWJ_findSelect( y );
    var now = new Date(); var nowY = ( now.getYear() % 100 ) + ( ( ( now.getYear() % 100 ) < 39 ) ? 2000 : 1900 );
    //if the relevant year exists in the box, select it
    for( var x = 0; x < y.options.length; x++ ) { if( y.options[x].value == '' + nowY + '' ) { y.options[x].selected = true; if( window.opera && document.importNode ) { window.setTimeout('MWJ_findSelect( \''+y.name+'\' ).options['+x+'].selected = true;',0); } } }
    //select the correct month, redo the days list to get the correct number, then select the relevant day
    m.options[now.getMonth()].selected = true; dateChange( d.name, m.name, y.name ); d.options[now.getDate()-1].selected = true;
    if( window.opera && document.importNode ) { window.setTimeout('MWJ_findSelect( \''+d.name+'\' ).options['+(now.getDate()-1)+'].selected = true;',0); }
}
function checkMore( y, curBot, curTop, min, max ) {
    var range = curTop - curBot;
    if( typeof( y.nowBot ) == 'undefined' ) { y.nowBot = curBot; y.nowTop = curTop; }
    if( y.options[y.selectedIndex].value == 'MWJ_DOWN' ) { //they have selected 'lower'
        while( y.options.length ) { y.options[0] = null; } //empty the select box
        y.nowBot -= range + 1; y.nowTop = range + y.nowBot; //make note of the start and end values
        //adjust the values as necessary if we will overstep the min value. If not, refill with the
        //new option for 'lower'
        if( min < y.nowBot ) { y.options[0] = new Option('Lower ...','MWJ_DOWN'); } else { y.nowBot = min; }
        for( var x = y.nowBot; x <= y.nowTop; x++ ) { y.options[y.options.length] = new Option(x,x); }
        y.options[y.options.length] = new Option('Higher ...','MWJ_UP');
        y.options[y.options.length - 2].selected = true; //select the nearest number
        if( window.opera && document.importNode ) { window.setTimeout('MWJ_findSelect( \''+y.name+'\' ).options['+(y.options.length - 2)+'].selected = true;',0); }
    } else if( y.options[y.selectedIndex].value == 'MWJ_UP' ) { //A/A except upwards
        while( y.options.length ) { y.options[0] = null; }
        y.nowTop += range + 1; y.nowBot = y.nowTop - range;
        y.options[0] = new Option('Lower ...','MWJ_DOWN');
        if( y.nowTop > max ) { y.nowTop = max; }
        for( var x = y.nowBot; x <= y.nowTop; x++ ) { y.options[y.options.length] = new Option(x,x); }
        if( max > y.nowTop ) { y.options[y.options.length] = new Option('Higher ...','MWJ_UP'); }
        y.options[1].selected = true;
        if( window.opera && document.importNode ) { window.setTimeout('MWJ_findSelect( \''+y.name+'\' ).options[1].selected = true;',0); }
    }
}
function reFill( y, oBot, oTop, oDown, oUp ) {
    y = MWJ_findSelect( y ); y.nowBot = oBot; y.nowTop = oTop;
    //empty and refill the select box using the range of numbers specified
    while( y.options.length ) { y.options[0] = null; }
    if( oDown ) { y.options[0] = new Option('Lower ...','MWJ_DOWN'); }
    for( var x = oBot; x <= oTop; x++ ) { y.options[y.options.length] = new Option(x,x); }
    if( oUp ) { y.options[y.options.length] = new Option('Higher ...','MWJ_UP'); }
}


ns4 = document.layers;
ie4 = document.all;
nn6 = document.getElementById && !document.all; 

function showObject(myobject) {
 
  if (ns4) {
     eval("document."+myobject+".display = ''");
  }
  else if (ie4) {
     if(document.all[myobject].style.display == 'none') {
         document.all[myobject].style.display = "";
     } else {
         document.all[myobject].style.display = "none";
     }
  }
  else if (nn6) {
     if(document.getElementById(myobject).style.display == 'none') {
         document.getElementById(myobject).style.display = "";
     } else {
         document.getElementById(myobject).style.display = "none";
     }
  }
}



/* Create a new XMLHttpRequest object to talk to the Web server */
var xmlHttp = false;
var current = "";

/*@cc_on @*/
/*@if (@_jscript_version >= 5)
try {
  xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
} catch (e) {
  try {
    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
  } catch (e2) {
    xmlHttp = false;
  }
}
@end @*/

if (!xmlHttp && typeof XMLHttpRequest != 'undefined') {
  xmlHttp = new XMLHttpRequest();
}

function getRecords(channel,start,end,type,uri) {

    var procesa=false;

    if (ie4) {
        if(document.all[channel].style.display == 'none') {
           procesa=true;    
        } 
    }
    else if (nn6) {
        if(document.getElementById(channel).style.display == 'none') {
           procesa=true;    
        } 
    }

    if(procesa==true) {
        document.getElementById("loading"+channel).style.visibility = "visible";
//        var url = "modules/asternic_cdr/getrecords.php?channel=" + escape(channel) + "&type=outgoing&start=" + escape(start) + "&end=" + escape(end) + '&type=' + escape(type);
        var url = uri + "&action=getrecords&channel=" + escape(channel) + "&direction="+escape(type)+"&start=" + escape(start) + "&end=" + escape(end);

        // Open a connection to the server
        xmlHttp.open("GET", url, true);

        // Setup a function for the server to run when it's done
        xmlHttp.onreadystatechange = updatePage;
        current = channel;
        xmlHttp.send(null);

    } else {
        showObject(channel);
    }

}

function updatePage() {
  if (xmlHttp.readyState == 4) {
    var response = xmlHttp.responseText;
    document.getElementById('table'+current+'table').innerHTML = response;
    document.getElementById("loading"+current).style.visibility = "hidden";
    sortables_init();
    showObject(current);
  }
}


addEvent(window, "load", sortables_init);

var SORT_COLUMN_INDEX;

function sortables_init() {
    // Find all tables with class sortable and make them sortable
    if (!document.getElementsByTagName) return;
    tbls = document.getElementsByTagName("table");
    for (ti=0;ti<tbls.length;ti++) {
        thisTbl = tbls[ti];
        if (((' '+thisTbl.className+' ').indexOf("sortable") != -1) && (thisTbl.id)) {
            //initTable(thisTbl.id);
            ts_makeSortable(thisTbl);
        }
    }
}

function ts_makeSortable(table) {
    if (table.rows && table.rows.length > 0) {
        var firstRow = table.rows[0];
    }
    if (!firstRow) return;
    
    // We have a first row: assume it's the header, and make its contents clickable links
    for (var i=0;i<firstRow.cells.length;i++) {
        var cell = firstRow.cells[i];
        var txt = ts_getInnerText(cell);
        cell.innerHTML = '<a href="#" class="sortheader" onclick="ts_resortTable(this, '+i+');return false;">'+txt+'<span class="sortarrow">&nbsp;&nbsp;&nbsp;</span></a>';
    }
}

function ts_getInnerText(el) {
    if (typeof el == "string") return el;
    if (typeof el == "undefined") { return el };
    if (el.innerText) return el.innerText;    //Not needed but it is faster
    var str = "";
    
    var cs = el.childNodes;
    var l = cs.length;
    for (var i = 0; i < l; i++) {
        switch (cs[i].nodeType) {
            case 1: //ELEMENT_NODE
                str += ts_getInnerText(cs[i]);
                break;
            case 3:    //TEXT_NODE
                str += cs[i].nodeValue;
                break;
        }
    }
    return str;
}

function ts_resortTable(lnk,clid) {
    // get the span
    var span;
    for (var ci=0;ci<lnk.childNodes.length;ci++) {
        if (lnk.childNodes[ci].tagName && lnk.childNodes[ci].tagName.toLowerCase() == 'span') span = lnk.childNodes[ci];
    }
    var spantext = ts_getInnerText(span);
    var td = lnk.parentNode;
    var column = clid || td.cellIndex;
    var table = getParent(td,'TABLE');
    
    // Work out a type for the column
    if (table.rows.length <= 1) return;
    var itm = ts_getInnerText(table.rows[1].cells[column]);
    sortfn = ts_sort_caseinsensitive;
    if (itm.match(/^\d\d[\/-]\d\d[\/-]\d\d\d\d$/)) sortfn = ts_sort_date;
    if (itm.match(/^\d\d[\/-]\d\d[\/-]\d\d$/)) sortfn = ts_sort_date;
    if (itm.match(/^[£$]/)) sortfn = ts_sort_currency;
    if (itm.match(/^[\d]/)) { sortfn = ts_sort_numeric; }
    SORT_COLUMN_INDEX = column;
    var firstRow = new Array();
    var newRows = new Array();
    for (i=0;i<table.rows[0].length;i++) { firstRow[i] = table.rows[0][i]; }
    for (j=1;j<table.rows.length;j++) { newRows[j-1] = table.rows[j]; }

    newRows.sort(sortfn);

    for (j=0;j<newRows.length;j++) { if( j%2 == 0) { newRows[j].setAttribute('class','odd'); } else { newRows[j].setAttribute('class','null'); } }

    if (span.getAttribute("sortdir") == 'down') {
        ARROW = '&nbsp;&nbsp;&uarr;';
        newRows.reverse();
        span.setAttribute('sortdir','up');
    } else {
        ARROW = '&nbsp;&nbsp;&darr;';
        span.setAttribute('sortdir','down');
    }
    
    // We appendChild rows that already exist to the tbody, so it moves them rather than creating new ones
    // don't do sortbottom rows
    for (i=0;i<newRows.length;i++) { if (!newRows[i].className || (newRows[i].className && (newRows[i].className.indexOf('sortbottom') == -1))) table.tBodies[0].appendChild(newRows[i]);}
    // do sortbottom rows only
    for (i=0;i<newRows.length;i++) { if (newRows[i].className && (newRows[i].className.indexOf('sortbottom') != -1)) table.tBodies[0].appendChild(newRows[i]);}
    
    // Delete any other arrows there may be showing
    var allspans = document.getElementsByTagName("span");
    for (var ci=0;ci<allspans.length;ci++) {
        if (allspans[ci].className == 'sortarrow') {
            if (getParent(allspans[ci],"table") == getParent(lnk,"table")) { // in the same table as us?
                allspans[ci].innerHTML = '&nbsp;&nbsp;&nbsp;';
            }
        }
    }
        
    span.innerHTML = ARROW;
}

function getParent(el, pTagName) {
    if (el == null) return null;
    else if (el.nodeType == 1 && el.tagName.toLowerCase() == pTagName.toLowerCase())    // Gecko bug, supposed to be uppercase
        return el;
    else
        return getParent(el.parentNode, pTagName);
}
function ts_sort_date(a,b) {
    // y2k notes: two digit years less than 50 are treated as 20XX, greater than 50 are treated as 19XX
    aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]);
    bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]);
    if (aa.length == 10) {
        dt1 = aa.substr(6,4)+aa.substr(3,2)+aa.substr(0,2);
    } else {
        yr = aa.substr(6,2);
        if (parseInt(yr) < 50) { yr = '20'+yr; } else { yr = '19'+yr; }
        dt1 = yr+aa.substr(3,2)+aa.substr(0,2);
    }
    if (bb.length == 10) {
        dt2 = bb.substr(6,4)+bb.substr(3,2)+bb.substr(0,2);
    } else {
        yr = bb.substr(6,2);
        if (parseInt(yr) < 50) { yr = '20'+yr; } else { yr = '19'+yr; }
        dt2 = yr+bb.substr(3,2)+bb.substr(0,2);
    }
    if (dt1==dt2) return 0;
    if (dt1<dt2) return -1;
    return 1;
}

function ts_sort_currency(a,b) { 
    aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]).replace(/[^0-9.]/g,'');
    bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]).replace(/[^0-9.]/g,'');
    return parseFloat(aa) - parseFloat(bb);
}

function ts_sort_numeric(a,b) {
    //alert(ts_getInnerText(a.cells[SORT_COLUMN_INDEX]));
    aa = parseFloat(ts_getInnerText(a.cells[SORT_COLUMN_INDEX]).replace(/[^0-9.]/g,''));
    if (isNaN(aa)) aa = 0;
    bb = parseFloat(ts_getInnerText(b.cells[SORT_COLUMN_INDEX]).replace(/[^0-9.]/g,'')); 
    if (isNaN(bb)) bb = 0;
    return aa-bb;
}

function ts_sort_caseinsensitive(a,b) {
    aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]).toLowerCase();
    bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]).toLowerCase();
    if (aa==bb) return 0;
    if (aa<bb) return -1;
    return 1;
}

function ts_sort_default(a,b) {
    aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]);
    bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]);
    if (aa==bb) return 0;
    if (aa<bb) return -1;
    return 1;
}


function addEvent(elm, evType, fn, useCapture)
// addEvent and removeEvent
// cross-browser event handling for IE5+,  NS6 and Mozilla
// By Scott Andrew
{
  if (elm.addEventListener){
    elm.addEventListener(evType, fn, useCapture);
    return true;
  } else if (elm.attachEvent){
    var r = elm.attachEvent("on"+evType, fn);
    return r;
  } else {
    alert("Handler could not be removed");
  }
}

 
/* SWFObject v2.1 <http://code.google.com/p/swfobject/>
    Copyright (c) 2007-2008 Geoff Stearns, Michael Williams, and Bobby van der Sluis
    This software is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
*/
var swfobject=function(){var b="undefined",Q="object",n="Shockwave Flash",p="ShockwaveFlash.ShockwaveFlash",P="application/x-shockwave-flash",m="SWFObjectExprInst",j=window,K=document,T=navigator,o=[],N=[],i=[],d=[],J,Z=null,M=null,l=null,e=false,A=false;var h=function(){var v=typeof K.getElementById!=b&&typeof K.getElementsByTagName!=b&&typeof K.createElement!=b,AC=[0,0,0],x=null;if(typeof T.plugins!=b&&typeof T.plugins[n]==Q){x=T.plugins[n].description;if(x&&!(typeof T.mimeTypes!=b&&T.mimeTypes[P]&&!T.mimeTypes[P].enabledPlugin)){x=x.replace(/^.*\s+(\S+\s+\S+$)/,"$1");AC[0]=parseInt(x.replace(/^(.*)\..*$/,"$1"),10);AC[1]=parseInt(x.replace(/^.*\.(.*)\s.*$/,"$1"),10);AC[2]=/r/.test(x)?parseInt(x.replace(/^.*r(.*)$/,"$1"),10):0}}else{if(typeof j.ActiveXObject!=b){var y=null,AB=false;try{y=new ActiveXObject(p+".7")}catch(t){try{y=new ActiveXObject(p+".6");AC=[6,0,21];y.AllowScriptAccess="always"}catch(t){if(AC[0]==6){AB=true}}if(!AB){try{y=new ActiveXObject(p)}catch(t){}}}if(!AB&&y){try{x=y.GetVariable("$version");if(x){x=x.split(" ")[1].split(",");AC=[parseInt(x[0],10),parseInt(x[1],10),parseInt(x[2],10)]}}catch(t){}}}}var AD=T.userAgent.toLowerCase(),r=T.platform.toLowerCase(),AA=/webkit/.test(AD)?parseFloat(AD.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,q=false,z=r?/win/.test(r):/win/.test(AD),w=r?/mac/.test(r):/mac/.test(AD);/*@cc_on q=true;@if(@_win32)z=true;@elif(@_mac)w=true;@end@*/return{w3cdom:v,pv:AC,webkit:AA,ie:q,win:z,mac:w}}();var L=function(){if(!h.w3cdom){return }f(H);if(h.ie&&h.win){try{K.write("<script id=__ie_ondomload defer=true src=//:><\/script>");J=C("__ie_ondomload");if(J){I(J,"onreadystatechange",S)}}catch(q){}}if(h.webkit&&typeof K.readyState!=b){Z=setInterval(function(){if(/loaded|complete/.test(K.readyState)){E()}},10)}if(typeof K.addEventListener!=b){K.addEventListener("DOMContentLoaded",E,null)}R(E)}();function S(){if(J.readyState=="complete"){J.parentNode.removeChild(J);E()}}function E(){if(e){return }if(h.ie&&h.win){var v=a("span");try{var u=K.getElementsByTagName("body")[0].appendChild(v);u.parentNode.removeChild(u)}catch(w){return }}e=true;if(Z){clearInterval(Z);Z=null}var q=o.length;for(var r=0;r<q;r++){o[r]()}}function f(q){if(e){q()}else{o[o.length]=q}}function R(r){if(typeof j.addEventListener!=b){j.addEventListener("load",r,false)}else{if(typeof K.addEventListener!=b){K.addEventListener("load",r,false)}else{if(typeof j.attachEvent!=b){I(j,"onload",r)}else{if(typeof j.onload=="function"){var q=j.onload;j.onload=function(){q();r()}}else{j.onload=r}}}}}function H(){var t=N.length;for(var q=0;q<t;q++){var u=N[q].id;if(h.pv[0]>0){var r=C(u);if(r){N[q].width=r.getAttribute("width")?r.getAttribute("width"):"0";N[q].height=r.getAttribute("height")?r.getAttribute("height"):"0";if(c(N[q].swfVersion)){if(h.webkit&&h.webkit<312){Y(r)}W(u,true)}else{if(N[q].expressInstall&&!A&&c("6.0.65")&&(h.win||h.mac)){k(N[q])}else{O(r)}}}}else{W(u,true)}}}function Y(t){var q=t.getElementsByTagName(Q)[0];if(q){var w=a("embed"),y=q.attributes;if(y){var v=y.length;for(var u=0;u<v;u++){if(y[u].nodeName=="DATA"){w.setAttribute("src",y[u].nodeValue)}else{w.setAttribute(y[u].nodeName,y[u].nodeValue)}}}var x=q.childNodes;if(x){var z=x.length;for(var r=0;r<z;r++){if(x[r].nodeType==1&&x[r].nodeName=="PARAM"){w.setAttribute(x[r].getAttribute("name"),x[r].getAttribute("value"))}}}t.parentNode.replaceChild(w,t)}}function k(w){A=true;var u=C(w.id);if(u){if(w.altContentId){var y=C(w.altContentId);if(y){M=y;l=w.altContentId}}else{M=G(u)}if(!(/%$/.test(w.width))&&parseInt(w.width,10)<310){w.width="310"}if(!(/%$/.test(w.height))&&parseInt(w.height,10)<137){w.height="137"}K.title=K.title.slice(0,47)+" - Flash Player Installation";var z=h.ie&&h.win?"ActiveX":"PlugIn",q=K.title,r="MMredirectURL="+j.location+"&MMplayerType="+z+"&MMdoctitle="+q,x=w.id;if(h.ie&&h.win&&u.readyState!=4){var t=a("div");x+="SWFObjectNew";t.setAttribute("id",x);u.parentNode.insertBefore(t,u);u.style.display="none";var v=function(){u.parentNode.removeChild(u)};I(j,"onload",v)}U({data:w.expressInstall,id:m,width:w.width,height:w.height},{flashvars:r},x)}}function O(t){if(h.ie&&h.win&&t.readyState!=4){var r=a("div");t.parentNode.insertBefore(r,t);r.parentNode.replaceChild(G(t),r);t.style.display="none";var q=function(){t.parentNode.removeChild(t)};I(j,"onload",q)}else{t.parentNode.replaceChild(G(t),t)}}function G(v){var u=a("div");if(h.win&&h.ie){u.innerHTML=v.innerHTML}else{var r=v.getElementsByTagName(Q)[0];if(r){var w=r.childNodes;if(w){var q=w.length;for(var t=0;t<q;t++){if(!(w[t].nodeType==1&&w[t].nodeName=="PARAM")&&!(w[t].nodeType==8)){u.appendChild(w[t].cloneNode(true))}}}}}return u}function U(AG,AE,t){var q,v=C(t);if(v){if(typeof AG.id==b){AG.id=t}if(h.ie&&h.win){var AF="";for(var AB in AG){if(AG[AB]!=Object.prototype[AB]){if(AB.toLowerCase()=="data"){AE.movie=AG[AB]}else{if(AB.toLowerCase()=="styleclass"){AF+=' class="'+AG[AB]+'"'}else{if(AB.toLowerCase()!="classid"){AF+=" "+AB+'="'+AG[AB]+'"'}}}}}var AD="";for(var AA in AE){if(AE[AA]!=Object.prototype[AA]){AD+='<param name="'+AA+'" value="'+AE[AA]+'" />'}}v.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+AF+">"+AD+"</object>";i[i.length]=AG.id;q=C(AG.id)}else{if(h.webkit&&h.webkit<312){var AC=a("embed");AC.setAttribute("type",P);for(var z in AG){if(AG[z]!=Object.prototype[z]){if(z.toLowerCase()=="data"){AC.setAttribute("src",AG[z])}else{if(z.toLowerCase()=="styleclass"){AC.setAttribute("class",AG[z])}else{if(z.toLowerCase()!="classid"){AC.setAttribute(z,AG[z])}}}}}for(var y in AE){if(AE[y]!=Object.prototype[y]){if(y.toLowerCase()!="movie"){AC.setAttribute(y,AE[y])}}}v.parentNode.replaceChild(AC,v);q=AC}else{var u=a(Q);u.setAttribute("type",P);for(var x in AG){if(AG[x]!=Object.prototype[x]){if(x.toLowerCase()=="styleclass"){u.setAttribute("class",AG[x])}else{if(x.toLowerCase()!="classid"){u.setAttribute(x,AG[x])}}}}for(var w in AE){if(AE[w]!=Object.prototype[w]&&w.toLowerCase()!="movie"){F(u,w,AE[w])}}v.parentNode.replaceChild(u,v);q=u}}}return q}function F(t,q,r){var u=a("param");u.setAttribute("name",q);u.setAttribute("value",r);t.appendChild(u)}function X(r){var q=C(r);if(q&&(q.nodeName=="OBJECT"||q.nodeName=="EMBED")){if(h.ie&&h.win){if(q.readyState==4){B(r)}else{j.attachEvent("onload",function(){B(r)})}}else{q.parentNode.removeChild(q)}}}function B(t){var r=C(t);if(r){for(var q in r){if(typeof r[q]=="function"){r[q]=null}}r.parentNode.removeChild(r)}}function C(t){var q=null;try{q=K.getElementById(t)}catch(r){}return q}function a(q){return K.createElement(q)}function I(t,q,r){t.attachEvent(q,r);d[d.length]=[t,q,r]}function c(t){var r=h.pv,q=t.split(".");q[0]=parseInt(q[0],10);q[1]=parseInt(q[1],10)||0;q[2]=parseInt(q[2],10)||0;return(r[0]>q[0]||(r[0]==q[0]&&r[1]>q[1])||(r[0]==q[0]&&r[1]==q[1]&&r[2]>=q[2]))?true:false}function V(v,r){if(h.ie&&h.mac){return }var u=K.getElementsByTagName("head")[0],t=a("style");t.setAttribute("type","text/css");t.setAttribute("media","screen");if(!(h.ie&&h.win)&&typeof K.createTextNode!=b){t.appendChild(K.createTextNode(v+" {"+r+"}"))}u.appendChild(t);if(h.ie&&h.win&&typeof K.styleSheets!=b&&K.styleSheets.length>0){var q=K.styleSheets[K.styleSheets.length-1];if(typeof q.addRule==Q){q.addRule(v,r)}}}function W(t,q){var r=q?"visible":"hidden";if(e&&C(t)){C(t).style.visibility=r}else{V("#"+t,"visibility:"+r)}}function g(s){var r=/[\\\"<>\.;]/;var q=r.exec(s)!=null;return q?encodeURIComponent(s):s}var D=function(){if(h.ie&&h.win){window.attachEvent("onunload",function(){var w=d.length;for(var v=0;v<w;v++){d[v][0].detachEvent(d[v][1],d[v][2])}var t=i.length;for(var u=0;u<t;u++){X(i[u])}for(var r in h){h[r]=null}h=null;for(var q in swfobject){swfobject[q]=null}swfobject=null})}}();return{registerObject:function(u,q,t){if(!h.w3cdom||!u||!q){return }var r={};r.id=u;r.swfVersion=q;r.expressInstall=t?t:false;N[N.length]=r;W(u,false)},getObjectById:function(v){var q=null;if(h.w3cdom){var t=C(v);if(t){var u=t.getElementsByTagName(Q)[0];if(!u||(u&&typeof t.SetVariable!=b)){q=t}else{if(typeof u.SetVariable!=b){q=u}}}}return q},embedSWF:function(x,AE,AB,AD,q,w,r,z,AC){if(!h.w3cdom||!x||!AE||!AB||!AD||!q){return }AB+="";AD+="";if(c(q)){W(AE,false);var AA={};if(AC&&typeof AC===Q){for(var v in AC){if(AC[v]!=Object.prototype[v]){AA[v]=AC[v]}}}AA.data=x;AA.width=AB;AA.height=AD;var y={};if(z&&typeof z===Q){for(var u in z){if(z[u]!=Object.prototype[u]){y[u]=z[u]}}}if(r&&typeof r===Q){for(var t in r){if(r[t]!=Object.prototype[t]){if(typeof y.flashvars!=b){y.flashvars+="&"+t+"="+r[t]}else{y.flashvars=t+"="+r[t]}}}}f(function(){U(AA,y,AE);if(AA.id==AE){W(AE,true)}})}else{if(w&&!A&&c("6.0.65")&&(h.win||h.mac)){A=true;W(AE,false);f(function(){var AF={};AF.id=AF.altContentId=AE;AF.width=AB;AF.height=AD;AF.expressInstall=w;k(AF)})}}},getFlashPlayerVersion:function(){return{major:h.pv[0],minor:h.pv[1],release:h.pv[2]}},hasFlashPlayerVersion:c,createSWF:function(t,r,q){if(h.w3cdom){return U(t,r,q)}else{return undefined}},removeSWF:function(q){if(h.w3cdom){X(q)}},createCSS:function(r,q){if(h.w3cdom){V(r,q)}},addDomLoadEvent:f,addLoadEvent:R,getQueryParamValue:function(v){var u=K.location.search||K.location.hash;if(v==null){return g(u)}if(u){var t=u.substring(1).split("&");for(var r=0;r<t.length;r++){if(t[r].substring(0,t[r].indexOf("="))==v){return g(t[r].substring((t[r].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(A&&M){var q=C(m);if(q){q.parentNode.replaceChild(M,q);if(l){W(l,true);if(h.ie&&h.win){M.style.display="block"}}M=null;l=null;A=false}}}}}();


// Pass ID of player's <object> tag, and length in second of pre-buffer
function TinyWav(pid, trigger) {
    this.pid = pid;
    this.State = "STOPPED";
    this.initCnt = 0;
    this.player = undefined;
    this.playlist = [];
    this.trigger_buffer = trigger;
    this.doplaylist = false;
    this.icon;

    // If one string passed -- 
    //         Stop any current playback, clear playlist and run play of only file
    // If no argument passed --
    //        Start/resume playback of playlist
    // If list passed --
    //        replace playlist with it, and start playback of it
    this.Play = function(file,icon) {
        var player = this.getPlayer();
        this.icon = icon;
        if (!file) {
            this.doplaylist = true;
            if (this.State != "STOPPED" || !this.playlist.length)
                return;
            file = this.playlist[0];
        } else 
        if (typeof file == "object") {
            this.playlist = file;
            this.doplaylist = true;
            if (this.State != "STOPPED" || !this.playlist.length)
                return;
            file = this.playlist[0];
        } else {
            this.doplaylist = false;
        }
        this.Stop();
        player.doPlay(file, this.trigger_buffer);
    }
    // Add file(s) in playlist; does not starts playback
    this.Enqueue = function(file) {
        if (typeof file == "object") {
            this.playlist = this.playlist.concat(file);
        }
        else if (file) {
            if (!this.playlist || !this.playlist.length)
                this.playlist = [file];
            else
                this.playlist[this.playlist.length] = file;
        }
    }
    // Stop playback
    this.Stop = function () {
        var player = this.getPlayer();
        player.doStop();
    }
    // Pause playback
    this.Pause = function (file,icon) {
        var player = this.getPlayer();
        this.icon = icon;
        player.doPause();
    }
    // Continue playback
    this.Resume = function () {
        var player = this.getPlayer();
        player.doResume();
    }
    // Advance to next playlist track
    this.Next = function() {
        var player = this.getPlayer();
        if(this.playlist.length) this.playlist.shift();
        if (!this.playlist.length)
            return;
        file = this.playlist[0];
        player.doStop();
        player.doPlay(file, this.trigger_buffer);
    }
    // ============= END OF API ==========
    // Find player object in page
    this.getPlayer = function() {
        if(this.player!=undefined) return this.player;
        var obj = document.getElementById(this.pid);
        if (!obj) return null;
        if (obj.doPlay) {
            this.player = obj;
            return obj;
        }
        for(i=0; i<obj.childNodes.length; i++) {
            var child = obj.childNodes[i];
            if (child.tagName == "EMBED") {
                this.player = child;
                return child;
            }
        }
    }

    this.SoundState = function (state, position) {
        if (position != undefined) this.SoundPos = position;
        if (this.State == "PLAYING" && state=="STOPPED" && this.doplaylist) {
            window.setTimeout((function(t){ 
                return function(){ t.Next(); };
            })(this), 50);
        }
        this.State = state;
        if(state == "PLAYING") {
            $('div#'+this.icon).removeClass('playicon');
            $('div#'+this.icon).addClass('pauseicon');
        } else if(state=="STOPPED") {
            $('div#'+this.icon).addClass('playicon');
            $('div#'+this.icon).removeClass('pauseicon');
        } else if(state=="PAUSED") {
            $('div#'+this.icon).addClass('playicon');
            $('div#'+this.icon).removeClass('pauseicon');
        }
    }
    this.init = function () {
        var player = this.getPlayer();
        this.initCnt++;
        if (!player || !player.attachHandler) {
            if (this.initCnt < 50)
                setTimeout((function(t){ return function(){ return t.init(); } })(this), 100); // Wait for load
        } else {
            player.attachHandler("PLAYER_BUFFERING", "TinyWavSoundState", "BUFFERING");
            player.attachHandler("PLAYER_PLAYING", "TinyWavSoundState", "PLAYING");
            player.attachHandler("PLAYER_STOPPED", "TinyWavSoundState", "STOPPED");
            player.attachHandler("PLAYER_PAUSED", "TinyWavSoundState", "PAUSED");
        }
    }
}
function TinyWavSoundState() { window.TinyWav.SoundState.apply(window.TinyWav, arguments); }
window.TinyWav = new TinyWav('TinyWavBlock', 2);

$(document).ready(function() {

    var Player = document.createElement("div");
    Player.style.display = "block";
    Player.setAttribute("id", "TinyWavBlock");
    document.body.appendChild(Player);
    var vars = {}; var params = {'scale': 'noscale', 'bgcolor': '#FFFFFF'};
    swfobject.embedSWF("images/wavplayer.swf?gui=none", "TinyWavBlock", "1", "1", "10.0.32.18", "embed/expressInstall.swf", vars, params, params);
    window.TinyWav.init();
    $('#footer').hide();
});

function playVmail(file,iconid) {
    if($('div#'+iconid).hasClass('playicon')) {
        debug("play "+file);
        window.TinyWav.Play("modules/asternic_cdr/download.php?file="+file,iconid);
    } else {
        debug("pause "+file);
        window.TinyWav.Pause("modules/asternic_cdr/download.php?file="+file,iconid);
    }
}

function downloadVmail(file,iconid,ftype,display,tab) {
        debug($("#downloadform"));
        $("#downloadfile").val(file);
        $("#dtype").val(ftype);
        $("#idisplay").val(display);
        $("#itab").val(tab);
        $("#downloadform").submit();
        return false;
//        var pars = "file="+file;
//        $.ajax({ 
//          url: "modules/asternic_cdr/download.php?file="+file 
//        });
}








