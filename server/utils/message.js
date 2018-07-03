var generateMessage=(from,text)=>{
  return {
    from,
    text,
    createAt:new Date().getTime()
  };
};

var generateMessagelocation = (from,latitude,longitude) => {
  return{
    from,
    url:`http://www.google.co.in/maps/@${latitude},${longitude}`,
    createAt:new Date().getTime()
   };
};

module.exports={generateMessage,generateMessagelocation};
