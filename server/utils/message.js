var moment= require('moment');
var generateMessage=(from,text)=>{
  return {
    from,
    text,
    createAt:moment().valueOf()
  };
};

var generateMessagelocation = (from,latitude,longitude) => {
  return{
    from,
    url:`http://www.google.co.in/maps/@${latitude},${longitude}`,
    createAt:moment().valueOf()
   };
};

module.exports={generateMessage,generateMessagelocation};
