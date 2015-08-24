var observable = function(el){

    var callbacks = {};
    var id = 0;

    el = el || {};

    el.on = function(names, fn){
        var names_splt = names.split(" ");

        names_splt.forEach(function(name){
            if(!callbacks[name]){
                callbacks[name] = [];
            }

            fn._id = id++;
            callbacks[name].push(fn);

        });

        return el;
    };

    el.one = function(name, fn){
        function on(){
            el.off(name);
            fn.apply(el);
        }

        return el.on(name, on); 
    }

    el.off = function(names, fn){
        var names_splt = names.split(" ");

        names_splt.forEach(function(name){
            if(fn){
                for(var i = 0; i < callbacks.length; i++){
                    var callback = callbacks[i];
                    if(callback._id === fn._id){
                        callbacks.splice(i, 1);
                    }
                }
            } else {
                callbacks[name] = [];
            }
        });

        return el;
    }

    el.trigger = function(names){
        var args = [].splice.call(arguments, 0);

        var names_splt = names.split(" ");

        names_splt.forEach(function(name){
            if(callbacks[name]){
                callbacks[name].forEach(function(callback){
                    callback.apply(el, args.splice(1, args.length));
                });
            }
        });

        return el;
    }

    return el;
}

module.exports.observable = observable;
