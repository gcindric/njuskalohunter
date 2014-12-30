var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express3-handlebars');
var request = require('request');
var cheerio = require('cheerio');
var http = require('http');
var path = require('path');

//setup express and handlebars//
app = express();
app.engine('handlebars', exphbs({ defaultLayout : 'main' }));
app.set('view engine', 'handlebars');

//map routes for static resources (css and images)//
app.use(bodyParser.urlencoded({ extended : false }));
app.use('/images', express.static(__dirname + '/images'));
app.use('/styles', express.static(__dirname + '/styles'));

//route mapping//
app.get('/', function (req, res) { res.render('home'); });
app.get('/oglasi', function (req, res) { res.render('oglasi', { oglasi : oglasi }); });

//handling custom url form from the homepage//
app.post('/oglasi', function (req, res) {
    var url = req.body.customNjuskaloUrl;
    Scrape(url, res);
});

//server and port init//
app.listen(1337);

//list oglasa: nazivi i cijene//
var oglasi = [];

//date//
var today = new Date(),
    dd = today.getDate(),
    mm = today.getMonth() + 1, //January is 0!
    yyyy = today.getFullYear();

if (dd < 10) { dd = '0' + dd; }
if (mm < 10) { mm = '0' + mm; }
today = dd + '.' + mm + '.' + yyyy + '.';

//view-model for "oglas"//
var OglasViewModel = function (rednibroj, naziv, imgurl, cijena, detaljiurl) {
    this.rednibroj = rednibroj;
    this.naziv = naziv;
    this.slika = imgurl;
    this.cijena = cijena;
    this.detaljiurl = detaljiurl;
    
    this.print = function () {
        console.log(this.rednibroj);
        console.log(this.slika);
        console.log(this.naziv);
        console.log(this.cijena);
        console.log(this.detaljiurl);
        console.log();
    };
};

var Scrape = function (url, response) {
    
    request({ uri : url }, function (err, res, body) {
        if (!err && res.statusCode == 200) {
            var $ = cheerio.load(body);
            
            var strContent = $('time:contains(' + today + ')');
            console.log('\nFetching Njuškalo ...\n');
            var message = 'Pronađeno je ' + strContent.length + ' novih oglasa koji su dodani danas, ' + today;
            console.log(message);
            console.log('--------------------------------------------------------------\n');
            
            //find all "oglasi" with todays date// 
            var rednibroj = 0;
            oglasi = [];
            
            $("article.entity-body:contains('" + today + "')").each(function () {
                var $i = $(this);
                
                var n = $i.find("h3.entity-title").text().trim();
                var s = $i.find('img').attr('data-src').replace('//', 'http://').trim();
                var c = $i.find("li.price-item").eq(0).text().trim();
                var detaljiurl = $i.find("article.entity-body a").attr("href");
                
                rednibroj++;
                oglasi.push(new OglasViewModel(rednibroj, n, s, c, detaljiurl));
            });
            
            //CALLBACK!!!//
            response.render('oglasi', { oglasi : oglasi });
            
            //prints out all items from the "oglasi" array//
            for (var i = 0; i < oglasi.length; i++) {
                oglasi[i].print();
            }
            console.log('--------------------------------------------------\n');
            console.log('I am doing my next check in 5 minutes...\n');

        }   // END if error check
    }); // END request for cheerio
};// END Scrape function