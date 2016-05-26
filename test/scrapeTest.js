/**
 * Created by Bharath on 11/05/16.
 */
var chai=require("chai");
var expect=require("chai").expect;
var scrape=require("../public/js/scrape.js");
var sinon=require("sinon");
var sinonChai=require("sinon-chai");
chai.use(sinonChai);
//testing video links
describe("Video links",function(){
    it("youtube",function(done){
        var m1result={
            'title':"Welcome to Node Studios! - NODE",
            'description':'Node Studios features premium video game content from: FreddieW, CorridorDigital, Toby Turner aka Tobuscus, Harley Morenstein with the Epic Meal Time crew, and Jaboody Dubs. Node Studios also creates and produces amazing original series.  From live action to animation to game play.  Subscribe and see why NODE is your home for video game AWESOMENESS!\n\nDownload "We Are Gods" by SILAS for FREE http://soundcloud.com/isleofsilas',
            'type':"video",
            'url':"https://www.youtube.com/watch?v=jXUFRue31PQ"
        };
        scrape.getInfo("https://www.youtube.com/watch?v=jXUFRue31PQ",function(err,result){
            expect(result.title).to.equal(m1result.title);
            expect(result.description).to.equal(m1result.description);
            expect(result.type).to.equal(m1result.type);
            expect(result.url).to.equal(m1result.url);
            done();
        });


    });

    it("Vimeo",function(done){
        var m2result={
            'title':"Embrace Of The Serpent",
            'description':"https://vimeo.com/ondemand/embraceoftheserpentAt once blistering and poetic, the ravages of colonialism cast a dark shadow over the South American landscape in EMBRACE OF THE SERPENT, the third feature by Ciro Guerra. Filmed in stunning black-and-white, SERPENT centers on Karamakate, an Amazonian shaman and the last survivor of his people, and the two scientists who, over the course of 40 years, build a friendship with him. The film was inspired by the real-life journals of two explorers who traveled through the Colombian Amazon during the last century in search of the sacred and difficult-to-find psychedelic Yakruna plant.",
            'type':"video",
            'url':"https://vimeo.com/channels/staffpicks/165192677"
        };
        scrape.getInfo("https://vimeo.com/channels/staffpicks/165192677",function(err,result){
            expect(result.title).to.equal(m2result.title);
            expect(result.description).to.equal(m2result.description);
            expect(result.type).to.equal(m2result.type);
            expect(result.url).to.equal(m2result.url);
            done();
        });

    });

    it("dotsub",function(done){
        var m3result={
            'title':"Expert SUP Instructors from Paddle Diva",
            'description':"Paddle Diva provides SUP lessons for everyone having distinct fitness goals. Their instructors offer services such as SUP yoga & fitness, group paddling, SUP paddle adventure tours, SUP boards & gear and more. Visit http://www.paddlediva.com",
            'type':"video",
            'url':"https://dotsub.com/view/3f75417e-4a9f-44b9-a125-e302238c2cef"
        };
            scrape.getInfo("https://dotsub.com/view/3f75417e-4a9f-44b9-a125-e302238c2cef",function(err,result){
                expect(result.title).to.equal(m3result.title);
                expect(result.description).to.equal(m3result.description);
                expect(result.type).to.equal(m3result.type);
                expect(result.url).to.equal(m3result.url);
                done();
            });

        });
    it("ted",function(done){
        var m4result={
            'title':"Laura Indolfi: Good news in the fight against pancreatic cancer",
            'description':'Anyone who has lost a loved one to pancreatic cancer knows the devastating speed with which it can affect an otherwise healthy person. TED Fellow and biomedical entrepreneur Laura Indolfi is developing a revolutionary way to treat this complex and lethal disease: a drug delivery device that acts as a cage at the site of a tumor, preventing it from spreading and delivering medicine only where it\'s needed. "We are hoping that one day we can make pancreatic cancer a curable disease," she says.',
            'type':"video",
            'url':"https://www.ted.com/talks/laura_indolfi_good_news_in_the_fight_against_pancreatic_cancer"
        };
        scrape.getInfo("https://www.ted.com/talks/laura_indolfi_good_news_in_the_fight_against_pancreatic_cancer",function(err,result){
            expect(result.title).to.equal(m4result.title);
            expect(result.description).to.equal(m4result.description);
            expect(result.type).to.equal(m4result.type);
            expect(result.url).to.equal(m4result.url);
            done();
        });

    });
    it("sapo",function(done){
        var m5result={
            'title':"Os estagiários na Google",
            'description':'Os rituais dos estagiários aproximam-se do que já foi visto no filme de Hollywood.',
            'type':"video",
            'url':"http://videos.sapo.pt/CosZR1yEUHhTdKdV8cPT"
        };
        scrape.getInfo("http://videos.sapo.pt/CosZR1yEUHhTdKdV8cPT",function(err,result){
            expect(result.title).to.equal(m5result.title);
            expect(result.description).to.equal(m5result.description);
            expect(result.type).to.equal(m5result.type);
            expect(result.url).to.equal(m5result.url);
            done();
        });

    });
    it("dailymotion",function(done){
        var m6result={
            'title':"Manchester City 0-0 Dynamo Kyiv (3-1 Agg) - Manuel Pellegrini Post Match Interview",
            'description':'Manchester City 0-0 Dynamo Kyiv (3-1 Agg) - Manuel Pellegrini Post Match Interview',
            'type':"video",
            'url':"http://www.dailymotion.com/video/x3y8w4e_manchester-city-0-0-dynamo-kyiv-3-1-agg-manuel-pellegrini-post-match-interview_sport"
        };
        scrape.getInfo("http://www.dailymotion.com/video/x3y8w4e_manchester-city-0-0-dynamo-kyiv-3-1-agg-manuel-pellegrini-post-match-interview_sport",function(err,result){
            done();
            expect(result.title).to.equal(m6result.title);
            expect(result.description).to.equal(m6result.description);
            expect(result.type).to.equal(m6result.type);
            expect(result.url).to.equal(m6result.url);

        });

    });

    it("circuitlab",function(done){
        var m7result={
            'title':"Diode full-wave rectifier",
            'description':'Four diodes (a "bridge rectifier") plus a capacitor can be used to rectify AC into DC, with conduction over most of the the input power cycle.',
            'type':"video",
            'url':"https://www.circuitlab.com/circuit/f6ex5x/diode-full-wave-rectifier/"
        };
        scrape.getInfo("https://www.circuitlab.com/circuit/f6ex5x/diode-full-wave-rectifier/",function(err,result){
            done();
            expect(result.title).to.equal(m7result.title);
            expect(result.description).to.equal(m7result.description);
            expect(result.type).to.equal(m7result.type);
            expect(result.url).to.equal(m7result.url);

        });

    });

    it("coub",function(done){
        var m8result={
            'title':"Покатай меня, большая черепаха!",
            'description':'by Darya Revenko',
            'type':"video",
            'url':"http://coub.com/view/ch6wq"
        };
        scrape.getInfo("http://coub.com/view/ch6wq",function(err,result){
            done();
            expect(result.title).to.equal(m8result.title);
            expect(result.description).to.equal(m8result.description);
            expect(result.type).to.equal(m8result.type);
            expect(result.url).to.equal(m8result.url);

        });

    });
        it("kickstarter",function(done){
            var m9result={
                'title':'Mover Kit: The 1st educational wearable kids make & code',
                'description':"Mover Kit encourages movement! It's a game, speed-activated bike light, disco bracelet – whatever a kid can make, move & code it to be.",
                'type':"video",
                'url':"https://www.kickstarter.com/projects/techwillsaveus/mover-kit-the-first-active-wearable-that-kids-make?ref=home_potd"
            };
            scrape.getInfo("https://www.kickstarter.com/projects/techwillsaveus/mover-kit-the-first-active-wearable-that-kids-make?ref=home_potd",function(err,result){
                done();
                expect(result.title).to.not.be.null;
                expect(result.description).to.not.be.null;
                expect(result.type).to.equal(m9result.type);
                expect(result.url).to.equal(m9result.url);

            });

        });
});
//describing the links
describe("links",function(){
    it("link with ogp data and complete image link",function(done){
        var lresult={
            type:'link',
            title:"Sony Xperia XA Ultra hands-on: First look",
            description:"Big-screen lovers rejoice! Meet the 6-inch Sony Xperia XA Ultra, the replacement for the popular Xperia C5 Ultra.",
            image:"http://cdn.gsmarena.com/imgroot/reviews/16/sony-xperia-xa-ultra/preview/-347x151/gsmarena_103.jpg",
            url:"http://www.gsmarena.com/sony_xperia_xa_ultra_hands_on-review-1440.php",
            html:"",
            favicon:"http://www.gsmarena.com/favicon.ico",
            name:"gsmarena.com"
        };
        scrape.getInfo("http://www.gsmarena.com/sony_xperia_xa_ultra_hands_on-review-1440.php",function(err,result){
            expect(result.title).to.equal(lresult.title);
            expect(result.description).to.equal(lresult.description);
            expect(result.type).to.equal(lresult.type);
            expect(result.url).to.equal(lresult.url);
            expect(result.favicon).to.equal(lresult.favicon);
            expect(result.name).to.equal(lresult.name);
            expect(result.image).to.equal(lresult.image);
            done();
        });
    });


    //it("link with ogp data and relative image link",function(done){
    //
    //
    //});
    //it("link with ogp data and image link without protocol",function(done){
    //
    //});
    //it("link with meta data",function(done){
    //
    //});
    it("link without meta and with essestial image",function(done){
        var l4result = {
            type: 'link',
            title: "Asynchronous Unit Tests With Mocha, Promises, And WinJS | ThoughtStream.new :derick_bailey",
            description: "",
            image: "",
            url: "https://lostechies.com/derickbailey/2012/08/17/asynchronous-unit-tests-with-mocha-promises-and-winjs/",
            html: "",
            favicon: "https://lostechies.com/favicon.ico",
            name: "lostechies.com"
        };
        scrape.getInfo("https://lostechies.com/derickbailey/2012/08/17/asynchronous-unit-tests-with-mocha-promises-and-winjs/", function (err,result) {
            expect(result.title).to.equal(l4result.title);
            expect(result.description).to.equal(l4result.description);
            expect(result.type).to.equal(l4result.type);
            expect(result.url).to.equal(l4result.url);
            expect(result.favicon).to.equal(l4result.favicon);
            expect(result.name).to.equal(l4result.name);
            expect(result.image).to.equal(l4result.image);
            done();
        });


    });

    it("link without meta data with image but not essestial",function(done){
        var l3result = {
            type: 'link',
            title: "Asynchronous Unit Tests With Mocha, Promises, And WinJS | ThoughtStream.new :derick_bailey",
            description: "",
            image: "",
            url: "https://lostechies.com/derickbailey/2012/08/17/asynchronous-unit-tests-with-mocha-promises-and-winjs/",
            html: "",
            favicon: "https://lostechies.com/favicon.ico",
            name: "lostechies.com"
        };
        scrape.getInfo("https://lostechies.com/derickbailey/2012/08/17/asynchronous-unit-tests-with-mocha-promises-and-winjs/", function (err,result) {
            expect(result.title).to.equal(l3result.title);
            expect(result.description).to.equal(l3result.description);
            expect(result.type).to.equal(l3result.type);
            expect(result.url).to.equal(l3result.url);
            expect(result.favicon).to.equal(l3result.favicon);
            expect(result.name).to.equal(l3result.name);
            expect(result.image).to.equal(l3result.image);
            done();
        });
    });
    it("link without meta data",function(done) {
        var l2result = {
            type: 'link',
            title: "The Node.js Way - Testing Essentials",
            description: "",
            image: "",
            url: "http://fredkschott.com/post/2014/05/nodejs-testing-essentials/",
            html: "",
            favicon: "http://fredkschott.com/assets/favicon1.ico",
            name: "fredkschott.com"
        };
        scrape.getInfo("http://fredkschott.com/post/2014/05/nodejs-testing-essentials/", function (err,result) {
            done();
            expect(result.title).to.equal(l2result.title);
            expect(result.description).to.equal(l2result.description);
            expect(result.type).to.equal(l2result.type);
            expect(result.url).to.equal(l2result.url);
            expect(result.favicon).to.equal(l2result.favicon);
            expect(result.name).to.equal(l2result.name);
            expect(result.image).to.equal(l2result.image);
        });

    });
});

//audio links
describe("Audio",function(){
    it("soundlcoud",function(done){
        var a1result={
            type:"audio",
            title:"Donald Trump - Trumpified - @RealDonaldTrump by Scott  Isbell",
            url:"https://soundcloud.com/scottisbell/trumpified",
            html:""
        };
        scrape.getInfo("https://soundcloud.com/scottisbell/trumpified",function(err,result){
            if(err){
                console.log("error"+err);
            }else{
                expect(a1result.title).to.equal(result.title);
                expect(a1result.html).to.not.be.null;
                expect(a1result.html).to.not.be.undefined;
            }
        });
        done();

    });

    it("mixcloud",function(done){
        var a2result={
            type:"audio",
            title:"#Mixmondays Justin Bieber Mini Mix @Djarvee",
            url:"https://www.mixcloud.com/arveeofficial/mixmondays-justin-bieber-mini-mix-djarvee/",
            html:""
        };
        scrape.getInfo("https://www.mixcloud.com/arveeofficial/mixmondays-justin-bieber-mini-mix-djarvee/",function(err,result){

            if(err){
                console.log("error"+err);
            }else{
                expect(a2result.title).to.equal(result.title);
                expect(a2result.html).to.not.be.null;
                expect(a2result.html).to.not.be.undefined;
            }
            done();
        });

    });

    it("clyp",function(done){
        var a3result={
            type:"audio",
            title:"My Clyp",
            url:"https://clyp.it/s544nfcn",
            html:""
        };
        scrape.getInfo("https://clyp.it/s544nfcn",function(err,result){

            if(err){
                console.log("error"+err);
            }else{
                expect(a3result.title).to.equal(result.title);
                expect(a3result.html).to.not.be.null;
                expect(a3result.html).to.not.be.undefined;
            }
            done();
        });

    });
    //https://huffduffer.com/davidr/332140
    it("huff duffer",function(done){
        var a4result={
            type:"audio",
            title:"006 - David Sparks of Sparks Law and macsparky.com - U-Turn",
            url:"https://huffduffer.com/davidr/332140",
            html:""
        };
        scrape.getInfo("https://huffduffer.com/davidr/332140",function(err,result){

            if(err){
                console.log("error"+err);
            }else{
                expect(a4result.title).to.equal(result.title);
                expect(a4result.html).to.not.be.null;
                expect(a4result.html).to.not.be.undefined;
            }
            done();
        });

    });



});
//story links
describe("Story",function(){
    it("verse",function(done){
        var s1result={
            type:"story",
            title:"Everything Water Touches",
            url:"https://verse.com/9c8de05799b1b1671c325b52372b39678837ea5a/299-water/",
            html:""
        };
        scrape.getInfo("https://verse.com/9c8de05799b1b1671c325b52372b39678837ea5a/299-water/",function(err,result){

            if(err){
                console.log("error"+err);
            }else{
                expect(s1result.title).to.equal(result.title);
                expect(s1result.html).to.not.be.null;
                expect(s1result.html).to.not.be.undefined;
                expect(s1result.title).to.not.be.null;
                expect(s1result.title).to.not.be.undefined;
            }
            done();
        });

    });

    it("amcharts",function(done){
        var s2result={
            type:"story",
            title:"3D stacked'",
            url:"https://live.amcharts.com/BjYTQ/",
            html:""
        };
        scrape.getInfo("https://live.amcharts.com/BjYTQ/",function(err,result){

            if(err){
                console.log("error"+err);
            }else{
                expect(s2result.title).to.equal(result.title);
                expect(s2result.html).to.not.be.null;
                expect(s2result.html).to.not.be.undefined;
                expect(s2result.title).to.not.be.null;
                expect(s2result.title).to.not.be.undefined;
            }
            done();
        });

    });

    it("amcharts",function(done){
        var s2result={
            type:"story",
            title:"3D stacked'",
            url:"https://live.amcharts.com/BjYTQ/",
            html:""
        };
        scrape.getInfo("https://live.amcharts.com/BjYTQ/",function(err,result){

            if(err){
                console.log("error"+err);
            }else{
                expect(s2result.title).to.equal(result.title);
                expect(s2result.html).to.not.be.null;
                expect(s2result.html).to.not.be.undefined;
                expect(s2result.title).to.not.be.null;
                expect(s2result.title).to.not.be.undefined;
            }
            done();
        });

    });

});
//pdf links
describe("pdf",function(){
    it("pdf links",function(done){
        var presult={
            'type':"pdf",
            'url':"https://drive.google.com/viewerng/viewer?url=http://ptgmedia.pearsoncmg.com/images/9780672329166/samplepages/0672329166_Sample.pdf",
            'title':"0672329166_Sample.pdf",
            'image':"",
            'html':""
        };
        scrape.getInfo("http://ptgmedia.pearsoncmg.com/images/9780672329166/samplepages/0672329166_Sample.pdf",function(err,result){
            if(err){
                console.log("error"+err);
            }else{
                console.log(result);
                expect(presult.title).to.equal(result.title);
                expect(presult.url).to.equal(result.url);
                expect(presult.html).to.not.be.null;
                expect(presult.html).to.not.be.undefined;
                expect(presult.title).to.not.be.null;
                expect(presult.title).to.not.be.undefined;
            }
            done();
        });


    })
});

//slides
describe.only("slides",function(){
    it("slideshare",function(done){
        var i2result={
            'type':"slide",
            'url':"http://www.slideshare.net/h3sean/3-lies-about-your-age",
            'title':"The Three Lies About your Age",
            'html':""
        };
        scrape.getInfo("http://www.slideshare.net/h3sean/3-lies-about-your-age",function(err,result){
            if(err){
                console.log("error"+err);
            }else{
                console.log(result);
                expect(i2result.title).to.equal(result.title);
                expect(i2result.url).to.equal(result.url);
                expect(i2result.html).to.not.be.null;
                expect(i2result.html).to.not.be.undefined;
                expect(i2result.title).to.not.be.null;
                expect(i2result.title).to.not.be.undefined;
            }
            done();
        });

    });
    it("speakerdeck",function(done){
        var i3result={
            'type':"slide",
            'url':"https://speakerdeck.com/akmur/atom-resistance-is-futile",
            'title':"Atom: Resistance is Futile",
            'html':""
        };
        scrape.getInfo("https://speakerdeck.com/akmur/atom-resistance-is-futile",function(err,result){
            if(err){
                console.log("error"+err);
            }else{
                console.log(result);
                expect(i3result.title).to.equal(result.title);
                expect(i3result.url).to.equal(result.url);
                expect(i3result.html).to.not.be.null;
                expect(i3result.html).to.not.be.undefined;
                expect(i3result.title).to.not.be.null;
                expect(i3result.title).to.not.be.undefined;
            }
            done();
        });

    });
    it("slides",function(done){
        var i1result={
            'type':"slide",
            'url':"http://slides.com/ai/postcss-intro#/",
            'title':"PostCSS Intro by Андрей «A.I.» Ситник",
            'html':""
        };
        scrape.getInfo("http://slides.com/ai/postcss-intro#/",function(err,result){
            if(err){
                console.log("error"+err);
            }else{
                console.log(result);
                expect(i1result.title).to.equal(result.title);
                expect(i1result.url).to.equal(result.url);
                expect(i1result.html).to.not.be.null;
                expect(i1result.html).to.not.be.undefined;
                expect(i1result.title).to.not.be.null;
                expect(i1result.title).to.not.be.undefined;
            }
            done();
        });

    });
    it("emaze",function(done){
        var i4result={
            'type':"slide",
            'url':"https://app.emaze.com/@AFFOZIRR#1",
            'title':"",
            'html':""
        };
        scrape.getInfo("https://app.emaze.com/@AFFOZIRR#1",function(err,result){
            if(err){
                console.log("error"+err);
            }else{
                console.log(result);
                expect(i4result.title).to.equal(result.title);
                expect(i4result.url).to.equal(result.url);
                expect(i4result.html).to.not.be.null;
                expect(i4result.html).to.not.be.undefined;
                expect(i4result.title).to.not.be.null;
                expect(i4result.title).to.not.be.undefined;
            }
            done();
        });

    });

    it("sway",function(done){
        var i5result={
            'type':"slide",
            'url':"https://sway.com/red_panda",
            'title':"The Red Panda",
            'html':""
        };
        scrape.getInfo("https://sway.com/red_panda",function(err,result){
            if(err){
                console.log("error"+err);
            }else{
                console.log(result);
                expect(i5result.title).to.equal(result.title);
                expect(i5result.url).to.equal(result.url);
                expect(i5result.html).to.not.be.null;
                expect(i5result.html).to.not.be.undefined;
                expect(i5result.title).to.not.be.null;
                expect(i5result.title).to.not.be.undefined;
            }
            done();
        });

    });
});