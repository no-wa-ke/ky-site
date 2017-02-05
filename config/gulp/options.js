import conf from '../config.json';
import minimist from 'minimist';

var knownOptions = {
  string: 'env',
  default: {env: 'local'}
};
var options = minimist(process.argv.slice(2), knownOptions);
var optionsReturn = {};
optionsReturn.env = options.env;
optionsReturn.src = conf.base.compile + '/**/*';
optionsReturn.host = '';
optionsReturn.dest = '';
optionsReturn.apiUrl = '';

switch(options.env) {
    case 'prod':
        optionsReturn.apiUrl = conf.env.prod.api_url;
        optionsReturn.src = conf.base.compile + '/**/*';
        optionsReturn.host = conf.env.prod.host;
        optionsReturn.dest = conf.env.prod.path;
        break;
    case 'dev':
        optionsReturn.apiUrl = conf.env.dev.api_url;
        optionsReturn.src = conf.base.build + '/**/*';
        optionsReturn.host = conf.env.dev.host;
        optionsReturn.dest = conf.env.dev.path;
        break;
    case 'mock':
        optionsReturn.apiUrl = conf.env.mock.api_url;
        optionsReturn.src = conf.base.compile + '/**/*';
        optionsReturn.host = conf.env.dev.host;
        optionsReturn.dest = conf.env.dev.path;
        break;
    default:
        optionsReturn.apiUrl = conf.env.dev.api_url;
        optionsReturn.src = conf.base.compile + '/**/*';
        optionsReturn.host = conf.env.dev.host;
        optionsReturn.dest = conf.env.dev.path;
        break;
}

module.exports = optionsReturn;
