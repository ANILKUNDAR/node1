var expect =require('expect');

var {generateMessage,generateMessagelocation}=require('./message');


describe('generateMessage',() => {
  it('SHOULD GENERATE CORRECT MESSAGAE',() => {
      var from='jen';
      var text='some message';
      var message=generateMessage(from,text);
      expect(typeof message.createAt).toBe('number');
      expect(message).toMatchObject({from, text});  });
});

describe('generateMessagelocation',() => {
  it('SHOULD GENERATE CORRECT LOCATION OBJECT',() => {
      var from='ADMIN';
      var latitude=15;
      var longitude=19;
      var url='http://www.google.co.in/maps/@15,19';
      var message=generateMessagelocation(from,latitude,longitude);
      expect(typeof message.createAt).toBe('number');
      expect(message).toMatchObject({from, url});
    });
  });
