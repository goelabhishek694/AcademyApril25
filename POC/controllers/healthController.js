export const handleHealthCheck = (req, res) => {
    res.json({
        success: true,
        message: "server is healthy",
        timestamp: new Date().toISOString(),
    })
}

export const handleCPUCheck = (req, res) => {
    console.log("in handleCPUCheck", req.richestPerson);
    
    res.json({
        success: true,
        message: "cpu is healthy",
        timestamp: new Date().toISOString(),
    })
}