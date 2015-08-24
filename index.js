var observable = functon(el){

    var callbacks = {};
    var id = 0;

    el.on = function(names, fn){
        var names_splt = names.split(" ");

        names_splt.forEach(function(name){
            if(!callbacks[name]){
                callbacks[name] = [];
            }

            fn._id = id++;
            callbacks[name].push(fn);

        });
    };

    el.one = function(name, fn){
        function on(){
            el.off(name, fn);
            fn.apply(el);
        }

       el.on(name, on); 
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
    }

    el.trigger = function(names){
        var names_splt = names.split(" ");

        names_splt.forEach(function(name){
            if(typeof callbacks[name] === 'function'){
                callbacks[name].apply(el, arguments.splice(1, aruments.length));
            }
        });
    }

    return el;

}
