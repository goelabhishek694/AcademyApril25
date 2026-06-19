export const m1 = (req, res, next) => {
    console.log("m1");
    req.richestPerson = "Cockroach";
    next();
}

export const m2 = (req, res, next) => {
    console.log("m2");
    // req.richestPerson = "Ambani";
    next();
}

export const m3 = (req, res, next) => {
    console.log("m3");
    next();
}

export const logger = (req, res, next) => {
    console.log("logger", req.method, req.url);
    next();
}