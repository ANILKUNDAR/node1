var expect =require('expect');

var {generateMessage}=require('./message');


describe('generateMessage',() => {
  it('SHOULD GENERATE CORRECT MESSAGAE',() => {
      var from='jen';
      var text='some message';
      var message=generateMessage(from,text);
      expect(typeof message.createAt).toBe('number');
        expect(message).toMatchObject({from, text});  });
});
