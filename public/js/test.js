/**
 * Created by Bharath on 22/03/16.
 */
var htm="<iframe height=\"120\" frameborder=\"0\" width=\"380\" scrolling=\"NO\" src=\"http:\/\/chirb.it\/wp\/OBnAr1\">This browser does not show iframe content. Listen to this chirbit here <a href=\"http:\/\/chirb.it\/OBnAr1\">http:\/\/chirb.it\/OBnAr1<\/a><\/iframe>";
//console.log("prev"+htm);
htm.replace('/\"/g','"');
process.stdout.write(htm);


