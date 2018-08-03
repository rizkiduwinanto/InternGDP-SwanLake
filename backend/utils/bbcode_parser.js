export default (bbcodeParagraph) => {
  if (!bbcodeParagraph) return "";
  var deleteBBTAG = new RegExp('\\[.*?\\]','g');
  var deleteTrailingSpace = new RegExp('[ ]+[ ]','g');
  var trimInitLastSpace = new RegExp('^ +| +$', 'g');
  
  let cleanParagraph =  (bbcodeParagraph.replace(deleteBBTAG, ' '))
                        .replace(deleteTrailingSpace, ' ')
                        .replace(trimInitLastSpace,'');

  return cleanParagraph;
}