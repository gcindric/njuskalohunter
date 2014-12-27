var express = require('express');
var exphbs = require('express3-handlebars');
var request = require('request');
var cheerio = require('cheerio');
var http = require('http');
var path = require('path');

//setup express and handlebars//
app = express();
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
//map routes for static resources (css and images)//
app.use("/images", express.static(__dirname + '/images'));
app.use("/styles", express.static(__dirname + '/styles'));

//route mapping//
app.get('/', function (req, res) { res.render('home'); });
app.get('/oglasi', function (req, res) { res.render('oglasi', { oglasi: oglasi }); });

//server and port init//
app.listen(1337);

//view-model for "oglas"//
var OglasViewModel = function (rednibroj, naziv, imgurl, cijena, detaljiurl) {
    this.rednibroj = rednibroj;
    this.naziv = naziv;
    this.slika = imgurl;
    this.cijena = cijena;
    this.detaljiurl = detaljiurl
    
    this.print = function () {
        console.log(this.rednibroj);
        console.log(this.slika);
        console.log(this.naziv);
        console.log(this.cijena);
        console.log(this.detaljiurl);
        console.log();
    };
}

//list oglasa: nazivi i cijene//
var oglasi = [];

//URL sa kojeg se dohvaćaju podaci//
var url = "http://www.njuskalo.hr/?ctl=browse_ads&sort=new&categoryId=10920&locationId=1153&locationId_level_0=1153&locationId_level_1=0&priceLimitFrom=&priceLimitTo=210&mainAreaFrom=&mainAreaTo=&adsWithImages=1&flatTypeId=0&floorCountId=0&roomCountId=0&flatFloorIdFrom=0&flatFloorIdTo=0&gardenAreaFrom=&gardenAreaTo=&balconyAreaFrom=&balconyAreaTo=&teraceAreaFrom=&teraceAreaTo=&yearBuiltFrom=&yearBuiltTo=&yearLastRebuildFrom=&yearLastRebuildTo=&installations%5B220%5D=220&installations%5B221%5D=221&installations%5B222%5D=222&heatingTypeId=224";

//date//
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();

if (dd < 10) { dd = '0' + dd }
if (mm < 10) { mm = '0' + mm }

today = dd + '.' + mm + '.' + yyyy + '.';

//the first request//
request({
    "uri": url
}, function (err, resp, body) {
    var $ = cheerio.load(body);
    
    var strContent = $('time:contains(' + today + ')');
    console.log('\nFetching Njuškalo ...\n')
    
    var message = 'Pronađeno je ' + strContent.length + ' novih oglasa koji su dodani danas, ' + today;
    console.log(message);
    
    console.log('--------------------------------------------------------------\n');
    
    //find all "oglasi" with todays date// 
    var rednibroj = 0;
    $("article.entity-body:contains('" + today + "')").each(function () {
        var $i = $(this);
        
        var n = $i.find("h3.entity-title").text().trim();
        var s = $i.find('img').attr('data-src').replace('//', 'http://').trim();
        var c = $i.find("li.price-item").eq(0).text().trim();
        var detaljiurl = $i.find("article.entity-body a").attr("href");
        
        rednibroj++;
        oglasi.push(new OglasViewModel(rednibroj, n, s, c, detaljiurl));
    });
    
    //prints out all items from the "oglasi" array//
    for (var i = 0; i < oglasi.length; i++) {
        oglasi[i].print();
    }
    
    console.log('--------------------------------------------------\n');
    console.log('I am doing my next check in 5 minutes...\n');

});

//---------------all the next requests---------------//
var minutes = 5, the_interval = minutes * 60 * 1000;
setInterval(function () {
    
    //the first request//
    request({
        "uri": url
    }, function (err, resp, body) {
        var $ = cheerio.load(body);
        
        var strContent = $('time:contains(' + today + ')');
        console.log('\nFetching Njuškalo ...\n')
        
        var message = 'Pronađeno je ' + strContent.length + ' novih oglasa koji su dodani danas, ' + today;
        console.log(message);
        
        console.log('--------------------------------------------------------------\n');
        
        //find all "oglasi" with todays date// 
        var rednibroj = 0;
        $("article.entity-item-data:contains('" + today + "')").each(function () {
            var $i = $(this);
            
            var n = $i.find("h3.entity-title").text().trim();
            var s = $i.find('img').attr('data-src').replace('//', 'http://').trim();
            var c = $i.find("li.price-item").eq(0).text().trim();
            var detaljiurl = $i.find("article.entity-item-data a").attr("href");
            
            rednibroj++;
            oglasi.push(new OglasViewModel(rednibroj, n, s, c, detaljiurl));
        });
        
        //prints out all items from the "oglasi" array//
        for (var i = 0; i < oglasi.length; i++) {
            oglasi[i].print();
        }
        
        console.log('--------------------------------------------------\n');
        console.log('I am doing my next check in 5 minutes...\n');

    });

}, the_interval);