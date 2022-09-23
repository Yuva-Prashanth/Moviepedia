function log(req,res,next){
    console.log('aunth...');
    next();
};

module.exports = log;