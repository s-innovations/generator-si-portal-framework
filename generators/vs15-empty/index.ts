
import yo = require('yeoman-generator');

class MyGenerator extends yo.generators.Base {
    constructor(args, options) {
        super(args, options);
        console.log("hello world");

        this.option('coffee', { desc: "You want Coffee?" }); //Get some coffee
      
    }

    method1() {
        console.log("Method 1");


    }
    myAction() {
        this.log('Something has gone wrong!');
    }

    myAction2() {
     
      
    }

    initialize() {
        this.gruntfile.insertConfig("bower", JSON.stringify({
            install: {
                options: {
                    targetDir: "wwwroot/libs",
                    verbose: true,
                }
            }
        }, null, 4));

        this.gruntfile.insertConfig("tsd", JSON.stringify({
            refresh: {
                options: {
                    command: 'reinstall',
                    latest: true,
                    config: 'tsd.json',
                    opts: {
                    }
                }
            }
        }, null, 4));

        this.gruntfile.loadNpmTasks("grunt-bower-task");
        this.gruntfile.loadNpmTasks("grunt-tsd");
        
    }

    install() {
        this.npmInstall(['grunt', "grunt-bower-task", "grunt-contrib-clean", "grunt-contrib-watch", "grunt-sync", "grunt-tsd"], { 'saveDev': true });  
        this.installDependencies();
    
    }

    prompting() {
        var done = this.async();
        this.prompt({
            type: 'input',
            name: 'name',
            message: 'Your project name',
            default: this.appname // Default to current folder name
        }, function (answers) {
                this.log(answers.name);
                this.fs.copyTpl(this.templatePath('bower.json'), this.destinationPath('bower.json'), { name: answers.name });
                this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath('package.json'), { name: answers.name });
                this.fs.copyTpl(this.templatePath('tsconfig.json'), this.destinationPath('tsconfig.json'), { name: answers.name });
                this.fs.copyTpl(this.templatePath('project.xproj'), this.destinationPath(answers.name + ".xproj"), { name: answers.name });
                this.fs.copyTpl(this.templatePath('solution.sln'), this.destinationPath(answers.name + ".sln"), { name: answers.name });
                this.fs.copyTpl(this.templatePath('tsd.json'), this.destinationPath("tsd.json"), { name: answers.name });
                this.fs.copyTpl(this.templatePath('readme.md'), this.destinationPath("readme.md"), { name: answers.name, version : "1.0.0" });
            done();
        }.bind(this));
    }

}


export = MyGenerator;