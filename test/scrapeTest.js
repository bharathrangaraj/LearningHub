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
        scrape.getInfo("https://www.youtube.com/watch?v=jXUFRue31PQ",function(result){
            var mkresult={
                'title':"Welcome to Node Studios! - NODE",
                'description':'Node Studios features premium video game content from: FreddieW, CorridorDigital, Toby Turner aka Tobuscus, Harley Morenstein with the Epic Meal Time crew, and Jaboody Dubs. Node Studios also creates and produces amazing original series.  From live action to animation to game play.  Subscribe and see why NODE is your home for video game AWESOMENESS!\n\nDownload "We Are Gods" by SILAS for FREE http://soundcloud.com/isleofsilas',
                'type':"video",
                'url':"https://www.youtube.com/watch?v=jXUFRue31PQ"
            };
            expect(result.title).to.equal(mkresult.title);
            expect(result.description).to.equal(mkresult.description);
            expect(result.type).to.equal(mkresult.type);
            expect(result.url).to.equal(mkresult.url);
            done();

        })

    });

    it("Vimeo",function(done){
        scrape.getInfo("https://vimeo.com/channels/staffpicks/165192677",function(result){
            var mkresult={
                'title':"Embrace Of The Serpent",
                'description':"https://vimeo.com/ondemand/embraceoftheserpentAt once blistering and poetic, the ravages of colonialism cast a dark shadow over the South American landscape in EMBRACE OF THE SERPENT, the third feature by Ciro Guerra. Filmed in stunning black-and-white, SERPENT centers on Karamakate, an Amazonian shaman and the last survivor of his people, and the two scientists who, over the course of 40 years, build a friendship with him. The film was inspired by the real-life journals of two explorers who traveled through the Colombian Amazon during the last century in search of the sacred and difficult-to-find psychedelic Yakruna plant.",
                'type':"video",
                'url':"https://vimeo.com/channels/staffpicks/165192677"
            };

            expect(result.title).to.equal(mkresult.title);
            expect(result.description).to.equal(mkresult.description);
            expect(result.type).to.equal(mkresult.type);
            expect(result.url).to.equal(mkresult.url);
            done();

        })
    });

    it("dotsub",function(done){
            scrape.getInfo("https://dotsub.com/view/3f75417e-4a9f-44b9-a125-e302238c2cef",function(result){
                var mkresult={
                    'title':"Expert SUP Instructors from Paddle Diva",
                    'description':"Paddle Diva provides SUP lessons for everyone having distinct fitness goals. Their instructors offer services such as SUP yoga & fitness, group paddling, SUP paddle adventure tours, SUP boards & gear and more. Visit http://www.paddlediva.com",
                    'type':"video",
                    'url':"https://dotsub.com/view/3f75417e-4a9f-44b9-a125-e302238c2cef"
                };

                expect(result.title).to.equal(mkresult.title);
                expect(result.description).to.equal(mkresult.description);
                expect(result.type).to.equal(mkresult.type);
                expect(result.url).to.equal(mkresult.url);
                done();
            });

        });
    it("ted",function(done){
        scrape.getInfo("https://www.ted.com/talks/laura_indolfi_good_news_in_the_fight_against_pancreatic_cancer",function(result){
            var mkresult={
                'title':"Laura Indolfi: Good news in the fight against pancreatic cancer",
                'description':'Anyone who has lost a loved one to pancreatic cancer knows the devastating speed with which it can affect an otherwise healthy person. TED Fellow and biomedical entrepreneur Laura Indolfi is developing a revolutionary way to treat this complex and lethal disease: a drug delivery device that acts as a cage at the site of a tumor, preventing it from spreading and delivering medicine only where it\'s needed. "We are hoping that one day we can make pancreatic cancer a curable disease," she says.',
                'type':"video",
                'url':"https://www.ted.com/talks/laura_indolfi_good_news_in_the_fight_against_pancreatic_cancer"
            };

            expect(result.title).to.equal(mkresult.title);
            expect(result.description).to.equal(mkresult.description);
            expect(result.type).to.equal(mkresult.type);
            expect(result.url).to.equal(mkresult.url);
            done();
        });
    })
    it("sapo",function(done){
        scrape.getInfo("http://videos.sapo.pt/CosZR1yEUHhTdKdV8cPT",function(result){
            var mkresult={
                'title':"Os estagiários na Google",
                'description':'Os rituais dos estagiários aproximam-se do que já foi visto no filme de Hollywood.',
                'type':"video",
                'url':"http://videos.sapo.pt/CosZR1yEUHhTdKdV8cPT"
            };

            expect(result.title).to.equal(mkresult.title);
            expect(result.description).to.equal(mkresult.description);
            expect(result.type).to.equal(mkresult.type);
            expect(result.url).to.equal(mkresult.url);
            done();
        });
    });
    it("dailymotion",function(done){
        scrape.getInfo("http://www.dailymotion.com/video/x3y8w4e_manchester-city-0-0-dynamo-kyiv-3-1-agg-manuel-pellegrini-post-match-interview_sport",function(result){
            var mkresult={
                'title':"Manchester City 0-0 Dynamo Kyiv (3-1 Agg) - Manuel Pellegrini Post Match Interview",
                'description':'Manchester City 0-0 Dynamo Kyiv (3-1 Agg) - Manuel Pellegrini Post Match Interview',
                'type':"video",
                'url':"http://www.dailymotion.com/video/x3y8w4e_manchester-city-0-0-dynamo-kyiv-3-1-agg-manuel-pellegrini-post-match-interview_sport"
            };

            expect(result.title).to.equal(mkresult.title);
            expect(result.description).to.equal(mkresult.description);
            expect(result.type).to.equal(mkresult.type);
            expect(result.url).to.equal(mkresult.url);
            done();
        });
    });

    it("circuitlab",function(done){
        scrape.getInfo("https://www.circuitlab.com/circuit/f6ex5x/diode-full-wave-rectifier/",function(result){
            var cresult={
                'title':"Diode full-wave rectifier",
                'description':'Four diodes (a "bridge rectifier") plus a capacitor can be used to rectify AC into DC, with conduction over most of the the input power cycle.',
                'type':"video",
                'url':"https://www.circuitlab.com/circuit/f6ex5x/diode-full-wave-rectifier/"
            };
            expect(result.title).to.equal(cresult.title);
            expect(result.description).to.equal(cresult.description);
            expect(result.type).to.equal(cresult.type);
            expect(result.url).to.equal(cresult.url);
            done();

        })
    });

    it("coub",function(done){
        scrape.getInfo("http://coub.com/view/ch6wq",function(result){
            var mkresult={
                'title':"Покатай меня, большая черепаха!",
                'description':'by Darya Revenko',
                'type':"video",
                'url':"http://coub.com/view/ch6wq"
            };
            expect(result.title).to.equal(mkresult.title);
            expect(result.description).to.equal(mkresult.description);
            expect(result.type).to.equal(mkresult.type);
            expect(result.url).to.equal(mkresult.url);
            done();
        })
    });
        it("kickstarter",function(done){
            scrape.getInfo("https://www.kickstarter.com/projects/techwillsaveus/mover-kit-the-first-active-wearable-that-kids-make?ref=home_potd",function(result){
                var mkresult={
                    'title':"Mover Kit - The first active wearable that kids make & code",
                    'description':"Mover Kit encourages movement! It's a game, speed-activated bike light, disco bracelet – whatever a kid can make, move & code it to be.",
                    'type':"video",
                    'url':"https://www.kickstarter.com/projects/techwillsaveus/mover-kit-the-first-active-wearable-that-kids-make?ref=home_potd"
                };
                expect(result.title).to.equal(mkresult.title);
                expect(result.description).to.equal(mkresult.description);
                expect(result.type).to.equal(mkresult.type);
                expect(result.url).to.equal(mkresult.url);
                done();
            })
        });
});

describe("links",function(){
    it("link with ogp")

});
