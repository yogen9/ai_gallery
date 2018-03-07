function fileUp(reqBody, reqFiles) {
    if (!reqFiles)
        return console.log("No files were uploaded.");
    else
        console.log(reqFiles);

    if (reqFiles.img) {
        reqBody.img = "../images/" + reqFiles.img.name
        path = "./images/" + reqFiles.img.name;
        imgfile = reqFiles.img;
        imgfile.mv(path, function (err) {
            //setting for server path where uploded file saved
            if (err)
                console.log("Error while Upload");
            else
                console.log("Successfully uploaded.");
        });
    } else {
        reqBody.img = "../images/img_avatar.png"
    }
    console.log(reqBody);
}


var params = {
    CollectionId: "myphotos"
};
rekognition.createCollection(params, function (err, data) {
    if (err) console.log(err, err.stack);
    else console.log(data);
});