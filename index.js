const { exec } = require("child_process");
const { promisify } = require('util');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();


const execAsync = promisify(exec);

const terminalEncoding = 'utf8';

async function main(){

    const repos = JSON.parse(fs.readFileSync('repos.json').toString());

    const cwd = `git-importer-${new Date().getTime()}`;

    if(!fs.existsSync(cwd)){
        fs.mkdirSync(cwd);
    }

    repos.forEach( async repo => {
        console.log(`Starting migration of repo ${repo}`);

        const source_git_url = process.env['GIT_SOURCE_BASE_URL'].replace('{user}', process.env['GIT_SOURCE_USER']).replace('{pass}', process.env['GIT_SOURCE_PASS']);
    
        //https://git-scm.com/docs/git-clone#Documentation/git-clone.txt---bare
        const cloneRepo = await execAsync(`git clone --bare ${source_git_url}${repo}`, { 
            cwd : cwd,
            encoding: terminalEncoding });
    
        if(cloneRepo.error){
            console.log(`Repo ${repo} error on clone`);
            console.log(cloneRepo.error);
            console.log(cloneRepo.stderr);
            process.exit(-1);
        } else{
            console.log(`Repo ${repo} successful cloned`);
            console.log(cloneRepo.stdout);
        }

        //ok with clone, now create the repo on destination
        
        const destination_git_url = process.env['GIT_DESTINATION_BASE_URL'].replace('{user}', process.env['GIT_DESTINATION_USER']).replace('{pass}', process.env['GIT_DESTINATION_PASS']);
    
        //https://git-scm.com/docs/git-clone#Documentation/git-clone.txt---mirror
        const pushRepo = await execAsync(`git -c http.sslVerify=false push --mirror ${destination_git_url}${repo}`, { 
            cwd : cwd + `/${repo}`,//CHANGE TO REPO CLONED BEFORE !
            encoding: terminalEncoding });
    
        if(pushRepo.error){
            console.log(`Repo ${repo} error on creation`);
            console.log(pushRepo.error);
            console.log(pushRepo.stderr);
            process.exit(-1);
        } else{
            console.log(`Repo ${repo} successful created`);
            console.log(pushRepo.stdout);
        }
    });
    console.log('Ended');
}


main()
.then(console.log)
.catch(console.error);