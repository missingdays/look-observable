var observable = require("../index.js").observable;
var expect = require("expect.js");


describe("observable", function(){
    var el;
    var count = 0;
    var handler = function(){
        count++;
    }

    beforeEach(function(){
        el = observable();
        count = 0;
    });

    it("should handle on", function(){
        el.on("test", handler);
        el.trigger("test");

        expect(count).to.be(1);
    });

    it("should handle multi on", function(){
        el.on("test", handler);
        el.on("test", handler);
        el.on("test", handler);

        el.trigger("test");

        expect(count).to.be(3);
    });

    it("should handle multi on with multi calls", function(){
        el.on("test", handler);
        el.on("test", handler);
        el.on("test", handler);

        el.trigger("test");
        el.trigger("test");
        el.trigger("test");

        expect(count).to.be(9);
    });

    it("should handle multi events on", function(){
        el.on("pizza salad fruit", handler);

        el.trigger("pizza");
        el.trigger("salad");
        el.trigger("fruit");
        el.trigger("pizza"); // I love pizza

        expect(count).to.be(4);
    });

    it("should pass arguments on", function(){
        el.on("pizza", function(pizza){
            expect(pizza).to.be(3);
        });
        el.on("salad", function(tomato, cheese, meat){
            expect(tomato).to.be(1);
            expect(cheese).to.be(2);
            expect(meat).to.be(3);
        });

        el.trigger("pizza", 3);

        el.trigger("salad", 1, 2, 3);
    });

    it("should hadle recursive on", function(){
        el.on("test", function(){
            count++;
            el.on("test", function(){
                count++;
            });
        });

        el.trigger("test");
        el.trigger("test");

        expect(count).to.be(3);
    });

    it("should handle one", function(){
        el.one("test", handler);
        el.trigger("test");

        expect(count).to.be(1);
    });

    it("should handle multi one with multi calls", function(){
        el.one("test", handler);

        el.trigger("test");
        el.trigger("test");
        el.trigger("test");

        expect(count).to.be(1);
    });

    it("should handle multi one with multi calls", function(){
        function handler1(){
            count++;
        }

        function handler2(){
            count++;
        }

        function handler3(){
            count++;
        }
        el.one("test", handler1);
        el.one("test", handler2);
        el.one("test", handler3);

        el.trigger("test");
        el.trigger("test");
        el.trigger("test");

        expect(count).to.be(3);
    });

    it("should handle recursive one", function(){
        el.one("test", function(){
            count++;
            el.one("test", function(){
                count++;
            });
        });

        el.trigger("test");
        el.trigger("test");
        el.trigger("test");

        expect(count).to.be(2);
    });

    it("should pass arguments one", function(){
        el.one("pizza", function(pizza){
            expect(pizza).to.be(3);
        });
        el.one("salad", function(tomato, cheese, meat){
            expect(tomato).to.be(1);
            expect(cheese).to.be(2);
            expect(meat).to.be(3);
        });

        el.trigger("pizza", 3);

        el.trigger("salad", 1, 2, 3);
    });


    it("should handle off", function(){
        el.on("test", handler);
        el.off("test");

        el.trigger("test");

        expect(count).to.be(0);
    });

    it("should handle multi off", function(){
        el.on("test1", handler).off("test1").on("test2 test3", handler).off("test2 test3");

        el.trigger("test1");
        el.trigger("test2");
        el.trigger("test3");

        expect(count).to.be(0);
    });

    it("should hangle off with function given", function(){
        function one(){
            count++;
        }
        function two(){
            count++;
        }
        function oneMod(){
            count++;
        }

        el.on("one", one);
        el.on("one", oneMod);
        el.on("two", two);

        el.off("one", one);
        el.off("two", two);

        el.trigger("one");
        el.trigger("two");

        expect(count).to.be(1);
    });

});
