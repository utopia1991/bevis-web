var entries = [
    {
        "essay":"videoBack",
        "title":"视频网页背景",
        "published":"2016-9-12",
        "body": "以视频作为网页背景的jQuery插件"
    },
    {
        "essay":"2",
        "title":"Learn it!",
        "published":"2016-7-3",
        "body":"Write everything what you like!"
    },
    {
        "essay":"3",
        "title":"Read it!",
        "published":"2016-7-4",
        "body":"Write everything what you like!"
    },
    {
        "essay":"4",
        "title":"Do it!",
        "published":"2016-7-5",
        "body":"Write everything what you like!"
    }
];

exports.getBlogEntries = function (){
   return entries;
};

exports.getBlogEntry = function (essay){
   for(var i=0; i < entries.length; i++){
      if(entries[i].essay == essay) return entries[i];
   }
};