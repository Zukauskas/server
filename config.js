const config = {}

config.dev = {
    name: 'dev',
    port: 41069,
    cache: 0,
}

config.prod = {
    name: 'prod',
    port: 41070,
    cache: 86400
}

const envName = process.env.NODE_ENV;
const envObj = config[envName] ? config[envName] : config.dev;

export default envObj