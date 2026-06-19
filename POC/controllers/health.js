export const handleHealthCheck = (req, res) => {
    res.json({
        success: true,
        message: "server is healthy",
        timestamp: new Date().toISOString(),
    })
}

export const handleCPUCheck = (req, res) => {
    console.log("in handleCPUCheck", req.richestPerson);
    // const error = new Error("user forbidden");
    // error.statusCode = 403;
    // throw error;
    res.json({
        success: true,
        message: "cpu is healthy",
        timestamp: new Date().toISOString(),
    })
}