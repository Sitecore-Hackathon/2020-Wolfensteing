module.exports = function () {
    var instanceRoot = "C:\\inetpub\\wwwroot\\hack2020sc.dev.local";
    var config = {
        websiteRoot: instanceRoot,
        sitecoreLibraries: instanceRoot + "\\bin",
        licensePath: instanceRoot + "\\App_Data\\license.xml",
        solutionName: "Hackathon.Boilerplate",
        buildConfiguration: "Debug",
        buildPlatform: "Any CPU",
        buildToolsVersion: 17.0, //change to 17.0 for VS2019 support
        publishPlatform: "AnyCpu",
        runCleanBuilds: false
    };
    return config;
}