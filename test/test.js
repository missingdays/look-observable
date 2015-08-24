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
        el.one("test", handler);
        el.one("test", handler);
        el.one("test", handler);

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

        el.on("one", one);
        el.on("two", two);

        el.off("one", one);
        el.off("two", two);
    });

});
