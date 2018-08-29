export var ENV_MODE;
export var PATH = '/json/';
console.log('env mode',process.env.NODE_ENV);

var envType = "dev1";

switch(envType)
{
    case 'development':
        ENV_MODE = 'dev1';//can be changed dev2(if dummy response needed,testing
        break;
    case 'production':  
        ENV_MODE = 'production';
        break;
    default:
        ENV_MODE='dev1';
        break;
}
