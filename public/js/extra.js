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



rekognition.listCollections({}, (err, data) => {
    console.log(err);
    console.log(data);
})
var params = {
    SimilarityThreshold: 90,
    SourceImage: {
        S3Object: {
            Bucket: "yogen1",
            Name: "IMG_20160524_143122703.jpg"
        }
    },
    TargetImage: {
        S3Object: {
            Bucket: "yogen1",
            Name: "IMG_20160923_164124424.jpg"
        }
    }
};
rekognition.compareFaces(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else console.log(data); // successful response
});

// { CollectionIds: ['myphotos'], FaceModelVersions: ['2.0'] }
// {
//     SourceImageFace:
//     {
//         BoundingBox:
//         {
//             Width: 0.6800000071525574,
//                 Height: 0.3824999928474426,
//                     Left: 0.09222222119569778,
//                         Top: 0.20874999463558197
//         },
//         Confidence: 99.99935913085938
//     },
//     FaceMatches: [{ Similarity: 97, Face: [Object] }],
//         UnmatchedFaces: [],
//             SourceImageOrientationCorrection: 'ROTATE_0',
//                 TargetImageOrientationCorrection: 'ROTATE_0'
// }

var params = {
    Image: {
        S3Object: {
            Bucket: "yogen1",
            Name: "IMG_20160524_143122703.jpg"
        }
    },
    Attributes: ["ALL"]
};
rekognition.detectFaces(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else console.log(data);
    console.log(data.FaceDetails[0]);
});

// {
//     BoundingBox:
//     {
//         Width: 0.6800000071525574,
//             Height: 0.3824999928474426,
//                 Left: 0.09222222119569778,
//                     Top: 0.20874999463558197
//     },
//     AgeRange: { Low: 26, High: 43 },
//     Smile: { Value: true, Confidence: 69.49213409423828 },
//     Eyeglasses: { Value: false, Confidence: 99.90599822998047 },
//     Sunglasses: { Value: false, Confidence: 99.2706527709961 },
//     Gender: { Value: 'Male', Confidence: 99.92887115478516 },
//     Beard: { Value: true, Confidence: 99.98974609375 },
//     Mustache: { Value: true, Confidence: 99.99840545654297 },
//     EyesOpen: { Value: true, Confidence: 99.6694564819336 },
//     MouthOpen: { Value: false, Confidence: 97.12248992919922 },
//     Emotions:
//     [{ Type: 'HAPPY', Confidence: 43.06673049926758 },
//     { Type: 'DISGUSTED', Confidence: 5.5342912673950195 },
//     { Type: 'ANGRY', Confidence: 5.232447624206543 }],
//         Landmarks:
//     [{ Type: 'eyeLeft', X: 0.3364465534687042, Y: 0.3483084440231323 },
//     {
//         Type: 'eyeRight',
//         X: 0.5643486976623535,
//         Y: 0.38436421751976013
//     },
//     { Type: 'nose', X: 0.40695786476135254, Y: 0.4347151815891266 },
//     {
//         Type: 'mouthLeft',
//         X: 0.285744309425354,
//         Y: 0.4787905812263489
//     },
//     {
//         Type: 'mouthRight',
//         X: 0.4864139258861542,
//         Y: 0.5125533938407898
//     },
//     {
//         Type: 'leftPupil',
//         X: 0.3293688893318176,
//         Y: 0.34947144985198975
//     },
//     {
//         Type: 'rightPupil',
//         X: 0.572327196598053,
//         Y: 0.3858760893344879
//     },
//     {
//         Type: 'leftEyeBrowLeft',
//         X: 0.2671605050563812,
//         Y: 0.30562126636505127
//     },
//     {
//         Type: 'leftEyeBrowUp',
//         X: 0.3443136513233185,
//         Y: 0.2972618341445923
//     },
//     {
//         Type: 'leftEyeBrowRight',
//         X: 0.41451507806777954,
//         Y: 0.3141202926635742
//     },
//     {
//         Type: 'rightEyeBrowLeft',
//         X: 0.5292550325393677,
//         Y: 0.32870200276374817
//     },
//     {
//         Type: 'rightEyeBrowUp',
//         X: 0.6039449572563171,
//         Y: 0.33688434958457947
//     },
//     {
//         Type: 'rightEyeBrowRight',
//         X: 0.6671009659767151,
//         Y: 0.36381253600120544
//     },
//     {
//         Type: 'leftEyeLeft',
//         X: 0.297182559967041,
//         Y: 0.3420121669769287
//     },
//     {
//         Type: 'leftEyeRight',
//         X: 0.37767493724823,
//         Y: 0.3556691110134125
//     },
//     {
//         Type: 'leftEyeUp',
//         X: 0.3392361104488373,
//         Y: 0.3400109112262726
//     },
//     {
//         Type: 'leftEyeDown',
//         X: 0.33267489075660706,
//         Y: 0.35607388615608215
//     },
//     {
//         Type: 'rightEyeLeft',
//         X: 0.5254348516464233,
//         Y: 0.37876373529434204
//     },
//     {
//         Type: 'rightEyeRight',
//         X: 0.6041913628578186,
//         Y: 0.3909991383552551
//     },
//     {
//         Type: 'rightEyeUp',
//         X: 0.5671917796134949,
//         Y: 0.37612420320510864
//     },
//     {
//         Type: 'rightEyeDown',
//         X: 0.5610411763191223,
//         Y: 0.39208701252937317
//     },
//     {
//         Type: 'noseLeft',
//         X: 0.3442414700984955,
//         Y: 0.4391753077507019
//     },
//     {
//         Type: 'noseRight',
//         X: 0.4662969410419464,
//         Y: 0.45728155970573425
//     },
//     { Type: 'mouthUp', X: 0.3884645104408264, Y: 0.4846632778644562 },
//     {
//         Type: 'mouthDown',
//         X: 0.3696645200252533,
//         Y: 0.5268133878707886
//     }],
//         Pose:
//     {
//         Roll: 15.71037769317627,
//             Yaw: -2.57373046875,
//                 Pitch: 0.8083369731903076
//     },
//     Quality: { Brightness: 51.11076354980469, Sharpness: 99.99090576171875 },
//     Confidence: 99.99935913085938
// }


// collection face object
// {
//     Faces:
//     [{
//         FaceId: '028709bc-db8d-4a57-8284-7f46e61c4f14',
//         BoundingBox: [Object],
//         ImageId: '338a5800-58fd-e1a4-599d-d0e622ffa7a3',
//         Confidence: 99.9988021850586
//     },
//     {
//         FaceId: '0b8deae3-f3a6-46e4-876d-60d5217d88d2',
//         BoundingBox: [Object],
//         ImageId: '4e231474-fc4c-4396-a14d-d3adbb088c1a',
//         Confidence: 99.99870300292969
//     },
//     {
//         FaceId: '3c8b15b9-6782-4964-9a09-97ce8bb8ccbb',
//         BoundingBox: [Object],
//         ImageId: '338a5800-58fd-e1a4-599d-d0e622ffa7a3',
//         Confidence: 99.9999008178711
//     },
//     {
//         FaceId: '732e6db3-94d2-4d10-8d47-38874325c6b9',
//         BoundingBox: [Object],
//         ImageId: '192f5479-25eb-d62d-8b11-cc604c9571cb',
//         Confidence: 99.99939727783203
//     },
//     {
//         FaceId: '9062afe9-0d5c-4efc-b45e-15d70c04aae6',
//         BoundingBox: [Object],
//         ImageId: '855ff304-5f5f-5d5c-bec9-0ff4abffe9f8',
//         ExternalImageId: 'IMG-20171012-WA0010.jpg',
//         Confidence: 100
//     },
//     {
//         FaceId: 'e7719c48-cdf5-49b5-9ba0-f4c93db9ccd4',
//         BoundingBox: [Object],
//         ImageId: '855ff304-5f5f-5d5c-bec9-0ff4abffe9f8',
//         ExternalImageId: 'IMG-20171012-WA0010.jpg',
//         Confidence: 99.99960327148438
//     }],
//         FaceModelVersion: '2.0'
// }