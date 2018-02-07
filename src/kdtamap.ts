module.exports = {
    click: function(xpath: string) {
      return "|''click''|" + xpath + "|";
    },
  
  withText: function(xpath: string, text: string) {
      return "|''with''|" + xpath + "|''add text''|" + text +"|";
    }
  };


