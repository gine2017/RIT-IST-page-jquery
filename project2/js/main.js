/**
 *function for the proxy
 The Proxy sits between our requesting HTML page and the “IST.RIT.EDU” server
When the response is returned from the server the Proxy adds an 
“Access-Control-Allow-Origin:*” header to the response.

In computer networking, a proxy server is a server application or a
ppliance that acts as an intermediary for requests from 
clients seeking resources from servers that provide those resources
 *
 */
$(document).ready(function(){
    showDegrees();
    showOverview();
    showDegreeStats();
    showCareers();
    showMajorInfo();
    showGraduateMajor(); 
    showMinors();
    displayEmploy();
    showMap();
    runGallery();
    showFacResources();
    checkClick();
    showFacResearchLookUp(); 
    addLookupModal();
    showStudentResources();
    showStudRescModal();
    addFooter();
});
function getData(pathName){
    return $.ajax({
    type: 'get',
    url:'http://solace.ist.rit.edu/~plgics/proxy.php',
    dataType:'json',
    data: pathName,
    cache:false,
    async:true
    })
}
    /**
     * dynamitcially display the undergrad degrees oin the three divs
     * use the getdata to get title of the majors 
    */
function showDegrees(){
    var $wmcDiv = $("<div/>",{id:"wmc"});
    $wmcDiv.css("background-color","#84BD00")
    $wmcDiv.append("<span id = 'wmcTitle'></span>");
    $(".undergraduateMajors").append($wmcDiv);

    var $hccDiv = $("<div/>",{id:"hcc"});
    $hccDiv.css("background-color","#009CBD")
    $hccDiv.append("<span id = 'hccTitle'></span>");
    $(".undergraduateMajors").append($hccDiv);

    var $citDiv = $("<div/>",{id:"cit"});
    $citDiv.css("background-color","#F6BE00")
    $citDiv.append("<span id = 'citTitle'></span>");
    $(".undergraduateMajors").append($citDiv);
    getData({path:'/degrees/undergraduate/'}).done(function( json){
        $('#wmcTitle').append(json.undergraduate[0].title);
        $('#hccTitle').append(json.undergraduate[1].title);
        $('#citTitle').append(json.undergraduate[2].title);
    });
}

function showOverview(){
    var $overviewTitle = $('<h1/>',{id:"overviewTitle"})
    $("body").append("<div class = 'flex-container overview'></div>")
    $overviewTitle.append("Overview");
    $(".overview").append($overviewTitle);
    $(".overview").append("<p id = 'overviewDesc'></p>")
    getData({path:'/about/'}).done(function(json){
        $("#overviewDesc").append(json.description)
    });
}

function showMajorInfo(){
    var $majorTitle = $('<h1/>',{id:"majorTitle"});
        
    var $undergradDec = $('<p>Home to the college’s Bachelor of Science degrees in computing and' + 
    'information technologies, human-centered computing,' +  
    'and web and mobile computing, the iSchool comprises the “full stack' + 
    'computing knowledge that prepares professionals working on both the front- and back-end of the user experience</p>')

    var $accordian = $("<div id = 'accordion'></div>");
    var $wmcAcc = $('<h3/>',{id:"wmcAcc"});
    var $wmcDescr = $("<div/>",{id:"wmcDescr"});
    $accordian.append($wmcAcc);
    $accordian.append($wmcDescr);
    $wmcDescr.append("<p id = wmcDescAcc></p>");


    var $hccAcc = $('<h3/>',{id:"hccAcc"});
    var $hccDescr = $("<div/>",{id:"hccDescr"});
    $accordian.append($hccAcc);
    $accordian.append($hccDescr);
    $hccDescr.append("<p id = hccDescAcc></p>");

    var $citAcc = $('<h3/>',{id:"citAcc"});
    var $citDescr = $("<div/>",{id:"citDescr"});
    $accordian.append($citAcc);
    $accordian.append($citDescr);
    $citDescr.append("<p id = citDescAcc></p>");

    $("body").append("<div class = 'flex-container majors'></div>");
    $(".majors").append("<h1 id = 'programTitle'>Our Programs</h1>");
    $majorTitle.append("Undergraduate Programs"); 
    $(".majors").append($majorTitle);
    $(".majors").append($undergradDec);
    $(".majors").append($accordian);
       
    getData({path:'/degrees/'}).done(function(json){
        $wmcAcc.append(json.undergraduate[0].title);
        $wmcDescr.append(json.undergraduate[0].description+"<br />");
        $wmcDescr.append("<strong>Concentractions:</strong> " + json.undergraduate[0].concentrations);

       $hccAcc.append(json.undergraduate[1].title);
        $hccDescr.append(json.undergraduate[1].description +"<br />");
        $hccDescr.append("<strong>Concentractions:</strong> " + json.undergraduate[1].concentrations);


        $citAcc.append(json.undergraduate[2].title);
        $citDescr.append(json.undergraduate[2].description +"<br />");
        $citDescr.append("<strong>Concentractions:</strong> " + json.undergraduate[2].concentrations);
    });
    $( "#accordion" ).accordion();
    $("body").append("<div class = 'seperateBar'></div>");

}
 
function showDegreeStats(){
    var $statsDiv = $("<div class = 'flex-container stats'></div>");
    var $salaryDiv = $('<div></div>');
    var $salaryNum = $("<p id = 'salaryNum'></div>");
    var $salaryDesc = $("<p id = 'salaryDesc'></div>");
    var $rankDiv = $('<div></div>');
    var $rankNum = $("<p id = 'rankNum'></p>");
    var $rankDesc = $("<p id = 'rankDesc'></p>");
    var $jobDiv = $('<div id = ""></div>');
    var $jobNum = $("<p id = 'jobNum'>95%</div>");
    var $jobDesc = $("<p id = 'jobDesc'>Job placement rate</div>");

    $("body").append($statsDiv);
    $statsDiv.append($salaryDiv);
    $statsDiv.append($rankDiv);
    $statsDiv.append($jobDiv);
    $salaryDiv.append("<i class='fas fa-hand-holding-usd'></i>");
    $salaryDiv.append($salaryNum);
    $salaryDiv.append($salaryDesc);
    $rankDiv.append("<i class='fas fa-chart-line'></i>")
    $rankDiv.append($rankNum);
    $rankDiv.append($rankDesc);
    $jobDiv.append("<i class='fas fa-suitcase'></i>");
    $jobDiv.append($jobNum);
    $jobDiv.append($jobDesc);
    
    getData({path:'/employment/'}).done(function(json){
        $salaryNum.append(json.degreeStatistics.statistics[0].value + "<br />");
        $salaryDesc.append(json.degreeStatistics.statistics[0].description);
        $rankNum.append(json.degreeStatistics.statistics[1].value  + "<br />");
        $rankDesc.append(json.degreeStatistics.statistics[1].description);
    });
}
function showGraduateMajor(){
    var $majorTitle = $('<h1/>',{id:"gradTitle"});
        
    var $graduateDec = $("<p>The Master of Science in information sciences and technologies provides" + 
     "an opportunity for in-depth study to prepare for today’s high-demand computing careers. Big data is not just high" +
     "transaction volumes; it is also data in various formats, with high velocity change, and increasing complexity and" +  
     "information delivery must be immediate and on demand.</p>");

    var $accordian = $("<div id = 'gradAccordion'></div>");
    var $istGrad = $('<h3/>',{id:"gradWmcAcc"});
    var $istDescr = $("<div/>",{id:"gradIstDescr"});
    $accordian.append($istGrad);
    $accordian.append($istDescr);
    $istDescr.append("<p id = gradIstDescAcc></p>");


    var $hccAcc = $('<h3/>',{id:"gradHccAcc"});
    var $hccDescr = $("<div/>",{id:"gradHccDescr"});
    $accordian.append($hccAcc);
    $accordian.append($hccDescr);
    $hccDescr.append("<p id = gradHccDescAcc></p>");

    var $nssaAcc = $('<h3/>',{id:"gradNssaAcc"});
    var $nssaDescr = $("<div/>",{id:"gradcitDescr"});
    $accordian.append($nssaAcc);
    $accordian.append($nssaDescr);
    $nssaDescr.append("<p id = gradNssaDescAcc></p>");

    var $gacAcc = $('<h3/>',{id:"gradGacAcc"});
    var $gacDescr = $("<div/>",{id:"gradGacDescr"});
    $accordian.append($gacAcc);
    $accordian.append($gacDescr);
    $gacDescr.append("<p id = gradGacDescAcc></p>");

    $("body").append("<div class = 'flex-container gradMajors'></div>");
    $majorTitle.append("Graduate Programs"); 
    $(".gradMajors").append($majorTitle);
    $(".gradMajors").append($graduateDec);
    $(".gradMajors").append($accordian);
       
    getData({path:'/degrees/'}).done(function(json){
        $istGrad.append(json.graduate[0].title);
        $istDescr.append(json.graduate[0].description+"<br />");
        $istDescr.append("<strong>Concentractions:</strong> " + json.graduate[0].concentrations);

       $hccAcc.append(json.graduate[1].title);
        $hccDescr.append(json.graduate[1].description +"<br />");
        $hccDescr.append("<strong>Concentractions:</strong> " + json.graduate[1].concentrations);

        $nssaAcc.append(json.graduate[2].title);
        $nssaDescr.append(json.graduate[2].description +"<br />");
        $nssaDescr.append("<strong>Concentractions:</strong> " + json.graduate[2].concentrations);

        $gacAcc.append(json.graduate[3].degreeName);
        $gacDescr.append("<strong>Certificates:</strong> " + json.graduate[3].availableCertificates);
    });
    $( "#gradAccordion").accordion();
    $("body").append("<div class = 'seperateBar'></div>");

}
function showCareers(){
    /**
     * show image on the side then all the careers
     */
    $("body").append("<div class = 'flex-container careers'></div>");
    var $careersTitle = $("<h1 id = 'careerTitle' >Careers <i class='fas fa-suitcase'></i></h1>",{id:"careersTitle"});
    $("body").append($careersTitle);
    var $leftDiv= $('<div id = "leftCareer"></div>');
    var $righttDiv= $('<div id = "rightCareer"></div>');
    var $careersPara = $("<p id ='careersItems'></p>")
    $leftDiv.append("<img src = ./images/candid2.jpg alt= 'man using the computer'>");
    $(".careers").append($leftDiv);
    $(".careers").append($righttDiv);
    $righttDiv.append($careersTitle);
    $righttDiv.append($careersPara);

    getData({path:'/employment/'}).done(function(json){
        $careersPara.append(json.careers.careerNames[0] + "<br />");
        $careersPara.append(json.careers.careerNames[1] + "<br />");
        $careersPara.append(json.careers.careerNames[2] + "<br />") ;
        $careersPara.append(json.careers.careerNames[3] + "<br />");
        $careersPara.append(json.careers.careerNames[4]+ "<br />");
        $careersPara.append(json.careers.careerNames[5]+ "<br />");
    });                                                      
}
function showMinors(){
    var $minorTitle = $('<h1/>',{id:"minorTitle"});
    var $accordian = $("<div id = 'minorAccordion'></div>");
    var $minorOneTitle = $('<h3/>',{id:"minorOneTitle"});
    var $minorOneDescr = $("<div/>",{id:"minorOneDescr"});
    var $minorOneCourses = $("<p/>",{id:"minorOneDescr"});

    $accordian.append($minorOneTitle);
    $accordian.append($minorOneDescr);
    $minorOneDescr.append("<p id = minorOneDescrAcc></p>");
    $minorOneDescr.append($minorOneCourses);

    var $minorTwoTitle = $('<h3/>',{id:"minorTwoTitle"});
    var $minorTwoDescr = $("<div/>",{id:"minorTwoDescr"});
    var $minorTwoCourses = $("<p/>",{id:"minorTwoCourses"});
    $accordian.append($minorTwoTitle);
    $accordian.append($minorTwoDescr);
    $minorTwoDescr.append("<p id = minorTwoDescrAcc></p>");
    $minorTwoDescr.append($minorTwoCourses);

    var $minorThreeTitle = $('<h3/>',{id:"minorThreeTitle"});
    var $minorThreeDescr = $("<div/>",{id:"minorThreeDescr"});
    var $minorThreeCourses = $("<p/>",{id:"minorThreeCourses"});
    $accordian.append($minorThreeTitle);
    $accordian.append($minorThreeDescr);
    $minorThreeDescr.append("<p id = minorThreeDescrAcc></p>");
    $minorThreeDescr.append($minorThreeCourses);


    var $minorFourTitle = $('<h3/>',{id:"minorFourTitle"});
    var $minorFourDescr = $("<div/>",{id:"minorFourDescr"});
    var $minorFourCourses = $("<p/>",{id:"minorFourCourses"});
    $accordian.append($minorFourTitle);
    $accordian.append($minorFourDescr);
    $minorFourDescr.append("<p id = minorFourDescrAcc></p>");
    $minorFourDescr.append($minorFourCourses);


    var $minorFiveTitle = $('<h3/>',{id:"minorFiveTitle"});
    var $minorFiveDescr = $("<div/>",{id:"minorFiveDescr"});
    var $minorFiveCourses = $("<p/>",{id:"minorFiveCourses"});
    $accordian.append($minorFiveTitle);
    $accordian.append($minorFiveDescr);
    $minorFiveDescr.append("<p id = minorFiveDescrAcc></p>");
    $minorFiveDescr.append($minorFiveCourses);


    var $minorSixTitle = $('<h3/>',{id:"minorSixTitle"});
    var $minorSixDescr = $("<div/>",{id:"minorSixDescr"});
    var $minorSixCourses = $("<p/>",{id:"minorSixCourses"});
    $accordian.append($minorSixTitle);
    $accordian.append($minorSixDescr);
    $minorSixDescr.append("<p id = minorSixDescrAcc></p>");
    $minorSixDescr.append($minorSixCourses);


    var $minorSevenTitle = $('<h3/>',{id:"minorSevenTitle"});
    var $minorSevenDescr = $("<div/>",{id:"minorSevenDescr"});
    var $minorSevenCourses = $("<p/>",{id:"minorSevenCourses"});
    $accordian.append($minorSevenTitle);
    $accordian.append($minorSevenDescr);
    $minorSevenDescr.append("<p id = minorSevenDescrAcc></p>");
    $minorSevenDescr.append($minorSevenCourses);


    var $minorEightTitle = $('<h3/>',{id:"minorEightTitle"});
    var $minorEightDescr = $("<div/>",{id:"minorEightDescr"});
    var $minorEightCourses = $("<p/>",{id:"minorEightCourses"});
    $accordian.append($minorEightTitle);
    $accordian.append($minorEightDescr);
    $minorEightDescr.append("<p id = minorEightDescrAcc></p>");
    $minorSevenDescr.append($minorEightCourses);

    $("body").append("<div class = 'flex-container minorMajors'></div>");
    $(".minorMajors").append("<h1 id = 'headMinorTitle'>Our Minors</h1>");
    $minorTitle.append("Undergraduate Minors"); 
    $(".minorMajors").append($minorTitle);
    $(".minorMajors").append($accordian);
       
    getData({path:'/minors/'}).done(function(json){
     $minorOneTitle.append(json.UgMinors[0].title);
     $minorOneDescr.append(json.UgMinors[0].description);
     $minorOneCourses.append("<strong>Courses :</strong>" + json.UgMinors[0].courses.join("  "));

     $minorTwoTitle.append(json.UgMinors[1].title);
     $minorTwoDescr.append(json.UgMinors[1].description);
     $minorTwoCourses.append("<strong>Courses :</strong>" + json.UgMinors[1].courses.join("  "));

     $minorThreeTitle.append(json.UgMinors[2].title);
     $minorThreeDescr.append(json.UgMinors[2].description);
     $minorThreeCourses.append("<strong>Courses :</strong>" + json.UgMinors[2].courses.join("  "));

     $minorFourTitle.append(json.UgMinors[3].title);
     $minorFourDescr.append(json.UgMinors[3].description);
     $minorFourCourses.append("<strong>Courses :</strong>" + json.UgMinors[3].courses.join("  "));

     $minorFiveTitle.append(json.UgMinors[4].title);
     $minorFiveDescr.append(json.UgMinors[4].description);
     $minorFiveCourses.append("<strong>Courses :</strong>" + json.UgMinors[4].courses.join("  "));

     $minorSixTitle.append(json.UgMinors[5].title);
     $minorSixDescr.append(json.UgMinors[5].description);
     $minorSixCourses.append("<strong>Courses :</strong>" + json.UgMinors[5].courses.join("  "));

     $minorSevenTitle.append(json.UgMinors[6].title);
     $minorSevenDescr.append(json.UgMinors[6].description);
     $minorSevenCourses.append("<strong>Courses :</strong>" + json.UgMinors[6].courses.join("  "));

     $minorEightTitle.append(json.UgMinors[7].title);
     $minorEightDescr.append(json.UgMinors[7].description);
     $minorEightCourses.append("<strong>Courses :</strong>" + json.UgMinors[7].courses.join("  "));
    });
    $( "#minorAccordion").accordion();
}

function displayEmploy(){
    $("body").append("<div class = 'flex-container employment'></div>");
    var $employTitle = $('<h1 id= "employTitle"></h1>');
    var $employDiv = $('<div = "employDiv"></div>');
    var $employersDiv = $('<div = "employersDiv"></div>');
    var $coopDiv = $('<div id = "coopDiv"></div>');
    $(".employment").append($employTitle);
    $(".employment").append($employDiv);
    $(".employment").append($coopDiv);
    $(".employment").append($employersDiv);

    $employDiv.append("<h2 id = 'subEmployTitle'></h2>");
    $employDiv.append("<p id = 'employDesc'></p>")
    $coopDiv.append("<h2 id = coopTitle></h2>")
    $coopDiv.append("<p id = 'coopDesc'></p>")
    $employersDiv.append("<h2 id = 'employersTitle'></h2>")
    $employersDiv.append("<p id = 'employersPara'></p>")

    getData({path:'/employment/'}).done(function(json){
        $employTitle.append(json.introduction.title);
        $("#subEmployTitle").append(json.introduction.content[0].title );
        $("#employDesc").append(json.introduction.content[0].description);
        $("#coopTitle").append(json.introduction.content[1].title);
        $("#coopDesc").append(json.introduction.content[1].description);
        $("#employersTitle").append(json.employers.title);
        $("#employersPara").append(json.employers.employerNames.join(" , "));
    });
}

function showMap(){
    $("body").append('<div class = " mapDiv"></div>');
    $(".mapDiv").append("<iframe src = 'http://ist.rit.edu/api/map.php'></iframe>")   
}
function runGallery(){
    var $faculty = $('<div class ="faculty" ></div>');
    var $gallery = $('<div class = "gallery"></div>');
    var $peopleTitle = $('<h1>Our People</h1>');
    var $peopleDesc = $('<h3>Apply scroll motion on top of the image to learn more</h3>');

    $faculty.append($peopleTitle);
    $faculty.append($peopleDesc);
    $faculty.append($gallery);
    $("body").append($faculty);
    getData({path:'/people/'}).done(function(json){
        for(var i = 0; i < json.faculty.length;i++){
            $gallery.append(`<a href = '#' class="animate fg-card" data-caption = 
                "Name: ${json.faculty[i].name + 
                "<br /> Title: " + json.faculty[i].title + 
                "<br /> Office:" +json.faculty[i].office + 
                "<br /> Email:" + json.faculty[i].email}"><img src ="${json.faculty[i].imagePath}" alt = "professors" width = '500' height= '500'></a>`);
        } 
        for(var j = 0; j < json.staff.length;j++){
            $gallery.append(`<a href = '#' class="animate fg-card" data-caption = 
                "Name: ${json.staff[j].name + 
                "<br /> Title: " + json.staff[j].title + 
                "<br /> Office:" +json.staff[j].office + 
                "<br /> Email:" + json.staff[j].email}"><img src ="${json.staff[j].imagePath}" alt = "staff" width = '500' height= '500'></a>`);
        }
    });
    $(".gallery").flipping_gallery({
        direction: "forward",
        selector: "> a",
        spacing: 10,
        showMaximum: 15,
        enableScroll: true,
        flipDirection: "bottom",
        autoplay: false
    });
}

function showFacResources(){
    var $facultyRescources = $('<div class ="flex-container facultyRescources" ></div>');
    $("body").append($facultyRescources);
    $facultyRescources.append("<h1 id = 'facResarchTitle'>Faculty Research: Areas of Interest </h1>");
    $facultyRescources.append("<h3 id = 'facResarchSubTitle'>Click the area you're interested in to explore our faculty publications</h3>");
    
    getData({path:'/research/'}).done(function(json){
        for(var i = 0; i < json.byInterestArea.length;i++){
            $facultyRescources.append(`<div class = "modalBox" id = "facBoxes${json.byInterestArea[i].areaName}"><p>${json.byInterestArea[i].areaName}</p></div>`);
            $facultyRescources.append(`<div class = "modal ${json.byInterestArea[i].areaName}" id = "facModelBody${json.byInterestArea[i].areaName.split(" ").join("")}" style = "display:none"> <span id="close">&times;</span><p class = "modal-content" id = "facModelContent${json.byInterestArea[i].areaName}">${json.byInterestArea[i].citations.join(" <br/ >")}</p></div>`);   
        }
    });
   
}
function checkClick(){
    $("body" ).on('click',function(e) {
        if(e.target.id == `facBoxesDatabase`){
            $("#facModelBodyDatabase").css({"display":"block"});
        }
        if(e.target.id == `facBoxesHCI`){
            $("#facModelBodyHCI").css({"display":"block"});
        }
        if(e.target.id == `facBoxesEducation`){
            $("#facModelBodyEducation").css({"display":"block"});
        }
        if(e.target.id == `facBoxesGeo`){
            $("#facModelBodyGeo").css({"display":"block"});
        }
        if(e.target.id == `facBoxesAnalytics`){
            $("#facModelBodyGeo").css({"display":"block"});
        }
        if(e.target.id == `facBoxesWeb`){
            $("#facModelBodyWeb").css({"display":"block"});
        }
        if(e.target.id == `facBoxesNetworking`){
            $("#facModelBodyNetworking").css({"display":"block"});
        }
        if(e.target.id == `facBoxesMobile`){
            $("#facModelBodyMobile").css({"display":"block"});
        }
        if(e.target.id == `facBoxesHealth Informatics`){
            $("#facModelBodyHealthInformatics").css({"display":"block"});
        }
        if(e.target.id == `facBoxesGeo`){
            $("#facModelBodyGeo").css({"display":"block"});
        }
        if(e.target.id == `facBoxesProgramming`){
            $("#facModelBodyProgramming").css({"display":"block"});
        }
        if(e.target.id == `facBoxesSystem Administration`){
            $("#facModelBodySystemAdministration").css({"display":"block"});
        }
        if(e.target.id == `facBoxesUbiquitous Computing`){
            $("#facModelBodyUbiquitousComputing").css({"display":"block"});
        }
        if(e.target.id == `close`){
            $(".modal").css({"display":"none"});
        }
    }); 
}
function showFacResearchLookUp(){
    var $facultyLookup = $('<div class ="flex-container facultyLookup" ></div>');
    $("body").append($facultyLookup);
    $facultyLookup.append("<h1 id = 'facLookupTitle'>Faculty Research: Lookup by Faculty</h1>");
    $facultyLookup.append("<h3 id ='facLookupSubTitle'>Click the faculty memeber to explore their recent publications</h3>");

    getData({path:'/research/'}).done(function(json){
        for(var i = 0; i < json.byInterestArea.length;i++){
            $facultyLookup.append(`<div class = "modalLookupBox" id = "facLookupBoxes${json.byFaculty[i].facultyName.split(" ").join("")}"><p id = "${json.byFaculty[i].facultyName.split(" ").join("")}">${json.byFaculty[i].facultyName}</p></div>`);
            $facultyLookup.append(`<div class = "modalLookup ${json.byFaculty[i].facultyName.replace(/[()]/g, '').split(" ").join("")}" id = "facModelBody${json.byFaculty[i].facultyName.replace(/[()]/g, '').split(" ").join("")}" style = "display:none"> <span id="close">&times;</span><p class = "modal-contentLookup" id = "lookupModelContent${json.byFaculty[i].facultyName}">${json.byFaculty[i].citations.join(" <br/ >")}</p></div>`);   
        }
    });
}

function addLookupModal(){
    $("body" ).on('click',function(evt) {
        console.log(evt.target.id)
        if(evt.target.id == `DeborahGears`){
            $("#facModelBodyDeborahGears").css({"display":"block"});
        }
        if(evt.target.id == `BrianTomaszewski`){
            $("#facModelBodyBrianTomaszewski").css({"display":"block"});
        }
        if(evt.target.id == `ElissaWeeden`){
            $("#facModelBodyElissaWeeden").css({"display":"block"});
        }
        if(evt.target.id == `QiYu`){
            $("#facModelBodyQiYu").css({"display":"block"});
        }
        if(evt.target.id == `SteveZilora`){
            $("#facModelBodySteveZilora").css({"display":"block"});
        }
        if(evt.target.id == `CatherineBeaton`){
            $("#facModelBodyCatherineBeaton").css({"display":"block"});
        }
        if(evt.target.id == `DanielBogaard`){
            $("#facModelBodyDanielBogaard").css({"display":"block"});
        }
        if(evt.target.id == `BruceHartpence`){
            $("#facModelBodyBruceHartpence").css({"display":"block"});
        }
        if(evt.target.id == `SharonMason`){
            $("#facModelBodySharonMason").css({"display":"block"});
        }
        if(evt.target.id == `Tae(Tom)Oh`){
            $("#facModelBodyTae(Tom)Oh").css({"display":"block"});
        }
        if(evt.target.id == `NirmalaShenoy`){
            $("#facModelBodyNirmalaShenoy").css({"display":"block"});
        }
        if(evt.target.id == `EdHolden`){
            $("#facModelBodyEdHolden").css({"display":"block"});
        }
        if(evt.target.id == `close`){
            $(".modalLookup").css({"display":"none"});
        }
    });
}
function showStudentResources(){
    var $studentResource = $('<div class ="flex-container studentResources"></div>');
    $("body").append($studentResource);
    $studentResource.append("<h1 id = 'studentRescTitle'>Student Resources</h1>");
    $studentResource.append("<h3 id ='studentRescSubTitle'>Click on any of the links for a quick access to our resources.</h3>");
    getData({path:'/resources/'}).done(function(json){
      $studentResource.append(`<div class = StudRescourceBox id = "${json.studyAbroad.title.split(" ").join("")}" ></div>`);
      $("#StudyAbroad").append(`<p id = "studAbroadTitle">${json.studyAbroad.title}</p>`);
      $("#StudyAbroad").append(`<div id = 'studyAbroadBox' class = 'studyAbroad' style = "display:none"><span id="close">&times;</span><p class = "studDesc">${json.studyAbroad.description}</p></div>`);
      $('#studyAbroadBox').append(`<p class = "studDesc">${json.studyAbroad.places[0].nameOfPlace + "<br />" + json.studyAbroad.places[0].description}</p>`);
      $('#studyAbroadBox').append(`<p class = "studDesc">${json.studyAbroad.places[1].nameOfPlace + "<br />" + json.studyAbroad.places[1].description}</p>`);

      $studentResource.append(`<div class = StudRescourceBox id = "${json.studentServices.title.split(" ").join("")}" ></div>`);
      $("#Advising").append(`<p id = "advTitle">${json.studentServices.title}</p>`);
      $("#Advising").append(`<div id = 'studyAbroadAdvise' class = 'studyAbroad' style = "display:none"><span id="close">&times;</span><p id = "studAdviseDesc" class = "studDesc"><strong>${json.studentServices.academicAdvisors.title}</strong></p></div>`);
      $('#studyAbroadAdvise').append(`<p id = "studAdvisorDesc" class = "studAdvisor">${json.studentServices.academicAdvisors.description}</p>`);
      $('#studAdvisorDesc').append(`<strong><p>${json.studentServices.academicAdvisors.faq.title + "<br />"}</strong></p>`);
      $('#studAdvisorDesc').append(`<p>${json.studentServices.academicAdvisors.faq.contentHref}</p>`)
      $('#studAdvisorDesc').append(`<strong><p>${json.studentServices.professonalAdvisors.title + "<br />"}</strong></p>`);
      $('#studAdvisorDesc').append(`<p><strong>${json.studentServices.professonalAdvisors.advisorInformation[0].name+ "<br />"}</strong></p>`);
      $('#studAdvisorDesc').append(`<p>${json.studentServices.professonalAdvisors.advisorInformation[0].department + "<br />"}</p>`);
      $('#studAdvisorDesc').append(`<p>${json.studentServices.professonalAdvisors.advisorInformation[0].email + "<br />"}</p>`);

      $('#studAdvisorDesc').append(`<p><strong>${json.studentServices.professonalAdvisors.advisorInformation[1].name+ "<br />"}</strong></p>`);
      $('#studAdvisorDesc').append(`<p>${json.studentServices.professonalAdvisors.advisorInformation[1].department + "<br />"}</p>`);
      $('#studAdvisorDesc').append(`<p>${json.studentServices.professonalAdvisors.advisorInformation[1].email + "<br />"}</p>`);

      $('#studAdvisorDesc').append(`<p><strong>${json.studentServices.professonalAdvisors.advisorInformation[2].name+ "<br />"}</strong></p>`);
      $('#studAdvisorDesc').append(`<p>${json.studentServices.professonalAdvisors.advisorInformation[2].department + "<br />"}</p>`);
      $('#studAdvisorDesc').append(`<p>${json.studentServices.professonalAdvisors.advisorInformation[2].email + "<br />"}</p>`);

      $('#studAdvisorDesc').append(`<p id = "studAdvisorDesc" class = "studAdvisor"><strong>${json.studentServices.facultyAdvisors.title}</strong></p>`);
      $('#studAdvisorDesc').append(`<p id = "studAdvisorDesc" class = "studAdvisor">${json.studentServices.facultyAdvisors.description}</p>`);

      $('#studAdvisorDesc').append(`<p id = "studAdvisorDesc" class = "studAdvisor"><strong>${json.studentServices.istMinorAdvising.title}</strong></p>`);
      $('#studAdvisorDesc').append(`<p><strong>${json.studentServices.istMinorAdvising.minorAdvisorInformation[0].title+ "<br />"}</strong></p>`);
      $('#studAdvisorDesc').append(`<p>${json.studentServices.istMinorAdvising.minorAdvisorInformation[0].advisor + "<br />"}</p>`);
      $('#studAdvisorDesc').append(`<p>${json.studentServices.istMinorAdvising.minorAdvisorInformation[0].email + "<br />"}</p>`);

      $('#studAdvisorDesc').append(`<p><strong>${json.studentServices.istMinorAdvising.minorAdvisorInformation[1].title+ "<br />"}</strong></p>`);
      $('#studAdvisorDesc').append(`<p>${json.studentServices.istMinorAdvising.minorAdvisorInformation[1].advisor + "<br />"}</p>`);
      $('#studAdvisorDesc').append(`<p>${json.studentServices.istMinorAdvising.minorAdvisorInformation[1].email + "<br />"}</p>`);

      $('#studAdvisorDesc').append(`<p><strong>${json.studentServices.istMinorAdvising.minorAdvisorInformation[2].title+ "<br />"}</strong></p>`);
      $('#studAdvisorDesc').append(`<p>${json.studentServices.istMinorAdvising.minorAdvisorInformation[2].advisor + "<br />"}</p>`);
      $('#studAdvisorDesc').append(`<p>${json.studentServices.istMinorAdvising.minorAdvisorInformation[2].email + "<br />"}</p>`);

      $('#studAdvisorDesc').append(`<p><strong>${json.studentServices.istMinorAdvising.minorAdvisorInformation[3].title+ "<br />"}</strong></p>`);
      $('#studAdvisorDesc').append(`<p>${json.studentServices.istMinorAdvising.minorAdvisorInformation[3].advisor + "<br />"}</p>`);
      $('#studAdvisorDesc').append(`<p>${json.studentServices.istMinorAdvising.minorAdvisorInformation[3].email + "<br />"}</p>`);

      $('#studAdvisorDesc').append(`<p><strong>${json.studentServices.istMinorAdvising.minorAdvisorInformation[4].title+ "<br />"}</strong></p>`);
      $('#studAdvisorDesc').append(`<p>${json.studentServices.istMinorAdvising.minorAdvisorInformation[4].advisor + "<br />"}</p>`);
      $('#studAdvisorDesc').append(`<p>${json.studentServices.istMinorAdvising.minorAdvisorInformation[4].email + "<br />"}</p>`);

      $('#studAdvisorDesc').append(`<p><strong>${json.studentServices.istMinorAdvising.minorAdvisorInformation[5].title+ "<br />"}</strong></p>`);
      $('#studAdvisorDesc').append(`<p>${json.studentServices.istMinorAdvising.minorAdvisorInformation[5].advisor + "<br />"}</p>`);
      $('#studAdvisorDesc').append(`<p>${json.studentServices.istMinorAdvising.minorAdvisorInformation[5].email + "<br />"}</p>`);

      $('#studAdvisorDesc').append(`<p><strong>${json.studentServices.istMinorAdvising.minorAdvisorInformation[6].title+ "<br />"}</strong></p>`);
      $('#studAdvisorDesc').append(`<p>${json.studentServices.istMinorAdvising.minorAdvisorInformation[6].advisor + "<br />"}</p>`);
      $('#studAdvisorDesc').append(`<p>${json.studentServices.istMinorAdvising.minorAdvisorInformation[6].email + "<br />"}</p>`);

      $('#studAdvisorDesc').append(`<p><strong>${json.studentServices.istMinorAdvising.minorAdvisorInformation[7].title+ "<br />"}</strong></p>`);
      $('#studAdvisorDesc').append(`<p>${json.studentServices.istMinorAdvising.minorAdvisorInformation[7].advisor + "<br />"}</p>`);
      $('#studAdvisorDesc').append(`<p>${json.studentServices.istMinorAdvising.minorAdvisorInformation[7].email + "<br />"}</p>`);

      $studentResource.append(`<div class = StudRescourceBox  id = "tutorsAndLabInformation"></div>`);
      $("#tutorsAndLabInformation").append(`<p id = "tutorLabTitle">${json.tutorsAndLabInformation.title}</p>`);    
      $("#tutorsAndLabInformation").append(`<div id = 'tutorInfoLab' class = 'studyAbroad' style = "display:none"><span id="close">&times;</span><p id = "studAdviseDesc" class = "studDesc"><strong>${json.tutorsAndLabInformation.title + "<br/>"}</strong></p></div>`);
      $("#tutorInfoLab").append(`<p class = "tutorLabDesc">${json.tutorsAndLabInformation.description}</p>`);


      $studentResource.append(`<div class = StudRescourceBox id = "studentAmbassadors" ></div>`);
      $("#studentAmbassadors").append(`<p id = "studAmbTitle">${json.studentAmbassadors.title}</p>`);
      $("#studentAmbassadors").append(`<div id = 'studAmbInfo' class = 'studyAbroad' style = "display:none"><span id="close">&times;</span><p id = "studAdviseDesc" class = "studDesc"><strong>${json.studentAmbassadors.title + "<br/>"}</strong></p></div>`);

      $('#studAmbInfo').append(`<p class = "studAmbDesc"><strong>${json.studentAmbassadors.subSectionContent[0].title+ "<br />"}</strong></p>`);
      $('#studAmbInfo').append(`<p class = "studAmbDesc">${json.studentAmbassadors.subSectionContent[0].description+ "<br />"}</p>`);

      $('#studAmbInfo').append(`<p class = "studAmbDesc"><strong>${json.studentAmbassadors.subSectionContent[1].title+ "<br />"}</strong></p>`);
      $('#studAmbInfo').append(`<p class = "studAmbDesc">${json.studentAmbassadors.subSectionContent[1].description+ "<br />"}</p>`);

      $('#studAmbInfo').append(`<p class = "studAmbDesc"><strong>${json.studentAmbassadors.subSectionContent[2].title+ "<br />"}</strong></p>`);
      $('#studAmbInfo').append(`<p class = "studAmbDesc">${json.studentAmbassadors.subSectionContent[2].description+ "<br />"}</p>`);

      $('#studAmbInfo').append(`<p class = "studAmbDesc"><strong>${json.studentAmbassadors.subSectionContent[3].title+ "<br />"}</strong></p>`);
      $('#studAmbInfo').append(`<p class = "studAmbDesc">${json.studentAmbassadors.subSectionContent[3].description+ "<br />"}</p>`);

      $('#studAmbInfo').append(`<p class = "studAmbDesc"><strong>${json.studentAmbassadors.subSectionContent[4].title+ "<br />"}</strong></p>`);
      $('#studAmbInfo').append(`<p class = "studAmbDesc">${json.studentAmbassadors.subSectionContent[4].description+ "<br />"}</p>`);

      $('#studAmbInfo').append(`<p class = "studAmbDesc"><strong>${json.studentAmbassadors.subSectionContent[5].title+ "<br />"}</strong></p>`);
      $('#studAmbInfo').append(`<p class = "studAmbDesc">${json.studentAmbassadors.subSectionContent[5].description+ "<br />"}</p>`);

      $('#studAmbInfo').append(`<p class = "studAmbDesc"><strong>${json.studentAmbassadors.subSectionContent[6].title+ "<br />"}</strong></p>`);
      $('#studAmbInfo').append(`<p class = "studAmbDesc">${json.studentAmbassadors.subSectionContent[6].description+ "<br />"}</p>`);
      $('#studAmbInfo').append(`<p class = "studAmbDesc">${json.studentAmbassadors.applicationFormLink}</p>`)
      $('#studAmbInfo').append(`<p class = "studAmbDesc">${json.studentAmbassadors.note}</p>`)

     
      $studentResource.append(`<div class = StudRescourceBox id = "forms"></div>`);
      $("#forms").append(`<p id = "formTitle">Forms</p>`);
      $("#forms").append(`<div id = 'formBox' class = 'studyAbroad' style = "display:none"><span id="close">&times;</span><p class = "studDesc"><strong>${json.forms.graduateForms[0].formName}</strong></p></div>`);
      $("#formBox").append(`<p class = "studDesc">${json.forms.graduateForms[0].href}</p>`);

      $("#formBox").append(`<p class = "studDesc"><strong>${json.forms.graduateForms[1].formName}</strong></p>`);
      $("#formBox").append(`<p class = "studDesc">${json.forms.graduateForms[1].href}</p>`);

      $("#formBox").append(`<p class = "studDesc"><strong>${json.forms.graduateForms[2].formName}</strong></p>`);
      $("#formBox").append(`<p class = "studDesc">${json.forms.graduateForms[2].href}</p>`);

      $("#formBox").append(`<p class = "studDesc"><strong>${json.forms.graduateForms[3].formName}</strong></p>`);
      $("#formBox").append(`<p class = "studDesc">${json.forms.graduateForms[3].href}</p>`);

      $("#formBox").append(`<p class = "studDesc"><strong>${json.forms.graduateForms[4].formName}</strong></p>`);
      $("#formBox").append(`<p class = "studDesc">${json.forms.graduateForms[4].href}</p>`);

      $("#formBox").append(`<p class = "studDesc"><strong>${json.forms.graduateForms[5].formName}</strong></p>`);
      $("#formBox").append(`<p class = "studDesc">${json.forms.graduateForms[5].href}</p>`);

      $("#formBox").append(`<p class = "studDesc"><strong>${json.forms.graduateForms[6].formName}</strong></p>`);
      $("#formBox").append(`<p class = "studDesc">${json.forms.graduateForms[6].href}</p>`);

      $("#formBox").append(`<p class = "studDesc"><strong>${json.forms.undergraduateForms[0].formName}</strong></p>`);
      $("#formBox").append(`<p class = "studDesc">${json.forms.undergraduateForms[0].href}</p>`);

      $studentResource.append(`<div class = StudRescourceBox id = "coopEnroll"></div>`);
      $("#coopEnroll").append(`<p id = "coopTitle">Coop-Enrollment</p>`);
      $("#coopEnroll").append(`<div id = 'coopBox' class = 'studyAbroad' style = "display:none"><span id="close">&times;</span><p class = "studDesc"><strong>${json.coopEnrollment.title}</strong></p></div>`);
      $("#coopBox").append(`<p class = "studDesc"><strong>${json.coopEnrollment.enrollmentInformationContent[0].title}</strong></p>`);     
      $("#coopBox").append(`<p class = "studDesc">${json.coopEnrollment.enrollmentInformationContent[0].description}</p>`);

      $("#coopBox").append(`<p class = "studDesc"><strong>${json.coopEnrollment.enrollmentInformationContent[1].title}</strong></p>`);     
      $("#coopBox").append(`<p class = "studDesc">${json.coopEnrollment.enrollmentInformationContent[1].description}</p>`);

      $("#coopBox").append(`<p class = "studDesc"><strong>${json.coopEnrollment.enrollmentInformationContent[2].title}</strong></p>`);     
      $("#coopBox").append(`<p class = "studDesc">${json.coopEnrollment.enrollmentInformationContent[2].description}</p>`);

      $("#coopBox").append(`<p class = "studDesc"><strong>${json.coopEnrollment.enrollmentInformationContent[3].title}</strong></p>`);     
      $("#coopBox").append(`<p class = "studDesc">${json.coopEnrollment.enrollmentInformationContent[3].description}</p>`);

    });
}
function showStudRescModal(){
    /** if(evt.target.id == `SharonMason`){
            $("#facModelBodySharonMason").css({"display":"block"});
        } */
    $("body" ).on('click',function(evt) {
        if(evt.target.id == `studAbroadTitle`){
            $("#studyAbroadBox").css({"display":"block"});
        }
        if(evt.target.id == `advTitle`){
            $("#studyAbroadAdvise").css({"display":"block"});
        }
        if(evt.target.id == `tutorLabTitle`){
            $("#tutorInfoLab").css({"display":"block"});
        }
        if(evt.target.id == `studAmbTitle`){
            $("#studAmbInfo").css({"display":"block"});
        }
        if(evt.target.id == `tutorLabTitle`){
            $("#tutorInfoLab").css({"display":"block"});
        }
        if(evt.target.id == `formTitle`){
            $("#formBox").css({"display":"block"});
        }
        if(evt.target.id == `coopTitle`){
            $("#coopBox").css({"display":"block"});
        }
        if(evt.target.id == `close`){
            $(".studyAbroad").css({"display":"none"});
        }
    });
}

function addFooter(){
    $("body").append("<div id = 'ritFooter'></div>");
    $("#ritFooter").append('<p>Copyright © Rochester Institute of Technology. All Rights Reserved . <br />Copyright Infringement | Privacy Statement | Disclaimer | Nondiscrimination</p>')   
}