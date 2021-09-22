const Type = {
    Info: 'info',
    Warn: 'warn',
    Error: 'error',
};

const logger = (message, type = Type.Info) => {
    if (process.env.VERBOSE === 'false') {
        return;
    }
    const msg = typeof message === 'object' ? JSON.stringify(message) : message;
    console.log(new Date().toISOString(), `[${type}]`, msg);
};

logger.Type = Type;

export default logger;
